import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Petservices from '../Petservices';
import peopleservice from '../peopleservice';
import './Root.css';
class Root extends Component {
  constructor(props){
    super(props);
    this.state={
      cats : [],
      dogs : [],
      onecat: {},
      onedog:{},
      isLoading: false,
      isLoading2: false,
      isLoading3: false,
      people:[],
      whoAdoptedAnimal: [],
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
    });
    peopleservice.addperson()
    .then(person => {
      this.setState({
        people: [...this.state.people, person],
        
      })
    })
  }

  handleDelete = (event, type) => {
    event.preventDefault();
    Petservices.deletePet(type);
    let personAndAnimal = {}
    if(type === 'cat') {
      personAndAnimal = 
      {
        'pet': this.state.onecat, 
        'person': this.state.people[0]
      }
      this.setState({
        whoAdoptedAnimal: personAndAnimal,
        isLoading3: true,
      })
    } else {
      personAndAnimal = 
      {
        'pet': this.state.onedog, 
        'person': this.state.people[0]
      }
      this.setState({
        whoAdoptedAnimal: personAndAnimal,
        isLoading3: true,
      })
    }
    this.componentDidMount();
  }

  getALLPeople = () => {
    return this.state.people.map((people, idx) => <div key={idx}>
      <h3 >{people}</h3>
    </div>
    )
  }

  getWhoAdopted = () => {
    console.log(this.state.whoAdoptedAnimal)
    return (<div>
    <h3>{this.state.whoAdoptedAnimal.person} adopted {this.state.whoAdoptedAnimal.pet.name}!!</h3>
    </div> 
    )
  }

  allOtherCats = () => {
    return this.state.cats.map((cat, idx) => <div key={idx}>
          <img className='otherCats' src={cat.imageURL} alt='Cat Pic'></img>
          <h3>Name: {cat.name}</h3>
        </div>
    )
  }

  allOtherDogs = () => {
    return this.state.dogs.map((dog, idx) => 
        <div key={idx}>
          <img className='otherDogs'src={dog.imageURL} alt='Dog Pic'></img>
          <h3>Name: {dog.name}</h3>
        </div>
      );
  }



  render(){
  return( <div className='main'>
    <Link to="/" className='Logo'>Petful</Link>
    <h2>Completed Adoptions</h2>
    {this.state.isLoading3 ? this.getWhoAdopted() : <div />}
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
    <div className='otherAnimals'>
      {this.state.isLoading ? this.allOtherCats() : <div />}
      {this.state.isLoading ? this.allOtherDogs() : <div /> }
    </div>
  </div>
  )
  }
}

export default Root
