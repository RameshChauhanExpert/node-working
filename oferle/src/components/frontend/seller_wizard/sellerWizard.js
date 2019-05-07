import React from 'react';
import '../seller_wizard/sellerPage.css'
import PropTypes from 'prop-types';
import logo from '../../../logo.png';
import { withStyles } from '@material-ui/core/styles';
import { Slider, InputRange, FormGroup, TextField, Paper, Typography, Button, Toolbar, AppBar, Stepper, Step, StepLabel, StepContent, PaperLink, MenuItem, Radio, FormHelperText, FormControl, FormControlLabel, RadioGroup, Select, InputLabel, Input, FormLabel, Checkbox,connect,withRouter,Link } from "../../../utilities"
import { TextBox, RangeSlider, DropzoneDialogExample } from "../../index";
import {getStepContent} from "./seller_form"
import{Loader} from "../../../components"
import FadeSnackbar from '../../SnackBar/SnackBar';
import{seller_wizard} from "../../../action";
import {constant} from "../../../config"
import  "../landing_page/property_search/style.css"

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ['Contact Info', 'Basic Detail', 'Community info', 'House condition', 'Add photos'];
}


class HorizontalLinearStepper extends React.Component {
  elementIndex 
  constructor() {
    super()
    this.updateState = this.updateState.bind(this)
    this.onsnackbar=this.onsnackbar.bind(this)
    this.elementIndex = 1,
    this.imageBLob=Array()
    this.state = {
      activeStep: 0,
      skipped: new Set(),
      labelWidth: 0,
      isValidate:this.isValidate,
      validate:false,
      finalCheckAll:"false",
      element:0,
      image_drop:[],
      kitchen_range:0,
      interior_paint:0,
      flooring_range:0,
      units_range:0,
      roof_range:0,
      roof_range:0,
      exterior_range:0,
      windows_range:0,
      electrical_range:0,
      water_heater_range:0,
      appliances_range:0,
      bathroom_range:0,
      pool_range:0,
      units:"",
      user_image:"",
      year_built:"",
      sq_ft:"",
      no_of_cars:"",
      ac_units:"",
      hoa_dues:"",
      hoa_period:"",
      amenities_pool:0,
      amenities_gym:0,
      amenities_spa:0,
      amenities_golf:0,
      amenities_recreation_area:0,
      amenities_other:"",
      condo_dues:"",
      condo_period:"",
      owner_restruction:"",
      other_condition_issue:"",
      brokerage_name:"",
      state:"FL",
      occupancy_rent_amount:"",
      isGarage:"",
      cooling_system:"",
      waste_water_system:"",
      is_condo:"",
      is_55_Community:"",
      new_owner_restruction:"",
      occupancy:"",
      is_hoa:"",
      is_condo:"",
      loader:false,
      snackbar:{show:false,message:""}
      

    };
    
  
  }

  

  updateState = (event,file) => {
    var name=event.target.name;
    if(event.target.name=="image_drop")
    {  
           
     return this.setState({image_drop:file,finalCheckAll:"true"})
    }
    else if(event.target.id=="array_data")
    {
             var dammy=Array();
             var arrayData=event.target.name.split("_");
             if(dammy.length!=0) 
             {
               
              dammy[0].push(this.state[arrayData[0]])
              dammy[0].push(event.target.value)
             }
             else{
              
               dammy.push(event.target.value)
             }
            
             this.setState({[arrayData[0]]:dammy})
             this.setState({[event.target.name]:event.target.value,finalCheckAll:"true"})
    }
    else
    {
      this.setState({[event.target.name]:event.target.value,finalCheckAll:"true"})
    }
   
  }
  isStepOptional = step => {
    return step === 4;
  };

