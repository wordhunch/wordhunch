import React from 'react';

import './TargetWord.css'

const TargetWord = ({targetWord, gameOver}) => {
  return (
    <div>
      {gameOver ? <p>{targetWord}</p> : <p>? ? ? ? ?</p>}
    </div>
  );
}

export default TargetWord;
