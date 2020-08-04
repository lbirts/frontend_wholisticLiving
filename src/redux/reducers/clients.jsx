const { LOAD_CLIENTS } = require("../actions/actions");

export default function clients(state={}, action) {
    switch(action.type) {
        case LOAD_CLIENTS:
            return {
                ...state,
                clients: action.clients
            }
        default:
            return state
    }
}