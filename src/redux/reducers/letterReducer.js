const initialState = {
    A: 'unknown',
    B: 'unknown',
    C: 'unknown',
    D: 'unknown',
    E: 'unknown',
    F: 'unknown',
    G: 'unknown',
    H: 'unknown',
    I: 'unknown',
    J: 'unknown',
    K: 'unknown',
    L: 'unknown',
    M: 'unknown',
    N: 'unknown',
    O: 'unknown',
    P: 'unknown',
    Q: 'unknown',
    R: 'unknown',
    S: 'unknown',
    T: 'unknown',
    U: 'unknown',
    V: 'unknown',
    W: 'unknown',
    X: 'unknown',
    Y: 'unknown',
    Z: 'unknown'
}

const SET_CLASS = 'SET_CLASS'
const RESET_CLASS = 'RESET_CLASS'

export const setClass = (value, letter) => {
    return {
        type: SET_CLASS,
        payload: {value, letter}
    }
}

export const resetClass = () => {
    return {
        type: RESET_CLASS,
        // payload: initialState
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CLASS:
            console.log(action)
            return {...state, [action.payload.letter]: action.payload.value } 
        case RESET_CLASS:
            return initialState
        default:
            return state
    }
}

