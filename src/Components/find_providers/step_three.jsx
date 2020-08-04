import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {Grid } from 'semantic-ui-react';
import './care.css';
import {selectProvider, selectDatetime, addNotes, changeStepper, selectSpecialty} from '../../redux/actions/actions'
import moment from 'moment'
import { groupBy, isEmpty } from 'lodash';
import Arrow from '../../assets/arrow'
import {Link} from 'react-router-dom'

function StepThree(props) {
    const [startOfWeek, setStartOfWeek] = useState(moment())
    const [endOfWeek, setEndOfWeek] = useState(moment().add(6, "day"))
    const [datesOfWeek, setDatesOfWeek] = useState([])
    const [selectedDay, setSelectedDay] = useState({})
    const [timeSlots, setTimeSlots] = useState([])
    const [firstAvailable, setFirstAvailable] = useState({})

    useEffect(() => {
        let day = moment()
        let datesArray = []
        for (let i = 0; i < 7; i++) {
            datesArray.push(moment(day).add(i, 'days'));
        }
        setDatesOfWeek(datesArray)
        
    }, [])

    // useEffect(() => {
    //     let found = datesOfWeek.find(date => props.availability.some(ava => ava.day.includes(moment(date._d).format('dddd'))))
    //     dateOnClickHandler(found)
    // }, [datesOfWeek])

    const handleSelection = (slot) => {
        // let datetime = datesOfWeek.find(day => day.format("dddd") === slot.format("dddd"))
        let datetime = selectedDay
        datetime.set({h: slot.format("h"), m: slot.format("m")})
        props.selectDatetime(datetime)
        props.changeStepper(props.step + 1)
    }

    const groupTimeSlotsByHour = day => {
        let eventsInDay = []
        const events = props.availability.filter(ava => ava.day === moment(day._d).format('dddd'))
        events.map(event => {
            eventsInDay.push(moment(event.time))
            eventsInDay.push(moment(event.time).add(30, 'minutes'));
        })

        return groupBy(eventsInDay, eventsInDay => {
            return moment(eventsInDay._d)
                .local()
                .format('h a')
        })
	}

    const dateOnClickHandler = day => {
    	const timeSlots = groupTimeSlotsByHour(day)
    
        setTimeSlots(timeSlots);
        setSelectedDay(day)
    }
    
   const leftArrowOnClickHandler = date => {
		const nextDay = moment(date)
			.clone()
			.subtract(1, 'd')
		const timeSlots = groupTimeSlotsByHour(nextDay)
        setTimeSlots(timeSlots);
        setSelectedDay(nextDay)
	}

	const rightArrowOnClickHandler = date => {
		const nextDay = moment(date)
			.clone()
			.add(1, 'd')
		const timeSlots = groupTimeSlotsByHour(nextDay)
        setTimeSlots(timeSlots);
        setSelectedDay(nextDay)
	}


    // const findAvailabilities = (date) => {
    //     let availability = props.availability.map(provider => provider.category.title === props.specialty)
    //     setProviders(providers)
    // }

    const renderWeek = () => {
        // let found = datesOfWeek.find(date => props.availability.some(ava => ava.day.includes(moment(date._d).format('dddd'))))
        datesOfWeek.map((date, i) => {
        const hasAva = props.availability.some(ava => ava.day.includes(moment(date._d).format('dddd')))
        
            return (
                <div className="day-of-week" key={date}>
                    <div className="header-day">{date.format('ddd')}</div>
                    <button
                        className="day"
                        onClick={() => dateOnClickHandler(date)}
                        aria-label={`${date.format('dddd D')} ${!hasAva ? 'unavailable ' : ''}`}
                    >
                        {date.format('D')}
                    </button>
                </div>
            )
        })
    }

    const renderSlot = timeslotObj => {
        return timeslotObj.map(slot => {
            return (
                <li key={slot.format('h:mm a')} className="slot">
                    <button
                        aria-label={slot.format('h:mm a')}
                        onClick={() => {handleSelection(slot)}}
                    >
                        {slot.format('h:mm a')}
                    </button>
                </li>
            )
        })
    }

    const renderTimeSlots = () => {
        let timeslots = timeSlots
        return !isEmpty(timeslots) ? (
            Object.keys(timeslots).map(hour => {
                const timeslotObj = timeslots[hour]

                return (
                    <ul key={hour} className="hour">
                        <li className="timeslot">
                            <h5>{hour}</h5>
                        </li>
                        {renderSlot(timeslotObj)}
                    </ul>
                )
            })
        ) : (
            <div className="no-times">No available times</div>
        )
    }


    return ( 
        <Grid className="gridContainer">
            <Grid.Row>
            <h2 className="gridTitle">Appointment</h2>
            </Grid.Row>
            <Grid.Row>
            <h4>Choose an available slot in the next seven days for a 30-minute video appointment, if none of these times work for you please <Link to="/account/messages">message</Link> me </h4>
            </Grid.Row>
            <Grid.Row>
            <div className="Calendar">
				<div className="calendar-week">{renderWeek()}</div>
				<div className="available-times">
					<div className="selected-date">
						{!moment(selectedDay).isSame(startOfWeek, 'd') && (
							<button
								aria-label="left-arrow navigate to previous day"
								className="left-arrow"
								onClick={() => leftArrowOnClickHandler(selectedDay)}
							>
								<Arrow name="arrow" />
							</button>
						)}

						<p>{moment(selectedDay).format('dddd, MMMM Do')}</p>

						{!moment(selectedDay).isSame(endOfWeek, 'd') && (
							<button
								aria-label="right-arrow navigate to next day"
								className="right-arrow"
								onClick={() => rightArrowOnClickHandler(selectedDay)}
							>
								<Arrow name="arrow" />
							</button>
						)}
					</div>
                    <div className="timeslots">{renderTimeSlots()}</div>
				</div>
			</div>
            </Grid.Row>
           
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
      specialty: state.appointments.newApp.specialty,
      availability: state.availability
    }
}

const mapDispatchToProps = dispatch => ({
    selectProvider: provider => dispatch(selectProvider(provider)),
    selectDatetime: datetime => dispatch(selectDatetime(datetime)),
    addNotes: notes => dispatch(addNotes(notes)),
    changeStepper: step => dispatch(changeStepper(step)),
    selectSpecialty: specialty => dispatch(selectSpecialty(specialty))
  });

export default connect(mapStateToProps, mapDispatchToProps)(StepThree);
