import React, { Component } from 'react';
import dashPic from '../assets/template.png'
import './home.css'
class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <img className="coverpic" src={dashPic}/>
                <div className="square">
                    <div className="line"></div>
                    <p>You have ten places to be, and a waiting room isn't one of them</p>
                </div>
                <div className="circle">
                    <p>"holLife is a godsend for busy, working people who lack access to traditional healthcare"</p>
                </div>
            </div> 
        );
    }
}
 
export default Home;