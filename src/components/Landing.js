import React, {useState} from 'react';
import Game from './Game'

const Landing = () => {
  const [showGame, setGame] = useState(false)
  
  return (
    <div>
      {(!showGame) 
      ? <div>
      <h1>Welcome to WordHunch!</h1>
      <button onClick={() => setGame(true)}>Play Now!</button>
      </div>
      : <Game/>
      }
    </div>
  );
}

export default Landing;
