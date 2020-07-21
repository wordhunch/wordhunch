import {createStore, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import gameReducer from './reducers/gameReducer'
import authReducer from './reducers/authReducer'
import letterReducer from './reducers/letterReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    game: gameReducer,
    letter: letterReducer
})

export default createStore(rootReducer, composeWithDevTools())

