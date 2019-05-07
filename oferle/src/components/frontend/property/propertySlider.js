import React from 'react';
import { constant } from '../../../config';
import Slider from "react-slick";
export default class PropertySlider extends React.Component {

  render() {
    return (
      <div>
        <div id="sync1" class="owl-carousel">
          <div className="item"><img className="slick-slider-img" alt="Alt" src={require('./images/property-slide-1.jpg')} /></div>
          <div className="item"><img className="slick-slider-img" alt="Alt" src={require('./images/property-slide-2.jpg')} /></div>
          <div className="item"><img className="slick-slider-img" alt="Alt" src={require('./images/property-slide-1.jpg')} /></div>
          <div className="item"><img className="slick-slider-img" alt="Alt" src={require('./images/property-slide-2.jpg')} /></div>
          <div className="item"><img className="slick-slider-img" alt="Alt" src={require('./images/property-slide-1.jpg')} /></div>
          <div className="item"><img className="slick-slider-img" alt="Alt" src={require('./images/property-slide-2.jpg')} /></div>
        </div>

        <div id="sync2" class="owl-carousel">
          <div className="slide-thumb"><img className="slick-slider-img" alt="Alt" src={require('./images/slider-thumb-1.jpg')} /></div>
          <div className="slide-thumb"><img className="slick-slider-img" alt="Alt" src={require('./images/slider-thumb-2.jpg')} /></div>
          <div className="slide-thumb"><img className="slick-slider-img" alt="Alt" src={require('./images/slider-thumb-1.jpg')} /></div>
          <div className="slide-thumb"><img className="slick-slider-img" alt="Alt" src={require('./images/slider-thumb-2.jpg')} /></div>
          <div className="slide-thumb"><img className="slick-slider-img" alt="Alt" src={require('./images/slider-thumb-1.jpg')} /></div>
          <div className="slide-thumb"><img className="slick-slider-img" alt="Alt" src={require('./images/slider-thumb-2.jpg')} /></div>
        </div>
      </div>



    )

  }

}