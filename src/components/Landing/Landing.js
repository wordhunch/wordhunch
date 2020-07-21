import React, { } from 'react';
import './Landing.css'
import {Link} from 'react-router-dom'
import landingLogo from '../../images/wordlogic-logo-2.png'
import {connect} from 'react-redux'

const Landing = props => {

  return (
    <div className="landing-container">
      <div>
          <div className='landing'>
                <img
                  className='landing-logo'
                  src={landingLogo}
                  alt='WordLogic logo'
                  style={{ width: '600px' }}
                />
              </div>
              
              <div>
                <Link to='/play'><button className='play-button'>
                  { props.game.gameOver || props.game.gaveUp
                  ? 'Play Now'
                  : 'Continue Game'}
                </button></Link>
                <h4 className = "register-here"> If you want to save your scores, <Link to = '/Auth' className='auth-link'>sign up here!</Link></h4>
              </div>
          </div>
    </div>
  );
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Landing)
