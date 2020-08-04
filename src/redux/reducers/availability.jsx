const { LOAD_AVAILABILITY } = require("../actions/actions");

export default function availability(state=[], action) {
    switch(action.type) {
        case LOAD_AVAILABILITY:
            return action.availability
        default:
            return state
    }
}