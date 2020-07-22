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
      <Link className='play-button-link' to='/play'><button className='play-button'>
        { !props.game.gameStarted || props.game.gameOver || props.game.gaveUp
        ? 'Play'
        : 'Continue'}
      </button></Link>
      {!props.auth.username ?
      <h4 className="register-here"> If you want to save your scores, <Link to='/Auth' className='auth-link'>sign up here!</Link></h4>
      : null }
    </div>
  );
}


const mapStateToProps = redux => redux

export default connect(mapStateToProps)(Landing);
