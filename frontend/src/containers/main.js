import React, { Component } from 'react';
import { Switch, Route} from "react-router-dom";
import Home from './home';
import Schedule from './schedule'
import ToDo from './todo';
import Vote from './vote';
import SignUp from './signup';
import SignIn from './signin';
// if ( localStorage.getItem('token') === null ){
//   this.props.history('/signin')
// } 
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
   
  render() 
    {
      return (
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/schedule" component={Schedule} />
            <Route exact path="/todo" component={ToDo} />
            <Route exact path="/vote" component={Vote} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
          </Switch>
        </div>

      )
    }

}

export default Main;