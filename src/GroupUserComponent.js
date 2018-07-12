import React, { Component } from 'react';
class GroupUserComponent extends Component{
  

    render(){
        if(this.state!=null){
            return(

                <div className="col">
                <div className="panel panel-primary">
                    <div className="panel-heading">Available Groups</div>
                    <div className="panel-body">
                        
                        
          
                    </div>
                    
                </div>
            </div>
  

            )
        }
        else{
            return(

                <div className="col">
                <div className="panel panel-primary">
                    <div className="panel-heading">Available Groups</div>
                    <div className="panel-body">
                        
                        
          
                    </div>
                    
                </div>
                </div>

            )
        }
    }

}
export default GroupUserComponent;