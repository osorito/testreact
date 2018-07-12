import React, { Component } from 'react';


import AddUsersComponent from './AddUsersComponent';
import ListUsersComponent from './ListUsersComponent';
import GroupUserComponent from './GroupUserComponent';

class UserComponent extends Component {
  render() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <AddUsersComponent/>
                </div>  
                <div className="col-md-8">
                    <GroupUserComponent/>
                </div>
            </div>
            <ListUsersComponent/>
      </div>
      
    );
  }
}

export default UserComponent;
