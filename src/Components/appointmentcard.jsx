import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Caret from '../assets/caretIcon'
import ToolTip from '../assets/tooltip'
import Calendar from '../assets/calendar'
import Clock from '../assets/clock'
import EditPencil from '../assets/edit-pencil'
import CancelCross from '../assets/cancelCross'
import {Link} from 'react-router-dom';
import { deleteAppointment, AddAppointments } from '../redux/actions/actions'
import './appointment.css'


const appointmentStatusUI = (app) => {
    switch (app.status) {
        case 'Cancelled':
            return (
                <div className="cancelledDiv">
                    <div className="red">
                        <h5>Cancelled appointment</h5>
                    </div>
                    <div>Cancelled on {app.updated_at}</div>
                </div>
            )
        case 'Ready':
            return (
                <></>
            )
        case 'Completed': 
            return (
                <div className="postNoteDiv">
						<h5>Post appointment note</h5>
						{app.post_notes ? (
							<div>
								<p>{app.post_notes}</p>
								<div className="messageProviderDiv">
									<Link>Message Provider<Caret/></Link>
								</div>
							</div>
						) : (
							<div>
								<div>None provided.</div>
								<div className="messageProviderDiv">
                                    <Link to='/account/messages'>Message Provider<Caret/></Link>
								</div>
							</div>
						)}
					</div>
            )
        default:
            return (
                <div className="postNoteDiv noBorder">
                    <div className="greyBox">
                        <div className="lightBulb">
                            <ToolTip/>
                        </div>
                        <div className="lineHeight">
                            The launch button on the left will become active 5 minutes before your appointment. Make sure you have
                            strong Wi-FI and are using a supported device.
                        </div>
                    </div>
                </div>
            )
    }
}

