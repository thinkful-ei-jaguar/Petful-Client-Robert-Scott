import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Petservices from "../Petservices"
import './landing.css'
class Landing extends Component {
 
  render(){
  return( <div className='main'>
    <p className='Logo'>Petful</p>
    <h1>Welcome to Petful!</h1>
    <img src ="https://www.thelabradorsite.com/wp-content/uploads/2018/04/cool-dog-breeds-header.jpg" alt="pl"/>
   <h2>Petful's mission is to make sure each animal we bring in gets adopted. We only have dogs or cats available, and we ensure that whoever has been here the longest gets adopted first. This also applies to the owners who visit the site, whoever comes first has first dibs on adoption! Explore and enjoy!</h2>
    <Link to="/adoption"><button className='startButton'>Begin Your Adoption!</button></Link>
  </div>
  )
  }
}

export default Landing