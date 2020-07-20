import React, { } from 'react';
import './Landing.css'
import { Link } from 'react-router-dom'
import landingLogo from '../../images/wordlogic-logo-2.png'

const Landing = () => {

  return (
    <div className="landing-container">
        <img
          className='landing-logo'
          src={landingLogo}
          alt='WordLogic logo'
        />
        <Link className='play-button' to='/play'><button className='play-button'>Play</button></Link>
        <h4 className="register-here"> If you want to save your scores, <Link to='/Auth' className='auth-link'>sign up here!</Link></h4>
    </div>
  );
}

export default Landing;
