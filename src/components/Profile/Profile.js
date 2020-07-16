import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import {editUser} from '../../redux/reducers/authReducer'
import './Profile.css'


const Profile = (props) => {

  const[newEmail, setEmail] = useState(props.email);
  const[password, setPassword] = useState('');
  const[newPassword1, setNewPassword1] = useState('');
  const[newPassword2, setNewPassword2] = useState('');
  const[newUsername, setUsername] = useState(props.username)
  const[newProfilePicture, setProfilePicture] = useState(props.profilePicture);
  const[highScores, setHighScores] = useState([])
  const[topScores, setTopScores] = useState([])
  const[toggled, setToggled] = useState(false)
  const[togglePassword, setTogglePassword] = useState(false)



 

  useEffect(() => {
    axios.get(`/game/getHighScores/${props.userId}`)
    .then((res =>
      setHighScores(res.data)))
    axios.get('/game/getTopScores').then((response =>{
      setTopScores(response.data)
    }))
  },[props.userId])


const togglePasswordFn = () => {
  setTogglePassword(!togglePassword)
}
const toggleFn = () => {
  setToggled(!toggled)
  setEmail(props.email)
setUsername(props.username)
setProfilePicture(props.profilePicture)
}




const savePassword = (event) => {
event.preventDefault()
if(newPassword1 !== newPassword2){
  return alert('New Passwords do not match!')
}
axios.put(`/profile/password/${props.userId}`, {password, newPassword1}).then(res =>{
  alert("Password Updated")
  togglePasswordFn()
}).catch(err => alert(err.response.data))
}




const saveChanges = (e) => {
  e.preventDefault()
  const body = {newUsername, newProfilePicture, newEmail}
  axios.put(`/profile/edit/${props.userId}`, body).then(res => {
    props.editUser(newUsername, newProfilePicture, newEmail)
    toggleFn()
  })
  .catch(err => alert(err.response.data))}



  const mapTopScores = topScores.map(e => <div key = {e.history_id}>
    {props.userId && topScores[0] ?
    <div>
    <img src = {e.profile_picture}/>
    <p>{e.username}</p>
    <p>{e.score}</p>
    </div>
    : null }
    </div>)





  return (
       
    <div className = "user-info">
      {/* <p>{highScores}</p> */}
      <img src={props.profilePicture} alt='user profile' />
      {toggled ? (
      <div>
        <form onSubmit={event => saveChanges(event)}>
        <div>
        <p>New Username</p>
        <input 
        value = {newUsername} 
        onChange = {e => setUsername(e.target.value)} 
        name='username'
        />
        </div>
        <div>
          <p> New Email </p>
        <input 
        value = {newEmail} 
        onChange = {e => setEmail(e.target.value)}
        name = 'email' />
        </div>
        <div>
          <p>New Profile Picture</p>
            <input 
            value = {newProfilePicture} 
            onChange = {e => setProfilePicture(e.target.value)} 
            name = 'profilePicture'/>
        </div>
        <button type='submit'>Save Changes</button>
        <button onClick = {() => toggleFn()}>Cancel</button>
        </form>
        
      </div>
      
      ):
      (togglePassword ? 
      <div>
        <form onSubmit={e => savePassword(e)}>
          <input
          className = 'password-input'
          type = 'password'
          placeholder = 'Old Password'
          value = {password}
          onChange={e => setPassword(e.target.value)}/>
          <input
          className = 'new-password1'
          type = 'password'
          placeholder = 'New Password'
          value = {newPassword1}
          onChange = {e => setNewPassword1(e.target.value)}/>
          <input
          className = 'new-password2'
          type = 'password'
          placeholder = 'Retype new Password'
          value = {newPassword2}
          onChange = {e => setNewPassword2(e.target.value)}/>
          <button type='submit'>Save Password</button>
          <button onClick = {()=> togglePasswordFn()}>Cancel</button>
        </form>
      
      </div>
        :
        <div>
        <p>{props.username}</p>
        <p>{props.email}</p>
        <button className = "edit-user" onClick ={() => toggleFn()}>Edit</button>
        <button className = "edit-user" onClick ={() =>togglePasswordFn()}>Edit Password</button>
        <div>
        <h4>Your Top Score</h4>
        {/* {console.log(highScores)} */}
        <p>{props.userId && highScores[0] ? highScores[0].score: 'You need to play first!'}</p>
        <p>{props.userId && highScores[1] ? highScores[1].score: null}</p>
        <p>{props.userId && highScores[2] ? highScores[2].score: null}</p>

        <div>
          <p>LeaderBoard:</p>
          {mapTopScores}
        </div>
        
      </div>
        </div>
        )

        
      }
      
    </div>
  );
}

const mapStateToProps = redux => redux
const mapDispatchToProps = {editUser}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);