const { LOAD_CATEGORIES } = require("../actions/actions");

export default function categories(state=[], action) {
    switch(action.type) {
        case LOAD_CATEGORIES:
            return action.categories
        default:
            return state
    }
}