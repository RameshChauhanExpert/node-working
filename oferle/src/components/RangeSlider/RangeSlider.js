

import 'rc-slider/assets/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Slider from 'rc-slider';
import "./RangeSlider.css"
const style = { width: 400, margin:0 };
const marks = {
    0: <span>0</span>,
    10: <div className="range_title">
    <div className="col-lg-12"><span className="average-range">1</span></div><div className="col-lg-12"><span className="average_label good-range range_label">Bad</span></div>
      </div>,
    20: '2',
    30: '3',
    40: '4',
    50: <div className="range_title">
  <div className="col-lg-12"><span className="good-range">5</span></div><div className="col-lg-12"><span className="good_label good-range range_label">Good</span></div>
    </div>,
    60: '6',
    70: '7',
    80: '8',
    90: '9',
    100: <div className="range_title">
    <div className="col-lg-12"><span className="perfect-range">10</span></div><div className="col-lg-12"><span className="perfect_label good-range range_label">Perfect</span></div>
      </div>,
};

function log(value) {
  console.log(value); //eslint-disable-line
}
  export default class RangeSlider extends React.Component{
      constructor(props){
          super(props)
          this.handlechange=this.handlechange.bind(this);
      }
      handlechange(value)
      { 
          var event={target:{name:this.props.name,value:value}}  
       // alert(this.props.name+"---"+event.target.name)
          this.props.change(event)
      }
      render(){
          
          return(
    <div className="range-slider-wrap">
    
      <Slider min={0} value={this.props.value} onChange={this.handlechange} marks={marks} name={this.props.name} step={null}   />
   
          </div>)
      }
  }






  