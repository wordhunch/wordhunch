import React, { useState, useEffect } from "react";
import axios from 'axios'
import TargetWord from "../TargetWord/TargetWord";
import GuessedWord from "../GuessedWord/GuessedWord";
import Input from "../Input/Input";
import LetterChart from '../LetterChart/LetterChart'
import { connect } from 'react-redux'
import { generateWord, determineWinner } from '../../utils/gameFunctions'
import {setWord, setGameId, emptyGuessedWords, resetGame} from '../../redux/reducers/gameReducer'
import './Game.css'

const Game = (props) => {
  let {targetWord} = props.game
  let {username} = props.auth
  let {setGameId, setWord, emptyGuessedWords, resetGame} = props

  const [difficulty, setDifficulty] = useState(props.difficulty)
  const [gameOver, setGameOver] = useState(false)
  const [gaveUp, setGaveUp] = useState(false)
  const [score, setScore] = useState(null)

  //adds guessed words and letter count to state in the guessed words array
  

  //displays the target word with option to play again
  const giveUp = () => {
    setScore(0)
    setGaveUp(true)
  }

  //resets values in state
  const newGame = () => {
    resetGame()
    generateWord(difficulty)
      .then(res => {
        const wordObj = { word: res.data[0].word, wordId: res.data[0].word_id }
        emptyGuessedWords()
        setGameOver(false)
        setGaveUp(false)
        setScore(null)
        setWord(wordObj)
      })
  }

  //generates the target word at the beginning of the game
  useEffect(() => {
    generateWord(difficulty)
      .then(res => {
        const wordObj = { word: res.data[0].word, wordId: res.data[0].word_id }
        setWord(wordObj)
      })
        if (gameOver === true || gaveUp === true) {
          return resetGame()
      }
      
  }, [difficulty, setWord])

  //adds a new game to the database once the target word has been set
 
  useEffect(() => {
    if (username && targetWord.wordId) {
      console.log('creating new game', difficulty)
      axios.post('/game/newGame', { targetWord: targetWord.wordId, difficulty })
        .then(res => {
          setGameId(res.data.game_id)
        })
    }
  }, [targetWord, difficulty, username, setGameId])

  //watches to see if the user guesses the correct word
  useEffect(() => {
    if (props.game.guessedWords.length) {
      setGameOver(determineWinner(props.game.targetWord.word, props.game.guessedWords[props.game.guessedWords.length - 1].word))
    }
  }, [props.game.guessedWords, props.game.targetWord])

  //watches to see if the game is over and if so, calculates a score. if the user is logged in, it will send the data to the gamehistory table
  useEffect(() => {
    if (gameOver) {
      let scoreMaker = 0
      difficulty === 1 ? scoreMaker = 25 : difficulty === 2 ? scoreMaker = 20 : scoreMaker = 15
      
      let scoreCalc = Math.ceil(500 - (props.game.guessedWords.length * scoreMaker))
      if (scoreCalc <= 0){
        scoreCalc = 0
      }
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
        numberToRender = 3
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
        <TargetWord gameOver={gameOver} gaveUp={gaveUp} />
        <LetterChart gameOver={gameOver} gaveUp={gaveUp} />
      <div className='game-container'>
        {!gameOver && !gaveUp && <>
          {guessedWordsMap}
          <Input/>
          <button className='game-button' onClick={() => giveUp()}>Give up?</button>
        </>}
        {gameOver && <>
          <h2>YOU WIN!</h2>
          <h2>Score: {score}</h2>
          <button className='game-button' onClick={() => newGame()}>Play again?</button>
          <div className='difficulty-buttons-container'>
            <button onClick={() => setDifficulty('1')} className={`difficulty-button ${difficulty === '1' && 'difficulty-selected'}`}>Easy</button>
            <button onClick={() => setDifficulty('2')} className={`difficulty-button ${difficulty === '2' && 'difficulty-selected'}`}>Medium</button>
            <button onClick={() => setDifficulty('3')} className={`difficulty-button ${difficulty === '3' && 'difficulty-selected'}`}>Hard</button>
          </div>
        </>}
        {gaveUp && <>
          <button className='game-button' onClick={() => newGame()}>Play again?</button>
          <div className='difficulty-buttons-container'>
            <button onClick={() => setDifficulty('1')} className={`difficulty-button ${difficulty === '1' && 'difficulty-selected'}`}>Easy</button>
            <button onClick={() => setDifficulty('2')} className={`difficulty-button ${difficulty === '2' && 'difficulty-selected'}`}>Medium</button>
            <button onClick={() => setDifficulty('3')} className={`difficulty-button ${difficulty === '3' && 'difficulty-selected'}`}>Hard</button>
          </div>
        </>}
      </div>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState



export default connect(mapStateToProps, {setWord, setGameId, emptyGuessedWords, resetGame})(Game);
