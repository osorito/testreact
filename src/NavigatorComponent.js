import React, { Component } from 'react';

class NavigatorComponent extends Component{
    
    render(){
        return(
          <div className="container">  
            <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="/">Synechron</a>
              </div>
              <ul className="nav navbar-nav">
                <li className="active"><a href="/">Home</a></li>
                <li><a href="users">Users</a></li>
                <li><a href="scores">Scores</a></li>
                <li><a href="rankings">Rankings</a></li>
                <li><a href="goals">Goals</a></li>
                
              </ul>
            </div>
            </nav>
          </div>
        );
    }
    
}
export default NavigatorComponent;