import React from 'react';
import '../seller_wizard/sellerPage.css'
import PropTypes from 'prop-types';
import logo from '../../../logo.png';
import { withStyles } from '@material-ui/core/styles';
import { Slider, InputRange, FormGroup, TextField, Paper, Typography, Button, Toolbar, AppBar, Stepper, Step, StepLabel, StepContent, PaperLink, MenuItem, Radio, FormHelperText, FormControl, FormControlLabel, RadioGroup, Select, InputLabel, Input, FormLabel, Checkbox } from "../../../utilities"
import { RadioButton,SelectBox,TextBox, RangeSlider, DropzoneDialogExample } from "../../index";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
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

function islicensed(islicensed, updateState, state) {

  switch (islicensed) {
    case "1": return (
      <div className="form_wrapper requesting_offer licensed form-width-m">
        <div className="title-h4">Please enter one name.</div>
        <TextBox label="Owner First Name" type="text" name="owner_first_name" value={state.owner_first_name}  state={state} change={updateState} validate={state.validate} className="form-control-large" required={[true,"Please enter owner first name"]}/>
        <TextBox label="Owner Last Name" type="text" name="owner_last_name" value={state.owner_last_name}  state={state} change={updateState} validate={state.validate} className="form-control-large" required={[true,"Please enter owner last name"]}/>
        <TextBox label="Agent's First Name" type="text" name="agent_first_name" value={state.agent_first_name}  state={state} change={updateState} validate={state.validate} className="form-control-large" required={[true,"Please enter agent's first name"]}/>
        <TextBox label="Agent's Last Name" type="text" name="agent_last_name" value={state.agent_last_name}  state={state} change={updateState} validate={state.validate} className="form-control-large" required={[true,"Please enter agent's last name "]}/>
        <TextBox label="Agent's Email" type="text" name="agent_email_address" value={state.agent_email_address}  onBlur={true} email={[true,"Sorry you entered invalid email"]} state={state} change={updateState} validate={state.validate} className="form-control-large" required={[true,"Please enter agent's email"]}/>
        <TextBox label="Agent's Phone Number" type="text" min_value={[true,0,"Please enter valid phone number"]} only_number={[true,"Phone number support only number"]} is_int={[true,"Please enter valid phone"]} name="agent_phone_number" max={[true,10,"Please enter valid phone number"]} value={state.agent_phone_number}  state={state} change={updateState} validate={state.validate} className="form-control-large" required={[true,"Please enter agent's phone number"]}/>
        <TextBox label="Brokerage Name" type="text" name="brokerage_name"  state={state} value={state.brokerage_name}  change={updateState} validate={state.validate} className="form-control-large" required={[true,"Please enter brokerage name"]}/>
        <div className="clearfix spacer"></div>
        <div className="title-h4">Is this home listed on MLS?</div>
        <FormControl component="fieldset" className="radio-options-common">
          <RadioGroup
            onChange={updateState}
            value={state.mls}
            aria-label="position"
            name="mls"
            column
            className="radio-group"
          >
            <FormControlLabel
              value="1" className="radio-button"
              control={<Radio color="primary" />}
              label="Yes"
              labelPlacement="left"
            />
            <FormControlLabel
              value="0" className="radio-button"
              control={<Radio color="primary" />}
              label="No"
              labelPlacement="left"
            />
          </RadioGroup>
        </FormControl>
      </div>
    )
    case "0": return (
      <div className="form_wrapper requesting_offer non-licensed form-width-m">
        <div className="title-h4">Please enter one name.</div>
        <TextBox label="Owner First Name" type="text" name="owner_first_name"  state={state} change={updateState} validate={state.validate} className="form-control-large" required={[true,"Please enter owner first name"]}/>
        <TextBox label="Owner Last Name" type="text" name="owner_last_name"  state={state} change={updateState} validate={state.validate} className="form-control-large" required={[true,"Please enter owner last name"]}/>
        <TextBox label="Owner Phone Number" type="text" name="owner_phone_number" only_number={[true,"Phone number support only number"]} is_int={[true,"Please enter valid phone"]}  min_value={[true,0,"Please enter valid phone number"]} state={state} change={updateState} validate={state.validate} className="form-control-large" max={[true,10,"Phone number accept upto 10 digit."]} required={[true,"Please enter phone number"]}/>
        <TextBox label="Owner Email Address"
          type="text"
          name="owner_email_address" 
           state={state} 
           change={updateState} 
           validate={state.validate} 
           className="form-control-large" 
           onBlur={true} 
           email={[true,"Sorry you entered invalid email"]} 
           required={[true,"Please enter email address"]}/>
            </div>

    )
  }

}
function isGarage(index,updateState,state)
{
  switch(index)
  {
    case "1":
  
  return(<div className="sub-content form-group-wrapper">
  <p className="form-label clearfix">How many cars carport?</p>
  <div className="input-text">
    
    <TextBox label="No of cars" type="text" max={[true,2,"This field contain only 2 digits"]} only_number={[true,"This field contain only number"]}  is_int={[true,"Please enter valid number"]} name="no_of_cars" min_value={[true,0,"Please enter valid number"]}  value={state.no_of_cars} state={state} change={updateState} validate={state.validate} className="form-control-m large-input" required={[true,"Please enter number of cars"]}/>
          
  </div>

</div>)
  }
}
function IsOwnerForm(owner, updateState, state) {
  switch (owner) {
    case "1":
      return (<div className="sub-content">

        <div className="title-h3">Is this property by licensed real estate agent ?</div>
            <RadioButton 
              className="radio-options-common"
               data={[
                 {name:"Yes",value:"1"},
                 {name:"No",value:"0"}
                
                ]}
                name="is_licensed"
                required={[true,"Please select this field"]}
                state={state} change={updateState} 
                validate={state.validate}
                column="true"
              />

        {islicensed(state.is_licensed, updateState, state)}
      </div>)

    case "0":
      return (<div className="sub-content">
        <div className="form_wrapper requesting_offer licensed form-width-m">
          <div className="title-h4">Please enter one name.</div>
          
          <TextBox label="Owner First Name" type="text" name="owner_first_name"  state={state} change={updateState} validate={state.validate} className="form-control-large" required={[true,"Please enter owner first name"]}/>
          <TextBox label="Owner Last Name" type="text" name="owner_last_name"  state={state} change={updateState} validate={state.validate} className="form-control-large" required={[true,"Please enter owner last name"]}/>
          <TextBox label="Agent's First Name" type="text" name="agent_first_name"  state={state} change={updateState} validate={state.validate} className="form-control-large" required={[true,"Please enter agent's first name"]}/>
          <TextBox label="Agent's Last Name" type="text" name="agent_last_name"  state={state} change={updateState} validate={state.validate} className="form-control-large" required={[true,"Please enter agent's last name"]}/>
          <TextBox label="Agent's Email" type="text" name="agent_email_address"  state={state} change={updateState} validate={state.validate} className="form-control-large" onBlur={true} email={[true,"Sorry you entered invalid email"]} required={[true,"Please enter agent's email"]}/>
          <TextBox label="Agent's Phone Number" type="text" name="agent_phone_number"  only_number={[true,"Phone number support only number"]} is_int={[true,"Please enter valid phone"]} min_value={[true,0,"Please enter valid phone number"]}  state={state} change={updateState} validate={state.validate} className="form-control-large" max={[true,10,"Please enter valid phone number"]} required={[true,"Please enter agent's phone number"]}/>
          <TextBox label="Brokerage Name" type="text" name="brokerage_name"  state={state} change={updateState} validate={state.validate} className="form-control-large" required={[true,"Please enter brokerage name"]}/>
          

          <div className="clearfix spacer"></div>
          <div className="title-h4">Is this home listed on MLS?</div>
          <FormControl component="fieldset" className="radio-options-common">
            <RadioGroup
              onChange={updateState}
              value={state.mls}
              aria-label="position"
              name="mls"
              column
              className="radio-group"
            >
              <FormControlLabel
                value="1" className="radio-button"
                control={<Radio color="primary" />}
                label="Yes"
                labelPlacement="left"
              />
              <FormControlLabel
                value="0" className="radio-button"
                control={<Radio color="primary" />}
                label="No"
                labelPlacement="left"
              />
            </RadioGroup>
          </FormControl>

        </div>
      </div>)
  }

}

