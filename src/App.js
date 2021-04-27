import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'
import ToyCard from './components/ToyCard'
// const toyData = require('../db.json');


class App extends React.Component{

  state = {
    display: false ,
    toys: [] ,
    name: '' ,
    image: '' ,
    likes: 0
  }

  componentDidMount() {
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(data => {
      // console.log("data", data);
      this.setState({
        // ...this.state, 
        toys: data
      })
    })
  }

  onType = (event) => {
    this.setState({ [event.target.name]: event.target.value});
  }

  submitForm = (event) => {
    event.preventDefault();
    // console.log("submit");
    const nameInput = this.state.name;
    const imageInput = this.state.image;

    fetch('http://localhost:3000/toys', {
      method: "POST" ,
      headers:
      {
        "Content-Type": "application/json" ,
        Accept: "application/json"
      }, 

      body: JSON.stringify({
        "name": `${nameInput}` ,
        "image": `${imageInput}` ,
        "likes": 0
      })
    })
    .then(res => res.json())
    .then(data => this.toyAdd(data));
  }

  toyAdd = (toyObj) => { return <ToyCard toy={toyObj} likeToy={this.addLikes} deleteToy={this.deleteToy}/>}

  addLikes = (event) => {
    console.log(event.target.parentNode);
  }

  deleteToy = () => {
    console.log("delete");
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean, 
      // ...this.state
    })
  }

  render(){
    // console.log(this.state);
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm submitForm={this.submitForm} onType={this.onType}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toysArray={this.state.toys} likeToy={this.addLikes} deleteToy={this.deleteToy}/>
      </>
    );
  }

}

export default App;
