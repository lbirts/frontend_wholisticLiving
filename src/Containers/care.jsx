import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Grid, Message} from 'semantic-ui-react'
import '../Components/find_providers/care.css'
import {Link} from 'react-router-dom'

import StepOne from '../Components/find_providers/step_one'
import StepTwo from '../Components/find_providers/step_two'
import StepThree from '../Components/find_providers/step_three'
import StepFour from '../Components/find_providers/step_four'
import { connect } from 'react-redux';
import {selectProvider, selectDatetime, addNotes, changeStepper, selectSpecialty} from '../redux/actions/actions'


function getSteps() {
    return ['Search a topic', 'Choose a practioner', 'Schedule your appointment', 'Add notes'];
}
  
function getStepContent(step) {
    switch (step) {
      case 0:
        return <StepOne/>
      case 1:
        return <StepTwo/>
      case 2:
        return <StepThree/>
      case 3:
        return <StepFour/>
      default:
        return "Unknown Step"
    }
}

function Care(props) {
    // const [activeStep, setActiveStep] = React.useState(props.step);
    const [skipped, setSkipped] = React.useState(new Set());
    const [warningMessage, setWarningMessage] = React.useState("")
    const [hideAlert, setHideAlert] = React.useState(true)
    const steps = getSteps();
    
    const message = () => {
      if (!props.specialty) {
        setWarningMessage("Please select a specialty")
        setHideAlert(false)
        setTimeout(() => {
          setHideAlert(true)
        }, 2000);
      } 
      else if (!props.provider) {
        setWarningMessage("Please select a provider")
        setHideAlert(false)
        setTimeout(() => {
          setHideAlert(true)
        }, 2000);
      } 
      else if (!props.datetime) {
        setWarningMessage("Please select an appointment time")
        setHideAlert(false)
        setTimeout(() => {
          setHideAlert(true)
        }, 2000);
      }
    }

    const isStepOptional = (step) => {
        return step === 3;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        if (!props.specialty || !props.datetime || !props.provider) {
          message()
        } else {
          let newSkipped = skipped;
        if (isStepSkipped(props.step)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(props.step);
        }

        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
        props.changeStepper(props.step + 1);
        setSkipped(newSkipped);
        }
    };

    const handleBack = () => {
        // setActiveStep((prevActiveStep) => prevActiveStep - 1);
        props.changeStepper(props.step - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(props.step)) {
          // You probably want to guard against something like this,
          // it should never occur unless someone's actively trying to break something.
          throw new Error("You can't skip a step that isn't optional.");
        }
        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
        props.changeStepper(props.step + 1);
        setSkipped((prevSkipped) => {
          const newSkipped = new Set(prevSkipped.values());
          newSkipped.add(props.step);
          return newSkipped;
        });
    };

    return ( 
        <div className="step-container">
              <Message hidden={hideAlert} floating={true} warning>
                <Message.Header>{warningMessage}</Message.Header>
              </Message>
             <Stepper activeStep={props.step}>
                {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                    labelProps.optional = <Typography variant="caption">Optional</Typography>;
                }
                if (isStepSkipped(index)) {
                    stepProps.completed = false;
                }
                return (
                    <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
                })}
            </Stepper>
        {props.step === steps.length ? (
          <div>
            <Typography className="success">
              Your appointment has been successfully booked! Click <Link to="/launch/appt/21">here </Link>to launch your video appointment
            </Typography>
          </div>
        ) : (
          <Grid className="container-content">
            <Grid.Row className="page-content">{getStepContent(props.step)}</Grid.Row>
            <Grid.Row className="step-content">
              <Button disabled={props.step === 0} onClick={handleBack}>
                Back
              </Button>
              {isStepOptional(props.step) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                >
                  Skip
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {props.step === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Grid.Row>
          </Grid>
        )}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Care)