import React, { Component } from 'react';
import { Switch, Route} from "react-router-dom";

class Home extends Component {

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
            <div className="row">
                <div className="col-sm-6 portfolio-item"> <a href="work-details.html" className="portfolio-link"></a> </div>
                <div className="caption">
                    <div className="caption-content">
                    <h3>The Shape of Design</h3>
                    <h4>Branding/Graphic</h4>
                    </div>
                </div>
                <img src={require('../images/portfolio/work-1.jpg')} className="img-responsive" alt=""></img>
            </div>
            </div>  
          </section>
        </div>
        

      )
    }

}

export default Home;