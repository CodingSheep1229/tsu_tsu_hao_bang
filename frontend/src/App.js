import React from 'react';
import logo from './logo.svg';
import Todo from './containers/To-do'
import './App.css';
import './css/animate.min.css';
import './css/flexslider.css';
import './css/main.css';
import './css/responsive.css';
import './css/animate.min.css';
import Navbar from './components/navbar' 
import Main from './containers/main'
import { HashRouter } from 'react-router-dom'
function App() {
  return (
    <HashRouter>
    <div className="App">
      <section className="tophead" role="tophead"> 
        <Navbar/>
      </section>
        <Main/>
    </div>
    </HashRouter>
  );
}

export default App;
