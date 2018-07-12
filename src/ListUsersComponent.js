import React, { Component } from 'react';
import EventBus from './EventBus';
class ListUsersComponent extends Component{
    componentWillMount(){
        this.reloadData();

        EventBus.getEventEmitter().on("refresh",function(data){
            console.log("I got the call!")        

            var headers = new Headers();
            headers.append("Authorization","Basic " + btoa("admin:admin"));
            fetch("http://localhost:4000/users",{method:"get",headers: headers}).then(function(response){
                response.json().then(function(data){
                    this.setState({result : data});
                   // console.log(data);
                }.bind(this));
            }.bind(this));


            this.setState(data);
        }.bind(this));
    }
    
    deleteUser(event){
        var _username = event.target.id; //event.target.id is the name off the button
        console.log("UserName selected is " + _username);
        var headers = new Headers();
        
        headers.append("Authorization","Basic " + btoa("admin:admin"));
        headers.append("Content-Type", "application/json");
        fetch("http://localhost:4000/user/" + _username,
        {method:"DELETE",
        body: JSON.stringify({ username: _username}),
        headers: headers}).then(res=>res.json())
        .catch(error=> console.error('Error',error))
        .then(response=>{
            console.log('Success',response);
            this.reloadData();
           //call render with setState 
           //this.setState(()=>{});
        })/*.then(()=>{this.setState(()=>{})})*/;        
    }

    reloadData(){
        var headers = new Headers();
        headers.append("Authorization","Basic " + btoa("admin:admin"));
        fetch("http://localhost:4000/users",{method:"get",headers: headers}).then(function(response){
            response.json().then(function(data){
                this.setState({result : data});
               // console.log(data);
            }.bind(this));
        }.bind(this));
    }
    

    render(){
        if(this.state!=null){
            return(
                
            <div className="panel panel-primary">
            <div className="panel-heading">Users Table</div>
            <div className="panel-body">
                <table className="table table-striped table-bordered ">
                  <thead>
                    <tr>
                      <td>User ID</td>
                      <td>User</td>
                      <td colSpan="2">Action</td>
                    </tr>
                  </thead>
                  <tbody>
                        {this.state.result.map(function(data){
                            return(
                                <tr key={data._id}>
                                    <td>{data._id}</td>
                                    <td>{data.username}</td>
                                    <td>
                                        <button type="button" className="btn btn-default btn-sm">
                                            <span className="glyphicon glyphicon-pencil"></span> Edit 
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-danger btn-sm" id={data.username} onClick={this.deleteUser.bind(this)} >
                                            <span className="glyphicon glyphicon-trash"></span> Delete 
                                        </button>
                                    </td>
                                </tr>
                            )
                        }.bind(this))}
                  </tbody>
                </table>    
            </div>
        </div>
        
        )

        }else{
            return(
                
            <div className="panel panel-primary">
            <div className="panel-heading">Users Table</div>
            <div className="panel-body">
                <table className="table table-striped table-bordered ">
                  <thead>
                    <tr>
                      <td>User ID</td>
                      <td>User</td>
                      <td colSpan="2">Action</td>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>    
            </div>
        </div>
        
        
        )
        }

   
    }
    
}
export default ListUsersComponent;