import React, { Component } from 'react';
import { slide  as Slide} from 'react-burger-menu'
import { NavLink} from "react-router-dom";
import { OutlinedInput } from '@material-ui/core';
const styles = {
    // bmItem:{
    //   outLine: '0 !important',
    // },
    bmBurgerButton: {
      position: 'fixed',
      width: '30px',
      height: '20px',
      left: '20px',
      top: '40px'
    },
    bmBurgerBars: {
      background: '#8eadc1'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    bmMenu: {
      background: '#373a47',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmItem:{
      display: 'inline-block',
      outline:'-webkit-focus-ring-color auto 0px',
    },
      
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    },
    // ul:focus{
    //   outlone: 'none';
    // }        
}
class Menu extends Component {

    render() 
    {
      return (   
        <Slide styles={ styles } >
          <ul> 
            <li className="menu-item"><NavLink to="/schedule" className = "navlink" >Schedule</NavLink></li><br />
            <li className="menu-item"><NavLink to="/todo"className = "navlink" >To Do List</NavLink></li><br />
            <li className="menu-item"><NavLink to="/vote"className = "navlink" >vote</NavLink></li>
          </ul>
        </Slide>
      )
    }

}

export default Menu;


