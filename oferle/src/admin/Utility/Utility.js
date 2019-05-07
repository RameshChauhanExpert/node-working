import React from "react";
import {Input} from '@material-ui/core';

class Utility extends React.Component{
    constructor(){
        super()
    }


    render(){
        return(<div>
  <div  class="row">
   <div class="col-lg-2">
   Company Name
   </div>
   <div class="col-lg-10">
   <Input
   placeholder="Placeholder"
   
   inputProps={{
     'aria-label': 'Description',
   }}
 />
   </div>
   </div>
   <div  class="row">
   <div class="col-lg-2">
   Logo 
   </div>
   <div class="col-lg-10">
   <input type="file"  />
   </div>
   </div>
   <div  class="row">
   <div class="col-lg-2">
   Company Email Address 
   </div>
   <div class="col-lg-10">
   <Input
   placeholder="Placeholder"
   
   inputProps={{
     'aria-label': 'Description',
   }}
 />
   </div>
   </div>
   <div  class="row">
   <div class="col-lg-3">
   Company Contact Number
   </div>
   <div class="col-lg-9">
   <Input
   placeholder="Placeholder"
   
   inputProps={{
     'aria-label': 'Description',
   }}
 />
   </div>
   </div>

 


        </div>)
    }
}

export default Utility