import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CardGrid from '../components/cardGrid'
import {url} from '../url';
import { NavLink} from "react-router-dom";
// import Project from './project';
const token = localStorage.getItem('token')
console.log(localStorage.getItem('token'))
class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data:[]
      }
    }
    getProjects = async () => {
      await fetch(url + '/api/project/getProject', { 
          method: 'get', 
          headers: new Headers({
              'Authorization': 'Token ' + token, 
          })
          
      })
      .then(data => data.json())
      .then(data => data.data)
      .then(data => {
        this.setState({ data: data});        
    })
    };
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
      const cards = this.state.data.map((card) => <CardGrid name={card.name} _id={card._id} getpro={this.getProject}  />)
      return (
          <section id="portfolio" className="section portfolio">
            <div className="container-fluid">
            <div className="item">
            </div>
              {cards}
            </div> 
            <br /><br /><br />
            <Fab color="primary" aria-label="Add">
                <AddIcon />
            </Fab> 
          </section>
        

      )
    }

}

export default Home;