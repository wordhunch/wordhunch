import axios from 'axios'


export const generateWord = async (difficulty) => {
    //Get a target word for a given game
    return await axios.get(`/word/getRandomWord/:difficulty`) //not sure how difficulty is going to be passed to the endpoint--params? body?
}

export const checkUserInput = async (targetWord, inputWord) => {
    const input = inputWord.toLowerCase()
    const target = targetWord.toLowerCase()

    if (input.length < 5 || input.includes(' ')) {
        return
    }

    if (input === target) {
        return {
            correct: true,
            word: input,
        }
    }

    //validate word endpoint in server looks at list of acceptable words and returns true or false?
    const validWord = await axios.post('/', {word: input})

    if (validWord) {
        const sharedLetterCount = 0

        //increment the counter for each shared letter between input and target
        input.split('').forEach(item => target.includes(item)? sharedLetterCount ++ : null)

        return {
            correct: false,
            word: input,
            sharedLetterCount
        }

    }
}