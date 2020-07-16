import React from 'react';

import './GuessedWord.css'

const GuessedWord = ({ word, sharedLetterCount }) => {

  const guessedWordMap = word.split('').map(item => <p className='letter-tile-guessed'>{item}</p>)

  return (
    <div className='guessed-word-container'>
      <div className='word-map-container'>
        {guessedWordMap}
      </div>
      <p className='shared-letter-count'>{sharedLetterCount}</p>
    </div>
  );
}

export default GuessedWord;
