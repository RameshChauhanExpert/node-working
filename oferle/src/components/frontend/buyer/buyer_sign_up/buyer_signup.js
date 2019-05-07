import React from 'react';
import './buyer_sign_up.css'
import { TextField, Button, Checkbox, Link, connect, withRouter, Route, Radio, RadioGroup, FormControlLabel, FormLabel, Select, InputLabel, MenuItem, Chip, Input, FormHelperText, Snackbar } from "../../../../utilities"
import { TextBox, CommanSnackBar, TMTextField } from "../../../index"
import logo from "../../../../assets/img/logo.png"
import { buyer_signup } from "../../../../action/"
import { constant } from '../../../../config';
import Validations from "../../../../config/Validations"
import { floridaCounties, propertiesType } from "../../../../config/floridaCounties"
import FadeSnackbar from "../../../SnackBar/SnackBar"
import Loader from '../../../loader/loader'


class BuyerSignup extends React.Component {

  constructor(props) {
    super(props)
    this.Validations = new Validations();
    this.state = {
      first_name: "",
      last_name: "",
      company_name: "",
      email: "",
      password: "",
      phone: "",
      years_experience: "",
      recent_properties: "",
      proof_of_funds: '',
      interested_counties: [],
      interested_properties: [],
      other_notes: "",
      // isValidate: this.isValidate,
      // validate: false,
      validationMessage: { email: '', password: '', first_name: '', last_name: '', company_name: '', phone: '', interested_counties: '', interested_properties: '' },
      hasErrors: true,
      snackbar_open: false,
      api_message: '', 
      isLoading: false
    }
    this.handleChange = this.handleChange.bind(this)
    // this.totalElement = 5;
    this.totalElement = 12;
    this.elementIndex = 0;
    this.isValidateAll = 0;
    this.buyerFormData = {}
    // this.validationMessage = ''
  }

  // isValidate = (isValidate, validate) => {


  //   if (isValidate == true) {

  //     this.elementIndex++;
  //   }

  //   this.setState({ validate: validate }, () => {

  //     if (this.elementIndex == this.totalElement) {
  //       this.isValidateAll++

  //       if (this.isValidateAll == this.totalElement) {

  //         this.props.sign_up(this.state)
  //       }

  //     }

  //   })

  // }
  goTodashboard = () => {
    //  localStorage.setItem("login",true)
    //  localStorage.setItem("token_id",this.props.state.sign_up.data.last_id)
    window.location.href = constant.frontend_url.home_page
  }

  validateField(fieldName, fieldValue) {
    let errorMessage = this.state.validationMessage
    let hasError = this.state.hasErrors
    switch (fieldName) {
      case "email":
        errorMessage.email = this.Validations.validateEmail(fieldValue)
        if (errorMessage.email === '') {
          hasError = false
        } else {
          hasError = true
        }
        break;
      case "password":
        errorMessage.password = this.Validations.validatePassword(fieldValue)
        if (errorMessage.password === '') { hasError = false } else { hasError = true }
        break;
      case "first_name":
        errorMessage.first_name = this.Validations.validateFirstName(fieldValue)
        if (errorMessage.first_name === '') { hasError = false } else { hasError = true }
        break;
      case "last_name":
        errorMessage.last_name = this.Validations.validateFirstName(fieldValue)
        if (errorMessage.last_name === '') { hasError = false } else { hasError = true }
        break;
      case "phone":
        errorMessage.phone = this.Validations.validatePhone(fieldValue)
        if (errorMessage.phone === '') { hasError = false } else { hasError = true }
        break;
      case "company_name":
        errorMessage.company_name = this.Validations.validateCompanyName(fieldValue)
        break;
      case "interested_counties":
        if (this.state.interested_counties.length === 0) {
          errorMessage.interested_counties = 'This field is required'
          hasError = true
        }
        else {
          errorMessage.interested_counties = ''
          hasError = false
        }
      case "interested_properties":
        if (this.state.interested_properties.length === 0) {
          errorMessage.interested_properties = 'This field is required'
          hasError = true
        }
        else {
          errorMessage.interested_properties = ''
          hasError = false
        }
      default:
        break;
    }
    this.setState({ validationMessage: errorMessage, hasErrors: hasError })
  }

