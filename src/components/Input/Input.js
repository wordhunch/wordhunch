import React, { useState, useEffect, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { checkUserInput } from '../../utils/gameFunctions'
import {setReduxGuessedWords} from '../../redux/reducers/gameReducer'

import './Input.css'

const Input = (props) => {
  const [input, setInput] = useState('')
  const [valid, setValid] = useState(false)
  const [sharedLetterCount, setSharedLetterCount] = useState(null)
  const [invalidMessage, setInvalidMessage] = useState(false)

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
      setInvalidMessage(false)
    } else {
      // setInvalidMessage(true)
    }
  }

  useEffect(() => {
    if (currentWord) {
      checkUserInput(currentWord, input).then(res => {
        if (res) {
          setValid(true)
          //render input in red or something to show word is not valid
          setSharedLetterCount(res.sharedLetterCount)
        } else {
          setValid(false)
          setSharedLetterCount(null)
        }
      })

      textInput.current.focus()
    } 
  }, [input, currentWord])



  return (
    <div className='input-form-container'>
      {invalidMessage && <p className='invalid-message help-bubble'>Must be a real, 5-letter word with only letters</p>}
      <form className='input-form'>
        <input  className='game-input' ref={textInput} autoFocus maxLength='5' value={input} onChange={(e) => { setInput(e.target.value) }} />
        <br/>
        <input className='submit-button' onClick={(e) => handleSubmit(e)} type='submit' value='Try it!' />
      </form>
    </div>
  );
}

export default Input;
