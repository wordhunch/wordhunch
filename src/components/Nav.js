import React, { useState } from 'react'
import axios from 'axios'
import templogo from '../images/templogo.png'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUser } from '../redux/reducers/authReducer'
import About from "./About";
import '../styles/Nav.css'
import session from 'express-session'

const Nav = props => {
  const [loginValue, setValue] = useState('')
  const [password, setPassword] = useState('')
  const [about, setAbout] = useState(false)

  const login = e => {
    e.preventDefault()
    axios
      .post('/auth/login', { loginValue, password })
      .then(res => {
        props.setUser(res.data)
        props.history.push('/profile')
        console.log('logged in')
        setValue('')
        setPassword('')
      })
      .catch(err => {
        // alert(err.response.data);
        console.log(err)
      })
  }

  const logout = () => {
    axios
      .delete('/auth/logout')
      .then(res => {
        props.setUser(res.data)
        props.history.push('/')
      })
  }

  const toggleAbout = () => {
    setAbout(!about);
  };

  return (
    <div className='Nav'>
      <Link to='/'>

        <img
          className='app-logo'
          src={templogo}
          alt='WordHunch logo'
          style={{ width: '120px' }}
        />
      </Link>

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
          <button type='submit'>Login</button>
        </form>
        <Link to='/auth'><button>Register</button></Link>
      </div> :
      <div className='logged-in'>
        <Link to='/profile'><button>Profile</button></Link>
        <button onClick={logout}>Logout</button>
       <button onClick={toggleAbout}>About</button>
      </div>}
      {!about ? null : <About about={about}/>}
    </div>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { setUser })(withRouter(Nav))