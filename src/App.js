import React, {Component} from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { connect } from 'react-redux'
import Home from './Containers/home'
import Login from './Components/auth/login'
import Dashboard from './Components/dashboard'
import SearchRemedy from './Components/searchremedies'
import Navbar from './Containers/navbar/navbar'
import './App.css';
import {SkipNavLink} from '@reach/skip-nav'
import "@reach/skip-nav/styles.css";
import { loadClients, loadChatRooms, loadMessages, loadCategories, loadProviders, loadSpecialties, loadPosts, loadUsers, loadComments, loadAvailability, loadAppointments } from './redux/actions/actions'
import PrivateRoute from './Routes/privateroute'
import PublicRoute from './Routes/publicroute'
import Care from './Containers/care'
import Community from './Containers/community'
import Post from './Components/community_board/post'
import Comm from './Components/community_board/comm'
import MyAppointments from './Containers/myappointments';
import VideoCall from './Components/videocall'
import Herb from './Components/herb'
import Room from './Components/room'
import Message from './Components/message'

const categoriesURL = "http://localhost:3000/api/v1/categories"
const usersURL = "http://localhost:3000/api/v1/users"
const providersURL = "http://localhost:3000/api/v1/providers"
const postsURL = "http://localhost:3000/api/v1/posts"
const commentsURL = "http://localhost:3000/api/v1/comments"
const availabilityURL = "http://localhost:3000/api/v1/availabilities"
const appointmentsURL = "http://localhost:3000/api/v1/appointments"
const chatroomsURL = "http://localhost:3000/api/v1/chatrooms"
const messagesURL = "http://localhost:3000/api/v1/messages"
const clientsURL = "http://localhost:3000/api/v1/clients"

class App extends Component {

  componentDidMount() {
    this.getCategories()
    this.getProviders()
    this.getPosts()
    this.getUsers()
    this.getClients()

  }

  componentDidUpdate() {
    if (this.props.user) {
      this.getComments()
      this.getAvailability()
      this.getAppointments()
      this.getChatRooms()
      this.getMessages()
    }
  }

  getCategories() {
    fetch(categoriesURL)
    .then(res => res.json())
    .then(categories => {
      this.props.loadCategories(categories)
    })
  }

  getProviders() {
    fetch(providersURL)
    .then(res => res.json())
    .then(providers => {
      let specialties = []
      this.props.loadProviders(providers)
      providers.map(provider => (
        !specialties.includes(provider.specialty) ? specialties = [...specialties, provider.specialty] : null
      ))
      this.props.loadSpecialties(specialties)
    })
  }

  getClients() {
    fetch(clientsURL)
    .then(res => res.json())
    .then(clients => {
      this.props.loadClients(clients)
    })
  }

  getPosts() {
    fetch(postsURL)
    .then(res => res.json())
    .then(posts => {
      this.props.loadPosts(posts)
    })
  }

  getUsers() {
    fetch(usersURL)
    .then(res => res.json())
    .then(users => {
      this.props.loadUsers(users)
    })
  }

  getComments() {
    fetch(commentsURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
    .then(res => res.json())
    .then(comments => {
      this.props.loadComments(comments)
    })
  }

  getAvailability() {
    fetch(availabilityURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
    .then(res => res.json())
    .then(availability => {
      this.props.loadAvailability(availability)
    })
  }

  getAppointments() {
    fetch(appointmentsURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
    .then(res => res.json())
    .then(appointments => {
      this.props.loadAppointments(appointments)
    })
  }

  getChatRooms() {
    fetch(chatroomsURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
    .then(res => res.json())
    .then(chatrooms => {
      this.props.loadChatRooms(chatrooms)
    })
  }

  getMessages() {
    fetch(messagesURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
    .then(res => res.json())
    .then(messages => {
      this.props.loadMessages(messages)
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          {/* <Switch> */}
            <SkipNavLink/>
            <Navbar/>
            <PublicRoute restricted={false} exact path="/" component={() => <Home/>}/>
            <PublicRoute restricted={false} exact path="/remedy-finder" component={() => <SearchRemedy/>}/>
            <PublicRoute restricted={false} exact path="/login" component={() => <Login/>}/>
            <PublicRoute restricted={false} exact path="/herbs/:id" component={() => <Herb/>}/>
            <PrivateRoute exact path='/dashboard' component={() => <Dashboard/>}/>
            <PrivateRoute path="/care" component={() => <Care/>}/>
            <PublicRoute exact path="/community" component={() => <Community/>}/>
            <PrivateRoute path="/community/:id" component={() => <Comm/>}/>
            <PrivateRoute path="/account/appointments" component={() => <MyAppointments/>}/>
            <PrivateRoute path="/launch/appt/:id" component={() => <VideoCall/>}/>
            <PrivateRoute path="/posts/:id" component={() => <Post/>}/>
            <PrivateRoute exact path="/account/messages" component={() => <Room/>}/>
            <PrivateRoute path="/account/messages/:id" component={() => <Message/>}/>
            {/* <PrivateRoute path="/posts/create" component={() => <h1>Create</h1>}/>
            <PrivateRoute exact path='/account' component={() => <Account/>}/>
            <PrivateRoute path="/account/care-team" component={() => <CareTeam/>}/>
            <PrivateRoute path="/account/posts" component={() => <MyPosts/>}/> */}
          {/* </Switch> */}
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    providers: state.providers,
    user: state.users.user
  }
}

const mapDispatchToProps = dispatch => ({
  loadCategories: categories => dispatch(loadCategories(categories)),
  loadProviders: providers => dispatch(loadProviders(providers)),
  loadSpecialties: specialties => dispatch(loadSpecialties(specialties)),
  loadPosts: posts => dispatch(loadPosts(posts)),
  loadUsers: users => dispatch(loadUsers(users)),
  loadComments: comments => dispatch(loadComments(comments)),
  loadAvailability: availability => dispatch(loadAvailability(availability)),
  loadAppointments: appointments => dispatch(loadAppointments(appointments)),
  loadMessages: messages => dispatch(loadMessages(messages)),
  loadChatRooms: chatrooms => dispatch(loadChatRooms(chatrooms)),
  loadClients: clients => dispatch(loadClients(clients))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