  isValidate=(isValidate,validate)=>{
    
    var totalElement
    var elementIndex;
    if(this.state.activeStep==0)
    {

      var totalElement=5;
      if(this.state.is_owner==1)
      {
        totalElement+=5

      }
      if(this.state.is_owner==0)
      {
        totalElement+=7

      }
      if(this.state.is_licensed==1&&this.state.is_owner==1)
      {
        totalElement+=5
      }
      if(this.state.is_licensed==0&&this.state.is_owner==1)
      {
        totalElement
      }
     
    }

    
    else if(this.state.activeStep==1)
    {
     
     if(this.state.PropertyType==5)
     {
      totalElement=2
     }else{

      totalElement=9
     
      if(this.state.PropertyType==4)
      { 
        totalElement =  totalElement-3
        totalElement +=1
      }
      if(this.state.occupancy==1)
      {
        totalElement +=1
      }
      if(this.state.units>0&&this.state.PropertyType==4)
      {   let occupancy=0
        for(let i=0;i<=this.state.units;i++)
        {
          if(this.state["occupancy_"+i]==2)
          {
            occupancy++
          }
        }
        totalElement+=parseInt(this.state.units)*3
        totalElement+=occupancy
       
       
      }
      
      if(this.state.isGarage==1)
      {
       totalElement +=1
      }

    }

    }
    //basic detail end
    else if(this.state.activeStep==2)
    {
      
      totalElement=5;
      if(this.state.is_hoa==1)
      {
        totalElement+=2
       
      }
     if(this.state.is_condo==1)
      {
          totalElement+=2
      }
    
      if(this.state.new_owner_restruction==1)
      {
        totalElement+=1
      }
    

    }
   
   if(isValidate==true)
   { 
     
    elementIndex=this.elementIndex++;
   
   }
   
    this.setState({validate:validate},()=>{
             
      if(isValidate==true&&elementIndex==totalElement)
      {  

       if(this.state.PropertyType==5&&this.state.activeStep==1)
       {
            this.setState({activeStep:4})
       }else
       {
        const { activeStep } = this.state;
        let { skipped } = this.state;
        if (this.isStepSkipped(activeStep)) 
        {
        skipped = new Set(skipped.values());
        skipped.delete(activeStep);
        }
          this.setState({
            activeStep: activeStep + 1,
            skipped,
          });
       }
          
      }
      else{
   
      this.setState({finalCheckAll:"false"});
      }
    })
  }

  multyfamilyunits=()=>
  {
   if(this.state.PropertyType!=5)
   {
    if(this.state.units>0&&this.state.PropertyType==4)
    {
      
     var rent_amount=Array()
     var multiFamilyBathRooms=Array()
     var multiFamilyBedrooms=Array()
     for(var i=1;i<=this.state.units;i++ )
     {  
         rent_amount.push(this.state["rent_amount_"+i]);
         multiFamilyBathRooms.push(this.state["multiFamilyBathRooms_"+i])
         multiFamilyBedrooms.push(this.state["multiFamilyBedrooms_"+i]);
         return {rent_amount:rent_amount,multiFamilyBathRooms:multiFamilyBathRooms,multiFamilyBedrooms:multiFamilyBedrooms};
     }
    }else{
     
     var rent_amount=Array()
     var multiFamilyBathRooms=Array()
     var multiFamilyBedrooms=Array()
     rent_amount.push(this.state['rent_amount_1'])
     multiFamilyBathRooms.push(this.state["multiFamilyBathRooms_1"])
     multiFamilyBedrooms.push(this.state["multiFamilyBedrooms_1"]);
     return {rent_amount:rent_amount,multiFamilyBathRooms:multiFamilyBathRooms,multiFamilyBedrooms:multiFamilyBedrooms};
    }
      
   }
   
  }


  handleNext = () => {
  this.elementIndex = 1
  if(this.state.activeStep==3)
  {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
      this.setState({
      activeStep: activeStep + 1,
      skipped,
    });
  }else if(this.state.activeStep<3){

    this.setState({validate:true,finalCheckAll:"true"},()=>{
        this.elementIndex = 1
        window.scrollTo(0, 0)
    })

  }

  
  if(this.state.activeStep==4)
  {
  if(this.state.units>0)
  {
    var units_data= this.multyfamilyunits()
       
    this.setState({units_data:units_data,loader:true},()=>{
     this.props.sendData(this.state)
    })
  }else{

    var units_data= this.multyfamilyunits()
       
    this.setState({units_data:units_data,loader:true},()=>{
      this.props.sendData(this.state)
    
    })
   
  }
  
  }
  };

