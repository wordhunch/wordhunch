import React, { useState } from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {setUser} from '../../redux/reducers/authReducer'
import {connect} from 'react-redux'
import './Auth.css'

const Auth = (props) => {


  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[username, setUsername] = useState('')
  const[profile_picture] = useState('https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg');
  const [errorResponse, setErrorResponse] = useState('')


  const registerUser = (e) => {
    e.preventDefault()
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
          
           
           
        }).catch((err)=> alert(err.response.data))
        
    }
   
   


  return (
    <div>
      <form onSubmit={e => registerUser(e)}>
        
      <input 
      className ="register-input email" 
      value = {email} 
      name = "email" 
      placeholder = "email" 
      onChange={e => setEmail(e.target.value)}/>
      <input 
      className ="register-input password" 
      value = {password} 
      name = "password" 
      placeholder = "password" 
      onChange={e => setPassword(e.target.value)}/>
      <input 
      className ="register-input username"
      value = {username} 
      name = "username" 
      placeholder = "username" 
      onChange={e => setUsername(e.target.value)}/>

    <button type='submit'>Register</button>
    </form>
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {setUser})(withRouter(Auth));
