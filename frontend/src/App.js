import React from 'react';
import logo from './logo.svg';
// import Todo from './containers/To-do'
import './App.css';
import './css/animate.min.css';
import './css/flexslider.css';
import './css/main.css';
import './css/responsive.css';
import './css/animate.min.css';
import Navbar from './containers/navbar';
import Main from './containers/main';

import { BrowserRouter } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
    <div className="App" style={{position:"relative"}}>
      <section> 
        <Navbar style={{position:"absolute"}}/>
      </section>
      <br /><br /><br /><br /><br />
      <section>
        <Main style={{position:"absolute"}} />
      </section>
    </div>
    </BrowserRouter>
  );
}

export default App;
