import React, {useState} from 'react';
import Game from '../Game/Game'
import './Landing.css'

const Landing = () => {
  const [showGame, setGame] = useState(false)
  const [difficulty, setDifficulty] = useState('1')


  
  return (
    <div className="Landing">
      {(!showGame) 
      ? <div>
      <h1>Welcome to WordHunch!</h1>
      <label htmlFor='difficulty'>Difficulty:</label>
      <select onChange={(e) => setDifficulty(e.target.value)} name='difficulty'>
        <option value='1'>Easy</option>
        <option value='2'>Medium</option>
        <option value='3'>Hard</option>
      </select>
      <button onClick={() => setGame(true)}>Play Now!</button>
      </div>
      : <div>
      <Game difficulty={difficulty}/>
      </div>
      }
    </div>
  );
}

export default Landing;
