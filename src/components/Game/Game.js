import React, { useState, useEffect } from "react";
import axios from 'axios'
import TargetWord from "../TargetWord/TargetWord";
import GuessedWord from "../GuessedWord/GuessedWord";
import Input from "../Input/Input";
import LetterChart from '../LetterChart/LetterChart'
import Instructions from "../Instructions/Instructions"
import { connect } from 'react-redux'
import { generateWord, determineWinner } from '../../utils/gameFunctions'
import { setWord, setGameId, emptyGuessedWords, resetGame, startGame, setGameOver, setGaveUp } from '../../redux/reducers/gameReducer'
import { resetClass } from '../../redux/reducers/letterReducer'
import './Game.css'
import fireworks from '../../images/pewpew.png'

const Game = (props) => {

  let { targetWord, gameStarted, guessedWords, gameOver, gaveUp } = props.game
  let { username } = props.auth
  let { setGameOver, setGaveUp, startGame, setGameId, setWord, resetGame } = props

  const [difficulty, setDifficulty] = useState('1')
  const [score, setScore] = useState(null)
  const [instructions, setInstructions] = useState(false)
  const [displayLC, setDisplayLC] = useState(true)

  //toggles the instructions boolean
  const toggleInstructions = () => {
    setInstructions(!instructions)
  }

  //displays the target word with option to play again
  const giveUp = () => {
    setScore(0)
    setGaveUp()
  }

  //resets values in state
  const newGame = () => {
    resetGame()
    props.resetClass()
    generateWord(difficulty)
      .then(res => {
        const wordObj = { word: res.data[0].word, wordId: res.data[0].word_id }
        setScore(null)
        setWord(wordObj)
      })
  }

  //looks for screen width to toggle display letter chart
  useEffect(() => {
    if (window.innerWidth < 767) {
      setDisplayLC(false)
    }
  }, [])

  //generates the target word at the beginning of the game
  useEffect(() => {
    if (!gameStarted) {
      generateWord(difficulty)
        .then(res => {
          const wordObj = { word: res.data[0].word, wordId: res.data[0].word_id }
          setWord(wordObj)
        })
    }

  }, [difficulty, setWord, gameStarted])

  //adds a new game to the database once the target word has been set

  useEffect(() => {
    if (username && targetWord.wordId) {
      axios.post('/game/newGame', { targetWord: targetWord.wordId, difficulty })
        .then(res => {
          setGameId(res.data.game_id)
        })
    }
  }, [targetWord, difficulty, username, setGameId])

  //watches to see if the user guesses the correct word
  useEffect(() => {
    if (guessedWords.length) {
      setGameOver(determineWinner(targetWord.word, guessedWords[guessedWords.length - 1].word))
    }
  }, [guessedWords, targetWord, setGameOver])

  //watches to see if the game is over and if so, calculates a score. if the user is logged in, it will send the data to the gamehistory table
  useEffect(() => {
    if (gameOver) {
      let scoreMaker = 0
      difficulty === 1 ? scoreMaker = 25 : difficulty === 2 ? scoreMaker = 20 : scoreMaker = 15

      let scoreCalc = Math.ceil(500 - ((guessedWords.length - 1) * scoreMaker))
      if (scoreCalc <= 30) {
        scoreCalc = 30
      }
      setScore(scoreCalc) //score accounts for word difficulty and number of guesses
      if (props.auth.username && props.game.gameId) {
        axios.post('/game/moveToHistory', { gameId: props.game.gameId, score: scoreCalc })
        //after game is over, send game data to game history table
      }
    }
  }, [gameOver, difficulty, props.game.gameId, guessedWords, props.auth.username])

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
        instructions={instructions}
      />)
    } return null
  })

  return (<div>
    {!gameStarted && <div className='difficulty-container'>
      <p className='difficulty-text'>Choose your challenge:</p>
      <div className='difficulty-buttons-container'>
        <button onClick={() => setDifficulty('1')} className={`difficulty-button ${difficulty === '1' && 'difficulty-selected'}`}>Easy</button>
        <button onClick={() => setDifficulty('2')} className={`difficulty-button ${difficulty === '2' && 'difficulty-selected'}`}>Medium</button>
        <button onClick={() => setDifficulty('3')} className={`difficulty-button ${difficulty === '3' && 'difficulty-selected'}`}>Hard</button>
      </div>
      <button className='game-button' onClick={() => startGame()}>Start</button>
    </div>}

    {gameStarted && <div className='game-outer-container'>
      <div className='target-word-container'>
        <TargetWord gameOver={gameOver} gaveUp={gaveUp} />
        {instructions && <div className="help-bubble target-word-help">
          <p>The word you're trying to guess</p>
        </div>}
      </div>
      <div className='letter-chart-container'>
        <LetterChart displayLC={displayLC} />
        {instructions && displayLC ? <div className="help-bubble letter-chart-help">
          A chart to help you keep track of which letters are or are not in the target word.  Click them to toggle their color to red, green, and back to blank.
        </div> : null}
      </div>
      <div className='game-container'>
        {!gameOver && !gaveUp && <>
        <div className='guessed-word-container'>
          {guessedWordsMap}
        {instructions && guessedWords.length ? <div className="help-bubble guessed-word-number-help">
              The number of letters this word has in common with the target
        </div> : null}
        </div>
          <div className='input-container'>
            <Input />
            {instructions && <div className="help-bubble input-help">
              Type your guesses in here.  Remember, they must be 5 letters and real words!
        </div>}
          </div>
          <div className='give-up-container'>
            <button className='game-button give-up-button' onClick={() => giveUp()}>Give up?</button>
            {instructions && <div className="help-bubble give-up-help">
              Click here to see the word you're trying to guess and end the game.  Careful, though!  You'll forefeit the game.
        </div>}
          </div>
        </>}
        {gameOver && <>
          <h2>YOU WIN!</h2>
          <h2>Score: {score}</h2>
          <div>
            <img className='temp-fireworks'
              src={fireworks}
              alt='temporary - pew pew you win'
              style={{ width: '50px' }}
            />
            <img className='temp-fireworks'
              src={fireworks}
              alt='temporary - pew pew you win'
              style={{ width: '50px' }}
            />
          </div>
          <button className='game-button' onClick={() => newGame()}>Play again?</button>
        </>}
        {gaveUp && <>
          <button className='game-button' onClick={() => newGame()}>Play again?</button>
        </>}
      </div>
      <h2 className="Help mobile-help" onClick={toggleInstructions}>?</h2>
      <button onClick={() => setDisplayLC(!displayLC)}  className='letter-chart-toggle'>AZ</button>
      {instructions && <div className="help-container">
        <Instructions />
        </div>}
    </div>}
  </div>
  );
};

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, { setWord, setGameId, emptyGuessedWords, resetGame, startGame, setGameOver, setGaveUp, resetClass })(Game);