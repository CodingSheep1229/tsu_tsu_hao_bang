import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import VoteTable from '../components/voteTable.js';
import store from "../redux-js/store/index";
import { url} from '../url'
import Menu from '../components/menu';
const token = localStorage.getItem("token")
var _pid = localStorage.getItem("_pid")
class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[]
    }
  }
  getVotes = async () => {
    _pid = localStorage.getItem('_pid')
    await fetch(url + '/api/vote/getVotes', { 
        method: 'get', 
        headers: new Headers({
            'Authorization': 'Token ' + token, 
            '_pid':_pid
        })
        
    })
    .then(data => data.json())
    .then(data => data.data)
    .then(data => this.setState({ data: data}))
    console.log("in")
    console.log(this.state.data) 
  };
  deleteVote = async (deleteId) => {
    let data = {"id":deleteId}
    await fetch(url + '/api/vote/deleteVote', {
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
  addVote = async (newData) => {
    let data = newData;
    await fetch(url + '/api/vote/addVote', {
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
    componentDidMount(){
      store.getState()
      this.getVotes();
    }
    render() 
    {
      const tables = this.state.data.map((table) =>  
        <div><VoteTable table={table} deleteTable={this.deleteVote} getTable={this.getVotes}/> 
          <br /><br /><br /> 
        </div>
      )
       return (
        <div className = "main_section">
          <Menu />
          {tables}
          <Fab color="primary" aria-label="Add">
            <AddIcon onClick={async () => {
              const newData = {
                _id:String(Date.now()) + '_v', 
                title: "New Adds",
                data: [],
                _pid:_pid
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