var MultiFamilyUnits=(props,updateState,state)=>{
  var units=Array();
   for(var i=1;i<=props;i++)
   {
    units.push(<div className="units-wrapper">
  
  <div className="heading-h5">Unit {i}</div>
  

            <SelectBox
              name={"multiFamilyBedrooms_"+i} 
              change={updateState}
              label="BedRooms"
              data={[
                {value:"1",name:"1"},
                {value:"2",name:"2"},
                {value:"3",name:"3"},
                ]}
                validate={state.validate}
                state={state}
                className="select-box form-control-m"
                id='array_data'
                onChange={updateState}
                required={[true,"Please select number of bedroom"]}
                />
   
          <SelectBox
              name={"multiFamilyBathRooms_"+i} 
              change={updateState}
              label="Bathrooms"
              data={[
                {value:"1",name:"1"},
                {value:"2",name:"2"},
                {value:"3",name:"3"},
                ]}
                validate={state.validate}
                state={state}
                className="select-box form-control-m"
                id='array_data'
                onChange={updateState}
                required={[true,"Please select number of bathroom"]}
                />
     <TextBox  min_value={[true,0,"Please enter valid amount"]}  label="Rent amount" id="array_data" type="text" is_float={[true,"This field accept upto two decimal numbers."]} name={"rent_amount_"+i} value={state["rent-amount_"+i]}  state={state} change={updateState} validate={state.validate} className="form-control-m large-input"  required={[true,"Please enter rent amount"]}/>
           
 
</div>)
   }

   return(units.map(data=>{
    return(<div>{data}</div>)}))
}
function isMultiFamily(index,updateState,state) {
  switch (index) {
    case "4": return (
     <div className="sub-content form__wrapper">
        <div className="heading-h5">How many units?</div>
        <div className="input-text">
          {/* <TextField
          id="standard-number"
          label="Units"
          name="units"
          onChange={updateState}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        /> */}

<TextBox label="Units" is_int={[true,"Please enter valid units"]} type="text" max={[true,2,"This field contain only 2 digits"]} only_number={[true,"This field support only number"]}  min_value={[true,0,"Please enter valid units"]} value={state.units} name="units"  state={state} change={updateState} validate={state.validate} className="form-control-m large-input"  required={[true,"Please enter units"]}/>
             

        </div>
         {MultiFamilyUnits(state.units,updateState,state)}
      </div>
    )
    default:return (<div className="units-wrapper">
             <SelectBox
              name={"multiFamilyBedrooms_1"} 
              change={updateState}
              label="Bedrooms"
              data={[
                {value:"1",name:"1"},
                {value:"2",name:"2"},
                {value:"3",name:"3"},
                ]}
                validate={state.validate}
                state={state}
                className="select-box form-control-m"
                id='array_data'
                onChange={updateState}
                required={[true,"Please select number of bedroom"]}
                />
   
          <SelectBox
              name={"multiFamilyBathRooms_1"} 
              change={updateState}
              label="Bathrooms"
              data={[
                {value:"1",name:"1"},
                {value:"2",name:"2"},
                {value:"3",name:"3"},
                ]}
                validate={state.validate}
                state={state}
                className="select-box form-control-m"
                id='array_data'
                onChange={updateState}
                required={[true,"Please select number of bathroom"]}
                />
            <TextBox 
            label="Rent amount"
            id="array_data" 
            type="text"
            is_float={[true,"This field accept upto two decimal numbers."]} 
            name={"rent_amount_1"} 
            value={state["rent-amount_1"]} 
            state={state} change={updateState} 
            validate={state.validate} 
            required={[true,"Please enter rent amount"]}
            className="form-control-m large-input" />
                

    </div>)
  }
}
function isHoa(index,updateState,state)
{
  switch(index)
  {
    case "1":return(  <div class="sub-content form-group-wrapper inside-input-wrapper">
    <div className="form__wrapper">
   
      
      <TextBox label="HOW MUCH ARE DUES ($)?" is_float={[true,"This field accept upto two decimal numbers."]} min_value={[true,0,"Please enter valid amount"]} value={state.hoa_dues} type="text" name="hoa_dues"   state={state} change={updateState} validate={state.validate} className="form-control-m large-input"  required={[true,"Please enter hoa due"]}/>
      
      <SelectBox
              name="hoa_period" 
              change={updateState}
              label="HOW OFTEN ARE THEY PAID ?"
                data={[
                  {value:"Monthly",name:"Monthly"},
                  {value:"Quarterly",name:"Quarterly"},
                  {value:"Yearly",name:"Yearly"},
                  {value:"other",name:"other"},
                  ]}
                validate={state.validate}
                state={state}
                className="select-box form-control-m"
                id='state-simple'
                onChange={updateState}
                required={[true,"Please select  period"]}
            />

  </div>
</div>)
  }
}
function isCondo(index,updateState,state)
{
  switch(index)
  {
    case "1":return(
    <div class="sub-content form-group-wrapper inside-input-wrapper">
    <div className="form__wrapper">
   
    <TextBox  label="HOW MUCH ARE DUES ($)?" value={state.hoa_dues} min_value={[true,0,"Please enter valid amount."]} is_float={[true,"This field accept upto two decimal."]} type="text" name="condo_dues"  state={state} change={updateState} validate={state.validate} className="form-control-m large-input"  required={[true,"Please enter condo's due. "]}/>
      
      <SelectBox
              name="condo_period" 
              change={updateState}
              label="HOW OFTEN ARE THEY PAID ?
              "
              data={[
                {value:"Monthly",name:"Monthly"},
                {value:"Quarterly",name:"Quarterly"},
                {value:"Yearly",name:"Yearly"},
                {value:"other",name:"other"},
                ]}
                validate={state.validate}
                state={state}
                className="select-box form-control-m"
                id='state-simple'
                onChange={updateState}
                required={[true,"Please select  period."]}
            />
  </div>
</div>)
  }
}


