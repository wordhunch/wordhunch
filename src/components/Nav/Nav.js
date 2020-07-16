import React, { useState } from 'react'
import axios from 'axios'
import templogo from '../../images/templogo.png'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUser } from '../../redux/reducers/authReducer'
import './Nav.css'

const Nav = props => {
  const [loginValue, setValue] = useState('')
  const [password, setPassword] = useState('')

  const login = e => {
    e.preventDefault()
    axios
      .post('/auth/login', { loginValue, password })
      .then(res => {
        const {username, user_id, profile_picture, email} = res.data
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
      })
      .catch(err => alert(err.response.data))
        // console.log(err)
      
  }

  const logout = () => {
    axios
      .delete('/auth/logout')
      .then(res => {
        props.setUser(res.data)
        props.history.push('/')
      })
  }

  return (
    <div className='Nav'>
      <div className="logo-container">
      <Link to='/'>
        <img
          className='app-logo'
          src={templogo}
          alt='WordHunch logo'
          style={{ width: '120px' }}
        />
      </Link>
      </div>
      {!props.username ? <div className='not-loggedin'>
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
      </div> :
      <div className='logged-in'>
        <Link to='/profile'><button className="profile-btn">Profile</button></Link>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>}
      <Link to='/about'><button className="about-btn">About</button></Link>
    </div>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { setUser })(withRouter(Nav))