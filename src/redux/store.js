import {createStore, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import gameReducer from './reducers/gameReducer'
import authReducer from './reducers/authReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    game: gameReducer
})

export default createStore(rootReducer, composeWithDevTools())

