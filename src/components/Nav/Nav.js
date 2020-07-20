import React, { useState } from 'react'
import axios from 'axios'
import logo from '../../images/wordlogic-logo.png'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUser, logoutUser } from '../../redux/reducers/authReducer'
import { resetGame } from '../../redux/reducers/gameReducer'
import './Nav.css'

const Nav = props => {
  const [loginValue, setValue] = useState('')
  const [password, setPassword] = useState('')
  const [errorResponse, setErrorResponse] = useState('')

  const login = e => {
    e.preventDefault()
    axios
      .post('/auth/login', { loginValue, password })
      .then(res => {
        const { username, user_id, profile_picture, email } = res.data
        props.setUser(
          username,
          user_id,
          profile_picture,
          email
        )
        // props.history.push('/profile')
        console.log('logged in')
        setValue('')
        setPassword('')
        setErrorResponse('')
      })
      .catch(err => setErrorResponse(err.response.data))
    // console.log(err)

  }

  const logout = () => {
    axios
      .delete('/auth/logout')
      .then(res => {
        props.history.push('/')
      })
    props.logoutUser()
  }

  return (
    <div className='Nav'>

      <div className="logo-container" onClick={() => props.resetGame()} >
        <Link to='/'>
          <img
            className='app-logo'
            src={logo}
            alt='WordLogic logo'
            style={{ width: '120px' }}
          />
        </Link>
      </div>

      <div className='play-container'>
        <Link to='/play'><button className="play-btn">Play Now</button></Link>
      </div>

      <p className='error'>{errorResponse}</p>
      
      {!props.auth.username 
        ? 
        <div className='not-loggedin'>
          <form onSubmit={e => login(e)}>
            <input
              className='login-input'
              type='text'
              placeholder='username or email'
              value={loginValue}
              onChange={e => setValue(e.target.value)}
            />
            <input
              className='login-input'
              type='password'
              placeholder='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button className="login-btn" type='submit'>Login</button>
          </form>
        <Link to='/auth'><button className="register-btn">Register</button></Link>
        </div> 
        :
        <div className='logged-in'>
          <Link to='/profile'><button className="profile-btn">Profile</button></Link>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>}

      <Link to='/about'><button className="about-btn">About</button></Link>
    
    </div>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { setUser, logoutUser, resetGame })(withRouter(Nav))