import React, { Component } from 'react';

import './App.css';
// first import the component
import NavigatorComponent from './NavigatorComponent';

import FooterComponent from './FooterComponent';

import MyRoute from './MyRoute';

class App extends Component {
  constructor(){
    super();
    this.state = { country: 'France'}
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      country : event.target.options[event.target.selectedIndex].value
    });
}

  render() {
    
    return (
      <div className="container">
      <NavigatorComponent/>
      <MyRoute/>
      <FooterComponent/>
      </div>
    );
    
   //console.log("handle change " + this.state.country);

/*
   return(
     <div>
   <MatchInfo/>
   <select   onChange={this.handleChange}>
    <option value="France">France</option>
    <option value="Belgium">Belgium</option>
    <option value="Croatia">Croatia</option>
    <option value="England">England</option>
  </select>


   <Scores Country={this.state.country}/>
   <Goals Country={this.state.country}/>
   
   <Rankings Country={this.state.country}/>
   </div>
  );
  */
  }
}

export default App;
