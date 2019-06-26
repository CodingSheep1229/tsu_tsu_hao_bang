import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import VoteTable from '../components/voteTable.js';
import store from "../redux-js/store/index";
let token = localStorage.getItem("token")
const p_id = localStorage.getItem("_pid")
class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[]
    }
  }
  // getProjects = async () => {
  //   await fetch('http://192.168.43.245:5000/api/vote/getProject', { 
  //       method: 'get', 
  //       headers: new Headers({
  //           'Authorization': 'Token ' + token, 
  //       })
        
  //   })
  //   .then(data => data.json())
  //   .then(data => data.data)
  //   .then(data => this.setState({ data: data}))
  // };
  // deleteProjects = async (deleteId) => {
  //   let data = {"id":deleteId}
  //   await fetch('http://192.168.43.245:5000/api/vote/deleteVote', {
  //       method: 'post',
  //       body: JSON.stringify({
  //         data
  //     }),
  //     headers: new Headers({
  //         'Authorization': 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZGYiLCJpZCI6IjVkMGRmMDM0OGQzN2FmZDUwM2UzZjJjMSIsImV4cCI6MTU2NjM3ODU0OCwiaWF0IjoxNTYxMTk0NTQ4fQ.Swtdn68VaV9qlAkCm2EGCrX5LGtJ68ZPil2d5XlTZQ8', 
  //         'Content-Type': 'application/json',
  //     })
  //   })
  //   .then(res => { return res.json() })
  //   .then(res => {
  //       if(res.success)
  //           console.log(res);
  //       else
  //           alert('Fail.');
  //   })
  //   .catch((err) => console.error(err));
  // }
//   addVote = async (newData) => {
//     let data = newData;
//     await fetch('http://192.168.43.245:5000/api/vote/addVote', {
//         method: 'post',
//         body: JSON.stringify({
//           data
//       }),
//       headers: new Headers({
//           'Authorization': 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QuY29tIiwiaWQiOiI1ZDBmNTFiYjc3YmZkZjFjMjliMzdiMDMiLCJleHAiOjE1NjY2NDA0MDAsImlhdCI6MTU2MTQ1NjQwMH0.cpk_f1MYsnh7A_fVvbR4divaORaxlPs3PKBRcN-hpw8', 
//           'Content-Type': 'application/json',
//       })
//     })
//     .then(res => { return res.json() })
//     .then(res => {
//         if(res.success)
//             console.log(res);
//         else
//             alert('Fail.');
//     })
//     .catch((err) => console.error(err));
//     }
    componentDidMount(){
      console.log(p_id)
    }
    render() 
    {
       return 0
    }
}
export default Project
