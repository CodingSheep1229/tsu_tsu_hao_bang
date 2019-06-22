import React from 'react';
import logo from './logo.svg';
import Todo from './containers/To-do'
import './App.css';
import './css/animate.min.css';
import './css/flexslider.css';
import './css/main.css';
import './css/responsive.css';
import './css/animate.min.css';

// import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <section className="tophead" role="tophead"> 
        <header id="header">
        <title>scheduler trip-website</title>
          <div className="header-content clearfix"> <a className="logo" href="#">Auro</a>
            <nav className="navigation" role="navigation">
              <ul className="primary-nav">
                <li><a href="#header-slider">Home</a></li>
                <li><a href="#services">Our Services</a></li>
                <li><a href="#portfolio">Our Portfolio</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </nav>
            <a href="#" className="nav-toggle">Menu<span></span></a>
          </div>
        </header>
      </section>
      <section id="header-slider" className="section">
        <div id="myCarousel" className="carousel slide" data-ride="carousel"> 
          {/* <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
          </ol> */}

          <div className="carousel-inner" role="listbox">
            {/* <div className="item active"> 
            <img src={require('./images/slider/slid1.jpg')} alt="Chania"></img>
              <div className="carousel-caption">
                <h3>We'r Auro</h3>
                <p>We Build Strong Brands which impact your customers</p>
              </div>
            </div> */}
            <div className="item"> 
            {/* <img src={require('./images/slider/slid2.jpg')} alt="Chania"></img> */}
              <div className="carousel-caption">
                <h3>Minimal Agency Template</h3>
                <p>We're Australia based branding & design agency</p>
              </div>
            </div>
          </div>

          {/* <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>  
            <span className="sr-only">Previous</span>
          </a> 
          <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next"> 
            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> 
            <span className="sr-only">Next</span>
          </a> */}
        </div>
      </section>

      {/* <section id="services" className="section services">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <div className="services-content">
                <h4>We're Australia based branding & design agency.</h4>
                <p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Nullam quis risus eget urna mollis ornare vel eu leo.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="services-content">
                <h5>Brand Experience</h5>
                <ul>
                  <li><a href="#">Web Design</a></li>
                  <li><a href="#">Mobile Application</a></li>
                  <li><a href="#">Product Development</a></li>
                  <li><a href="#">Packaging</a></li>
                  <li><a href="#">Retail Management</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="services-content">
                <h5>Media Marketing</h5>
                <ul>
                  <li><a href="#">Marketing Research</a></li>
                  <li><a href="#">Social Marketing</a></li>
                  <li><a href="#">Mobile marketing</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section id="portfolio" className="section portfolio">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 portfolio-item"> <a href="work-details.html" className="portfolio-link"></a> </div>
              <div className="caption">
                <div className="caption-content">
                  <h3>The Shape of Design</h3>
                  <h4>Branding/Graphic</h4>
                </div>
              </div>
              <img src={require('./images/portfolio/work-1.jpg')} className="img-responsive" alt=""></img>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
