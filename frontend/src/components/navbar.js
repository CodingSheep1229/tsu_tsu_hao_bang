import React from 'react';
// import logo from './logo.svg';
import Todo from '../containers/To-do'

import { NavLink, Switch, Route, Redirect } from "react-router-dom";
function Navbar() {
  return (
    <header id="header">
    <title>scheduler trip-website</title>
        <div className="header-content clearfix"> 
        <a className="logo" href="#">Trip Scheduler</a>
        <nav className="navigation" role="navigation">
            <ul className="primary-nav">
                <li><NavLink to="/"><a><span>Home</span></a></NavLink></li>
                <li><NavLink to="/todo"><a><span>To Do List</span></a></NavLink></li>
            </ul>
        </nav>
        {/* <a href="#" className="nav-toggle">Menu<span></span></a> */}
        </div>
    </header>
  );
}

export default Navbar;
