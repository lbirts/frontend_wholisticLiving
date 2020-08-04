const { LOAD_COMMENTS, ADD_COMMENT } = require("../actions/actions");

export default function comments(state={}, action) {
    switch(action.type) {
        case LOAD_COMMENTS:
            return {...state,
                comments: action.comments
            }
        case ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.comment]
            }
        default:
            return state
    }
}