import React, {useState} from 'react';
import Game from './Game'
import About from './About'

const Landing = () => {
  const [showGame, setGame] = useState(false)
  
  return (
    <div>
      {(!showGame) 
      ? <div>
      <h1>Welcome to WordHunch!</h1>
      <button onClick={() => setGame(true)}>Play Now!</button>
      <About />
      </div>
      : <div>
      <Game/>
      <About />
      </div>
      }
    </div>
  );
}

export default Landing;
