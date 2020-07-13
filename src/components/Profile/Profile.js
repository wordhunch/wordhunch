import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import './Profile.css'

const Profile = (props) => {

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[username, setUsername] = useState('')
  const[profile_picture, setProfile_picture] = useState('');
  const[highScores, setHighScores] = useState([])
  const[toggled, setToggled] = useState(false)


  useEffect(()=> {
    // setEmail("hello")
    //   setUsername("hello")
    //   setProfile_picture('https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg')
    axios.get(`profile/view/${props.username.user_id}`)
    .then((res) => {
      const {username, email, profile_picture} = res.data[0];
      setEmail(email)
      setUsername(username)
      setProfile_picture(profile_picture)
      console.log(username);
      console.log(email);
      
      
    // })
    // axios.get(`/game/getHighScores/${props.user_id}`)
    // .then((res =>
    //   setHighScores(res.data)))
  })
})

  return (

    <div className = "user-info">
      {/* <p>{highScores}</p> */}
      <img src={profile_picture}/>
      {toggled ? (
      <div>
        <input value = {username} />
        <input value = {email} />
        <button>Save Changes</button>
      </div>
      
      ): (
        <div>
        <p>{username}</p>
        <p>{email}</p>
        <button className = "edit-user">Edit</button>
        </div>
      )}
      
    </div>
  );
}

const mapStateToProps = redux => redux

export default connect(mapStateToProps)(Profile);
