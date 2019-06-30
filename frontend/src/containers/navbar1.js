import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom';
import { NavLink, Redirect } from "react-router-dom";
import {basicColor} from '../decorate'

setTimeout(() => {var token = localStorage.getItem('token'); console.log(token)}, 1500);
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    zIndex: 999,
  },
  menuButton: {
    marginRight: theme.spacing(0),
    margin: '-5px',
  },
  title: {
    flexGrow: 1,
  },
  nav:{
    background: basicColor,
  },

}));

function Navbar(props) {
  const classes = useStyles();
  // var Signed = 'Sign In'
  
  // console.log(localStorage.getItem('token') !== '')
  // if(localStorage.getItem('token') !== ''){
  //     Signed = 'Sign Out'
  //     console.log('Changeeeeee')
  // }
  const [isSignIn, setSign] = 
    React.useState(localStorage.getItem('token') !== '' ? 'Sign Out': 'Sign In');
    setTimeout(() => setSign(localStorage.getItem('token') ? 'Sign Out' : 'Sign In' ), 100);
  // () => setSign({isSignIn:'Sign In'})
  const clear = () => {
      localStorage.setItem('token','')
      localStorage.setItem('user','')
      localStorage.setItem('user_id','')
      setSign({isSignIn:'Sign In'})
      props.history.push('/signin/')
      window.location.reload()
  }
  return (
    <div className={classes.root}>
      <AppBar className={classes.nav}>
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu"> */}
            {/* <MenuIcon /> */}
          {/* </IconButton> */}
          <Typography variant="h6" className={classes.title} logo>
            <NavLink to = "/" className = "navlink logo">
            <img src={require('../images/logo0.png')} style={{ height:'50px',marginTop:'23px', marginLeft:'30px'}}>
            </img> 
            </ NavLink>
          </Typography>
          <NavLink className = "navlink" to="/"><Button color="inherit">home</Button></NavLink>
          <NavLink className = "navlink" to='/signin' onClick={() => clear({props})}><Button  color="inherit">{isSignIn}</Button></NavLink>
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default withRouter(Navbar);

