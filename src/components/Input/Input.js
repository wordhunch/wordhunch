import React, { useState, useEffect, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { checkUserInput } from '../../utils/gameFunctions'
import {setReduxGuessedWords} from '../../redux/reducers/gameReducer'

import './Input.css'

const Input = (props) => {
  const [input, setInput] = useState('')
  const [valid, setValid] = useState(false)
  const [sharedLetterCount, setSharedLetterCount] = useState(null)

  const textInput = useRef(null)
  const currentWord = useSelector(state => state.game.targetWord.word)
  const dispatch = useDispatch()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (valid) {
      dispatch(setReduxGuessedWords({ word: input, sharedLetterCount }))
      setInput('')
      setSharedLetterCount(null)
      setValid(false)
    }
    //could add text response if word is not valid
    //empty input to make entering next word simple
  }

  useEffect(() => {
    if (currentWord) {
      checkUserInput(currentWord, input).then(res => {
        if (res) {
          setValid(true)
          //render input in red or something to show word is not valid
          setSharedLetterCount(res.sharedLetterCount)
        }
      })

      textInput.current.focus()
    }
  }, [input, currentWord])



  return (
    <div className='input-form-container'>
      <form className='input-form'>
        <input  className='game-input' ref={textInput} autoFocus maxLength='5' value={input} onChange={(e) => { setInput(e.target.value) }} />
        <br/>
        <input className='submit-button' onClick={(e) => handleSubmit(e)} type='submit' value='Try it!' />
      </form>
    </div>
  );
}

export default Input;
