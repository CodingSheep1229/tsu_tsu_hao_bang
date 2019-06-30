import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import VoteTable from '../components/voteTable.js';
import store from "../redux-js/store/index";
import { url} from '../url'
import Menu from '../components/menu';
import {basicColor} from '../decorate'
// console.log(token)
class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      welcome:'',
      token:localStorage.getItem("token"),
      _pid:localStorage.getItem("_pid")
    }
  }
  getVotes = async () => {
    const _pid = this.state._pid
    await fetch(url + '/api/vote/getVotes', { 
        method: 'get', 
        headers: new Headers({
            'Authorization': 'Token ' + this.state.token, 
            '_pid':_pid
        })
        
    })
    .then(data => data.json())
    .then(data => data.data)
    .then(data => {
      this.setState({ data: data});
      console.log(this.state.data.length == 0)
      if(this.state.data.length == 0){
        this.setState({welcome:"Create A New Votetable"})
      } 
    })
  };
  deleteVote = async (deleteId) => {
    let data = {"id":deleteId}
    await fetch(url + '/api/vote/deleteVote', {
        method: 'post',
        body: JSON.stringify({
          data
      }),
      headers: new Headers({
          'Authorization': 'Token ' + this.state.token, 
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
  addVote = async (newData) => {
    let data = newData;
    await fetch(url + '/api/vote/addVote', {
        method: 'post',
        body: JSON.stringify({
          data
      }),
      headers: new Headers({
          'Authorization': 'Token ' + this.state.token, 
          'Content-Type': 'application/json',
      })
    })
    .then(res => { return res.json() })
    .then(res => {
        if(res.success){
          console.log(res);
          if(this.state.data.length == 0){
            this.setState({welcome:"Create A New Votetable"})
          } 
        }   
        else
            alert('Fail.');
    })
    .catch((err) => console.error(err));
    }
    componentDidMount(){
      store.getState()
      this.getVotes();
    }
    render() 
    {
      const tables = this.state.data.map((table) =>  
        <div><VoteTable table={table} deleteTable={this.deleteVote} getTable={this.getVotes}/> 
          <br />
        </div>
      )
       return (
        <div>
          <Menu />
          {tables}
          <br/>
          <h4> Create A New Vote </h4>
          <Fab style={{backgroundColor:basicColor}} color="inherit" aria-label="Add">
            <AddIcon style={{color:'white'}} onClick={async () => {
              const newData = {
                _id:String(Date.now()) + '_v', 
                title: "New Vote",
                data: [],
                _pid:this.state._pid
              }
              this.addVote(newData)
              await this.getVotes()
            }
            }/>
          </Fab>
        </div>
      );
    }
}
export default Vote
