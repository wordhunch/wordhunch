import axios from 'axios'


export const generateWord = async (difficulty) => {
    //Get a target word for a given game
    return await axios.get(`/api/targetword/${+difficulty}`)
}

export const checkUserInput = async (targetWord, inputWord) => {

    const input = inputWord.toLowerCase()
    const target = targetWord.toLowerCase()

    if (input.length < 5 || input.length >5 || input.includes(' ')) {
        return false
    }

    //validate word endpoint in server looks at list of acceptable words and returns true or false?
    const validWord = await axios.post('/word', {inputWord: input}) 

    if (validWord.data) {

        let sharedLetterArray = []

        //increment the counter for each shared letter between input and target
        input.split('').forEach(item => {
            if (target.includes(item) && ! sharedLetterArray.includes(item)) {
                sharedLetterArray.push(item)
            }
        })

        return {
            word: input,
            sharedLetterCount: sharedLetterArray.length
        }

    } else {
        return false
        //could add something to say word is not valid
    }
}

export const determineWinner = (target, input) => {
    //returns the status of gameOver
    if (input) {
    return target.toLowerCase() === input.toLowerCase() ? true : false
    }
}