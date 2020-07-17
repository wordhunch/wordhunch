import React, { useState, useEffect } from "react";
import axios from 'axios'
import TargetWord from "../TargetWord/TargetWord";
import GuessedWord from "../GuessedWord/GuessedWord";
import Input from "../Input/Input";
import LetterChart from '../LetterChart/LetterChart'
import { connect } from 'react-redux'
import { generateWord, determineWinner } from '../../utils/gameFunctions'
import {setWord, setGameId, setReduxGuessedWords, emptyGuessedWords} from '../../redux/reducers/gameReducer'
import './Game.css'

const Game = (props) => {
  const difficulty = props.difficulty
  
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(null)

  //adds guessed words and letter count to state in the guessed words array
  const updateGuessedWords = (validatedWord) => {
    props.setReduxGuessedWords(validatedWord)
  }

  const newGame = () => {
    generateWord(difficulty)
      .then(res => {
        const wordObj = { word: res.data[0].word, wordId: res.data[0].word_id }
        props.setWord(wordObj)
        props.emptyGuessedWords()
        setGameOver(false)
        setScore(null)
      })
  }

  //generates the target word at the beginning of the game
  useEffect(() => {
    generateWord(difficulty)
      .then(res => {
        const wordObj = { word: res.data[0].word, wordId: res.data[0].word_id }
        props.setWord(wordObj)
      })
  }, [difficulty])

  //adds a new game to the database once the target word has been set
  useEffect(() => {
    if (props.auth.username && props.game.targetWord.wordId) {
      console.log('creating new game', difficulty)
      axios.post('/game/newGame', { targetWord: props.game.targetWord.wordId, difficulty })
        .then(res => {
          props.setGameId(res.data.game_id)
        })
    }
  }, [props.game.targetWord, difficulty, props.auth.username])

  //watches to see if the user guesses the correct word
  useEffect(() => {
    if (props.game.guessedWords.length) {
      setGameOver(determineWinner(props.game.targetWord.word, props.game.guessedWords[props.game.guessedWords.length - 1].word))
    }
  }, [props.game.guessedWords, props.game.targetWord])

  //watches to see if the game is over and if so, calculates a score. if the user is logged in, it will send the data to the gamehistory table
  useEffect(() => {
    if (gameOver) {
      const scoreCalc = Math.ceil(100 - (guessedWords.length * 5))
      setScore(scoreCalc) //score accounts for word difficulty and number of guesses
      if (props.auth.username && props.game.gameId) {
        axios.post('/game/moveToHistory', { gameId: props.game.gameId, score: scoreCalc })
        //after game is over, send game data to game history table
      }
    }
  }, [gameOver, difficulty, props.game.gameId, props.game.guessedWords, props.auth.username])

  const guessedWordsMap = props.game.guessedWords.map((item, index, array) => {
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
    } return null
  })

  return (
    <div className='game-outer-container'>
        <TargetWord gameOver={gameOver} />
          <LetterChart />
      <div className='game-container'>
        {!gameOver && <>
          {guessedWordsMap}
          <Input/>
        </>}
        {gameOver && <>
          <h2>YOU WIN!</h2>
          <h2>Score: {score}</h2>
          <button onClick={() => newGame()}>Play again?</button>
        </>}
      </div>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState



export default connect(mapStateToProps, {setWord, setGameId, setReduxGuessedWords, emptyGuessedWords})(Game);
