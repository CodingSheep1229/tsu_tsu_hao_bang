import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink, Switch, Route, Redirect, browserHistory } from "react-router-dom";
import { withRouter } from 'react-router-dom';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function SignIn(props) {
  const classes = useStyles();

  const [form, setForm] = 
  React.useState();
  const changeForm = e => setForm({ 
    ...form, 
    [e.target.name]: e.target.value
  })
  // const PutDb = async (newData) => {
  //   console.log(newData);
  //   let user = newData;
  //   console.log(user);
  //   await fetch('http://172.20.10.5:5000/api/users/signin', {
  //       method: 'post',
  //       body: JSON.stringify({
  //         user
  //     }),
  //     headers: new Headers({
  //         'Authorization': 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZGYiLCJpZCI6IjVkMGRmMDM0OGQzN2FmZDUwM2UzZjJjMSIsImV4cCI6MTU2NjM3ODU0OCwiaWF0IjoxNTYxMTk0NTQ4fQ.Swtdn68VaV9qlAkCm2EGCrX5LGtJ68ZPil2d5XlTZQ8', 
  //         'Content-Type': 'application/json',
  //     })
  //   })
  //   .then(res => { return res.json() })
  //   .then(res => {
  //       if(res.success){
  //         let destUrl = `/`;
  //         // props.history.replace('');
  //         // props.history.push(destUrl);
  //         console.log(res);
  //         alert('111')
  //       }
  //       else
  //           alert(res.msg || 'Fail.');
  //   })
  //   .catch((err) => console.error(err));
  
  // }
  const PutDb = async (newData) => {
    const user = newData;
    console.log(user);
    await fetch('http://localhost:5000/api/users/signin', {
        method: 'post',
        body: JSON.stringify({
          user
      }),
      headers: new Headers({
          'Authorization': 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZGYiLCJpZCI6IjVkMGRmMDM0OGQzN2FmZDUwM2UzZjJjMSIsImV4cCI6MTU2NjM3ODU0OCwiaWF0IjoxNTYxMTk0NTQ4fQ.Swtdn68VaV9qlAkCm2EGCrX5LGtJ68ZPil2d5XlTZQ8', 
          'Content-Type': 'application/json',
      })
    })
    .then(res => { return res.json() })
    .then(res => {
        if(res.success){
          // let destUrl = `/signin`;
          // props.history.push(destUrl);
          console.log(res);
        }
        else
          alert(res.msg);
    })
    .catch((err) => console.error(err));
    console.log("finish");
    
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} Validate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => changeForm(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e =>{
                changeForm(e);
                console.log(form);
                }  
              } 
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            {/* <NavLink to='/' className = 'NavLink'> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={e => {
                    e.preventDefault();
                  PutDb(form);
                  }              
                }
              >
              Sign In
              </Button>
            {/* </NavLink> */}
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <NavLink to="/signup" className = 'NavLink'>
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
            <Box mt={5}>
              <MadeWithLove />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
export default withRouter(SignIn);