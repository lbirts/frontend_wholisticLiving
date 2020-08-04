import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {Grid, Card} from 'semantic-ui-react';
import './care.css';
import {selectProvider, selectDatetime, addNotes, changeStepper, selectSpecialty} from '../../redux/actions/actions'
import Caret from '../../assets/caretIcon'

function StepTwo(props) {
    const [providers, setProviders] = useState([])
    
    useEffect(() => {
        findProviders()
    }, [props.specialty])

    const handleSelection = (provider) => {
        props.selectProvider(provider)
        props.changeStepper(props.step + 1)
    }

    const findProviders = () => {
        let providers = props.providers.filter(provider => provider.specialty === props.specialty)
        setProviders(providers)
    }

    return ( 
        <Grid className="gridContainer">
         <h2>{props.specialty} Practitioners</h2>
            {providers ? providers.map(provider => (
                <Grid.Row columns={1} verticalAlign="middle" centered={true} className="card">
                    <Grid.Column stretched width={16}>
                    <Card className="care">
                        <Card.Content>
                            <div className="cardImg">
                                <img className="careImg" width="50" height="50" src={provider.user.avatar} alt="Profile Pic"/>
                            </div>
                            <div style={{marginLeft: "100px"}} className="careCard">
                                <div className="careTitle">{provider.user.name}</div>
                                <div className="cardSpecialty">{provider.specialty}</div>
                            </div>
                            <div className="availability"><strong>Next Availability: </strong> Monday, August 3rd</div>
                        </Card.Content>
                        <Card.Content onClick={() => {handleSelection(provider)}} className="extraCare" as="a" extra>
                        <strong>View profile and availability</strong>
                        <Caret className="extraCaret"/>
                        </Card.Content>
                    </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(StepTwo);
