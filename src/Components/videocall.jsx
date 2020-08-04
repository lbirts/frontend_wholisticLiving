import React, { Component } from 'react';
import { broadcastData, JOIN_CALL, LEAVE_CALL, EXCHANGE, ice } from '../utils/video_util';
import Cable from 'actioncable'
import {connect} from 'react-redux';
import './call.css'
import {withRouter} from 'react-router-dom'

class VideoCall extends Component{
    constructor(props){
      super(props);
      this.pcPeers = {};
      this.userId = this.props.user.id;
      this.joinCall = this.joinCall.bind(this);
      this.leaveCall = this.leaveCall.bind(this);
    }

    state={inCall: false}

    findAppt = () => {
        let numb = this.props.location.pathname.split("=")[1]
        console.log(numb)
        let found = this.props.appointments.find(appt => appt.id === numb)
        this.setState({appt: found})
    }

    componentDidMount(){
        this.remoteVideoContainer = document.getElementById("remote-video-container")
        navigator.mediaDevices.getUserMedia({audio: false, video: true})
        .then(stream => {
         this.localStream = stream;
         document.getElementById("local-video").srcObject = stream;
        }).catch(error => { console.log(error)});
    }

    join(data){
        this.createPC(data.from, true)
        this.setState({inCall: true})
    }

    joinCall(e){
        let cable = Cable.createConsumer('http://localhost:3000/api/v1/cable');
        this.setState({cable: cable})
        cable.subscriptions.create(
            { channel: "CallChannel" },
            { 
              connected: () => {
                broadcastData({ type: JOIN_CALL, from: this.userId});
              },
              received: data => {
                console.log("RECEIVED: ", data);
                if (data.from === this.userId) return;
                switch(data.type){
                  case JOIN_CALL:
                    return this.join(data);
                  case EXCHANGE:
                    if (data.to !== this.userId) return;
                    return this.exchange(data);
                  case LEAVE_CALL:
                    return this.removeUser(data);
                  default:
                    return;
                }
              }
            });
    }

    createPC(userId, offerBool){
        const pc = new RTCPeerConnection(ice);
        this.pcPeers[userId] = pc;
        this.localStream.getTracks()
            .forEach(track => pc.addTrack(track, this.localStream));
        if (offerBool) {
            pc.createOffer().then(offer => {
            pc.setLocalDescription(offer).then(() => {
            setTimeout( () => {
                broadcastData({
                type: EXCHANGE,
                from: this.userId,
                to: userId,
                sdp: JSON.stringify(pc.localDescription),
                });
            }, 0);
            });
            });
        }
        pc.onicecandidate = (e) => {
            broadcastData({
                type: EXCHANGE,
                from: this.userId,
                to: userId,
                sdp: JSON.stringify(e.candidate)
              })
        };
        pc.ontrack = (e) => {
            const remoteVid = document.createElement("video");
            remoteVid.id = `remoteVideoContainer2`;
            remoteVid.autoplay = "autoplay";
            remoteVid.srcObject = e.streams[0];
            this.remoteVideoContainer.appendChild(remoteVid);
        }; 
        pc.oniceconnectionstatechange = (e) => {
            if (pc.iceConnectionState === 'disconnected'){
                broadcastData({ type: LEAVE_CALL, from: userId });
              }
        };
        return pc;
    }

    exchange(data){
        let pc;
        if(this.pcPeers[data.from]){
            pc = this.pcPeers[data.from];
        } else{
            pc = this.createPC(data.from, false);
        }
        if (data.candidate){
            let candidate = JSON.parse(data.candidate)
            pc.addIceCandidate(new RTCIceCandidate(candidate))
        }
        if(data.sdp){
            const sdp = JSON.parse(data.sdp);
            if(sdp && !sdp.candidate){
            pc.setRemoteDescription(sdp).then( () =>{
            if (sdp.type === 'offer'){
                pc.createAnswer().then(answer => {
                    pc.setLocalDescription(answer)
                    .then( () => {
                        broadcastData({
                        type: EXCHANGE,
                        from: this.userId,
                        to: data.from,
                        sdp: JSON.stringify(pc.localDescription)
                        });
                    });
                });
            }
            });
            }
        } 
    }
    
    leaveCall(){
        const pcKeys = Object.keys(this.pcPeers);
        for (let i = 0; i < pcKeys.length; i++) {
            this.pcPeers[pcKeys[i]].close();
        }
        this.pcPeers = {};  
        this.localStream.getVideoTracks()[0].enabled = false  
            // .forEach(function (track) { track.stop() })
       this.localStream.getTracks()  
            .forEach(function (track) { console.log(track) })
    
        // this.localStream.srcObject = null;
        this.state.cable.subscriptions.subscriptions = [];
        this.remoteVideoContainer.innerHTML = "";
        broadcastData({ type: LEAVE_CALL, from: this.userId });
        this.setState({inCall: false})
        this.props.history.push('/dashboard')
        console.log(this.state.appt)
    }
    removeUser(data){
        let video = document.getElementById(`remoteVideoContainer+${data.from}`);
        video && video.remove();
        let peers = this.pcPeers
        delete peers[data.from]
    }

    render(){
      return(
      <div className="VideoCall">
       <div id="remote-video-container">{this.state.inCall ? null : <p className="wait">Please wait for participant</p>}</div>
       <video id="local-video" autoPlay></video>
       <button className="join" onClick={this.joinCall}>Join Call</button>
       <button className="leave" onClick={this.leaveCall}>Leave Call</button>
      </div>)
    }
  }

  const mapStateToProps = (state) => {
    return {
      categories: state.categories,
      providers: state.providers,
      user: state.users.user,
      appointments: state.appointments.appointments
    }
  }
  
  
  export default connect(mapStateToProps)(withRouter(VideoCall));