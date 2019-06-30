import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { NavLink } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import {url} from '../url'
import {basicColor} from '../decorate'
const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: basicColor,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    outlineColor: basicColor,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: basicColor
  },

}));


function SignUp(props) {
  const classes = useStyles();
  const [form, setForm] = 
  React.useState();
  const changeForm = e => setForm({ 
    ...form, 
    [e.target.name]: e.target.value
  })

  const PutDb = async (newData) => {
    let data = {"user": newData};
    console.log(data);
    await fetch(url + '/api/users/signup', {
        method: 'post',
        body: JSON.stringify({
          data
      }),
      headers: new Headers({
          'Content-Type': 'application/json',
      })
    })
    .then(res => { return res.json() })
    .then(res => {
        if(res.success){
          let destUrl = `/signin`;
          props.history.push(destUrl);
          console.log(res.success);
        }
        else
          alert(res.msg);
    })
    .catch((err) => console.error(err));
    
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                onChange={e => changeForm(e)}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => changeForm(e)} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e =>{
                  changeForm(e);
                  }  
                }                
                // onClick={e => console.log(form)}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          {/* <NavLink to='/home' className = 'NavLink'> */}
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={e => {
                  PutDb(form);
                  // console.log(React.history);
                  // browserHistory.push('/')
                }
              }
            > 
              Sign Up
            </Button>
          {/* </NavLink> */}
          <Grid container justify="flex-end">
            <NavLink to = '/signin'  className = 'NavLink'>
              <Grid item>
                  Already have an account? Sign in
              </Grid>
            </NavLink>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
export default withRouter(SignUp);
