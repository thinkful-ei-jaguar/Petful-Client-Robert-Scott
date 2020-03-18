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
      iamthisperson:'',
      iAmUser:false,
      isLoading: false,
      isLoading2: false,
      isLoading3: false,
      people:[],
      whoAdoptedAnimal: [],
      interval1:null,
      interval2: null,
      aretherepeople:false,
    }
  }

  componentDidMount = () => {
    Petservices.getpets()
    .then(pets => {
      this.setState({
        onecat: pets[0],
        onedog: pets[1],
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
      this.setState({
        onecat: pets[0],
        onedog: pets[1],
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
    .then(peoples => {
      this.setState({
        people: peoples,
        isLoading2: true,
      }) 
      if(this.state.people == []){
        this.setState({
          aretherepeople:true
        })
      }
    });
  }

  handleChangeName = (event) => {
    this.setState({name: event.target.value});
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    const newp = this.state.name;
    peopleservice.addperson(this.state.name);
    this.setState({
      name: '',
      iamthisperson:newp,
      people:[...this.state.people,newp],
      iAmUser:true,
      interval2: this.every5seconds2(),
    });


    this.updateState();
    //this.add5people();
    //this.every5seconds();
  }


  handleAdoptforuser = (type) => {
    let personAndAnimal = {}
    if(this.state.people[0]==this.state.iamthisperson){
      this.setState({
        iAmUser:false,
        iamthisperson:'',
      })
    }
    if(type === 'cat') {
      personAndAnimal = 
      {
        'pet': this.state.onecat, 
        'person': this.state.people[0]
      }
      const length = this.state.people;
      if(length == 0 || this.state.people[0]==this.state.iamthisperson) {
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
      if(length == 0 || this.state.people[0]==this.state.iamthisperson) {
        return;
      }
      const newpeople = this.state.people.slice(1,length);
      peopleservice.dq();
      this.setState({
        people:newpeople,
        whoAdoptedAnimal: [...this.state.whoAdoptedAnimal,personAndAnimal],
        isLoading3: true,
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
      if(length == 0 || this.state.people[0]==this.state.iamthisperson) {
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
      if(length == 0 || this.state.people[0]==this.state.iamthisperson) {
        return;
      }
      const newpeople = this.state.people.slice(1,length);
      peopleservice.dq();
      this.setState({
        people:newpeople,
        whoAdoptedAnimal: [...this.state.whoAdoptedAnimal,personAndAnimal],
        isLoading3: true,
      })
    }
    Petservices.deletePet(type);
    this.updateState();
  }
  callAdoptInEvery5 = () => {
      let pet = Math.floor(Math.random() * 2); 
      //console.log(pet);
      let petType;
      if(pet === 1) {
        petType ='cat';
        this.handleAdopt('cat')
      } else {
        petType = 'dog';
        this.handleAdopt('dog')
      }
  }

  every5seconds = () => {
   let add = setInterval(this.callAdoptInEvery5, 5000);

   if(this.state.aretherepeople){
      clearInterval(add)
    }
  }
callNewPersonInEvery5 = () => {
    if(this.state.people.length < 5&& this.state.people[0]===this.state.iamthisperson) {
      peopleservice.addperson("joe lol");
      this.updateState();
    } else {
      return;
    }
}

every5seconds2 = () => {
 let add2 = setInterval(this.callNewPersonInEvery5, 6000);
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
        {(this.state.iAmUser &&this.state.people[0]===this.state.iamthisperson ) ? <button className='adoptButton' onClick={() => this.handleAdoptforuser('cat')}>Adopt</button> : <div />}
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
        {(this.state.iAmUser &&this.state.people[0]===this.state.iamthisperson ) ?<button className='adoptButton' onClick={e => this.handleAdoptforuser(e, 'dog')}>Adopt</button> : <div />}
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
