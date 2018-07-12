import React from 'react';
import {BrowserRouter as Router , Route, Switch} from "react-router-dom";
import UserComponent from './UserComponent';
import Scores from './Scores';
import Rankings from './Rankings';
import Goals from './Goals';
import My404 from './My404';

const MyRoute = ()=> (
    <Router>
        <Switch>
            <Route exact path='/' component={UserComponent}/>
            <Route exact path='/users' component={UserComponent}/>
            <Route exact path='/scores' component={Scores}/>
            <Route exact path='/rankings' component={Rankings}/>
            <Route exact path='/goals' component={Goals}/>
            <Route component={My404}/>
        </Switch>
    </Router>
)
export default MyRoute;