import React from 'react';
import './login.css'
import { TextField, Button, Checkbox, Link, connect, withRouter, Switch, Redirect, Route } from "../../../../utilities"
import logo from "../../../../assets/img/logo.png"
import { buyer_login, loginState } from "../../../../action/"
import { FadeSnackbar, CommanSnackBar } from "../../../index"
import { Routing, AfterLogin, constant } from "../../../../config/index";
import { TextBox } from "../../../index";
import Loader from '../../../loader/loader';
/* 
Login Component for front end
*/

class BuyerLogin extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.snackBarClose = this.snackBarClose.bind(this)
  }
  handleChange(event) {

    this.props.loginState(event)
  }

  snackBarClose(event) {
    var data = { target: { name: "status", value: 402 } }


    setTimeout(function () { this.props.loginState(data) }.bind(this), 500);

  }
  login = (event) => {
    event.preventDefault();
    this.props.login(event)
  }

  render() {
    var { loader, snackbar } = this.props.state.utilities
    if (this.props.state.login_component.status == 200) {
      localStorage.setItem("login", true);
      localStorage.setItem("token_id", this.props.state.login_component.user_detail[0].user_id)
      localStorage.setItem("user_type", this.props.state.login_component.user_detail[0].user_type)
      localStorage.setItem("interested_properties", this.props.state.login_component.user_detail[0].interested_properties)
      localStorage.setItem("interested_counties", this.props.state.login_component.user_detail[0].interested_counties)
     // console.log("local storage in dashboard", localStorage)
      this.props.loginState({ target: { name: "login", value: true } })

      return (
        <Switch>
          <AfterLogin />
          {
            //this.props.history.push(constant.frontend_url.buyer_dashboard)
            this.props.history.push(constant.frontend_url.buyer_property_list)
          }
        </Switch>
      )
    }
    if (localStorage.getItem("login") == "true" && localStorage.getItem("user_type") == "Buyer") {
      this.props.history.push(constant.frontend_url.buyer_dashboard)
      // this.props.history.push(constant.frontend_url.buyer_property_list)
    }

    return (
      <div>
        <div className="row for_register_login">
          <div className="col-sm-6 figure-part">
            <img src={require('../../../../assets/img/login-figure.jpg')} alt="" />
          </div>
          <div className="col-sm-6 form-part login_form">
            <div className="card-wrapper">
              <div className="logo">
                <a href="/"> <img src={logo} alt="" /></a>
              </div>
              <div className="tagline">Welcome back to offerlane as buyer</div>
              <form post="form" onSubmit={this.login} className="form__wrapper">
                <div className="form-field">
                  <TextField
                    label="Email*"
                    type="text"
                    name="email"
                    margin="normal"
                    color="primary"
                    className="input-conrtol"
                    value={this.props.state.login_component.email}
                    onChange={this.props.loginState}
                  />

                </div>
                <div className="form-field">
                  <TextField
                    label="Password*"
                    type="password"
                    name="password"
                    value={this.props.state.login_component.password}
                    margin="normal"
                    color="primary"
                    className="input-conrtol"
                    onChange={this.props.loginState}
                  />
                </div>
                <div className="link-text"> <Link to={constant.frontend_url.buyer_forgot_password}>Forgot Password?</Link></div>
                <button type="submit" className="btn-large btn-primary" >Sign In</button>
              </form>

              <p className="info-link">Don’t have account?<Link className="sign_up" to={constant.frontend_url.buyer_sign_up}> SIGN UP</Link> </p>
            </div>
          </div>
        </div>

        <CommanSnackBar state={snackbar} />

        {(loader == true) ? <Loader /> : ""}


      </div>
    )
  }
}
const mapStateToProps = state => ({
  state
})
const actionCall = dispatch => ({
  login: () => { dispatch(buyer_login()) },
  loginState: (event) => { dispatch(loginState(event)) }
})
export default withRouter(connect(mapStateToProps, actionCall)(BuyerLogin))