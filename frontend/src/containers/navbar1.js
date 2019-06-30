import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from "react-router-dom";
import { getThemeProps } from '@material-ui/styles';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

}));

export default function Navbar(props) {
  const classes = useStyles();
  // var Signed = 'Sign In'
  // console.log(localStorage.getItem('token') !== '')
  // if(localStorage.getItem('token') !== ''){
  //     Signed = 'Sign Out'
  // }
  const [isSignIn, setSign] = 
  React.useState('Sign Out');
  // () => setSign({isSignIn:'Sign In'})
  const clear = (props) => {
      localStorage.setItem('token','')
      localStorage.setItem('user','')
      localStorage.setItem('user_id','')
      setSign({isSignIn:'Sign In'})
      props.history.push('/signin')
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" className={classes.title} logo>
            <NavLink to = "/" className = "navlink logo">Trip Scheduler </NavLink>
          </Typography>
          <NavLink className = "navlink" to="/"><Button color="inherit">home</Button></NavLink>
          <NavLink className = "navlink" to='/signin' onClick={() => clear()}><Button  color="inherit">{isSignIn}</Button></NavLink>
        </Toolbar>
      </AppBar>
    </div>
  )
}
