import React from 'react'
import './About.css'
import githubIcon from '../../images/githubIcon.png'

const About = () => {
  return (
    <div className='About'>
      <h3>
        <span>WordLogic is a project made for </span>
        <a href='https://devmountain.com/' className='devmtn-link'>
          DevMountain
        </a>
        's Web Development course
      </h3>
      <h2>Created by:</h2>
      <div className='about-container'>
        <div className='creator-info'>
          <p>Ben Thomsen</p>
          <img
            className='creator-picure'
            src='https://avatars1.githubusercontent.com/u/63511222?s=460&u=2f87052eb9a28d2bb5c85188e43905a5bb5fe5d1&v=4'
            alt='Ben Thomsen'
          />
          <a href='https://github.com/Jamin13P'>
            <img className='github-icon' src={githubIcon} alt='Ben-github' />
          </a>
        </div>
        <div className='creator-info'>
          <p>David Carlson</p>
          <img
            className='creator-picure'
            src='https://avatars3.githubusercontent.com/u/47411708?s=460&u=10de9ed6c48b0e7095aada09b4daca951399c279&v=4'
            alt='David Carlson'
          />
          <a href='https://github.com/darlson'>
            <img className='github-icon' src={githubIcon} alt='David-github' />
          </a>
        </div>
        <div className='creator-info'>
          <p>Stephen Snell</p>
          <img
            className='creator-picure'
            src='https://avatars3.githubusercontent.com/u/58757999?s=460&u=19374181206af61d7eb0c5759f982e96abc6c64b&v=4'
            alt='Stephen Snell'
          />
          <a href='https://github.com/ssnell227'>
            <img
              className='github-icon'
              src={githubIcon}
              alt='Stephen-github'
            />
          </a>
        </div>
        <div className='creator-info'>
          <p>Sam Tanner</p>
          <img
            className='creator-picure'
            src='https://avatars1.githubusercontent.com/u/64330760?s=460&u=5fb03634a0e6052c3a02a44569a6a1b6386cf778&v=4'
            alt='Sam Tanner'
          />
          <a href='https://github.com/sammyt090'>
            <img 
              className='github-icon' 
              src={githubIcon} 
              alt='Sam-github' />
          </a>
        </div>
      </div>
      <a className='code-link' href='https://github.com/wordhunch/wordhunch'>
        <div>
          <img 
            className='github-icon' 
            src={githubIcon} 
            alt='wordLogic-github' />
          <br/>
          View the code
        </div>
      </a>
    </div>
  )
}

export default About
