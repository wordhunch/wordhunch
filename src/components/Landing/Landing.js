import React, { useState } from 'react';
import Game from '../Game/Game'
import LetterChart from '../LetterChart/LetterChart'
import './Landing.css'
import {Link} from 'react-router-dom'

const Landing = () => {
  const [showGame, setGame] = useState(false)
  const [difficulty, setDifficulty] = useState('1')

  const logicMap = 'LOGIC'.split('').map(item => <p className='letter-tile'>{item}</p>)

  

  return (
    <div className="landing-container">
      {(!showGame)
        ? <div className='landing'>
          <p className='title-word'>Word</p>
          <div className='logic-map'>
            {logicMap}
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
          <LetterChart />
          <Game difficulty={difficulty} />
        </div>
      }
    </div>
  );
}

export default Landing;
