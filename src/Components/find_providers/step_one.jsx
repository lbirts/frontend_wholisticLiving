import React from 'react';
import { connect } from 'react-redux';
import {Grid} from 'semantic-ui-react';
import './care.css';
import {selectProvider, selectDatetime, addNotes, changeStepper, selectSpecialty} from '../../redux/actions/actions'

function StepOne(props) {
    
    const handleSelection = (specialty) => {
        props.selectSpecialty(specialty)
        props.changeStepper(props.step + 1)
    }

    return ( 
        <Grid className="gridContainer">
            <h2>Specialties</h2>
            {props.specialties ? props.specialties.map(specialty => (
                <Grid.Row columns={1} verticalAlign="middle" centered={true} className="card">
                    <Grid.Column stretched width={16}>
                    <button
                        type="button"
                        role="link"
                        tabIndex="0"
                        onClick={() => handleSelection(specialty)}
                        className="cardLink"
                    >
                        <div className="cardContainer">
                            <div className="cardImg">
                                <img width="50" height="50" src="https://caregiversbywholecare.com/wp-content/uploads/2018/10/Mental-Health-300x300.jpg" alt={specialty}/>
                            </div>
                            <div className="cardDetails">
                                <div className="cardTitle">{specialty}</div>
                            </div>
                        </div>
                    </button>
                    </Grid.Column>
                </Grid.Row>
            )) : null}
        </Grid> 
    );
}
 
const mapStateToProps = (state) => {
    return {
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
    selectProvider: provider => dispatch(selectProvider(provider)),
    selectDatetime: datetime => dispatch(selectDatetime(datetime)),
    addNotes: notes => dispatch(addNotes(notes)),
    changeStepper: step => dispatch(changeStepper(step)),
    selectSpecialty: specialty => dispatch(selectSpecialty(specialty))
  });

export default connect(mapStateToProps, mapDispatchToProps)(StepOne);
