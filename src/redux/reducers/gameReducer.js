const initialState = {
    gameStarted: false,
    targetWord: {},
    gameId: null,
    guessedWords: [],
    gameOver: false,
    gaveUp: false,
}

const SET_WORD = 'SET_WORD'
const SET_GAME_ID = 'SET_GAME_ID'
const SET_GUESSED_WORDS = 'SET_GUESSED_WORDS'
const EMPTY_GUESSED_WORDS = 'EMPTY_GUESSED_WORDS'
const RESET_GAME = 'RESET_GAME'
const START_GAME = 'START_GAME'
const GAME_OVER = 'GAME_OVER'
const GAVE_UP = 'GAVE_UP'

export const startGame = () => {
    return {
        type: START_GAME
    }
}

export const setWord = (targetWord) => {
    return {
        type: SET_WORD,
        payload: {targetWord}
    }
}

export const setGameId = (gameId) => {
    return {
        type: SET_GAME_ID,
        payload: {gameId}
    }
}
export const setReduxGuessedWords = (guessedWord) => {
    return {
        type: SET_GUESSED_WORDS,
        payload: {guessedWord}
    }
}

export const emptyGuessedWords = () => {
    return {
        type: EMPTY_GUESSED_WORDS,
        payload: []
    }
}

export const setGameOver = (value) => {
    return {
        type: GAME_OVER,
        payload: value
    }
}

export const setGaveUp = () => {
    return {
        type: GAVE_UP
    }
}

export const resetGame = () => {
    return {
        type: RESET_GAME
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_WORD:
            const {targetWord} = action.payload
            return {...state, targetWord}
        case SET_GAME_ID:
            const {gameId} = action.payload
            return {...state, gameId}
        case SET_GUESSED_WORDS:
            const {guessedWord} = action.payload
            const guessedWords = [...state.guessedWords, guessedWord]
            return {...state, guessedWords}
        case EMPTY_GUESSED_WORDS:
            return {...state, guessedWords: []}
        case RESET_GAME:
            return initialState
        case START_GAME:
            return {...state, gameStarted: true}
        case GAME_OVER:
            return {...state, gameOver: action.payload}
        case GAVE_UP:
            return {...state, gaveUp: true}
        default:
            return state
    }
}