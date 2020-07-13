const initialState = {
    username: '',
    userId: ''
}

const SET_USER = 'SET_USER'

export const setUser = (username, userId) => {
    return {
        type: SET_USER,
        payload: {username, userId}
    }
}

export default function (state=initialState, action) {
    switch (action.type) {
        case SET_USER:
            const {username, userId} = action.payload
            return {...state, username, userId}
        default:
            return state
    }
}