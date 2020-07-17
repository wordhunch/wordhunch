const initialState = {
    username: '',
    userId: '',
    profilePicture: '',
    email: ''
}

const SET_USER = 'SET_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const EDIT_USER = 'EDIT_USER'

export const setUser = (username, userId, profilePicture, email) => {
    return {
        type: SET_USER,
        payload: {username, userId, profilePicture, email}
    }
}

export const editUser = (newUsername, newProfilePicture, newEmail) => {
    return {
        type: EDIT_USER,
        payload: {newUsername, newProfilePicture, newEmail}
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
            const {username, userId, profilePicture, email} = action.payload
            return {...state, username, userId, profilePicture, email}
        case EDIT_USER:
            const {newUsername,  newProfilePicture, newEmail} = action.payload
            return {...state, username: newUsername, profilePicture: newProfilePicture, email: newEmail}
        case LOGOUT_USER:
            return {...state, ...action.payload}
        default:
            return state
    }
}