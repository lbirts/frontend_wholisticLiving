import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {Grid, Card} from 'semantic-ui-react';
import './care.css';
import {addNotes, changeStepper, AddAppointments} from '../../redux/actions/actions'
import moment from 'moment'

const appointmentsURL = "http://localhost:3000/api/v1/appointments"

function StepFour(props) {
    const [notesValue, setNotesValue] = useState("")

    const handleSelection = (e) => {
        e.preventDefault()
        props.addNotes(notesValue)
        props.changeStepper(props.step + 1)
        fetch(appointmentsURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accepts": "application/json",
              Authorization: `Bearer ${props.user.token}`
            },
            body: JSON.stringify({
                date_time: moment(props.datetime),
                provider_id: props.provider.id,
                client_id: props.user.client.id,
                notes: notesValue,
                status: "Ready"
            })
        })
        .then(res => res.json())
        .then(newApp => {
            props.AddAppointments(newApp.appointment)
        })
    }

    const handleChange = (e) => {
        setNotesValue(e.target.value)
    }

    return ( 
        <Grid className="gridContainer">
         <h2>Notes</h2>
        <form onSubmit={handleSelection} className="notes">
            <textarea className="changeText" onChange={handleChange} name="notes" type="text" value={notesValue}></textarea>
            <input className="submt" type="submit"></input>
        </form>
        </Grid> 
    );
}
 
const mapStateToProps = (state) => {
    return {
        user: state.users.user,
      providers: state.providers.providers,
      specialties: state.providers.specialties,
      step: state.appointments.step,
      datetime: state.appointments.newApp.date_time,
      provider: state.appointments.newApp.provider,
      notes: state.appointments.newApp.notes,
      specialty: state.appointments.newApp.specialty
    }
}

const mapDispatchToProps = dispatch => ({
    addNotes: notes => dispatch(addNotes(notes)),
    changeStepper: step => dispatch(changeStepper(step)),
    AddAppointments: appointment => dispatch(AddAppointments(appointment))
  });

export default connect(mapStateToProps, mapDispatchToProps)(StepFour);