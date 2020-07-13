import React, {useState, useEffect} from "react";
import TargetWord from "./TargetWord";
import GuessedWord from "./GuessedWord";
import Input from "./Input";

const Game = () => {
  const [targetWord, setTargetWord] = useState('')
  const [guessedWords, setGuessedWords] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [userInput, setUserInput] = useState('')

  const guessedWordsMap = guessedWords.map((item,index) => (
    <GuessedWord 
      key={`guessed-word-${index}`} 
      word={item.word} 
      // sharedLetterCount={word.sharedLetterCount}
    />
  ))

  const handleInput = (e) => {
    setUserInput(e.target.value)
  }

  return (
    <div>
      Game.js
      <TargetWord targetWord={targetWord}/>
      {guessedWordsMap}
      <Input handleInput={handleInput}/>
    </div>
  );
};

export default Game;