  buyerSignup = (buyerFormData) => {


    console.log('body', JSON.stringify({ Data: buyerFormData, user_image: '' }))
    this.setState({ isLoading: true })
    fetch('http://localhost/offerlane/server/admin/user_management/add_user', {
      method: "POST",
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      // body: JSON.stringify({ Data: buyerFormData, user_image: '' })
      body: "Data=" + JSON.stringify(buyerFormData)

    }).then((response) => {
      console.log('response from server', response)
      return response.json()
    }).then((data) => {
      console.log('data from server', data)

      if (data.status == 200) {
        console.log('message from server', data.message)
        // dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:data.message}}})
        // return(
        //   <FadeSnackbar
        //     snackbar = {{show: true, message: data.message}}
        //   />
        // )
        // this.props.history.push(constant.frontend_url.buyer_login)
        this.setState({snackbar_open: true, api_message: data.message})
        setTimeout(() => {
          this.props.history.push(constant.frontend_url.buyer_login);
          this.setState({isLoading: false})
        }, 2000)
      }
      else {
        console.log('message from server', data.message)
        // dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:data.message}}})
        this.setState({snackbar_open: true, api_message: data.message, isLoading: false})
        setTimeout(() => {this.setState({snackbar_open: false, api_message: ''})}, 2000)
      }

    }).catch(
      err => {
        console.log('Errors in request', err)
      }
    )

  }