function AppointmentCard(props) {
    const [currentAppointment, setCurrentAppointment] = useState(props.app)
    const [countdown, setCountdown] = useState(undefined)
    const [appointmentStatus, setAppointmentStatus] = useState(props.app.status)
    const [provider, setProvider] = useState(undefined)
    const [button, setButton] = useState({path: '', text: ''})
    const [client, setClient] = useState(undefined)

    useEffect(() => {
		switch (appointmentStatus) {
			case 'Cancelled':
				setButton({
					path: '/care',
					text: 'Reschedule'
				})
				break

			case 'Ready':
				setButton({
					path: `/launch?appt/${currentAppointment.id}`,
					text: 'Launch'
				})
				break

			case 'Completed':
				setButton({
					path: '/care',
					text: 'Book followup'
				})
				break

			default:
				setButton({
					path: `/launch?appt/${currentAppointment.id}`,
					text: 'Launch'
				})
		}
	}, [appointmentStatus, currentAppointment.id])


    // --- CONVERTS DATE FOR A CANCELLED APPOINTMENT ::
	const cancelledDateUtc = moment.utc(currentAppointment.updated_at).toDate()
	const cancelledDate = moment
		.utc(cancelledDateUtc)
		.local()
		.format('dddd, MM/DD/YY h:mm A')

	// ----CONVERTS APPOINTMENT START & END TIME INTO LOCAL TIME ::
	const utcScheduledStart = moment.utc(currentAppointment.date_time).toDate()
    const appointmentStartLocal = moment.utc(utcScheduledStart).local()
   
	const utcScheduledEnd = moment.utc(currentAppointment.date_time).add(30, 'minutes').toDate()
    const appointmentEndLocal = moment.utc(utcScheduledEnd).local()
	// ------
	// ------ FOR DISPLAYING THE 'DATE' OF THE APPOINTMENT ::
	const appointmentDate = appointmentStartLocal.format('dddd, MMMM Do ')
	// ------
	// ------SEPARATING APPOINTMENT START TIME LOCAL AND END TIME LOCAL FOR DISPLAYING/STYLING
	const appointmentStartTime = appointmentStartLocal.format('h:mm A')
	const appointmentEndTime = appointmentEndLocal.format('h:mm A')
	// -----------

    const getLocalTime = () => moment.utc().local()
    
    const findProvider = () => {
        if (props.providers) {
            let provider = props.providers.find(provider => provider.id === props.app.provider.id)
            setProvider(provider)
        }
    }

    const findClient = () => {
        if (props.clients) {
            let client = props.clients.find(client => client.id === props.app.client.id)
            setClient(client)
        }
    }

    useEffect(() => {
        findProvider()
        findClient()
    }, [props.appointments])

    useEffect(() => {
        let timer
        const updateStatus = () => {
            if (appointmentStatus === "Cancelled") {
                clearInterval(timer)
                return
            }
            const startSub = appointmentStartLocal.diff(moment())
            const startDuration = moment.duration(startSub)
            let minutesLeftAppointmentStart = 0
            if (startDuration > 86400000) {
                minutesLeftAppointmentStart = Math.floor(startDuration.asDays())
            } else if (startDuration < 86400000 && startDuration > 3600000) {
                minutesLeftAppointmentStart = Math.floor(startDuration.asHours())
            } else {
                minutesLeftAppointmentStart = Math.floor(startDuration.asMinutes())
            }
            const minutesLeftAppointmentEnd = appointmentEndLocal.diff(getLocalTime(), 'minutes')
            if (startDuration !== countdown && startDuration >= 0) {
                setCountdown(startDuration)
            }

			if (startDuration < 0 && minutesLeftAppointmentEnd <= 0) {
                props.deleteAppointment(currentAppointment)
                setCurrentAppointment({...currentAppointment, status: "Completed"})
				props.AddAppointments(currentAppointment)
				clearInterval(timer)
			}
        }
        timer = setInterval(updateStatus, 60000)
        updateStatus()
        return () => clearInterval(timer)
    }, [appointmentStartLocal, appointmentStatus, countdown])

    return ( 
        <div className="mainWrapper">
            <article role="region">
                    <div className="cardDiv">
                        <div className="cancelDiv">
                        <button><CancelCross/>Cancel Appointment</button>
                        </div>
                        <div className="cardLeft">
                            <div className="metaContainer">
                                {props.user.provider === null && provider && client ? 
                                    <div className="avatarNameVertical">
                                        <img alt="" src={provider ? provider.user.avatar : null} width="100"/> 
                                        <div className="nameVertical">
                                            <h4 className="center">{provider ? provider.user.name : null}</h4>
                                            <p className="spec">{provider ? provider.specialty : null}</p>
                                        </div>
                                    </div>
                                : <div className="avatarNameVertical">
                                        <img alt="" src={client ? client.user.avatar : null} width="100"/> 
                                        <div className="nameVertical">
                                            <h4 className="center">{client ? client.user.name : null}</h4>
                                        </div>
                                    </div>}
                                <div className="dateTime">
                                    <div className="date">
                                        <Calendar/>
                                        <div className="dateShift">{moment(currentAppointment.date_time).format('LL')}</div>
                                    </div>
                                    <div className="time">
                                        <Clock/>
                                        <div className="dateShift">{appointmentStartTime} - {appointmentEndTime}</div>
                                    </div>
                                </div>
                                <div className="buttonDiv">
                                    {appointmentStatusUI(currentAppointment)}
                                    <Link to={button.path}><button disabled={countdown > 5}>{button.text}</button></Link>
                                    {appointmentStatus === "Ready" && countdown ? 
                                    <p>
                                        Begins in {countdown > 86400000 ? Math.floor(countdown.asDays()) : Math.floor(countdown.asMinutes())} {countdown > 86400000 ? "days" : "minutes"}
                                    </p>
                                    : null}

                                    {appointmentStatus === "Ready" && countdown < 0 ? 
                                    <p>
                                        Began in {Math.abs(countdown)} minute{Math.abs(countdown) > 1 && 's'} ago
                                    </p>
                                    : null}
                                </div>
                            </div>
                        </div>
                        <div className="cardRight">
                                <div className="preNoteDiv">
                                    <h5>Appointment Notes</h5>
                                        {currentAppointment.notes !== "" ? 
                                        <p>{currentAppointment.notes}</p> : <p>None Provided</p>}
                                </div>
                                {currentAppointment.status === "Ready" ? 
                                <div className="editCancelDiv">
                                    <div className="editDiv">
                                    <button><EditPencil/>{currentAppointment.notes !== "" ? "Edit Note" : "Add Note"}</button>
                                    </div>
                                </div> : null}
                        </div>
                    </div>
            </article>
        </div> 
    );

}
 
const mapStateToProps = (state) => {
  return {
    appointments: state.appointments.appointments,
    user: state.users.user,
    providers: state.providers.providers,
    clients: state.clients.clients
  }
}

const mapDispatchToProps = dispatch => ({
    AddAppointments: app => dispatch(AddAppointments(app)),
    deleteAppointment: app => dispatch(deleteAppointment(app))  
});

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentCard);