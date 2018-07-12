import React, { Component } from 'react';
import EventBus from './EventBus';
class Goals extends Component{
    componentWillMount(){
        EventBus.getEventEmitter().on("someevent",function(data){
            console.log("getting event");
            this.setState(data);
        }.bind(this));
    }
    render(){
        return(<div>Goals {this.props.Country}{this.state?this.state.user:null}</div>);
    }
}
export default Goals;