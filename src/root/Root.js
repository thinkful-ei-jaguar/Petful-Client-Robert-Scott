import React, { Component } from 'react'
import Petservices from "../Petservices"

class Root extends Component {
  constructor(props){
    super(props);
    this.state={
      cats : [],
      dogs : [],
      onecat:null,
      onedog:null,
    }
  }

  componentDidMount(){
    Petservices.getpets()
    .then(pets=>{
      console.log(pets);
      this.setState({
        onecat:pets[0],
        onedog:pets[1],
      })
      //console.log(this.state)
    })
  }

  render(){
  return( <div>
    <h1>Petful</h1>
  </div>
  )
  }
}

export default Root
