const { LOAD_PROVIDERS, LOAD_SPECIALTIES } = require("../actions/actions");

export default function providers(state={}, action) {
    switch(action.type) {
        case LOAD_PROVIDERS:
            return {
                ...state,
                providers: action.providers
            }
        case LOAD_SPECIALTIES:
            return {
                ...state,
                specialties: action.specialties
            }
        default:
            return state
    }
}