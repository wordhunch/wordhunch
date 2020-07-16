import React, { useState, useEffect } from 'react';
import { checkUserInput } from '../../utils/gameFunctions'

import './Input.css'

const Input = ({ targetWord, updateGuessedWords }) => {
  const [input, setInput] = useState('')
  const [valid, setValid] = useState(false)
  const [sharedLetterCount, setSharedLetterCount] = useState(null)


  const handleSubmit = (e) => {
    e.preventDefault()
    if (valid) {
      updateGuessedWords({word: input, sharedLetterCount})
      setInput('')
      setSharedLetterCount(null)
      setValid(false)
    }
    //could add text response if word is not valid
    //empty input to make entering next word simple
  }

  useEffect(() => {
    if (targetWord) {
    checkUserInput(targetWord, input).then(res => {
      if (res) {
        setValid(true)
        //render input in red or something to show word is not valid
        setSharedLetterCount(res.sharedLetterCount)
      }
    })
  }
  }, [input, targetWord])

  

  return (
    <div>
      <form>
        <input maxLength='5' value={input} onChange={(e) => { setInput(e.target.value) }} />
        <input onClick={(e) => handleSubmit(e)} type='submit' value='Submit'/>
      </form>
    </div>
  );
}

export default Input;
