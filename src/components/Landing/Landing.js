import React, { useState } from 'react';
import Game from '../Game/Game'
import './Landing.css'
import {Link} from 'react-router-dom'

const Landing = () => {
  const [showGame, setGame] = useState(false)
  const [difficulty, setDifficulty] = useState('1')

  

  return (
    <div className="landing-container">
      {(!showGame)
        ? <div className='landing'>
          <p className='title-word'>Word</p>
          <div className='logic-map'>
          </div>
          <div className='difficulty-buttons-container'>
            <button onClick={() => setDifficulty('1')} className={`difficulty-button ${difficulty === '1' && 'difficulty-selected'}`}>Easy</button>
            <button onClick={() => setDifficulty('2')} className={`difficulty-button ${difficulty === '2' && 'difficulty-selected'}`}>Medium</button>
            <button onClick={() => setDifficulty('3')} className={`difficulty-button ${difficulty === '3' && 'difficulty-selected'}`}>Hard</button>
          </div>
          <button className='play-button' onClick={() => setGame(true)}>Play</button>
          <h4 className = "register-here"> If you want to save your score...<Link to = '/Auth'> Sign Up here!</Link></h4>
        </div>
        : <div>
          <Game difficulty={difficulty} />
        </div>
      }
    </div>
  );
}

export default Landing;
