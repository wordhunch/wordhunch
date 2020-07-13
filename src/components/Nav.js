import React, { useState } from 'react'
import axios from 'axios'
import templogo from '../images/templogo.png'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUser } from '../redux/reducers/authReducer'

const Nav = props => {
  const [loginValue, setValue] = useState('')
  const [password, setPassword] = useState('')

  const login = e => {
    e.preventDefault()
    axios
      .post('/auth/login', { loginValue, password })
      .then(res => {
        props.setUser(res.data)
        props.history.push('/profile')
        console.log('logged in')
      })
      .catch(err => {
        // alert(err.response.data);
        console.log(err)
      })
  }

  return (
    <div>
      <Link to='/'>
        <img
          className='app-logo'
          src={templogo}
          alt='WordHunch logo'
          style={{ width: '120px' }}
        />
      </Link>

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
          <button type='submit'>Login</button>
        </form>
        <Link to='/auth'>Register</Link>
      </div>
      <div className='logged-in'>
        <Link to='/profile'>Profile</Link>
        <button>About</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { setUser })(Nav)
