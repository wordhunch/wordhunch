import React, { useState, useEffect } from 'react'
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
  const [menu, setMenu] = useState(false);

  const login = e => {
    e.preventDefault()
    if(loginValue === '' || password === ''){
      return setErrorResponse('Please enter username and password.')
    }
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
        // props.history.push('/')
        setValue('')
        setPassword('')
        setErrorResponse('')
        setMenu(false)
      })
      .catch(err => setErrorResponse(err.response.data))
    // console.log(err)

  }


  const resetInputs = () => {
    setValue('')
    setPassword('')
  }

  const toggleMenu = () => setMenu(!menu)
    
  useEffect(() => {props.auth.username && setErrorResponse('')},[props.auth.username])
  

  const handleMenu = () => {
    if(menu === true){
      setMenu(false)
    }
    setValue('')
    setPassword('')
  }

  
  const logout = () => {
    axios
      .delete('/auth/logout')
      .then(res => {
        props.history.push('/')
      })
    props.logoutUser()
    handleMenu()
  }

  return (
    <div className='Nav'>

      <div className="logo-container" >
        <Link to='/'>
          <img
            onClick = {handleMenu}
            className='app-logo'
            src={logo}
            alt='WordLogic logo'
          />
        </Link>
      </div>

      <div className='play-container'>
        <Link to='/play'><button onClick={handleMenu} className="play-btn">
          { !props.game.gameStarted || props.game.gameOver || props.game.gaveUp
          ? 'Play'
          : 'Continue'}
        </button></Link>
      </div>

      <p className='error'>{errorResponse}</p>
      
      {!props.auth.username 
        ? 
        <div className='not-loggedin'>
          <form className ='form' onSubmit={e => login(e)}>
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
        <Link to='/auth'><button className="register-btn" onClick={resetInputs}>Register</button></Link>
        <Link to='/about'><button className="about-btn" onClick={resetInputs}>About</button></Link>
        </div> 
        :
        <div className='logged-in'>
          <Link to='/profile'><button className="profile-btn">Profile</button></Link>
          <button className="logout-btn" onClick={logout}>Logout</button>
          <Link to='/about'><button className="about-btn" onClick={resetInputs}>About</button></Link>
        </div>}

      
    <div className = 'hamburger-menu' onClick= {toggleMenu}>
      <div className = 'hamburger-line'></div>
      <div className = 'hamburger-line'></div>
      <div className = 'hamburger-line'></div>
    </div>
    <div className = {`menu ${menu ? 'menu-active': null}`}>
    {!props.auth.username 
        ? 
        <div className='menu-no-user'>
          <form className='menu-form' onSubmit={e => login(e)}>
            <input
              className='menu-login-input'
              type='text'
              placeholder='username or email'
              value={loginValue}
              onChange={e => setValue(e.target.value)}
            />
            <input
              className='menu-login-input'
              type='password'
              placeholder='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <p className='menu-error'>{errorResponse}</p>
            <button className="menu-login" type='submit'>Login</button>
          </form>
        <Link to='/auth'><button onClick = {handleMenu} className="menu-register">Register</button></Link>
        <Link to='/about'><button onClick = {handleMenu} className="menu-about">About</button></Link>
        </div> 
        :
        <div className='menu-user'>
          <Link to='/profile'><button onClick = {handleMenu} className="menu-profile">Profile</button></Link>
          <button className="menu-logout" onClick={logout}>Logout</button>
          <Link to='/about'><button onClick = {handleMenu} className="menu-about">About</button></Link>
        </div>}
</div>
    </div>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { setUser, logoutUser, resetGame })(withRouter(Nav))