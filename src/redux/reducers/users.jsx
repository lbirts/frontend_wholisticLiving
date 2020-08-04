import { LOGIN_USER, LOGOUT_USER, SIGNUP_USER, LOAD_USERS} from '../actions/actions';

const initialState = {
    user: JSON.parse(localStorage.getItem("user"))
}
export default function users(state=initialState, action) {
    switch(action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user: action.user
            }
        case SIGNUP_USER:
            return {
                ...state,
                user: action.user
            }
        case LOGOUT_USER:
            return initialState;
        case LOAD_USERS:
            return {
                ...state,
                users: action.users
            }
        default:
            return state;
    }
}