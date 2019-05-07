import React from 'react';
import '../seller_wizard/sellerPage.css'
import PropTypes from 'prop-types';
import logo from '../../../logo.png';
import { withStyles } from '@material-ui/core/styles';
import { Slider, InputRange, FormGroup, TextField, Paper, Typography, Button, Toolbar, AppBar, Stepper, Step, StepLabel, StepContent, PaperLink, MenuItem, Radio, FormHelperText, FormControl, FormControlLabel, RadioGroup, Select, InputLabel, Input, FormLabel, Checkbox,connect,withRouter } from "../../../utilities"
import { TextBox, RangeSlider, DropzoneDialogExample, CommanSnackBar, Header, Footer } from "../../index";
import {getStepContent} from "./seller_form1"
import{Loader} from "../../../components"
import FadeSnackbar from '../../SnackBar/SnackBar';
import{seller_wizard,seller_wizard_image_upload} from "../../../action";
import {constant} from "../../../config"



class PropertImageUpload extends React.Component {

constructor(props){
super(props)
this.handleChange=this.handleChange.bind(this)
this.onsubmit=this.onsubmit.bind(this)
this.state={image_drop:[],property_id:this.props.match.params.id}
}

handleChange(event,files)
{
 this.setState({image_drop:files})

}

onsubmit()
{

this.props.sendData(this.state,this.props.match.params.id)
}

  render() {
   var {loader,snackbar}=this.props.state.seller_wizard
    if(this.props.state.seller_wizard.status==200)
    {
      this.props.history.push(constant.frontend_url.home_page)
    }
    return(
      <div>
        <Header/>
   <div className="after_image_uploaded">
   
     <DropzoneDialogExample name="image_drop" state={this.state} change={this.handleChange}/>
     <Button className="submit_image" onClick={this.onsubmit}>Submit</Button>
     {(loader==true)?<Loader/>:""}
     <FadeSnackbar snackbar={snackbar} onclose={this.onsnackbar} />
     {(this.props.state.utilities.loader==true)? <Loader />:""}
       <CommanSnackBar state={this.props.state.utilities.snackbar}/>
     </div>
     <Footer/>
     </div>
    );
  }
}





const mapStateToProps = state => ({
	state
})
const actionCall = dispatch => ({
	sendData:(image,property_id)=>{dispatch(seller_wizard_image_upload(image,property_id))}
})
export default withRouter(connect(mapStateToProps,actionCall)((PropertImageUpload)))