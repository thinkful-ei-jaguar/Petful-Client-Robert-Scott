/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Petservices from '../Petservices';
import peopleservice from '../peopleservice';
import './Root.css';
class Root extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      cats : [],
      dogs : [],
      onecat: {},
      onedog:{},
      name:'',
      iamthisperson:'',
      iAmUser: false,
      isLoading: false,
      isLoading2: false,
      isLoading3: false,
      people:[],
      whoAdoptedAnimal: [],
      interval1:null,
      interval2: null,
      aretherepeople:false,
      nomorecats:false,
      nomoredogs:false,
    }
  }

  componentDidMount = () => {
    Petservices.getpets()
    .then(pets => {
      this.setState({
        onecat: pets[0],
        onedog: pets[1],
      })
    })

    Petservices.getNextInLineCats()
    .then(cats => {
      this.setState({
        cats: cats,
      })
    })
 
    Petservices.getNextInLineDogs()
    .then(dogs => {
      this.setState({
        dogs: dogs,
        isLoading: true,
      })
    });

    peopleservice.getpeople()
    .then(peoples => {
      this.setState({
        people: peoples,
        isLoading2: true,
      }) 
    });

    this.setState({
      interval1: this.every5seconds(),
    })
  }

   updateState = () => {
    Petservices.getpets()
    .then(pets => {
      if(pets.length == 2){
        this.setState({
          onecat: pets[0],
          onedog: pets[1],
        })
      }
      else if(pets.length == 1 && !this.state.cats.length) {
          this.setState({
            onedog: pets[0],
            onecat:{},
          })
      }
      else if(pets.length == 1 && !this.state.dogs.length) {
        this.setState({
          onecat: pets[0],
          onedog:{},
        })
      }
    });

   Petservices.getNextInLineCats()
      .then(cats => {
        this.setState({
          cats: cats,
          isLoading: true,
        })
        if(!this.state.cats.length) {
          this.setState({
            nomorecats:true,
          })
        }
      })
    Petservices.getNextInLineDogs()
    .then(dogs => {
      this.setState({
        dogs: dogs,
        isLoading: true,
      })
      if(!this.state.dogs.length) {
        this.setState({
          nomoredogs:true,
        })
      }
    })
    peopleservice.getpeople()
    .then(peoples => {
      this.setState({
        people: peoples,
        isLoading2: true,
      }) 
      if(this.state.people == []){
        this.setState({
          aretherepeople: true
        })
      }
    });
  }

  handleChangeName = (event) => {
    this.setState({name: event.target.value});
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    let newp = this.state.name;
    peopleservice.addperson(this.state.name);
    this.setState({
      name: '',
      iamthisperson: newp,
      people: [...this.state.people,newp],
      iAmUser: true,
      interval2: this.every5seconds2(),
    });
    this.updateState();
  }

  handleAdoptForUser = (event, type) => {
    event.preventDefault();
    let personAndAnimal = {};
    //if cat is selected for adoption
    if(type === 'cat') {
      //set an object for pet & person
      personAndAnimal = 
      {
        'pet': this.state.onecat, 
        'person': this.state.people[0]
      }
      const length = this.state.people;

      //if no one in state or the first person in the list is eql to user, exit function
      //and do not show adopt button
      //slice the 1st person in list
      const newpeople = this.state.people.slice(1,length);
      //run the dq function
      peopleservice.dq();
      //set the new state with one less person and the data for who adopted which animal
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
      const length = this.state.people.length
      const newpeople = this.state.people.slice(1,length);
      peopleservice.dq();
      this.setState({
        people:newpeople,
        whoAdoptedAnimal: [...this.state.whoAdoptedAnimal,personAndAnimal],
        isLoading3: true,
      })
    }
    if(this.state.people[0] == this.state.iamthisperson){
      this.setState({
        iAmUser: false,
        iamthisperson: '',
      })
    }
    Petservices.deletePet(type);
    this.updateState();
  }

  handleAdopt = (type) => {
    // event.preventDefault();
    let personAndAnimal = {}
    if(type === 'cat') {
      personAndAnimal = 
      {
        'pet': this.state.onecat, 
        'person': this.state.people[0]
      }
      const length = this.state.people;
      if(length == 0 || this.state.people[0] == this.state.iamthisperson) {
        return;
      }
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
      const length = this.state.people.length
      if(length == 0 || this.state.people[0] == this.state.iamthisperson) {
        return;
      }
      const newpeople = this.state.people.slice(1,length);
      peopleservice.dq();
      this.setState({
        people: newpeople,
        whoAdoptedAnimal: [...this.state.whoAdoptedAnimal,personAndAnimal],
        isLoading3: true,
      })
    }
    Petservices.deletePet(type);
    this.updateState();
  }

  //this runs the automatic adoption every 5 seconds, 
  callAdoptInEvery5 = () => {
      let pet = Math.floor(Math.random() * 2); 
      if(pet === 1) {
        this.handleAdopt('cat')
      } else {
        this.handleAdopt('dog')
      }
  }

  every5seconds = () => {
   let add = setInterval(this.callAdoptInEvery5, 5000);
   if(this.state.aretherepeople){
      clearInterval(add)
    }
  }

