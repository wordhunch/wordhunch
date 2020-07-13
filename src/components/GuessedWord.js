import React from 'react';

const GuessedWord = ({word, sharedLetterCount}) => {
  return (
    <div>
      <p>{word}</p>
      <p>{sharedLetterCount}</p>
    </div>
  );
}

export default GuessedWord;
