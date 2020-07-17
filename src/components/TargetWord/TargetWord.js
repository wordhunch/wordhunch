import React from 'react';
import {useSelector} from 'react-redux'

import './TargetWord.css'

const TargetWord = ({targetWord, gameOver}) => {
  const currentWord = useSelector(state => state.game.targetWord.word)

  return (
    <div className='target-word-container'>
      {gameOver ? <p className='target-word'>{currentWord}</p> : <p className='target-word'>_______</p>}
    </div>
  );
}

export default TargetWord;
