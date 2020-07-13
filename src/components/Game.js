import React, { useState, useEffect } from "react";
import TargetWord from "./TargetWord";
import GuessedWord from "./GuessedWord";
import Input from "./Input";
import { generateWord, determineWinner } from '../utils/gameFunctions'

const Game = ({difficulty}) => {
  const [targetWord, setTargetWord] = useState('')
  const [guessedWords, setGuessedWords] = useState([])
  const [gameOver, setGameOver] = useState(false)

  //adds guessed words and letter count to state in the guessed words array
  const updateGuessedWords = (validatedWord) => {
    setGuessedWords([...guessedWords, validatedWord])
  }

  //generates the target word at the beginning of the game
  useEffect(() => {
    generateWord(difficulty).then(res => setTargetWord(res.data[0].word))
  }, [])

  //watches to see if the user guesses the correct word
  useEffect(() => {
    if (guessedWords.length) {
    setGameOver(determineWinner(targetWord, guessedWords[guessedWords.length - 1].word))
    }
  }, [guessedWords])

  const guessedWordsMap = guessedWords.map((item, index) => (
    <GuessedWord
      key={`guessed-word-${index}`}
      word={item.word}
      sharedLetterCount={item.sharedLetterCount}
    />
  ))

  return (
    <div>
      <TargetWord targetWord={targetWord} gameOver={gameOver}/>
      {guessedWordsMap}
      {!gameOver && <Input
        updateGuessedWords={updateGuessedWords}
        targetWord={targetWord}
      />}
      {gameOver && <>
      <h2>YOU WIN!</h2>
      {/* play again button not functional */}
      <button>Play again?</button>
      </>}
    </div>
  );
};

export default Game;
