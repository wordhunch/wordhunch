import React, { useState } from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {setUser} from '../../redux/reducers/authReducer'
import {connect} from 'react-redux'
import './Auth.css'
import eye from '../../images/eye.svg'
import eye2 from '../../images/eye-off.svg'

const Auth = (props) => {

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[username, setUsername] = useState('')
  const[profile_picture] = useState('https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg');
  const [errorResponse, setErrorResponse] = useState('')
  const [passwordToggle, setPasswordImg] = useState(false)
  const [type, setType] = useState('password')

  const togglePassword = () => {
    setPasswordImg(!passwordToggle)
    type === 'password' ? setType('username') : setType('password')
  }

  const registerUser = (e) => {
    e.preventDefault()
    if(username === '' || password === ''){
      return setErrorResponse('Please enter username and password.')
    }
    axios.post('/auth/register', {email, password, username, profile_picture})
        .then((res) => {
          const {username, user_id} = res.data
          props.setUser(
            username,
            user_id,
            profile_picture,
            email
          )
           props.history.push("/")

        }).catch((err)=> setErrorResponse(err.response.data))        
    }

  return (
    <div className= 'main-auth'>
      <div className = 'auth-content'>
        <form onSubmit={e => registerUser(e)}>
          <div className = 'auth-div'>
            <p>Email:</p>
            <input 
              className ="register-input email" 
              value = {email} 
              name = "email" 
              placeholder = "email" 
              onChange={e => setEmail(e.target.value)}/>
          </div>

          <div className = 'auth-div'>
            <p>Username:</p>
           
            <input 
              className ="register-input username"
              value = {username} 
              maxLength = '12'
              name = "username" 
              placeholder = "username" 
              onChange={e => setUsername(e.target.value)}/>
          </div>

          <div className = 'auth-div'>
            <p>Password:</p>
            <div className = 'input-container'>
            {passwordToggle ?  
            <img onClick= {togglePassword} src = {eye} alt='show password'/>
            :
            <img onClick= {togglePassword} src = {eye2} alt='show password'/>}
            <input 
              className ="register-input password" 
              value = {password} 
              name = 'password'
              type = {type}
              placeholder = "password" 
              onChange={e => setPassword(e.target.value)}/>
              </div>
          </div>

          <button type='submit'>Register</button>

          <div className='err-message'>{errorResponse}</div>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {setUser})(withRouter(Auth))