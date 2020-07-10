import React from 'react';
import About from './About'
import {Link} from 'react-router-dom'
import templogo from '../images/templogo.png'

const Nav = () => {
  return (
    <div>
      <Link to='/'><img className='app-logo' src={templogo} alt='WordHunch logo' style={{width: "120px"}} /></Link>
      <Link to='/auth'>Register</Link>
      <Link to='/profile'>Profile</Link>
      <About/>
    </div>
  );
}

export default Nav;
