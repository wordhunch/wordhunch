import React, { useState, useEffect } from "react";
import axios from 'axios'
import TargetWord from "../TargetWord/TargetWord";
import GuessedWord from "../GuessedWord/GuessedWord";
import Input from "../Input/Input";
import { generateWord, determineWinner } from '../../utils/gameFunctions'

const Game = (props) => {
  const difficulty = props.difficulty

  const [targetWord, setTargetWord] = useState({})
  const [gameId, setGameId] = useState(null)
  const [guessedWords, setGuessedWords] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(null)

  //adds guessed words and letter count to state in the guessed words array
  const updateGuessedWords = (validatedWord) => {
    setGuessedWords([...guessedWords, validatedWord])
  }

  const newGame = () => {
    generateWord(difficulty)
      .then(res => {
        setTargetWord({ word: res.data[0].word, wordId: res.data[0].word_id })
        setGuessedWords([])
        setGameOver(false)
        setScore(null)
      })
  }

  //generates the target word at the beginning of the game
  useEffect(() => {
    generateWord(difficulty)
      .then(res => setTargetWord({ word: res.data[0].word, wordId: res.data[0].word_id }))
  }, [])

  //adds a new game to the database once the target word has been set
  useEffect(() => {
    if (props.username && targetWord.wordId) {
      console.log('creating new game', difficulty)
      axios.post('/game/newGame', { targetWord: targetWord.wordId, difficulty })
        .then(res => setGameId(res.data.game_id))
    }
  }, [targetWord])

  //watches to see if the user guesses the correct word
  useEffect(() => {
    if (guessedWords.length) {
      setGameOver(determineWinner(targetWord.word, guessedWords[guessedWords.length - 1].word))
    }
  }, [guessedWords])

  //watches to see if the game is over and if so, calculates a score. if the user is logged in, it will send the data to the gamehistory table
  useEffect(() => {
    if (gameOver) {
      const scoreCalc = Math.ceil((1 / guessedWords.length) * 100 * difficulty)
      setScore(scoreCalc) //score accounts for word difficulty and number of guesses
      console.log(gameId, scoreCalc)
      if (props.username) {
        axios.post('/game/moveToHistory', { gameId, score: scoreCalc })
        //after game is over, send game data to game history table
      }
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

    if (index >= array.length - numberToRender) {
      return (<GuessedWord
        key={`guessed-word-${index}`}
        word={item.word}
        sharedLetterCount={item.sharedLetterCount}
      />)
    }
  })

  return (
    <div>
      <TargetWord targetWord={targetWord.word} gameOver={gameOver} />
      {!gameOver && <>
        {guessedWordsMap}
        <Input
          updateGuessedWords={updateGuessedWords}
          targetWord={targetWord.word}
        />
      </>}
      {gameOver && <>
        <h2>YOU WIN!</h2>
        <h2>Score: {score}</h2>
        <button onClick={() => newGame()}>Play again?</button>
      </>}
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Game);
