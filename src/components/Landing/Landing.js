import React, { } from 'react';
import './Landing.css'
import { Link } from 'react-router-dom'
import landingLogo from '../../images/wordlogic-logo-2.png'
import {connect} from 'react-redux'

const Landing = (props) => {

  return (
    <div className="landing-container">
      <img
        className='landing-logo'
        src={landingLogo}
        alt='WordLogic logo'
      />

      <button className='play-button' onClick={() => props.history.push('/play')}>
        { !props.game.gameStarted || props.game.gameOver || props.game.gaveUp
        ? 'Play Now'
        : 'Continue'}
      </button> 
  
      {!props.auth.username ?
      <div className="register-here">
        <span > If you want to save your scores, </span>
        <br />
        <span >log in or <Link to='/Auth' className='auth-link'>sign up here!</Link></span>
      </div>
      : null }
    </div>
  );
}


const mapStateToProps = redux => redux

export default connect(mapStateToProps)(Landing);
