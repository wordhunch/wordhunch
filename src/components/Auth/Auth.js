import React, { useState } from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {setUser} from '../../redux/reducers/authReducer'
import {connect} from 'react-redux'

const Auth = (props) => {


  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[username, setUsername] = useState('')
  const[profile_picture] = useState('https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg');


  const registerUser = () => {
    axios.post('/auth/register', {email, password, username, profile_picture})
        .then((res) => {
          const {username, user_id} = res.data
          props.setUser(
            username,
            user_id
          )
           props.history.push("/")
          
           
           
        }).catch((err)=> console.log(err))
        
    }

    const handleEmail = event =>setEmail(event.target.value) 
    const handlePassword = event =>setPassword(event.target.value)
    const handleUsername = event =>setUsername(event.target.value)



  return (
    <div>
      <input 
      className ="register-input email" value = {email} name = "email" placeholder = "email" onChange={(event) => handleEmail(event)}/>
      <input 
      className ="register-input password" value = {password} name = "password" placeholder = "password" onChange={(event) => handlePassword(event)}/>
      <input 
      className ="register-input username" value = {username} name = "username" placeholder = "username" onChange={(event) => handleUsername(event)}/>
    <button onClick ={registerUser}>Register</button>
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {setUser})(Auth);
