const initialState = {
    targetWord: {},
    gameId: null,
    guessedWords: []
}

const SET_WORD = 'SET_WORD'
const SET_GAME_ID = 'SET_GAME_ID'
const SET_GUESSED_WORDS = 'SET_GUESSED_WORDS'
const EMPTY_GUESSED_WORDS = 'EMPTY_GUESSED_WORDS'
const RESET_GAME = 'RESET_GAME'

export const setWord = (targetWord) => {
    console.log('setword working')
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
        default:
            return state
    }
}