import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupUser } from '../../redux/actions/actions'

import './auth.css'

const signupURL = "http://localhost:3000/api/v1/signup";

class Signup extends Component {

    state = {
        classList: "cont",
        showSignup: "true",
        email: "",
        password: ""
    }

    signUp = () => {
        // console.log(this.state)
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }
        fetch(signupURL, options)
        .then(res => res.json())
        .then(userInfo => {
            localStorage.token = userInfo.jwt
            localStorage.setItem("user", JSON.stringify({...userInfo.user, token: userInfo.jwt}))
            this.props.dispatch(signupUser({...userInfo.user, token: userInfo.jwt}))
            this.setState({email: "", password: ""})
        })
    }  
    
    handleSwitch = () => {
        console.log(this.state.classList)
        this.state.classList === "cont" ? this.setState({classList: "cont s--signup"}) : this.setState({classList: "cont"})
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() { 
        return ( 
            <div className={this.state.classList}>
            <div className="form sign-in">
                <h2>Welcome back</h2>
                <label htmlFor="email">
                <span>Email</span>
                <input onChange={this.handleChange} name="email" value={this.state.email} type="email" />
                </label>
                <label htmlFor="password">
                <span>Password</span>
                <input onChange={this.handleChange} name="password" value={this.state.password} type="password" />
                </label>
                <p tabIndex="0" className="forgot-pass">Forgot password?</p>
                <h5 tabIndex="0" className="mobile-switch" onClick={this.handleSwitch}>Don't have an account?</h5>
                <button tabIndex="0" aria-label="Signin" className="submit">Sign In</button>
                <button tabIndex="0" aria-label="Signin with Google" className="gg-btn">Connect with <span>Google</span></button>
            </div>
            <div className="sub-cont">
                <div className="img">
                <div className="img__text m--up">
                    <h2>New here?</h2>
                    <p>Sign up and discover great amount of new opportunities!</p>
                </div>
                <div className="img__text m--in">
                    <h2>One of us?</h2>
                    <p>If you already has an account, just sign in. We've missed you!</p>
                </div>
                <div onClick={this.handleSwitch} className="img__btn">
                    <span className="m--up">Sign Up</span>
                    <span className="m--in">Sign In</span>
                </div>
                </div>
                <div className="form sign-up" >
                <h2>Time to feel like home,</h2>
                <label>
                    <span>Name</span>
                    <input type="text" />
                </label>
                <label>
                    <span>Email</span>
                    <input type="email" />
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" />
                </label>
                <h5 className="mobile-switch" onClick={this.handleSwitch}>Already Registered?</h5>
                <button onClick={this.signUp} tabIndex="0" aria-label="Signup" type="button" className="submit">Sign Up</button>
                <button tabIndex="0" aria-label="Signup with Google" type="button" className="gg-btn">Join with <span>Google</span></button>
                </div>
            </div>
            </div>
         );
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.user
    }
}
  
export default connect(mapStateToProps)(Signup);