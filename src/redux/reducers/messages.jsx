const { LOAD_MESSAGES, LOAD_CHATROOMS, ADD_CHATROOM, ADD_MESSAGE } = require("../actions/actions");

export default function messages(state={}, action) {
    switch(action.type) {
        case LOAD_MESSAGES:
            return {
                ...state,
                messages: action.messages
            }
        case LOAD_CHATROOMS: 
            return {
                ...state,
                chatrooms: action.chatrooms
            }
        case ADD_CHATROOM:
            return {
                ...state,
                chatrooms: [...state.chatrooms, action.chatroom]
            }
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.message]
            }
        default:
            return state
    }
}