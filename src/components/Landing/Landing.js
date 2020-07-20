import React, { useState } from 'react';
import Game from '../Game/Game'
import './Landing.css'
import {Link} from 'react-router-dom'
import landingLogo from '../../images/wordlogic-logo-2.png'

const Landing = () => {
  const [showGame, setGame] = useState(false)
  const [difficulty, setDifficulty] = useState('1')
 

  return (
    <div className="landing-container">
      {(!showGame)
        ? <div>
          <div className='landing'>
                <img
                  className='landing-logo'
                  src={landingLogo}
                  alt='WordLogic logo'
                  style={{ width: '600px' }}
                />
              </div>
              <div className='difficulty-buttons-container'>
                <button onClick={() => setDifficulty('1')} className={`difficulty-button ${difficulty === '1' && 'difficulty-selected'}`}>Easy</button>
                <button onClick={() => setDifficulty('2')} className={`difficulty-button ${difficulty === '2' && 'difficulty-selected'}`}>Medium</button>
                <button onClick={() => setDifficulty('3')} className={`difficulty-button ${difficulty === '3' && 'difficulty-selected'}`}>Hard</button>
              </div>
              <div>
                <button className='play-button' onClick={() => setGame(true)}>Play</button>
                <h4 className = "register-here"> If you want to save your scores, <Link to = '/Auth' className='auth-link'>sign up here!</Link></h4>
              </div>
          </div>
        : <div>
          <Game difficulty={difficulty} />
        </div>
      }
    </div>
  );
}

export default Landing;