//function that limits to 5 people in list and when user is first in line
callNewPersonInEvery6 = () => {
    if(this.state.people.length < 5 && this.state.people[0] === this.state.iamthisperson) {
      peopleservice.addperson("joe lol");
      this.updateState();
    } else {
      return;
    }
}
//every 5 seconds(up to 5 people) after the submitted user is first in line
//add a person
every5seconds2 = () => {
  setInterval(this.callNewPersonInEvery6, 6000);
}

//this shows all the people in line for adoption
getAllPeople = () => {
  return this.state.people.map((people, idx) => <div key={idx}>
      <h3 >{people}</h3>
    </div>
    )
  }

  //this will display the person who adopted which animal
  getWhoAdopted = () => {
    return this.state.whoAdoptedAnimal.map((animalandperson, idx)=>{
    return(<div key={idx}>
    <h3>{animalandperson.person} adopted {animalandperson.pet.name}!!</h3>
    </div> 
    )
    })
  }

  //this will show the remaining cats available for adoption 
  allOtherCats = () => {
    return this.state.cats.map((cat, idx) => <div key={idx}>
          <img className='otherCats' src={cat.imageURL} alt='Cat Pic'></img>
          <h3>Name: {cat.name}</h3>
        </div>
    )
  }

  //this will show the remaining dogs available for adoption 
  allOtherDogs = () => {
    return this.state.dogs.map((dog, idx) => 
        <div key={idx}>
          <img className='otherDogs'src={dog.imageURL} alt='Dog Pic'></img>
          <h3>Name: {dog.name}</h3>
        </div>
      );
  }

  render(){
    let nomorecats=this.state.nomorecats;
    let nomoredogs =this.state.nomoredogs;
  return( 
  <div className='main'>
    <Link to="/" className='Logo'>Petful</Link>

    <form onSubmit = {this.handleSubmit}>
      <label className='joinWaitlist'>Join the Waitlist:
      <input value = {this.state.name} onChange = {this.handleChangeName} className='waitlistInput' type='text'></input></label>
      <input className='waitlistSubmit' type='submit'></input>
    </form>

    <h2>Adoption Waitlist: </h2>
    {this.state.isLoading2 ? this.getAllPeople() : <div />}
    {nomorecats? <p>No More Catz</p> :
    <section>
      <div className='cat'>
        <h2>Adopt this Cat!</h2>
        <img className='singleCatImg' src={this.state.onecat.imageURL} alt='Cat Pic'></img>
        <h3>Name: {this.state.onecat.name}</h3>
        <p>Age: {this.state.onecat.age}</p>
        <p>Breed: {this.state.onecat.breed}</p>
        <p>Description: {this.state.onecat.description}</p>
        <p>Gender: {this.state.onecat.gender}</p>
        <p>Story: {this.state.onecat.story}</p>
        {/* if the current user who submitted to adopt is the first in line
        and is eql to the state with the name, then adopt button will show */}
        {(this.state.iAmUser && this.state.people[0] === this.state.iamthisperson ) ? <button className='adoptButton' onClick = {(e) => this.handleAdoptForUser(e, 'cat')}>Adopt</button> : <div />}
      </div>
    </section>
    }

    {nomoredogs ? <p>No More Dogz</p> :
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
        {/* if the current user who submitted to adopt is the first in line
        and is eql to the state with the name, then adopt button will show */}
        {(this.state.iAmUser && this.state.people[0] === this.state.iamthisperson ) ?<button className='adoptButton' onClick={e => this.handleAdoptForUser(e, 'dog')}>Adopt</button> : <div />}
      </div>
    </section>
    }

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
