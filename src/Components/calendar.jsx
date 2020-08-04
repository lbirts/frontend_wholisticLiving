import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import { groupBy, isEmpty } from 'lodash'

import { practitionerType } from 'types'

import Arrow from '../assets/arrow'

class Calendar extends Component {
	state = {
		initialLoad: true,
		datesOfWeek: [],
		selectedDate: {},
		timeSlots: {}
	}

	componentDidMount() {
		this.initCalendar()
	}

	// TODO - NIX PLZ
	componentDidUpdate(prevProps, prevState) {
		const { selectedDate } = this.state

		if (prevState.selectedDate !== selectedDate) {
			// eslint-disable-next-line
			this.setState({
				initialLoad: false
			})
		}
	}

	groupTimeSlotsByHour = day => {
		const { events } = this.props
		const eventsInDay = events[moment(day).format('L')]

		return groupBy(eventsInDay, num => {
			return moment(num.start)
				.local()
				.format('h a')
		})
	}

	dateOnClickHandler = day => {
		const { practitioner } = this.props
		const timeSlots = this.groupTimeSlotsByHour(day)

		this.setState({
			timeSlots,
			selectedDate: day
		})

		// sendEvt({
		// 	event_name: 'web_book_choose_day',
		// 	practitioner_id: practitioner.id
		// })
	}

	leftArrowOnClickHandler = date => {
		const nextDay = moment(date)
			.clone()
			.subtract(1, 'd')
		const timeSlots = this.groupTimeSlotsByHour(nextDay)

		this.setState({
			selectedDate: nextDay,
			timeSlots
		})
	}

	rightArrowOnClickHandler = date => {
		const nextDay = moment(date)
			.clone()
			.add(1, 'd')
		const timeSlots = this.groupTimeSlotsByHour(nextDay)

		this.setState({
			selectedDate: nextDay,
			timeSlots
		})
	}

	initCalendar() {
		const startOfWeek = moment()
		const endOfWeek = moment().add(6, 'day')

		const days = []
		let day = startOfWeek

		while (day <= endOfWeek) {
			days.push(day)
			day = day.clone().add(1, 'd')
		}

		this.setState({
			datesOfWeek: days,
			startOfWeek,
			endOfWeek
		})
	}

	render() {
		const { datesOfWeek, timeSlots, selectedDate, initialLoad, endOfWeek, startOfWeek } = this.state
		const { events, isOnboarding, nextAvailability, product, practitioner, className } = this.props

		const displayDate = !isEmpty(selectedDate) ? selectedDate : nextAvailability
		const firstAvailability = moment(nextAvailability)
		const selectedDATE = isEmpty(selectedDate) ? firstAvailability : moment(selectedDate)

		const renderWeek = datesOfWeek.map((date, i) => {
			const hasEvent = Object.keys(events).includes(datesOfWeek[i].format('L'))

			return (
				<div className="day-of-week" key={date}>
					<div className="header-day">{date.format('ddd')}</div>
					<Button
						className={`day ${!hasEvent ? 'unavailable ' : ''}${
							(initialLoad && moment(date).isSame(firstAvailability, 'day')) ||
							(!initialLoad && moment(date).isSame(selectedDATE, 'day'))
								? 'selected '
								: ''
						}`}
						focusVisibleClassName="focus-visible"
						onClick={() => this.dateOnClickHandler(date)}
						aria-label={`${date.format('dddd D')} ${!hasEvent ? 'unavailable ' : ''}`}
					>
						{date.format('D')}
					</Button>
				</div>
			)
		})

		const renderSlot = timeslotObj =>
			timeslotObj.map(slot => {
				const ts = moment(slot.start).format('h:mm a')
				return (
					<li key={ts} className="slot">
						<Link
							aria-label={ts}
							to={{
								pathname: isOnboarding ? '/onboarding/confirm-appointment' : '/book-appointment',
								state: {
									event: slot,
									isOnboarding,
									product,
									practitioner
								}
							}}
						>
							{ts}
						</Link>
					</li>
				)
			})

		const renderTimeSlots = () => {
			let timeslots = timeSlots
			if (initialLoad) {
				timeslots = !isEmpty(timeSlots) ? timeSlots : this.groupTimeSlotsByHour(nextAvailability)
			}

			return !isEmpty(timeslots) ? (
				Object.keys(timeslots).map(hour => {
					const timeslotObj = timeslots[hour]

					return (
						<ul key={hour} className="hour">
							<li>
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
			<div className={`${styles.Calendar} ${className}`}>
				<div className="calendar-week">{renderWeek}</div>
				<div className="available-times">
					<div className="selected-date">
						{!moment(selectedDATE).isSame(startOfWeek, 'd') && (
							<Button
								focusVisibleClassName="focus-visible"
								aria-label="left-arrow navigate to previous day"
								className="left-arrow"
								onClick={() => this.leftArrowOnClickHandler(selectedDATE)}
							>
								<Arrow name="arrow" />
							</Button>
						)}

						<p>{moment(displayDate).format('dddd, MMMM Do')}</p>

						{!moment(selectedDATE).isSame(endOfWeek, 'd') && (
							<Button
								focusVisibleClassName="focus-visible"
								aria-label="right-arrow navigate to next day"
								className="right-arrow"
								onClick={() => this.rightArrowOnClickHandler(selectedDATE)}
							>
								<Arrow name="arrow" />
							</Button>
						)}
					</div>
					{renderTimeSlots()}
				</div>
			</div>
		)
	}
}

Calendar.defaultProps = {
	className: '',
	events: {},
	isOnboarding: false,
	nextAvailability: ''
}

Calendar.propTypes = {
	className: PropTypes.string,
	events: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	isOnboarding: PropTypes.bool,
	nextAvailability: PropTypes.string,
	practitioner: practitionerType.isRequired,
	product: PropTypes.oneOfType([
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			minutes: PropTypes.number.isRequired,
			practitioner_id: PropTypes.number.isRequired,
			price: PropTypes.string.isRequired
		}),
		PropTypes.array
	]).isRequired
}

export default withRouter(Calendar)