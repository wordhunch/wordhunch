import React, { useState, useEffect } from "react";
import axios from 'axios'
import TargetWord from "../TargetWord/TargetWord";
import GuessedWord from "../GuessedWord/GuessedWord";
import Input from "../Input/Input";
import { generateWord, determineWinner } from '../../utils/gameFunctions'

const Game = ({difficulty}) => {
  const [targetWord, setTargetWord] = useState('')
  const [gameId, setGameId] = useState(null)
  const [guessedWords, setGuessedWords] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(null)

  //adds guessed words and letter count to state in the guessed words array
  const updateGuessedWords = (validatedWord) => {
    setGuessedWords([...guessedWords, validatedWord])
  }

  const newGame = () => {
    generateWord(difficulty).then(res => setTargetWord(res.data[0].word))
    // axios.post('/game/newGame', {targetWord, userId, difficulty}).then(res => setGameId(res.data)) waiting to have access to userId from redux
    setGuessedWords([])
    setGameOver(false)
    setScore(null)
  }

  //generates the target word at the beginning of the game
  useEffect(() => {
    generateWord(difficulty).then(res => setTargetWord(res.data[0].word))
    // axios.post('/game/newGame', {targetWord, userId, difficulty}).then(res => setGameId(res.data)) waiting to have access to userId from redux
  }, [])

  //watches to see if the user guesses the correct word
  useEffect(() => {
    if (guessedWords.length) {
    setGameOver(determineWinner(targetWord, guessedWords[guessedWords.length - 1].word))
    }
  }, [guessedWords])

  useEffect(() => {
    if (gameOver ===  true) {
      setScore(Math.ceil((1/guessedWords.length)*100*difficulty)) //score accounts for word difficulty and number of guesses
      //axios.post('/game/moveToHistory', {gameId, userId, score})
    }
  }, [gameOver])

  const guessedWordsMap = guessedWords.map((item, index, array) => {

    let numberToRender
    //switches the number of guesses rendered
    switch (parseInt(difficulty)) {
      case 1:
        numberToRender = 10
        break;
      case 2: 
        numberToRender = 5
        break;
      case 3: 
        numberToRender = 1
        break;
      default:
        console.log('something is wrong')
    }

    if (index >= array.length - numberToRender){
    return (<GuessedWord
      key={`guessed-word-${index}`}
      word={item.word}
      sharedLetterCount={item.sharedLetterCount}
    />)
    }
  })

  return (
    <div>
      <TargetWord targetWord={targetWord} gameOver={gameOver}/>
      {!gameOver && <>
      {guessedWordsMap}
      <Input
        updateGuessedWords={updateGuessedWords}
        targetWord={targetWord}
      />
      </>}
      {gameOver && <>
      <h2>YOU WIN!</h2>
      <h2>Score: {score}</h2>
      {/* play again button not functional */}
      <button onClick={() => newGame()}>Play again?</button>
      </>}
    </div>
  );
};

export default Game;
