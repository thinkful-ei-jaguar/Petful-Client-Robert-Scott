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
      name:'',
      iAmUser:false,
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
      this.setState({
        onecat:pets[0],
        onedog:pets[1],
      })
    });
    Petservices.getNextInLineCats()
    .then(cats => {
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
    //this.every5seconds();
  }

  every5seconds=(e)=>{
    e.preventDefault();
    var deletepeople=setInterval(
      function(){ 
        var pet=Math.floor(Math.random() * 2); 
        console.log(pet);
        if(pet===1){
          this.handleAdopt(e,'cat')
        }else{
          this.handleAdopt(e,'dog')
        }
      }, 5000);
      if(this.state.iAmUser){
        clearInterval(deletepeople)
    }
  }
  add5people=()=>{

  }
  handleChangeName=(event)=> {
    this.setState({name: event.target.value});
  }
  handleSubmit = (e) =>{
    e.preventDefault();
    const newp =this.state.name;
    peopleservice.addperson(this.state.name);
    this.setState({
      name:'',
      people:[...this.state.people,newp]
    });
    this.componentDidMount();
  }

  handleAdopt = (event, type) => {
    event.preventDefault();
    Petservices.deletePet(type);
    let personAndAnimal = {}
    if(type === 'cat') {
      personAndAnimal = 
      {
        'pet': this.state.onecat, 
        'person': this.state.people[0]
      }
      const length =this.state.people.length
      const newpeople = this.state.people.slice(1,length);
      peopleservice.dq();
      this.setState({
        people: newpeople,
        whoAdoptedAnimal: [...this.state.whoAdoptedAnimal, personAndAnimal],
        isLoading3: true,
      })
    } else {
      personAndAnimal = 
      {
        'pet': this.state.onedog, 
        'person': this.state.people[0]
      }
      const length =this.state.people.length
      const newpeople = this.state.people.slice(1,length);
      peopleservice.dq();
      this.setState({
        people:newpeople,
        whoAdoptedAnimal: [...this.state.whoAdoptedAnimal,personAndAnimal],
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
    return this.state.whoAdoptedAnimal.map((animalandperson, idx)=>{
    return(<div key={idx}>
    <h3>{animalandperson.person} adopted {animalandperson.pet.name}!!</h3>
    </div> 
    )
    })
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

    <form onSubmit={this.handleSubmit}>
      
      <label className='joinWaitlist'>Join the Waitlist:
      <input value={this.state.name} onChange={this.handleChangeName} className='waitlistInput' type='text'></input></label>
      <input className='waitlistSubmit' type='submit'></input>
    </form>

    <h2>Adoption Waitlist</h2>
    {this.state.isLoading2 ? this.getALLPeople() : <div />}
    <section>
      <div className='cat'>
        <h2>Adopt this Cat!</h2>
        <img className='singleCatImg'src={this.state.onecat.imageURL} alt='Cat Pic'></img>
        <h3>Name: {this.state.onecat.name}</h3>
        <p>Age: {this.state.onecat.age}</p>
        <p>Breed: {this.state.onecat.breed}</p>
        <p>Description: {this.state.onecat.description}</p>
        <p>Gender: {this.state.onecat.gender}</p>
        <p>Story: {this.state.onecat.story}</p>
        {this.state.people.length ? <button className='adoptButton' onClick={e => this.handleAdopt(e,'cat')}>Adopt</button> : <div />}
      </div>

    </section>

    <section>
      <div className='dog'>
        <h2>Adopt this Dog!</h2>
        <img className='singleDogImg' src={this.state.onedog.imageURL} alt='Dog Pic'></img>
        <h3>Name: {this.state.onedog.name}</h3>
        <p>Age: {this.state.onedog.age}</p>
        <p>Breed: {this.state.onedog.breed}</p>
        <p>Description: {this.state.onedog.description}</p>
        <p>Gender: {this.state.onedog.gender}</p>
        <p>Story: {this.state.onedog.story}</p>
        {this.state.people.length ?<button className='adoptButton' onClick={e => this.handleAdopt(e, 'dog')}>Adopt</button> : <div />}
      </div>
    </section>

    <h2>Successful Adoption List:</h2>
    {this.state.isLoading3 ? this.getWhoAdopted() : <div />}

    <h2>All Other Animals In Line for Adoption:</h2>
    <div className='otherAnimals'>
      {this.state.isLoading ? this.allOtherCats() : <div />}
      {this.state.isLoading ? this.allOtherDogs() : <div /> }
    </div>
  </div>
  )
  }
}

export default Root
