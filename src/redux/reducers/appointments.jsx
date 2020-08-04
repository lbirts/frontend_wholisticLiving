const { SELECT_SPECIALTY, SELECT_DATETIME, SELECT_PROVIDER, ADD_NOTES, CHANGE_STEPPER, LOAD_APPOINTMENTS, ADD_APPOINTMENTS, DELETE_APPOINTMENT } = require("../actions/actions");

export default function appointments(state={newApp: {}, step: 0}, action) {
    switch(action.type) {
        case SELECT_SPECIALTY:
            return {
                ...state,
                newApp: {...state.newApp, specialty: action.specialty}
            }
        case SELECT_PROVIDER:
            return {
                ...state,
                newApp: {...state.newApp, provider: action.provider}
            }
        case SELECT_DATETIME:
            return {
                ...state,
                newApp: {...state.newApp, date_time: action.date_time}
            }
        case ADD_NOTES:
            return  {
                ...state,
                newApp: {...state.newApp, notes: action.notes}
            }
        case CHANGE_STEPPER:
            return {
                ...state,
                step: action.step
            }
        case LOAD_APPOINTMENTS:
            return {
                ...state,
                appointments: action.appointments
            }
        case ADD_APPOINTMENTS:
            return {
                ...state,
                appointments: [...state.appointments, action.appointment]
            }
        case DELETE_APPOINTMENT:
            return {
                ...state,
                appointments: state.appointments.filter(app => app !== action.appointment)
            }
        default:
            return state
    }
}