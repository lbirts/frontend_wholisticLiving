import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import AppointmentCard from '../Components/appointmentcard'
import ToolTip from '../assets/tooltip'
import {Link} from 'react-router-dom'
import { set } from 'lodash';

let past;
let upcoming;
let all;

const findAppointments = (props) => {
    if (props.appointments) {
        let orderedAppointments = props.appointments.filter(app => app.client.id === props.user.client.id)
        orderedAppointments.sort((a,b) => moment(a.date_time) - moment(b.date_time))
        all = orderedAppointments
        past = orderedAppointments.filter(app => app.status === "Completed")
        upcoming = orderedAppointments.filter(app=> app.status === "Ready")
    }
   
}  

function MyAppointments(props) {
    const [myAppointments, setMyAppointments] = useState(undefined)
    const [pastAppointments, setPastAppointments] = useState(undefined)
    const [upcomingAppointments, setUpcomingAppointments] = useState([])
    const [sort, setSort] = useState("")
    const [loaded, setLoaded] = useState(false)

    const a = 1
    useEffect(() => {
        findAppointments(props)
        setLoaded(true)
    }, [])

    useEffect(() => {
        settingAppointments()
        
    },[loaded])


    const settingAppointments = () => {
        setSort("Upcoming")
        setPastAppointments(past)
        setUpcomingAppointments(upcoming)
        setMyAppointments(all)
        
    }

    const handleSwitch = () => {
        if (sort === "Upcoming") {
            setSort("Past")
        } else {
            setSort("Upcoming")
        }
    }

    return ( 
        loaded ?
        <div className="mainWrapper">
            <div className="listContainer" aria-live="polite" role="main">
                {sort === "Upcoming" ? 
                upcomingAppointments.length > 0 ? 
                    <>
                        <button onClick={() => handleSwitch()} className={sort === "Upcoming" ? "switch on" : "switch"}>Upcoming</button>
                        <button onClick={() => handleSwitch()} className={sort === "Past" ? "switch switch2 on" : "switch switch2"}>Past</button>
                        <div className="border"></div>
                        <div className="toolTipDiv">
                            <div className="greyBox">
                                <div className="lightBulb">
                                    <ToolTip/>
                                </div>
                                <div className="lineHeight">
                                    Make sure you have strong Wi-Fi and are using a supported
                                    device before clicking the launch appointment button.
                                </div>
                            </div>
                        </div>
                        {upcomingAppointments.map(app => {
                            return <AppointmentCard app={app}/>
                        })} 
                    </>
                :   
                <>
                    <button onClick={() => handleSwitch()} className={sort === "Upcoming" ? "switch on" : "switch"}>Upcoming</button>
                    <button onClick={() => handleSwitch()} className={sort === "Past" ? "switch switch2 on" : "switch"}>Past</button>
                    <div className="border"></div>
                    <div className="no-appts">
                        <h1>You don't have any upcoming appointments</h1>
                        <p>Appointments will appear here once you've booked</p>
                        <Link to="/care"><button>Book an appointment</button></Link>
                    </div>
                </>
                :
                pastAppointments.length > 0 ? 
                    <>
                        <button onClick={() => handleSwitch()} className={sort === "Upcoming" ? "switch on" : "switch"}>Upcoming</button>
                        <button onClick={() => handleSwitch()} className={sort === "Past" ? "switch switch2 on" : "switch switch2"}>Past</button>
                        <div className="border"></div>
                        <div className="toolTipDiv">
                            <div className="greyBox">
                                <div className="lightBulb">
                                    <ToolTip/>
                                </div>
                                <div className="lineHeight">
                                    Make sure you have strong Wi-Fi and are using a supported
                                    device before clicking the launch appointment button.
                                </div>
                            </div>
                        </div>
                        {pastAppointments.map(app => {
                            return <AppointmentCard app={app}/>
                        })} 
                    </>
                :   
                <>
                    <button onClick={() => handleSwitch()} className={sort === "Upcoming" ? "switch on" : "switch"}>Upcoming</button>
                    <button onClick={() => handleSwitch()} className={sort === "Past" ? "switch switch2 on" : "switch"}>Past</button>
                    <div className="border"></div>
                    <div className="no-appts">
                        <h1>You don't have any previous appointments</h1>
                        <p>Once your appointments are completed you can see them here and access notes from your practitioner.</p>
                        <Link to="/care"><button>Book an appointment</button></Link>
                    </div>
                </>
                }
            </div>
        </div> 
        :
        null
    );

}
 
const mapStateToProps = (state) => {
  return {
    appointments: state.appointments.appointments,
    user: state.users.user
  }
}

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAppointments);
