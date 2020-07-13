import React, { useState, useEffect } from "react";
import TargetWord from "./TargetWord";
import GuessedWord from "./GuessedWord";
import Input from "./Input";
import { generateWord, determineWinner } from '../utils/gameFunctions'

const Game = ({difficulty}) => {
  const [targetWord, setTargetWord] = useState('')
  const [guessedWords, setGuessedWords] = useState([])
  const [gameOver, setGameOver] = useState(false)

  const updateGuessedWords = (validatedWord) => {
    setGuessedWords([...guessedWords, validatedWord])
  }

  useEffect(() => {
    generateWord(difficulty).then(res => setTargetWord(res.data[0].word))
  }, [])

  useEffect(() => {
    setGameOver(determineWinner(targetWord, guessedWords[guessedWords.length - 1]))
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
      <TargetWord targetWord={targetWord} />
      {guessedWordsMap}
      <Input
        updateGuessedWords={updateGuessedWords}
        targetWord={targetWord}
      />
      {gameOver && <h2>GAME OVER</h2>}
    </div>
  );
};

export default Game;
