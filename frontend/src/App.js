import React from 'react';
// import Todo from './containers/To-do'
import './App.css';
import './css/animate.min.css';
import './css/flexslider.css';
import './css/main_1.css';
import './css/responsive.css';
import './css/animate.min.css';
// import Navbar from './containers/navbar';
import Navbar from './containers/navbar1';
import Main from './containers/main';

import { BrowserRouter } from 'react-router-dom'
import signin from './containers/signin';
function App() {
  if ( localStorage.getItem('token') === '' ){
    this.props.history('/signin')
    console.log("here")
  }
  return (
    <BrowserRouter>
    <div className="App">
      <section> 
        <Navbar signin={signin}/>
      </section>
      <section className = "main">
        <Main/>
      </section>
    </div>
    </BrowserRouter>
  );
}

export default App;
