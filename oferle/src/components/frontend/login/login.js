import React from 'react';
import '../login/login.css'
import { TextField, Button, Checkbox, Link, connect, withRouter, Switch, Redirect, Route } from "../../../utilities"
import logo from "../../../assets/img/logo.png"
import { login, loginState } from "../../../action/login/login"
import { FadeSnackbar, CommanSnackBar } from "../../index"
import { Routing, AfterLogin, constant } from "../../../config/";
import { TextBox } from "../../index";
import Loader from '../../loader/loader';


/* 
Login Component for front end
for seller and buyer
*/

class Login extends React.Component {

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
    event.preventDefault()
    this.props.login(event)
  }
  render() {
    var { loader, snackbar } = this.props.state.utilities
    if (this.props.state.login_component.status == 200) {

      localStorage.setItem("login", true);
      localStorage.setItem("token_id", this.props.state.login_component.user_detail[0].user_id)
      localStorage.setItem("user_type", this.props.state.login_component.user_detail[0].user_type)
      this.props.loginState({ target: { name: "login", value: true } })

      return (
        <Switch>
          <AfterLogin />
          {
            (this.props.state.login_component.user_detail[0].user_type == "Seller" || this.props.state.login_component.user_detail[0].user_type == "Agent") ?

              this.props.history.push(constant.frontend_url.seller_property_list)
              //:this.props.history.push(constant.frontend_url.buyer_dashboard)
              : this.props.history.push(constant.frontend_url.buyer_property_list)

          }
        </Switch>
      )
    }
    if (localStorage.getItem("login") == "true") {
      this.props.history.push(constant.frontend_url.seller_property_list)
    }

    return (
      <div>
        <div className="row for_register_login">
          <div className="col-sm-6 figure-part">
            <img src={require('../../../assets/img/login-figure.jpg')} alt="" />
          </div>
          <div className="col-sm-6 form-part login_form">
            <div className="card-wrapper">
              <div className="logo">
                <a href="/"> <img src={logo} alt="" /></a>
              </div>
              <div className="tagline">Welcome back to Offerlane as seller</div>
              <form onSubmit={this.login} post="form" className="form__wrapper">
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
                <div className="link-text"> <Link to={constant.frontend_url.seller_forgot_password}>Forgot Password?</Link></div>
                <button type="submit" className="btn-large btn-primary" >Sign In</button>
              </form>

              <p className="info-link">Don’t have account?<a className="sign_up" href={constant.frontend_url.seller_signup}> SIGN UP</a> </p>
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
  login: () => { dispatch(login()) },
  loginState: (event) => { dispatch(loginState(event)) }
})
export default withRouter(connect(mapStateToProps, actionCall)(Login))