  handleBack = () => {
    if(this.state.activeStep==4&&this.state.PropertyType==5)
    {
      this.setState(state => ({
        activeStep: 1,
        finalCheckAll:"true"
      }));
    }else
    {
      this.setState(state => ({
        activeStep: state.activeStep - 1,
        finalCheckAll:"true"
      }));
      window.scrollTo(0, 0)
      this.elementIndex = 1
    }
   
  };



  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ value: event.target.value });
  };
  onsnackbar()
  {
    setTimeout(function(){
      this.setState({snackbar:{show:false,message:""}})
    }.bind(this),1500)
  }

  componentWillMount()
  {
    if(this.props.location.state)
    {
      let {street_address,city,state,postal_code}=this.props.location.state.location_search
     this.setState({street_address:street_address,city:city,zipcode:postal_code})
    }

  }

  render() {
     
    var {snackbar,loader}=this.props.state.seller_wizard
    var { classes} = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    if(this.props.state.seller_wizard.status==200)
    { 
      
      localStorage.setItem("login",true)
      localStorage.setItem("token_id",this.props.state.seller_wizard.user_detail.user_id)
     if(this.state.activeStep!=5)
     {
       this.setState({activeStep:5})
     }
    }
    
    

    return (
      <div className={classes.root}>
        <div className="sidebar">
          <div className="logo">
          <img src={logo} alt="" />
          </div>
          <Stepper activeStep={activeStep} orientation="vertical" className="steps-wrapper">
            {steps.map((label, index) => {
              const props = {};
              const labelProps = {};
              if (this.isStepOptional(index)) {
                labelProps.optional = <Typography className="optional-text" variant="caption">(Optional)</Typography>;
              }
              if (this.isStepSkipped(index)) {
                props.completed = false;
              }
              return (
                <Step key={label} {...props}>
                  <StepLabel className="step-label" {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

        </div>
        <div className="page-main">
          <div className="container-fluid">

            <div className="section-header">
              <h3 className="section-title">
                <span>Request Your Offer</span>
              </h3>
              <p className="lead">Please provide detailed answers to the questions below, and we'll send your competitive purchase offer <br />within 24-hours. There's no cost, obligation or hassle.
                </p>
            </div>
            {activeStep === steps.length ? (
              <div className="action-buttons sucessful-register">
                <Typography className={classes.instructions}>
                <h3>Congratulation ! </h3>
                <p>You have successfully added your property on Offerlane.</p>
                {(this.props.state.seller_wizard.user_exist==0)?<p>Your account details have been sent on your registered email address.</p>:""}
               <a href={constant.frontend_url.seller_dashboard}><Button>Go to dashboard</Button></a>
              </Typography>
              </div>
            ) : (
              <div>
              <form id="myForm" className="seller-form-wrapper" enctype="multipart/form-data" action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8" method="POST"> 
                <div className="steps-content">
                  <Typography className={classes.instructions}>
                  
                  {getStepContent(activeStep, this.updateState, this.state)}
                 
                  </Typography>
                  <div className="action-buttons">
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className="button button-default prev-btn"
                    >
                      Prev
                </Button>
                
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className="button button-primary  next-btn"
                      //type={activeStep === steps.length - 1 ? 'submit' : 'button'}
                    >
                      {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                    </Button>
                    
                  </div>
                </div>
               </form>
            
               {(loader==true)?<Loader/>:""}
                 <FadeSnackbar snackbar={snackbar} onclose={this.onsnackbar} />
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

HorizontalLinearStepper.propTypes = {
  classes: PropTypes.object,
};



const mapStateToProps = state => ({
	state
})
const actionCall = dispatch => ({
	sendData:(state)=>{dispatch(seller_wizard(state))}
})
export default withRouter(connect(mapStateToProps,actionCall)(withStyles(styles)(HorizontalLinearStepper)))