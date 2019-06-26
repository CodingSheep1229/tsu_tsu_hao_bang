import React from 'react';
// import logo from './logo.svg';

import { NavLink, Switch, Route, Redirect } from "react-router-dom";
function Navbar() {
  return (
    <header id="header">
    <title>scheduler trip-website</title>
        <div className="header-content clearfix"> 
            <NavLink to="/"><p className="logo">Trip Scheduler</p></NavLink>
            <nav className="navigation" role="navigation">
                <ul className="primary-nav">
                    <li><NavLink to="/"><span>Home</span></NavLink></li>
                    <li><NavLink to="/signin"><span>Sign In</span></NavLink></li>

                </ul>
            </nav>
            <a href="#" className="nav-toggle">Menu<span></span></a>
        </div>
    </header>
  );
}
export default Navbar;
