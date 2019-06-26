import React, { Component } from 'react';
import { Switch, Route} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { NavLink} from "react-router-dom";
// import Project from './project';
const token = localStorage.getItem('token')
class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data:[]
      }
    }
    getProjects = async () => {
      await fetch('http://192.168.43.245:5000/api/project/getProject', { 
          method: 'get', 
          headers: new Headers({
              'Authorization': 'Token ' + token, 
          })
          
      })
      .then(data => data.json())
      .then(data => data.data)
      .then(data => this.setState({ data: data}))
    };
    getProject = async (p_id) => {
      localStorage.setItem('project_id',p_id)
      this.props.history.push('/project');
    };
    componentDidMount(){
      this.getProjects()
    }
    render() 
    {
      return (
        <div className = "main_section">
          <section id="portfolio" className="section portfolio">
            <div className="container-fluid">
            <div className="item"> 
            {/* <img src={require('./images/slider/slid2.jpg')} alt="Chania"></img> */}
              <div className="carousel-caption">
                <h3>Minimal Agency Template</h3>
                <p>We're Australia based branding & design agency</p>
              </div>
            </div>
            <Grid container spacing={2}> 
              <Grid item xs={12}>
                <Grid container justify="center" spacing={10} >
                  {this.state.data.map(value => (
                    <Grid key={value._id} style={{background:"black",}} item>
                      <button onClick={(value) => {
                        localStorage.setItem('_pid',value._id);
                        console.log("hhh")
                        console.log(value._id)
                      }
                        } ><NavLink to="/project">{value.name}</NavLink></button>
                      <Paper/>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
            </div>  
          </section>
        </div>
        

      )
    }

}

export default Home;