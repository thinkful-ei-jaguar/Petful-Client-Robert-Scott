import React, { Component } from 'react'
import Petservices from "../Petservices"
import peopleservice from '../peopleservice'
class Root extends Component {
  constructor(props){
    super(props);
    this.state={
      cats : [],
      dogs : [],
      onecat: {},
      onedog:{},
      isLoading: false,
      isLoading2:false,
      people:[]
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
    });
    Petservices.getNextInLineCats()
    .then(cats => {
      console.log(cats)
      this.setState({
        cats: cats,
      })
    });
    Petservices.getNextInLineDogs()
    .then(dogs => {
      this.setState({
        dogs: dogs,
        isLoading: true,
      })
    });
    peopleservice.getpeople()
    .then(peoples=>{
      this.setState({
        people:peoples,
        isLoading2: true,
      })
    })
    
  }

  handleDelete = (event, type) => {
    event.preventDefault();
    Petservices.deletePet(type)
    this.componentDidMount();
  }

  getALLPeople =() =>{
    return this.state.people.map(people => <div>
      <h3>next: {people}</h3>
    </div>
    )
  }


  allOtherCats = () => {
    return this.state.cats.map(cat => <div>
          <img src={cat.imageURL} alt='Cat Pic'></img>
          <h3>Name: {cat.name}</h3>
        </div>
    )
  }

  allOtherDogs = () => {
    return this.state.dogs.map(dog => 
        <div>
          <img src={dog.imageURL} alt='Dog Pic'></img>
          <h3>Name: {dog.name}</h3>
        </div>
      );
    
  }

  render(){
  return( <div>
    <h1>Petful</h1>
    <h2>next person to adopt</h2>
    {this.state.isLoading2 ? this.getALLPeople() : <div />}
    <section>
      <div className='cat'>
        <h2>Next Cat In Line for Adoption</h2>
        <img src={this.state.onecat.imageURL} alt='Cat Pic'></img>
        <h3>Name: {this.state.onecat.name}</h3>
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
        <h2>Next Dog In Line for Adoption</h2>
        <img src={this.state.onedog.imageURL} alt='Dog Pic'></img>
        <h3>Name: {this.state.onedog.name}</h3>
        <p>Age: {this.state.onedog.age}</p>
        <p>Breed: {this.state.onedog.breed}</p>
        <p>Description: {this.state.onedog.description}</p>
        <p>Gender: {this.state.onedog.gender}</p>
        <p>Story: {this.state.onedog.story}</p>
        <button onClick={e => this.handleDelete(e, 'dog')}>Adopt</button>
      </div>
    </section>

    <h2>All Other Animals In Line for Adoption</h2>

    {this.state.isLoading ? this.allOtherCats() : <div />}
    {this.state.isLoading ? this.allOtherDogs() : <div /> }
   
  </div>
  )
  }
}

export default Root
