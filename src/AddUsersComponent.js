import React, { Component } from 'react';
import EventBus from './EventBus';
class AddUsersComponent extends Component{
    constructor() {
        super();
        this.state = {id:'',username: '',password: ''};
    
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    AddUser(){
        var headers = new Headers();
        var User = {};
        User.id=1;
        User.username=this.state.username;
        User.password=this.state.password;
        User.groups = [];

        headers.append("Authorization","Basic " + btoa("admin:admin"));
        headers.append("Content-Type", "application/json");
        fetch("http://localhost:4000/user",
        {method:"post",
        body: JSON.stringify(User),
        headers: headers}).then(res=>res.json())
        .catch(error=> console.error('Error',error))
        .then(response=>{
            console.log('Success',response);
            this.setState({id:'',username:'',password:''});
            EventBus.getEventEmitter().emit("refresh",{"refresh":"ok"});
        });
    }

    handleUserNameChange(event) {
        this.setState({
            username: event.target.value
        });
    }

    handlePasswordChange(event){
        this.setState({
            password: event.target.value
        });
    }
    
    handleSubmit(event) {
        //alert('UserName ' + this.state.username + ' password is ' + this.state.password);
        this.AddUser();
        event.preventDefault();
    }


    componentWillMount(){
        
        /*
        var headers = new Headers();
        headers.append("Authorization","Basic " + btoa("admin:admin"));
        fetch("http://localhost:4000/users",{method:"get",headers: headers}).then(function(response){
            response.json().then(function(data){
                this.setState({result : data});
                //console.log(data);
            }.bind(this));
        }.bind(this));
        */
    }



   

    render(){
        if(this.state!=null){
            return(

      <div className="panel panel-primary">
          <div className="panel-heading">User Information</div>
          <div className="panel-body">
            <form onSubmit={this.handleSubmit} >
                <div className="form-group">
                    <label>ID:</label>                    
                    <input type="text" value={this.state.id} onChange={this.handleChange}  name="id" className="form-control" readOnly/>
                </div>
                <div className="form-group">
                    <label>User Name:</label>                    
                    <input type="text" value={this.state.username} onChange={this.handleUserNameChange} name="username" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={this.state.password} onChange={this.handlePasswordChange} name="password" className="form-control" />
                </div>  
                <button type="submit" className="btn btn-primary" >Add User</button>                  
            </form>    
       
          </div>
      </div>
  

            )
        }
        else{
            return(

                <div className="panel panel-primary">
                <div className="panel-heading">User Information</div>
                <div className="panel-body">
                  <form >
                      <div className="form-group">
                          <label>ID:</label>                    
                          <input type="text"  name="id" className="form-control" disabled/>
                      </div>
                      <div className="form-group">
                          <label>User Name:</label>                    
                          <input type="text" value={this.state.username} onChange={this.handleChange}  name="username" className="form-control"/>
                      </div>
                      <div className="form-group">
                          <label>Password:</label>
                          
                          <input type="password" value={this.state.password} onChange={this.handleChange} name="password" className="form-control" />
                      </div>  
                      <button type="submit" className="btn btn-primary" >Add User</button>                  
                  </form>    
             
                </div>
            </div>

            )
        }
    }

}
export default AddUsersComponent;