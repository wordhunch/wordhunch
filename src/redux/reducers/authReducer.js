const initialState = {
    username: '',
    userId: ''
}

const SET_USER = 'SET_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export const setUser = (username, userId) => {
    return {
        type: SET_USER,
        payload: {username, userId}
    }
}

export const logoutUser = (user) => {
    return {
        type: LOGOUT_USER,
        payload: initialState
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            const {username, userId} = action.payload
            return {...state, username, userId}
        case LOGOUT_USER:
            return {...state, ...action.payload}
        default:
            return initialState
    }
}