import React, { Component } from 'react';
class Mycomponent extends Component{
    a = 10;
    constructor(){
        super();
        this.state = { username : "cat"   };
        console.log("I'm being constructed");
    }

    componentWillMount(){
        //Wiil be called before i render
        console.log("I am going to render");
    }
    render(){
        //actual component is rendering
        console.log("I am rendering");
        console.log(this.props.users);
        return(<div onClick={this.handleEvent.bind(this)}>I'm a component, {this.props.users} {this.a}</div>);
    }
    componentDidMount(){
        //Will be called after i render the component
        console.log("I rendered");
    }
    componentWillUnmount(){
        //component will be removed
        console.log("I am being removed");
    }
    //write a simple method called handleevents
    handleEvent(event){
        //console.log("Event Fired....",event);
        //console.log(this);

        this.setState(()=>this.a+=20);
        /*
        this.setState({
             username : "kitten"
        });
        */
    }
}
export default Mycomponent;