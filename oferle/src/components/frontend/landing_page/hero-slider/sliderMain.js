import React, { Component } from "react";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slider from "react-slick";
import './banner.css';
import { LinearBuffer } from "../../../index";
import { library, FontAwesomeIcon, faFacebookF, faTwitter, faLinkedinIn } from "../../../../utilities"
import $ from "jquery";
import  slick from "slick-carousel"
library.add(faFacebookF, faTwitter, faLinkedinIn)


export default class HomeSlider extends Component {
    
    
    componentDidMount()
  {
 var time = 2;
 var $status = $('.pagingInfo');
 var $bar,
   $slick,
   isPause,
   tick,
   percentTime;

 $slick = $('#hero-slider');
 
 $slick.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
       //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
       var i = (currentSlide ? currentSlide : 0) + 1;
       slick.slideCount=4;
       $status.text(i + '  OUT OF  ' + 4);
   });

 $slick.slick({
   arrows: true,
   speed: 500,
   adaptiveHeight: false
 });

 $bar = $('.slider-progress .progress');

 function startProgressbar() {
   resetProgressbar();
   percentTime = 0;
   isPause = false;
   tick = setInterval(interval, 20);
 }

 function interval() {
   if (isPause === false) {
     percentTime += 1 / (time + 0.1);
     $bar.css({
       width: percentTime + "%"
     });
     if (percentTime >= 100) {
       $slick.slick('slickNext');
       startProgressbar();
     }
   }
 }

 function resetProgressbar() {
   $bar.css({
     width: 0 + '%'
   });
   clearTimeout(tick);
 }

 startProgressbar();

 $('.slick-next, .slick-prev').click(function() {
  
   startProgressbar();
 });


  }
    
    
    
  render() {
      
    return (
      <div className="hero-slider">

        <div class="slider-wrapper">
          <div class="slider responsive" id="hero-slider">
            <div>
              <div class="image"><img class="slick-slider-img" alt="Alt" src={require('../hero-slider/img/slide-01.jpg')} /></div>
            </div>
            <div>
              <div class="image"><img class="slick-slider-img" alt="Alt" src={require('../hero-slider/img/slide-02.jpg')} /></div>
            </div>
            <div>
              <div class="image"><img class="slick-slider-img" alt="Alt" src={require('../hero-slider/img/slide-03.jpg')} /></div>
            </div>
            <div>
              <div class="image"><img class="slick-slider-img" alt="Alt" src={require('../hero-slider/img/slide-04.jpg')} /></div>
            </div>
          </div>
          <div className="count-progressbar">
            <span class="pagingInfo"></span>
            <div class="slider-progress">
              <div class="progress"></div>
            </div>
          </div>
        </div>



        <ul className="social-icon">
          <li data-aos="fade-up" data-aos-duration="400">
            <a href="#">
              <FontAwesomeIcon icon={['fab', 'facebook-f']} /></a>

          </li>
          <li data-aos="fade-up" data-aos-duration="700">
            <a href="#">
              <FontAwesomeIcon icon={['fab', 'twitter']} /></a>
          </li>
          <li data-aos="fade-up" data-aos-duration="1000">
            <a href="#">
              <FontAwesomeIcon icon={['fab', 'linkedin-in']} /></a>

          </li>
        </ul>

        {/* <span className="slide_count">{this.state.position} out of {this.state.path.length}</span> 
      */}
      </div>
    );
  }
}



const styles = {
  root: {
    flexGrow: 1,
  },
};

class LinearDeterminate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      completed: 0,
    };
    this.cur = 1;
    this.pre = 1;
    this.comp = 0
  }


  componentDidMount() {
    setInterval(function () {
      this.comp
    })
  }


  render() {

    this.cur = this.props.state
    var comp = 0

    if (this.cur != this.pre) {
      this.pre = this.cur;
      comp = 100;

      setTimeout(function () { comp = 0 }, 1)


    }

    return (
      <div >

        <LinearProgress variant="determinate" value={0} />
        <br />

      </div>
    );
  }
}

LinearDeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

withStyles(styles)(LinearDeterminate)