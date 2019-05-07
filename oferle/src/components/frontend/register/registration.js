import React from 'react';
import '../register/registration.css'
import { TextField, Button, Checkbox, Link ,connect,withRouter,Route} from "../../../utilities"
import{Loader, CommanSnackBar} from "../../index"
import{TextBox} from "../../index"
import logo from "../../../assets/img/logo.png"
import {signup} from "../../../action/"
import { constant } from '../../../config';

class Registration extends React.Component {

 constructor(props)
 {
super(props)
 this.state={
   first_name:"",
   last_name:"",
   email:"",
   password:"",
   phone:"",
   isValidate:this.isValidate,
   validate:false
 }
this.handleChange=this.handleChange.bind(this)
this.totalElement=5;
this.elementIndex=0;
this.isValidateAll=0;
 }

 handleSubmit=(event)=>
 {
   this.elementIndex=0;
   this.isValidateAll=0
   event.preventDefault();
   this.setState({validate:true,finalCheckAll:"true"})
 }
 isValidate=(isValidate,validate)=>{
  
  
   if(isValidate==true)
   {
     
     this.elementIndex++;
   }

   this.setState({validate:validate},()=>{

   if(this.elementIndex==this.totalElement)
   {
              this.isValidateAll++
   
              if(this.isValidateAll==this.totalElement)
              {
                
                this.props.sign_up(this.state)
              }
              
   }
   
  })
   
 }
 goTodashboard=()=>{
  localStorage.setItem("login",true)
  localStorage.setItem("token_id",this.props.state.sign_up.data.last_id)
  window.location.href=constant.frontend_url.seller_dashboard
 }
 handleChange(event)
 {
     this.setState({[event.target.name]:event.target.value})
 }
  render() {

    if(this.props.state.sign_up.status==200)
    {
      
       
      return(<div>
        <div className="row for_register_login">
<div className="col-sm-6 figure-part">
    <img src={require('../../../assets/img/login-figure.jpg')} alt="" />
</div>

           
                  <div className="col-sm-6 form-part signup-form">
                  <div className="card-wrapper sucess-msg">
                    <h3>Congratulations!</h3>
                    <p>You have been successfully registered.</p>
                    <Button onClick={this.goTodashboard} className="btn btn-primary">Okay</Button>
                  </div>
            </div></div>
      </div>)

    }else
    {
    return (
      <div>

        <div className="row for_register_login">

          <div className="col-sm-6 figure-part">
            <img src={require('../../../assets/img/login-figure.jpg')} alt="" />
          </div>
          <div className="col-sm-6 form-part signup-form">

            <div className="card-wrapper">

              <div className="logo">
                <a href="/"> <img src={logo} alt="" /></a>
              </div>
              <div className="tagline">Welcome to Offerlane</div>

              <form action="#" onSubmit={this.handleSubmit} className="form__wrapper ">
                <div className="form-fields">
                  <div className="form-field register_signup">
                    
                    <TextBox label="First Name" 
                   type="text" 
                  value={this.state.first_name} 
                   name="first_name"
                   onBlur={false}
                   state={this.state} 
                   change={this.handleChange} 
                   validate={this.state.validate} 
                   className="input-conrtol" 
                   margin="normal"
                   required={[true,"Please enter first name"]}
                   max={[true,15,""]}
                   />
              
                  </div>

                 

                  <div className="form-field register_signup">
                    
                    <TextBox label="Last Name" 
                   type="text" 
                  value={this.state.last_name} 
                   name="last_name"
                   onBlur={false}
                   state={this.state} 
                   change={this.handleChange} 
                   validate={this.state.validate} 
                   className="input-conrtol" 
                   margin="normal"
                   required={[true,"Please enter last name"]}
                   max={[true,15,""]}
                   />
                  </div>
                </div>

                <div className="form-field register_signup">
                 
                  <TextBox label="Email" 
                   type="text" 
                  value={this.state.email} 
                
                   name="email"
                   onBlur={true}
                   state={this.state} 
                   change={this.handleChange} 
                   validate={this.state.validate} 
                   className="input-conrtol" 
                   margin="normal"
                   required={[true,"Please enter email"]}
                   max={[true,70,""]}
                   email={[true,"Sorry you entered invalid email"]}
                   />
                </div>

                <div className="form-field register_signup">
                {/* <TextBox label="Password" 
                   type="password" 
                  value={this.state.password} 
                   name="password"
                   onBlur={false}
                   state={this.state} 
                   change={this.handleChange} 
                   validate={this.state.validate} 
                   className="input-conrtol" 
                   margin="normal"
                   required={[true,"Please enter password"]}
                   max={[true,50,""]}
                   /> */}
                    <TextBox label="Password"
                  type="password"
                  value={this.state.password}
                  name="password"
                  onBlur={true}
                  state={this.state}
                  change={this.handleChange}
                  validate={this.state.validate}
                  className="input-conrtol"
                  margin="normal"
                  required={[true, "Please enter password"]}
                  max={[true,15, ""]}
                  password={[true,"A minimum 8 characters password contains a combination of 1 uppercase and 1 number."]}
                />
                </div>
                <div className="form-field register_signup">
                <TextBox label="Phone" 
                   type="text" 
                  value={this.state.phone} 
                   name="phone"
                   onBlur={false}
                   state={this.state} 
                   change={this.handleChange} 
                   validate={this.state.validate} 
                   className="input-conrtol" 
                   margin="normal"
                   required={[true,"Please enter phone number"]}
                   max={[true,10,""]}
                   min_value={[true,0,"Please enter valid phone number"]}
                   only_number={[true,"Phone number support only number"]}
                   
                   />
                </div>
                

                <button type="submit" className="btn-large btn-primary" >Sign Up</button>


              </form>

              <p className="info-link">Already have an account?<a className="sign_up" href={constant.frontend_url.seller_login}> SIGN IN </a> </p>
            </div>


          </div>

        </div>
        <CommanSnackBar state={this.props.state.utilities.snackbar} />
       {(this.props.state.utilities.loader==true)? <Loader/>:""}         
      </div>

    )

  }
  }
}

const mapStateToProps = state => ({
  state
})
const actionCall = dispatch => ({
  sign_up:(state)=>{dispatch(signup(state))}
})
export default withRouter(connect(mapStateToProps,actionCall)(Registration))