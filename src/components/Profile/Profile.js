import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import {editUser} from '../../redux/reducers/authReducer'
import './Profile.css'

const Profile = (props) => {

  const[newEmail, setEmail] = useState(props.email);
  const[newPassword, setPassword] = useState('');
  const[newUsername, setUsername] = useState(props.username)
  const[newProfilePicture, setProfilePicture] = useState(props.profilePicture);
  const[highScores, setHighScores] = useState([])
  const[toggled, setToggled] = useState(false)

  const handleUsername = event =>setUsername(event.target.value)
  const handleEmail = event =>setEmail(event.target.value) 
  const handleProfilePicture = event =>setProfilePicture(event.target.value) 


  useEffect(()=> setToggled(false),[])
  // useEffect(()=> {
  //   axios.get(`profile/view/${props.userId}`)
  //   .then((res) => {
  //     const {username, email, profile_picture} = res.data[0];
  //     setEmail(email)
  //     setUsername(username)
  //     setProfilePicture(profile_picture)
  //     console.log(username);
  //     console.log(email);
    // })
    // axios.get(`/game/getHighScores/${props.user_id}`)
    // .then((res =>
    //   setHighScores(res.data)))
//   })
// })
const toggleFn = () => {
  setToggled(!toggled)
setEmail(props.email)
setUsername(props.username)
setProfilePicture(props.profilePicture)
}

const saveChanges = () => {
  const body = {newUsername, newProfilePicture, newEmail}
  axios.put(`/profile/edit/${props.userId}`, body).then(res => {

  })
  props.editUser(newUsername, newProfilePicture, newEmail)
}
  return (

    <div className = "user-info">
      {/* <p>{highScores}</p> */}
      <img src={props.profilePicture}/>
      {toggled ? (
      <div>
        <div>
        <p>New Username</p>
        <input value = {newUsername} onChange = {(event) => handleUsername(event)} name='username'  />
        </div>
        <div>
          <p> New Email </p>
        <input value = {newEmail} onChange = {(event) => handleEmail(event)} name = 'email' />
        </div>
        <div>
          <p>New Profile Picture</p>
            <input value = {newProfilePicture} onChange = {(event) => handleProfilePicture(event)} name = 'profilePicture'/>
        </div>
        <button onClick = {saveChanges, toggleFn}>Save Changes</button>
        <button onClick = {() => toggleFn()}>Cancel</button>
      </div>
      
      ): (
        <div>
        <p>{props.username}</p>
        <p>{props.email}</p>
        <button className = "edit-user" onClick ={() => toggleFn()}>Edit</button>
        </div>
      )}
      
    </div>
  );
}

const mapStateToProps = redux => redux
const mapDispatchToProps = {editUser}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);