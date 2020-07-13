import React, {useState} from 'react';
import Game from './Game'
import '../styles/Landing.css'

const Landing = () => {
  const [showGame, setGame] = useState(false)
  
  return (
    <div className="Landing">
      {(!showGame) 
      ? <div>
      <h1 className="greeting">Welcome to WordHunch!</h1>
      <button onClick={() => setGame(true)}>Play Now!</button>
      </div>
      : <div>
      <Game/>
      </div>
      }
    </div>
  );
}

export default Landing;
