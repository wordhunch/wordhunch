import {createStore, applyMiddleware, combineReducers } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import promiseMiddleware from 'redux-promise-middleware'
import authReducer from './reducers/authReducer'

// const rootReducer = combineReducers({
//     auth: authReducer
// })

export default createStore(authReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))