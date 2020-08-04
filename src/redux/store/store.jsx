import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk]

// export default createStore(
//     userReducer,
//     undefined,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )
let store
if (process && process.env.NODE_ENV === "development") {
    store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)))
} else {
	store = createStore(reducer, applyMiddleware(...middleware))
}
// return createStore(
//     userReducer,
//     applyMiddleware(thunk)
// )
export default store