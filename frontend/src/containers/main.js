import React, { Component } from 'react';
import { Switch, Route} from "react-router-dom";
import Home from './home';
import Schedule from './schedule'
import ToDo from './todo';
import Vote from './vote';
import SignUp from './signup';
import SignIn from './signin';
// import Test from './test';
import Project from './project'
class Main extends Component {

    render() 
    {
      return (
        <div className = "main_section">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/schedule" component={Schedule} />
            <Route exact path="/todo" component={ToDo} />
            <Route exact path="/vote" component={Vote} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/project" component={Project} />
          </Switch>
        </div>

      )
    }

}

export default Main;