import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './landing.css';

class Landing extends Component {
 
  render(){
  return( <div className='main'>
    <h1 className='Logo'>Petful</h1>
    <img className='mainImg' src ="https://www.thelabradorsite.com/wp-content/uploads/2018/04/cool-dog-breeds-header.jpg" alt="pl"/>
   <h2 >Petful's mission is to make sure each animal brought in gets adopted. We only have dogs or cats available, and we ensure that which animal has been here the longest gets adopted first. This also applies to the owners who visit the site, whoever comes first has first dibs on adoption! Explore and enjoy!</h2>
    <Link className='startButton' to="/adoption">Start!</Link>
  </div>
  )
  }
}

export default Landing