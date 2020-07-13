import React from 'react';
import Nav from './components/Nav'
import routes from './routes'

function App() {
  return (
    <div className="App">
      <Nav/>
      {routes}
    </div>
  );
}

export default App