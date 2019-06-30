import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import{url} from '../url'
import { withStyles} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/styles';

const token = localStorage.getItem('token')
// var _pid = localStorage.getItem('_pid')
const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'blue',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'blue',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'light blue',
       
      },
    },
  },
})(TextField);

class CardGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id:this.props._id,
      name:this.props.name
    }
  }
  addUserToProject =  (username) => {
    let data = {"email":username, "_pid":localStorage.getItem('_pid')};
    fetch(url + '/api/project/inviteUser', {
        method: 'post',
        body: JSON.stringify({
          data
      }),
      headers: new Headers({
          'Authorization': 'Token ' + token, 
          'Content-Type': 'application/json',
      })
    })
    .then(res => { return res.json() })
    .then(res => {
        if(res.success)
            console.log(res);
        else
            alert('Fail.');
    })
    .catch((err) => console.error(err));
    }
    updateProject = async () => {
      let data = this.state
      console.log(data)
      await fetch(url + '/api/project/updateProject', {
          method: 'post',
          body: JSON.stringify({
            data
        }),
        headers: new Headers({
            'Authorization': 'Token ' + token, 
            'Content-Type': 'application/json',
        })
      })
      .then(res => { return res.json() })
      .then(res => {
          if(res.success)
              console.log(res.success);
          else
              alert('Fail.');
      })
      .catch((err) => console.error(err));
    }
    
  render() {
    return (
      <div className = "cardgrid" >

        <Card styles={{maxWidth: "345"}} >
            <CardActionArea 
              onClick={() => {this.props.getpro(this.props._id)}}
            >
            <CardMedia
              component="img"
              // className={classes.media}
              image={this.props.pic}
              title="Contemplative Reptile"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {this.state.name}
                    {/* <CssTextField
                    variant="outlined"
                    value = {this.state.name}
                    style={this.margin}
                    onChange = {
                      async e => {
                      await this.setState({name: e.target.value});
                      await this.updateProject()}
                    }/> */}
                </Typography>
                {/* <Typography variant="body2" color="textSecondary" component="p">
                  whahahahahahaha
                </Typography> */}
            </CardContent>
            </CardActionArea>
            <CardActions>              
              {/* <Button size="small" color="primary" onClick={() => {
                    this.props.getpro(this.props._id);
                    console.log(localStorage.getItem('_pid'))
                  }}>
                  Details
                </Button> */}

              <TextField
                id="standard-name"
                label="Rename Your Trip"
                defaultValue={this.state.name}
                margin="normal"
                className = "textfield"
                // variant="outlined"
                onChange = {
                  async e => {
                  await this.setState({name: e.target.value});
                  await this.updateProject()}
                }
              /> 
              <TextField
                id="standard-uncontrolled"
                label="Invite Your Friend"
                defaultValue="User Email"
                margin="normal"
                className = "textfield"
                // variant="outlined"
                onKeyPress = {
                  e => {
                    if(e.key === 'Enter'){
                      this.addUserToProject(e.target.value)
                    }
                  }
                }
              />  
              <Button>
                <DeleteIcon  onClick={() => {
                  this.props.deletePro(this.props._id)}}/>
              </Button>
            </CardActions>
 
        </Card>

      </div>
    );
  }
}

export default CardGrid