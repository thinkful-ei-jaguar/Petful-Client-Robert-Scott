import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Petservices from "../Petservices"

class Landing extends Component {
 
  render(){
  return( <div>
    <h1>Petful</h1>
    <img src ="https://www.thelabradorsite.com/wp-content/uploads/2018/04/cool-dog-breeds-header.jpg" alt="pl"/>
   <h2>this is a page about adopting dogs and cats and we ant to get rid of the ones who came first.</h2>
    
    
    <Link to="/adoption"><button>start</button></Link>
  </div>
  )
  }
}

export default Landing