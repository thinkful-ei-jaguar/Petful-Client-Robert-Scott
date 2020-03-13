import React, { Component } from 'react'
import Petservices from "../Petservices"

class Root extends Component {
  constructor(props){
    super(props);
    this.state={
      cats : [],
      dogs : [],
      onecat: {},
      onedog:{},
    }
  }

  componentDidMount = () => {
    Petservices.getpets()
    .then(pets => {
      console.log(pets);
      this.setState({
        onecat:pets[0],
        onedog:pets[1],
      })
      //console.log(this.state)
    })
  }

  handleDelete = (event, type) => {
    event.preventDefault();
    Petservices.deletePet(type)
    this.componentDidMount();
  }

  render(){
  return( <div>
    <h1>Petful</h1>
    <section>
      <div className='cat'>
        <img src={this.state.onecat.imageURL} alt='Cat Pic'></img>
        <h2>Name: {this.state.onecat.name}</h2>
        <p>Age: {this.state.onecat.age}</p>
        <p>Breed: {this.state.onecat.breed}</p>
        <p>Description: {this.state.onecat.description}</p>
        <p>Gender: {this.state.onecat.gender}</p>
        <p>Story: {this.state.onecat.story}</p>
        <button onClick={e => this.handleDelete(e,'cat')}>Adopt</button>
      </div>
      
    </section>

    <section>
      <div className='dog'>
        <img src={this.state.onedog.imageURL} alt='Dog Pic'></img>
        <h2>Name: {this.state.onedog.name}</h2>
        <p>Age: {this.state.onedog.age}</p>
        <p>Breed: {this.state.onedog.breed}</p>
        <p>Description: {this.state.onedog.description}</p>
        <p>Gender: {this.state.onedog.gender}</p>
        <p>Story: {this.state.onedog.story}</p>
        <button onClick={e => this.handleDelete(e, 'dog')}>Adopt</button>
      </div>
    </section>
    
  </div>
  )
  }
}

export default Root