function year_built(){
  var year=Array();
  for(var i=2018;i!=1900;i--)
  {
      year.push({name:i+"",value:i+""})
  }
  
  return year;
}

function rentalrestruction(index,updateState,state)
{
  switch(index){
    case "1":return( 
      <TextBox label="Owner restruction" type="text" name="owner_restruction"  state={state} change={updateState} validate={state.validate} className="form-control-m large-input" required={[true,"Please enter restrictions"]}/>
    )
  }
}
export function getStepContent(step, updateState, state) {
  
  switch (step) {
    case 0:
      return (
        <div className="step-1">
          <h3>Property address</h3>
          <p className="form-label clearfix">Enter the address of the property you want to sell.</p>
          <div className="property_address">
           
             <TextBox label="Street Address" type="text" value={state.street_address} name="street_address"  state={state} change={updateState} validate={state.validate} className="form-control-m large-input"  required={[true,"Please enter street address"]}/>
             
             <TextBox label="City" name="city" type="text" value={state.city} state={state} change={updateState} validate={state.validate} className="form-control-m" required={[true,"Please enter city"]}/>
              <SelectBox
              name="state" 
              change={updateState}
              label="State"
              data={[
                {value:"AZ",name:"Arizona"},
                {value:"CA",name:"California"},
                {value:"FL",name:"Florida"},
                ]}
                validate={state.validate}
                state={state}
                className="select-box form-control-m"
                id='state-simple'
                onChange={updateState}
                required={[true,"Please select state"]}
                />

             <TextBox label="Zip Code" 
             type="text" 
             value={state.zipcode} 
             name="zipcode"
             only_number={[true,"zipcode support only number"]} 
             is_int={[true,"Please enter valid zipcode"]}  
             // is_float={[true,"This field contain number or one decimal with 1/2 digits"]}
              onBlur={true}
              state={state} 
              change={updateState} 
              validate={state.validate} 
              min_value={[true,0,"Please enter valid zipcode"]} 
              max={[true,6,""]} 
              min={[true,6,"Please enter valid zipcode"]} 
              className="form-control-m " 
              required={[true,"Please enter zipcode"]}/>
              
              <div className="clearfix spacer"></div>
              <h3>Who is requesting this offer?</h3>
              <RadioButton 
              className="radio-options-wrp"
               data={[
                 {name:"I am the owner of the home",value:"1"},
                 {name:"I have permission to sell the property on behalf of the owner",value:"0"}
                
                ]}
                name="is_owner"
                required={[true,"Please select this filed"]}
                state={state} change={updateState} 
                validate={state.validate}
                row="true"
               
              />
              <div >
                {IsOwnerForm(state.is_owner, updateState, state)}
              </div>
          </div>
        </div>
      );
    case 1:
    
      return (<div className="step-r-wrapper">
        <div className="section-header">
          <h3>Basic Detail</h3>
          <p class="form-label clearfix">Type of property </p>
        </div>
        <RadioButton 
              className="radio-options-common"
               data={[
                 {name:"Single family",value:"1"},
                 {name:"Two house",value:"2"},
                 {name:"Condo",value:"3"},
                 {name:"MultiFamily",value:"4"},
                 {name:"Vacant Land",value:"5"}
                ]}
                column="true"
                name="PropertyType"
                required={[true,"Please select this field "]}
                state={state} change={updateState} 
                validate={state.validate}
              />
        <div>
        </div>
      <div className="unit-wrapper-single">
        {isMultiFamily(state.PropertyType,updateState,state)}</div>
        <div className="form-main form__wrapper units-wrapper">
        
        
        <SelectBox
              name="year_built" 
              change={updateState}
              label="Year Built"
              data={year_built()}
                validate={state.validate}
                state={state}
                className="select-box form-control-m"
                id='state-simple'
                onChange={updateState}
                required={[true,"Please select year of built  "]}
                />


         <TextBox label="Sq ft" type="text"  is_float={[true,"This field accept upto two decimal numbers"]}  name="sq_ft" value={state.sq_ft}  state={state} change={updateState} validate={state.validate} className="form-control-m" min_value={[true,0,"Please enter valid mesumerment"]} required={[true,"Please enter square feet"]}/>
      
          <div className="form-group-wrapper">
            <p className="form-label clearfix">Garage</p>
            <RadioButton 
              className="radio-options-common"
               data={[
                 {name:"Yes",value:"1"},
                 {name:"No",value:"0"}
                
                ]}
                name="isGarage"
                required={[true,"Please select this filed"]}
                state={state} change={updateState} 
                validate={state.validate}
                column="true"
              />

          </div>
          {isGarage(state.isGarage,updateState,state)}


          <div className="form-group-wrapper">
            <p className="form-label clearfix"> Cooling System</p>
            <RadioButton 
              className="radio-options-common"
               data={[
                 {name:"Wall unit A/c",value:"1"},
                 {name:"Central A/c",value:"0"}
                
                ]}
                name="cooling_system"
                required={[true,"Please select cooling system "]}
                state={state} change={updateState} 
                validate={state.validate}
                column="true"
              />
          </div>

          <div className="form-group-wrapper">
            <p className="form-label clearfix">Waste water system</p>
            

            <RadioButton 
              className="radio-options-common"
               data={[
                 {name:"Septic",value:"1"},
                 {name:"City sewer",value:"0"}
                
                ]}
                name="waste_water_system"
                required={[true,"Please select waste water must"]}
                state={state} change={updateState} 
                validate={state.validate}
                column="true"
              />


          </div>
        </div>


      </div >);
    case 2:
      return (<div className="step-r-wrapper">

        <div><h3>Community Info</h3>
          <p className="form-label clearfix">Is there an HOA?</p>
          <div className="form-group-wrapper">
           
          <RadioButton 
              className="radio-options-common"
               data={[
                 {name:"Yes",value:"1"},
                 {name:"No",value:"0"}
                
                ]}
                name="is_hoa"
                required={[true,"Please select this field"]}
                state={state} change={updateState} 
                validate={state.validate}
                column="true"
              />
          </div>
        </div>
        
            {isHoa(state.is_hoa,updateState,state)}
        <div class="form-group-wrapper">
          <p className="form-label clearfix">Is there communities aminities ?</p>
          <FormControl component="fieldset" >
            <FormGroup className="checkbox-group">
              <FormControlLabel name="amenities_pool" onChange={updateState} className="checkbox-input"
                control={
                  <Checkbox value={(state.amenities_pool==1)?"":1} checked={(state.amenities_pool==1)?true:false} color="primary" />
                }
                label="Pool"
              />
              <FormControlLabel name="amenities_gym" onChange={updateState} className="checkbox-input"
                control={
                  <Checkbox value={(state.amenities_gym==1)?"":1} checked={(state.amenities_gym==1)?true:false} color="primary" />
                }
                label="Gym"

              />
              <FormControlLabel name="amenities_spa" onChange={updateState} className="checkbox-input"
                control={
                  <Checkbox value={(state.amenities_spa==1)?"":1} checked={(state.amenities_spa==1)?true:false} color="primary" />
                }
                label="Spa"
              />
              <FormControlLabel name="amenities_recreation_area" onChange={updateState} className="checkbox-input"
                control={
                  <Checkbox  value={(state.amenities_recreation_area==1)?"":1} checked={(state.amenities_recreation_area==1)?true:false} color="primary" />
                }
                label="Recreation area"
              />
              <TextField label="Other" name="amenities_other" onChange={updateState} className="form-control-m other-input" margin="normal"/>
            </FormGroup>
          </FormControl>
        </div>
        <div class="form-group-wrapper">
          <p className="form-label clearfix">Is there condo association ?</p>
          <RadioButton 
              className="radio-options-common"
               data={[
                 {name:"Yes",value:"1"},
                 {name:"No",value:"0"}
                
                ]}
                name="is_condo"
                required={[true,"Please select this field"]}
                state={state} change={updateState} 
                validate={state.validate}
                column="true"
              />
        </div>

        {isCondo(state.is_condo,updateState,state)}
        <div class="form-group-wrapper">
          <p className="form-label clearfix"> Is this a 55+ Community? </p>

          <RadioButton 
              className="radio-options-common"
               data={[
                 {name:"Yes",value:"1"},
                 {name:"No",value:"0"}
                
                ]}
                name="is_55_Community"
                required={[true,"Please select this field"]}
                state={state} change={updateState} 
                validate={state.validate}
                column="true"
              />
        </div>
        <div class="form-group-wrapper">
          <p className="form-label clearfix">  Any Rental Restrictions for new owners?  IF yes please explain.   </p>
          <RadioButton 
              className="radio-options-common"
               data={[
                 {name:"Yes",value:"1"},
                 {name:"No",value:"0"}
                
                ]}
                name="new_owner_restruction"
                required={[true,"Please select this field"]}
                state={state} change={updateState} 
                validate={state.validate}
                column="true"
              />
        </div>
      
            {rentalrestruction(state.new_owner_restruction,updateState,state)}
  
      </div >);
    case 3:
      return (
        <div className="house_condition_wrapper">

          <h3>House Condition</h3>
          <div className="info-text">
            <p className="hightlight-text">Please rate the following items in the home:  1-10 </p>
            <p>1=being not livable in need of immediate repair or replacement <br />
              5=Outdated but in working order<br />
              10=Brand new or just updated with high end materials</p>
          </div>

          <div className="title-h4">Item they need to rate:</div>

          <div className="range-slider-row">
            <div className="range-slider-column">
              <h4>Kitchen</h4>
              <RangeSlider value={state.kitchen_range} name="kitchen_range" change={updateState} />
            </div>
            <div className="range-slider-column">
              <h4>Bathroom</h4>
              <RangeSlider value={state.bathroom_range} name="bathroom_range" change={updateState} />
            </div>
          </div>

          <div className="range-slider-row">
            <div className="range-slider-column">
              <h4>Interior Paint</h4>
              <RangeSlider value={state.interior_paint} name="interior_paint" change={updateState} />
            </div>
            <div className="range-slider-column">
              <h4>Flooring</h4>
              <RangeSlider value={state.flooring_range} name="flooring_range" change={updateState}/>
            </div>
          </div>

          <div className="range-slider-row">
            <div className="range-slider-column">
              <h4>Ac Unit(s)</h4>
              <RangeSlider  value={state.units_range} name="units_range" change={updateState}/>
            </div>
            <div className="range-slider-column">
              <h4>Roof</h4>
              <RangeSlider  value={state.roof_range} name="roof_range" change={updateState}/>
            </div>
          </div>

          <div className="range-slider-row">
            <div className="range-slider-column">
              <h4>Exterior Paint</h4>
              <RangeSlider value={state.exterior_range} name="exterior_range" change={updateState} />
            </div>
            <div className="range-slider-column">
              <h4>Windows</h4>
              <RangeSlider value={state.windows_range} name="windows_range" change={updateState} />
            </div>
          </div>


          <div className="range-slider-row">
            <div className="range-slider-column">
              <h4>Electrical panel</h4>
              <RangeSlider value={state.electrical_range} name="electrical_range" change={updateState} />
            </div>
            <div className="range-slider-column">
              <h4>Hot water heater</h4>
              <RangeSlider value={state.water_heater_range} name="water_heater_range" change={updateState} />
            </div>
          </div>

          
          <div className="range-slider-row">
            <div className="range-slider-column">
              <h4>Appliances</h4>
              <RangeSlider value={state.appliances_range} name="appliances_range" change={updateState} />
            </div>
            <div className="range-slider-column">
              <h4>Pool/Pool equipment(if applicable)</h4>
              <RangeSlider value={state.pool_range} name="pool_range" change={updateState} />
            </div>
          </div>
           
          <div className="textarea-wrapper">
            <h4> Any Other condition issue wee need to know about it :(ie settlement issues/mold/fire damage/code violation/open permits)</h4> 
         
            <TextField className="textarea-input"
        
          label="Type here"
          multiline
          rows="4"
          defaultValue=""        
          margin="normal"
           name="other_condition_issue"
        />
        </div>
        </div>
      );
    case 4:
      return (<div><DropzoneDialogExample name="image_drop" state={state} change={updateState} />
        
      </div>);
    default:
      return 'Unknown step';
  }
}
