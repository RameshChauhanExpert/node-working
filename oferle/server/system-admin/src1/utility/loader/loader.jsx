import React from "react";
import './loader.css'
export var AllSpinner = require('react-spinkit');



export var Spinner=(props)=>{
    return(
        <div className="loader-div">
        <span><AllSpinner className="loader" name={this.props.name} /></span>
        </div>
            )
}








