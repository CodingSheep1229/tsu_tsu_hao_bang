import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CardGrid from '../components/cardGrid'
import {url} from '../url';
// import Project from './project';
//console.log(localStorage.getItem('token'))
// if(localStorage.getItem('token') === null){
//   console.log(localStorage.getItem('token'))
//   this.props.history.push('/signin')
// }
class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data:[],
        token: localStorage.getItem('token')
      }
    }
    getProjects = async () => {
      await fetch(url + '/api/project/getProject', { 
          method: 'get', 
          headers: new Headers({
              'Authorization': 'Token ' + this.state.token, 
          })
          
      })
      .then(data => data.json())
      .then(data => data.data)
      .then(data => {
        this.setState({ data: data});        
    })
    }
    addProject = async (newData) => {
      let data = { _id:String(Date.now()) + '_p', name:'New Project'}
      await fetch(url + '/api/project/addProject', {
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
              console.log(res.data)
              this.setState({ data: res.data})
          }
          else
              alert('Fail.');
      })
      .catch((err) => console.error(err));
    }
    deleteProject = async (deleteId) => {
      let data = {"_id":deleteId};
      await fetch(url + '/api/project/deleteProject', {
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
            console.log(res.success)
            window.location.reload()
          }   
          else
              alert('Fail.');
      })
      .catch((err) => console.error(err));
    // console.log(this.state.data);
      
    }
    getProject = (_pid) => {
      console.log(_pid)
      localStorage.setItem('_pid',_pid)
      console.log(localStorage.getItem('_pid'))
      this.props.history.push('/schedule');
    };
    componentDidMount(){
      this.getProjects()
    }
    
    render() 
    {
      if(localStorage.getItem('token') == ''){
        this.props.history.push('/signin')
      }
      const cards = this.state.data.map((card) => 
      <CardGrid name={card.name} _id={card._id} pic={card.pic} 
                getpro={this.getProject} addProject={this.addProject} 
                deletePro={this.deleteProject} />)
      return (
          <section id="portfolio" className="section portfolio">
            <div className="container-fluid">
            <div className="item">
            </div>
              {cards}
            </div> 
            <br /><br /><br />
            <Fab color="primary" aria-label="Add" onClick = {
                  () => {this.addProject(); this.getProjects();}
                  }>
                <AddIcon />
            </Fab> 
          </section>
        

      )
    }

}

export default Home;