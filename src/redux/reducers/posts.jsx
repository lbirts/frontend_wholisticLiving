const { LOAD_POSTS, CHOOSE_POST } = require("../actions/actions");

export default function posts(state={posts: []}, action) {
    switch(action.type) {
        case LOAD_POSTS:
            return {
                ...state,
                posts: action.posts
            }
        case CHOOSE_POST:
            return {
                ...state,
                post: action.post
            }
        default:
            return state
    }
}