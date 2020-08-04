import React, { useState, useEffect } from 'react';
import moment from 'moment'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import message from './message';
import "./message.css"


function Room(props) {

    const [myChatrooms, setMyChatrooms] = useState([])

    useEffect(() => {
        findChatrooms()
    }, [])

    const findChatrooms = () => {
        if (props.chatrooms) {
            if (props.user.client === null) {
                let orderedChatrooms = props.chatrooms.filter(room => room.provider.id === props.user.provider.id)
                orderedChatrooms.sort((a,b) => moment(a.updated_at) - moment(b.updated_at))
                setMyChatrooms(orderedChatrooms)
            } else {
                let orderedChatrooms = props.chatrooms.filter(room => room.client.id === props.user.client.id)
                orderedChatrooms.sort((a,b) => moment(a.updated_at) - moment(b.updated_at))
                setMyChatrooms(orderedChatrooms)
            }
            
        }
    }

    const findProvider = (room) => {
        if (myChatrooms && props.providers) {
            console.log(props.providers)
            let found = props.providers.find(provider => provider.id === room.provider.id )
            return found
        }
    }

    const findClient = (room) => {
        if (props.clients && props.clients.length > 0 && myChatrooms ) {
            // console.log(props.clients)
            let found = props.clients.find(client => client.id == room.client.id) 
            console.log(found)
            return found
        }
        
    }

    return (
        <div className="room">
            {myChatrooms.map(room => (
                <Link className="cardDiv" to={`/account/messages/${room.id}`}>
                <div>
                <div className="post-author">
                    <div className="clearfix user">
                        <span className="avatar-wrapper">
                            <img width="50" height="50" className="avatar-icon" src={room && props.user.client && findProvider(room) && findClient(room) ? findProvider(room).user.avatar : findClient(room).user.avatar} alt="Author Profile"/>
                        </span>
                        <span className="info-wrapper">
                            <p className="user-info">
                                <span className="user-name">{room && props.user.client && findProvider(room) && findClient(room) ? findProvider(room).user.name : findClient(room).user.name}</span>
                                <br/>
                                <span className="date">{room.provider.specialty}</span>
                            </p>
                        </span>
                    </div>
                </div>
                <div className="recentMessage">{room.messages.sort((a,b) => moment(b.created_at) - moment(a.created_at))[0].content}</div>
                <div className="recentDate">{moment(room.messages.sort((a,b) => moment(b.created_at) - moment(a.created_at))[0].created_at).format("lll")}</div>
                </div>
                </Link>
            ))}
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
      providers: state.providers.providers,
      user: state.users.user,
      chatrooms: state.messages.chatrooms,
      messages: state.messages.messages,
      users: state.users.users,
      clients: state.clients.clients
    }
}
  
const mapDispatchToProps = dispatch => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Room);
  