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
const token = localStorage.getItem('token')
var _pid = localStorage.getItem('_pid')
class CardGrid extends Component {
  addUserToProject = async (username) => {
    let data = {username:username, _pid:localStorage.getItem('_pid')};
    await fetch(url + ':5000/api/users/addUserToProject', {
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
  render() {
    return (
      <div>
      <TextField
        id="outlined-full-width"
        label="invite people"
        placeholder="username"
        fullWidth
        margin="normal"
        variant="outlined"
        onChange = {() => this.addUserToProject()}
        InputLabelProps={{
          shrink: true,
        }}
      />
        <Card style={{maxWidth: "345"}} onClick={() => {
          this.props.getpro(this.props._id);
          console.log(localStorage.getItem('_pid'))
        }}>
            <CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                {this.props.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  whahahahahahaha
                </Typography>
            </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" >
                  Learn More
                </Button>
            </CardActions>
 
        </Card>
      </div>
    );
  }
}

export default CardGrid