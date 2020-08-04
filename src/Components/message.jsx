import React, { Component } from 'react';
import Cable from 'actioncable';
import moment from 'moment';
import { connect } from 'react-redux';
import {addMessage} from '../redux/actions/actions';
import './message.css'

class Message extends Component {

    state={
        messages: [],
        chatrooms: undefined,
        value: "",
        channel: undefined,
        cable: undefined
    }

    componentDidMount() {
        let chatroom
        if (this.props.chatrooms && this.props.messages) {
            let numb = window.location.href.split("/")[5]
            chatroom = this.props.chatrooms.find(room => room.id == numb)
            this.setState({chatroom: chatroom})

            let orderedMessages = this.props.messages.filter(message => message.chatroom.id === chatroom.id)
            orderedMessages.sort((a,b) => moment(a.created_at) - moment(b.created_at))
            console.log(orderedMessages)
            this.setState({messages: orderedMessages})

            let cable = Cable.createConsumer('http://localhost:3000/api/v1/cable')
            cable.subscriptions.create({
                channel: 'ChatroomChannel',
                chatroom_id: chatroom.id
            }, {
                received: (data) => {
                    this.setState({messages: [...this.state.messages, data.message]})
                }
            }); 
        }
         
    }


    findProvider = () => {
        if (this.state.chatroom && this.props.providers) {
            let found = this.props.providers.find(provider => provider.id === this.state.chatroom.provider.id )
            return found
        }
    }

    handleChange = (e) => {
        this.setState({value: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.createMessage()
    }

    createMessage = () => {
        fetch("http://localhost:3000/api/v1/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accepts": "application/json",
              Authorization: `Bearer ${this.props.user.token}`
            },
            body: JSON.stringify({
                chatroom_id: this.state.chatroom.id,
                content: this.state.value,
                user_id: this.props.user.id
            })
        })
        .then(res => res.json())
        .then(newMessage => {
            this.props.addMessage(newMessage.message)
            this.setState({value: ""})
        })
    }

    render() {
        return (
            <div className="body">
            <div className="header"><p>{this.state.chatroom && this.findProvider() ? this.findProvider().user.name : null}</p></div>
               {this.state.messages ? this.state.messages.map(message => (
                   message.user.id === this.props.user.id ? 
                   <div className="message-container left">
                        <div className="post-author">
                            <div className="clearfix user">
                                <span className="avatar-wrapper">
                                    <img width="50" height="50" className="avatar-icon" src={message.user.avatar} alt="Author Profile"/>
                                </span>
                            </div>
                        </div>
                        <div className="date">{moment(message.created_at).format('LLL')}</div>
                        <div className="content">{message.content}</div>
                   </div>
                   :
                   <div className="message-container right">
                        <div className="post-author">
                            <div className="clearfix user">
                                <span className="avatar-wrapper">
                                    <img width="50" height="50" className="avatar-icon" src={message.user.avatar} alt="Author Profile"/>
                                </span>
                            </div>
                        </div>
                        <div className="date">{moment(message.created_at).format('LLL')}</div>
                        <p className="content">{message.content}</p>
                   </div>
               )) : null}
               <form onSubmit={this.handleSubmit} >
                {/* <label for="message">Write a message</label> */}
                <input onChange={this.handleChange} name="message" type="text" value={this.state.value}/>
               </form>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
      providers: state.providers.providers,
      user: state.users.user,
      chatrooms: state.messages.chatrooms,
      messages: state.messages.messages
    }
}
  
const mapDispatchToProps = dispatch => ({
    addMessage: message => dispatch(addMessage(message)),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Message);
  