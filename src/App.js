import React from 'react';
import Nav from './components/Nav'
import routes from './routes'
import './styles/App.css'

function App() {
  return (
    <div className="App">
      <Nav/>
      {routes}
    </div>
  );
}

export default App