  handleSubmit = (event) => {
    // this.elementIndex = 0;
    // this.isValidateAll = 0
    event.preventDefault();
    // this.setState({ validate: true, finalCheckAll: "true" })
    // if (this.state.hasErrors == true ) {
    if (
      this.state.hasErrors == false && 
      !this.state.validationMessage.email && 
      !this.state.validationMessage.password &&
      !this.state.validationMessage.first_name &&
      !this.state.validationMessage.last_name &&
      !this.state.validationMessage.phone &&
      // !this.state.validationMessage.company_name &&
      !this.state.validationMessage.interested_counties &&
      !this.state.validationMessage.interested_properties &&
      this.state.interested_counties.length !== 0 &&
      this.state.interested_properties.length !== 0
    ) {
      // this.validateField('email', this.state.email)
      // this.validateField('password', this.state.password)
      // this.validateField('first_name', this.state.first_name)
      // this.validateField('last_name', this.state.last_name)
      // this.validateField('phone', this.state.phone)
      // this.validateField('interested_counties', this.state.interested_counties)
      // this.validateField('interested_properties', this.state.interested_properties)

      // console.log("Your form has errors")

      this.buyerFormData = {
        "first_name": this.state.first_name,
        "last_name": this.state.last_name,
        "company_name": this.state.company_name,
        "email": this.state.email,
        "password": this.state.password,
        "phone": this.state.phone,
        "years_experience": this.state.years_experience,
        "recent_properties": this.state.recent_properties,
        "proof_of_funds": this.state.proof_of_funds,
        "interested_counties": this.state.interested_counties,
        "interested_properties": this.state.interested_properties,
        "other_notes": this.state.other_notes,
        "user_type": "Buyer"
      }

      this.buyerSignup(this.buyerFormData)

    }
    else {

      // this.buyerFormData = {
      //   "first_name": this.state.first_name,
      //   "last_name": this.state.last_name,
      //   "company_name": this.state.company_name,
      //   "email": this.state.email,
      //   "password": this.state.password,
      //   "phone": this.state.phone,
      //   "years_experience": this.state.years_experience,
      //   "recent_properties": this.state.recent_properties,
      //   "proof_of_funds": this.state.proof_of_funds,
      //   "interested_counties": this.state.interested_counties,
      //   "interested_properties": this.state.interested_properties,
      //   "other_notes": this.state.other_notes,
      //   "user_type": "Buyer"
      // }

      // this.buyerSignup(this.buyerFormData)


      this.validateField('email', this.state.email)
      this.validateField('password', this.state.password)
      this.validateField('first_name', this.state.first_name)
      this.validateField('last_name', this.state.last_name)
      this.validateField('phone', this.state.phone)
      this.validateField('interested_counties', this.state.interested_counties)
      this.validateField('interested_properties', this.state.interested_properties)

      console.log("Your form has errors")

    }
    // if(this.state.validationMessage.email === '' || this.state.validationMessage.password === ''){
    //   console.log("Your form submitted successfully")
    // }

  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value }, () => { this.validateField(name, value) })
    // console.log("event name", name)
    // console.log("event value", value)
  }

  render() {

    if (this.props.state.sign_up.status == 200) {
      return (<div>
        <div className="row for_register_login">
          <div className="col-sm-6 figure-part">
            <img src={require('../../../../assets/img/login-figure.jpg')} alt="" />
          </div>


          <div className="col-sm-6 form-part">
            <div className="card-wrapper sucess-msg">
              <h3>Congratulations!</h3>
              <p>You have been successfully registered.</p>
              <p>The Offerlane team will get to work right away on your request. When it's ready (usually within 24 hours), we'll send an email.
                   </p>
              <Button onClick={this.goTodashboard} className="btn btn-primary">Okay</Button>
            </div>
          </div></div>
      </div>)
    } else {
      return (
        <div>
          {this.state.isLoading ? <Loader/> : null}
          <div className="row for_register_login">

            <div className="col-sm-6 figure-part">
              <img src={require('../../../../assets/img/login-figure.jpg')} alt="" />
            </div>
            <div className="col-sm-6 form-part">

              <div className="card-wrapper">

                <div className="logo">
                  <a href="/"> <img src={logo} alt="" /></a>
                </div>
                <div className="tagline">Welcome to Offerlane</div>

                <form action="#" onSubmit={this.handleSubmit} className="form__wrapper ">
                  <div className="form-fields">
                    <div className="form-field register_signup">
                      {/* <TextBox label="First Name"
                        type="text"
                        value={this.state.first_name}
                        name="first_name"
                        onBlur={false}
                        state={this.state}
                        change={this.handleChange}
                        validate={this.state.validate}
                        className="input-conrtol"
                        margin="normal"
                        required={[true, "Please enter first name"]}
                        max={[true, 15, ""]}
                      /> */}
                      <TMTextField
                        label="First Name*"
                        name='first_name'
                        margin="normal"
                        className="input-conrtol"
                        value={this.state.first_name}
                        onChange={(event) => { this.handleChange(event) }}
                        errorMessage={this.state.validationMessage.first_name}
                        error={this.state.validationMessage.first_name.length === 0 ? false : true}
                      />
                    </div>
                    <div className="form-field register_signup">

                      {/* <TextBox label="Last Name"
                        type="text"
                        value={this.state.last_name}
                        name="last_name"
                        onBlur={false}
                        state={this.state}
                        change={this.handleChange}
                        validate={this.state.validate}
                        className="input-conrtol"
                        margin="normal"
                        required={[true, "Please enter last name"]}
                        max={[true, 15, ""]}
                      /> */}
                      <TMTextField
                        label="last Name*"
                        name="last_name"
                        margin="normal"
                        className="input-conrtol"
                        value={this.state.last_name}
                        onChange={(event) => { this.handleChange(event) }}
                        errorMessage={this.state.validationMessage.last_name}
                        error={this.state.validationMessage.last_name.length === 0 ? false : true}
                      />
                    </div>
                  </div>

                  <div className="form-field register_signup">

                    {/* <TextBox label="Company Name"
                      type="text"
                      value={this.state.company_name}
                      name="comapny_name"
                      onBlur={true}
                      state={this.state}
                      change={this.handleChange}
                      validate={this.state.validate}
                      className="input-conrtol"
                      margin="normal"
                      max={[true, 25, ""]}
                    /> */}
                    <TMTextField
                      label="Company Name"
                      name="company_name"
                      margin="normal"
                      className="input-conrtol"
                      value={this.state.company_name}
                      onChange={(event) => { this.handleChange(event) }}
                      errorMessage={this.state.validationMessage.company_name}
                      error={this.state.validationMessage.company_name.length === 0 ? false : true}
                    />
                  </div>

                  <div className="form-field register_signup">

                    {/* <TextBox label="Email"
                      type="text"
                      value={this.state.email}
                      name="email"
                      onBlur={true}
                      state={this.state}
                      change={this.handleChange}
                      validate={this.state.validate}
                      className="input-conrtol"
                      margin="normal"
                      required={[true, "Please enter email"]}
                      max={[true, 70, ""]}
                      email={[true, "Sorry you entered invalid email"]}
                    /> */}
                    <TMTextField
                      label="Email*"
                      name="email"
                      margin="normal"
                      className="input-conrtol"
                      value={this.state.email}
                      onChange={(event) => { this.handleChange(event) }}
                      //state={this.state}
                      errorMessage={this.state.validationMessage.email}
                      error={this.state.validationMessage.email.length === 0 ? false : true}
                    />
                  </div>

                  <div className="form-field register_signup">
                    {/* <TextBox label="Password"
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
                      max={[true, 15, ""]}
                      password={[true, "A minimum 8 characters password contains a combination of 1 uppercase and 1 number."]}
                    /> */}
                    <TMTextField
                      label="Password*"
                      type='password'
                      name="password"
                      margin="normal"
                      className="input-conrtol"
                      value={this.state.password}
                      onChange={(event) => { this.handleChange(event) }}
                      errorMessage={this.state.validationMessage.password}
                      error={this.state.validationMessage.password.length === 0 ? false : true}
                    />
                  </div>
                  <div className="form-field register_signup">
                    {/* <TextBox label="Phone"
                      type="text"
                      value={this.state.phone}
                      name="phone"
                      onBlur={false}
                      state={this.state}
                      change={this.handleChange}
                      validate={this.state.validate}
                      className="input-conrtol"
                      margin="normal"
                      required={[true, "Please enter phone number"]}
                      max={[true, 10, ""]}
                      min_value={[true, 0, "Please enter valid phone number"]}
                      only_number={[true, "Phone number support only number"]}
                    /> */}
                    <TMTextField
                      label="Phone*"
                      name="phone"
                      margin="normal"
                      className="input-conrtol"
                      value={this.state.phone}
                      onChange={(event) => { this.handleChange(event) }}
                      errorMessage={this.state.validationMessage.phone}
                      error={this.state.validationMessage.phone.length === 0 ? false : true}
                    />
                  </div>
                  <div className="form-field register_signup">

                    {/* <TextBox label="Years experience"
                      type="text"
                      value={this.state.years_experience}
                      name="years_experience"
                      onBlur={true}
                      state={this.state}
                      change={this.handleChange}
                      validate={this.state.validate}
                      className="input-conrtol"
                      margin="normal"
                      max={[true, 2, ""]}
                      is_float={[true, "Years experience must be number only"]}
                    /> */}
                    <TMTextField
                      label="Years of experience"
                      name="years_experience"
                      margin="normal"
                      className="input-conrtol"
                      value={this.state.years_experience}
                      onChange={(event) => { this.handleChange(event) }}
                      type='number'
                    //max = '2'
                    //min = '0'
                    />
                  </div>
                  <div className="form-field register_signup">
                    {/* <TextBox label="number of properties in last 12 months"
                      type="text"
                      value={this.state.recent_properties}
                      name="years_experience"
                      onBlur={true}
                      state={this.state}
                      className="input-conrtol"
                      margin="normal"
                    /> */}
                    <TMTextField
                      label="Number of properties in last 12 months"
                      name="recent_properties"
                      margin="normal"
                      className="input-conrtol"
                      value={this.state.recent_properties}
                      onChange={(event) => { this.handleChange(event) }}
                      type='number'
                    />
                  </div>
                  <div className="form-field register_signup">
                    {/* <TextBox label="Proof of funds"
                      type="text"
                      value={this.state.proof_of_funds}
                      name="years_experience"
                      onBlur={true}
                      state={this.state}
                      className="input-conrtol"
                      margin="normal"
                    /> */}
                    {/* <TMTextField
                      label="Proof of funds"
                      name="proof_of_funds"
                      margin="normal"
                      className="input-conrtol"
                      value={this.state.proof_of_funds}
                      onChange={(event) => { this.handleChange(event) }}
                    /> */}
                    <FormLabel component="legend">Proof of funds</FormLabel>
                    <RadioGroup
                      aria-label="proof_of_funds"
                      name="proof_of_funds"
                      className="input-conrtol"
                      value={this.state.proof_of_funds}
                      onChange={this.handleChange}
                    >
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>

                  </div>
                  <div className="form-field register_signup">
                    {/* <TextBox label="Counties interested in"
                      type="text"
                      value={this.state.interested_counties}
                      name="years_experience"
                      onBlur={false}
                      state={this.state}
                      className="input-conrtol"
                      margin="normal"
                    /> */}
                    {/* <TMTextField
                      label="Counties interested in"
                      name="interested_counties"
                      margin="normal"
                      className="input-conrtol"
                      value={this.state.interested_counties}
                      onChange={(event) => { this.handleChange(event) }}
                    /> */}
                    <InputLabel htmlFor="select-multiple-chip">Counties interested in</InputLabel>
                    <Select
                      multiple
                      value={this.state.interested_counties}
                      onChange={this.handleChange}
                      inputProps={{
                        name: 'interested_counties',
                        id: 'id-interested_counties',
                      }}
                      input={<Input id="select-multiple-chip" />}
                      renderValue={selected => (
                        <div>
                          {selected.map(value => (
                            <Chip key={value} label={value} />
                          ))}
                        </div>
                      )}
                      //error={this.state.validationMessage.interested_counties ? this.state.hasErrors : null}
                      error={this.state.validationMessage.interested_counties ? true : false}
                      
                    >
                      {floridaCounties.map((county, index) => {
                        return (
                          <MenuItem value={county.county_name} key={index}>
                            <em>{county.county_name}</em>
                          </MenuItem>
                        )
                      })}
                    </Select>
                    {/* {this.state.validationMessage.interested_counties ? (<FormHelperText error={this.state.hasErrors}>{this.state.validationMessage.interested_counties}</FormHelperText>) : null} */}
                    {this.state.validationMessage.interested_counties ? (<FormHelperText error={true}>{this.state.validationMessage.interested_counties}</FormHelperText>) : null}
                  </div>
                  <div className="form-field register_signup">

                    <InputLabel htmlFor="select-multiple-chip">Properties interested in</InputLabel>
                    <Select
                      multiple
                      value={this.state.interested_properties}
                      onChange={this.handleChange}
                      inputProps={{
                        name: 'interested_properties',
                        id: 'id-interested_properties',
                      }}
                      input={<Input id="select-multiple-chip" />}
                      renderValue={selected => (
                        <div>
                          {selected.map(value => (
                            <Chip key={value} label={value} />
                          ))}
                        </div>
                      )}
                      //error={this.state.validationMessage.interested_properties ? this.state.hasErrors : null}
                      error={this.state.validationMessage.interested_properties ? true : false}
                    >
                      {propertiesType.map((property, index) => {
                        return (
                          <MenuItem value={property.property_type_name} key={index}>
                            <em>{property.property_type_name}</em>
                          </MenuItem>
                        )
                      })}
                    </Select>
                    {/* {this.state.validationMessage.interested_properties ? (<FormHelperText error={this.state.hasErrors}>{this.state.validationMessage.interested_properties}</FormHelperText>) : null} */}
                    {this.state.validationMessage.interested_properties ? (<FormHelperText error={true}>{this.state.validationMessage.interested_properties}</FormHelperText>) : null}
                  </div>
                  <div className="form-field register_signup">
                    {/* <TextBox label="Other notes"
                      type="text"
                      value={this.state.other_notes}
                      name="years_experience"
                      onBlur={false}
                      state={this.state}
                      className="input-conrtol"
                      margin="normal"
                    /> */}
                    <TMTextField
                      label="Other notes"
                      name="other_notes"
                      margin="normal"
                      className="input-conrtol"
                      value={this.state.other_notes}
                      onChange={(event) => { this.handleChange(event) }}
                    />
                  </div>
                  <button className="btn-large btn-primary" onClick={() => { }}>Sign Up</button>
                </form>

                <p className="info-link">Already have an account?<Link className="sign_up" to={constant.frontend_url.buyer_login}> SIGN IN </Link> </p>
              </div>


            </div>

          </div>
          {/* <CommanSnackBar state={this.props.state.utilities.snackbar} />
          {(this.props.state.utilities.loader == true) ? <Loader /> : ""} */}
          {/* <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.SnackbarOpen}
            autoHideDuration={6000}
            //onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Note archived</span>}
          /> */}
          <FadeSnackbar
            snackbar = {{show: this.state.snackbar_open, message: this.state.api_message}}
            duration = {4000}
          />
        </div>
      )

    }
  }
}

const mapStateToProps = state => ({
  state
})
const actionCall = dispatch => ({
  sign_up: (state) => { dispatch(buyer_signup(state)) }
})
export default withRouter(connect(mapStateToProps, actionCall)(BuyerSignup))