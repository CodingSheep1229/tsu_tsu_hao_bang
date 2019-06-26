import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import VoteTable from '../components/voteTable.js';
import store from "../redux-js/store/index";
let token = localStorage.getItem("token")
let p_id = localStorage.getItem("p_id")
class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[]
    }
  }
  getVotes = async () => {
    await fetch('http://192.168.43.245:5000/api/vote/getVotes', { 
        method: 'get', 
        headers: new Headers({
            'Authorization': 'Token ' + token, 
            '_pid':p_id
        })
        
    })
    .then(data => data.json())
    .then(data => data.data)
    .then(data => this.setState({ data: data}))
  };
  deleteVote = async (deleteId) => {
    let data = {"id":deleteId}
    await fetch('http://192.168.43.245:5000/api/vote/deleteVote', {
        method: 'post',
        body: JSON.stringify({
          data
      }),
      headers: new Headers({
          'Authorization': 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZGYiLCJpZCI6IjVkMGRmMDM0OGQzN2FmZDUwM2UzZjJjMSIsImV4cCI6MTU2NjM3ODU0OCwiaWF0IjoxNTYxMTk0NTQ4fQ.Swtdn68VaV9qlAkCm2EGCrX5LGtJ68ZPil2d5XlTZQ8', 
          'Content-Type': 'application/json',
          '_pid':p_id
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
    await fetch('http://192.168.43.245:5000/api/vote/addVote', {
        method: 'post',
        body: JSON.stringify({
          data
      }),
      headers: new Headers({
          'Authorization': 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QuY29tIiwiaWQiOiI1ZDBmNTFiYjc3YmZkZjFjMjliMzdiMDMiLCJleHAiOjE1NjY2NDA0MDAsImlhdCI6MTU2MTQ1NjQwMH0.cpk_f1MYsnh7A_fVvbR4divaORaxlPs3PKBRcN-hpw8', 
          'Content-Type': 'application/json',
          '_pid':p_id
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
          {tables}
          <Fab color="primary" aria-label="Add">
            <AddIcon onClick={async () => {
              const newData = {
                _id:String(Date.now()), 
                title: "New Adds",
                data: [],
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
