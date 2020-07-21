import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { editUser } from "../../redux/reducers/authReducer";
import "./Profile.css";

const Profile = (props) => {
  const {email, profilePicture, userId, username} = props.auth
  const [newEmail, setEmail] = useState(email);
  const [password, setPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [newUsername, setUsername] = useState(username);
  const [newProfilePicture, setProfilePicture] = useState(profilePicture);
  const [highScores, setHighScores] = useState([]);
  const [topScores, setTopScores] = useState([]);
  const [toggled, setToggled] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const [errResponse, setErrResponse] = useState('')

  useEffect(() => {
    axios
      .get(`/game/getHighScores/${userId}`)
      .then((res) => setHighScores(res.data));
    axios
      .get("/game/getTopScores")
      .then((res) => setTopScores(res.data));
    setErrResponse('')
  }, [userId]);

  const togglePasswordFn = () => {
    setTogglePassword(!togglePassword);
    setErrResponse('')
  };
  const toggleFn = () => {
    setToggled(!toggled);
    setErrResponse('')
    setEmail(email);
    setUsername(username);
    setProfilePicture(profilePicture);
  };

  const savePassword = (event) => {
    event.preventDefault();
    if (newPassword1 !== newPassword2) {
      return alert("New Passwords do not match!");
    }
    axios
      .put(`/profile/password/${userId}`, { password, newPassword1 })
      .then((res) => {
        alert("Password Updated");
        togglePasswordFn();
      })
      .catch((err) => setErrResponse(err.response.data));
  };

  const saveChanges = (e) => {
    e.preventDefault();
    const body = { newUsername, newProfilePicture, newEmail };
    axios
      .put(`/profile/edit/${userId}`, body)
      .then((res) => {
        props.editUser(newUsername, newProfilePicture, newEmail);
        toggleFn();
        setErrResponse('')
      })
      .catch((err) => setErrResponse(err.response.data));
  };

  const mapTopScores = topScores.map((e, i) => (
    <div key={e.history_id}>
      {userId && topScores[0] ? (
        <div className = 'top-score-user'>
          <p>#{1 + i} </p>
          <img src={e.profile_picture} alt="user profile" />
          <p>{e.username}</p>
          <p className= 'score'>Score: {e.score}</p>
        </div>
      ) : null}
    </div>
  ));

  return (
    <div className="user-info">
      <div className="main-profile">
        <div className="main-user">
          <div className= "profile-info">
            {/* <p>{highScores}</p> */}

            {toggled 
              ? (
                <div>
                  <form onSubmit={(event) => saveChanges(event)}>
                    <div>
                      <p>New Username</p>
                      <input
                        value={newUsername}
                        onChange={(e) => setUsername(e.target.value)}
                        name="username"
                      />
                    </div>
                    <div>
                      <p> New Email </p>
                      <input
                        value={newEmail}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                      />
                    </div>
                    <div className = 'profile-picture'>
                      <p>New Profile Picture</p>
                      <input
                        value={newProfilePicture}
                        onChange={(e) => setProfilePicture(e.target.value)}
                        name="profilePicture"
                      />
                    </div>
                    <button type="submit">Save Changes</button>
                    <button onClick={() => toggleFn()}>Cancel</button>
                  </form>
                </div>
              ) 
              : togglePassword 
              ? (
                <div>
                  <form onSubmit={(e) => savePassword(e)}>
                    <div>
                      <p>Old Password:</p>
                      <input
                        className="password-input"
                        type="password"
                        placeholder=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <p>New Password</p>
                      <input
                        className="new-password1"
                        type="password"
                        placeholder=""
                        value={newPassword1}
                        onChange={(e) => setNewPassword1(e.target.value)}
                      />
                    </div>
                    <div>
                      <p>Retype New Password</p>
                      <input
                        className="new-password2"
                        type="password"
                        placeholder=""
                        value={newPassword2}
                        onChange={(e) => setNewPassword2(e.target.value)}
                      />
                    </div>
                    <button type="submit">Save Password</button>
                    <button onClick={() => togglePasswordFn()}>Cancel</button>
                  </form>
                </div>
              ) 
              : (
                <div>
                  <img src={profilePicture} alt="user profile" />
                  <h4>{username}</h4>
                  <h4>{email}</h4>
                  <div>
                    <button className="edit-user" onClick={() => toggleFn()}>
                      Edit User
                    </button>
                    <button className="edit-user" onClick={() => togglePasswordFn()}>
                      Edit Password
                    </button>
                  </div>
                </div>
              )
            }
            <div>{errResponse}</div>
            </div>
          <h5>Your Top Scores</h5>
            {userId && highScores[0] ? <p>1. {highScores[0].score}</p> : <p>You need to play first!</p>}
            {userId && highScores[1] ? <p>2. {highScores[1].score}</p> : null}
            {userId && highScores[2] ? <p>3. {highScores[2].score}</p> : null}
        </div>
        <div className = 'top-scores'>
          <h5>Leaderboard:</h5>
          {mapTopScores}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (redux) => redux;
const mapDispatchToProps = { editUser };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
