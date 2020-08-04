
import { combineReducers } from 'redux'
import users from './users'
import categories from './categories'
import providers from './providers'
import appointments from './appointments'
import posts from './posts'
import comments from './comments'
import availability from './availability'
import messages from './messages';
import clients from './clients'

const reducer = combineReducers({
    users,
    categories,
    providers,
    appointments,
    posts,
    comments,
    availability,
    messages,
    clients
});

export default reducer
