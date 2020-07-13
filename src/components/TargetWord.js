import React from 'react';

const TargetWord = ({targetWord, gameOver}) => {
  return (
    <div>
      {gameOver ? <p>{targetWord}</p> : <p>? ? ? ? ?</p>}
    </div>
  );
}

export default TargetWord;
