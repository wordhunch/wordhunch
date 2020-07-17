import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux'
import axios from 'axios'
import Nav from './components/Nav/Nav'
import routes from './routes'
import {setUser} from './redux/reducers/authReducer'
import './styles/App.css'


function App() {
  const dispatch = useDispatch()

  //persistent login
  useEffect(() => {
    axios.get('/auth/getUser')
    .then(res => {
      const {username, user_id, profile_picture, email} = res.data
      dispatch(setUser(username, user_id, profile_picture, email))
    })
    
  }, [])
  return (
    <div className="App">
      <Nav/>
      {routes}
    </div>
  );
}

export default App