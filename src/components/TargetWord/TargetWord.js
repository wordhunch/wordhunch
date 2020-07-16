import React from 'react';

import './TargetWord.css'

const TargetWord = ({targetWord, gameOver}) => {
  return (
    <div className='target-word-container'>
      {gameOver ? <p className='target-word'>{targetWord}</p> : <p className='target-word'>_______</p>}
    </div>
  );
}

export default TargetWord;
