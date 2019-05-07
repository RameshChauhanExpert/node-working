import React from 'react';
import logo from '../../../logo.png';
import loginIcon from '../../../assets/img/login-icon.png';
import './header.css'
import { connect, Button, TextField, Paper, Typography, AppBar, Toolbar, Link, withRouter } from "../../../utilities"
import withStyles from "@material-ui/core/styles/withStyles";
import { constant } from '../../../config';
import { Loader } from '../..';
import { login, logout } from '../../../action';


class Header extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    var user_type = null
    if (this.props.state.login_component.status == 401 && this.props.state.login_component.login == false) {
      //this.props.location.pathname=constant.frontend_url.home_page
      window.location.href = constant.fronend_base_url
    }
    if (this.props.state.login_component.user_detail.length > 0) {
      user_type = this.props.state.login_component.user_detail[0].user_type;
    }

    var patharray = window.location.pathname.split("/")
    var path = "/" + patharray[1]
    var { loader } = this.props.state.utilities

    return (
      <div className="header">
        {(loader == true) ? <Loader /> : ""}
        <div className="container-fluid">
          <div className="logo">
            <a href="/">
              <img src={logo} alt="" />
            </a>
          </div>
          <div className="nav-left">
            <div className="nav-toggle">
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
            </div>
            <ul className="header_nav">
              <li className={(window.location.pathname == constant.frontend_url.about) ? "active" : ""}><Link to={constant.frontend_url.about}>About Us</Link></li>
              <li className={(window.location.pathname == constant.frontend_url.how_it_work) ? "active" : ""}><Link to={constant.frontend_url.how_it_work}>How it Works</Link></li>
              <li className={(window.location.pathname == constant.frontend_url.seller_faq) ? "active" : ""}><Link to={constant.frontend_url.seller_faq}>Sell</Link></li>

              {(user_type == "Buyer" || localStorage.getItem("user_type") == "Buyer") ?
                <li className={(window.location.pathname == constant.frontend_url.buyer_property_list) ? "active" : ""}><Link to={constant.frontend_url.buyer_property_list} >Buy</Link></li>
                :
                <li className={(window.location.pathname == constant.frontend_url.buyer_sign_up) ? "active" : ""}><Link to={constant.frontend_url.buy_home} >Buy</Link></li>
              }


              <li className={(window.location.pathname == constant.frontend_url.contact) ? "active" : ""}><Link to={constant.frontend_url.contact}>Contact Us</Link></li>
            </ul>
          </div>

          {(this.props.state.login_component.login != true || localStorage.getItem("login") == true) ?
            <div className="nav-right">
              <ul>
                <li className="nav-link"><Link to={constant.frontend_url.seller_login}><span className="icon sign-in"></span>Sign In</Link></li>
              </ul>
            </div> : <div className="nav-right">
              <ul>

                {
                  (path == constant.frontend_url.buyer || path == constant.frontend_url.seller) ?
                    <li className="nav-link" onClick={this.props.logout}><span className="icon sign-in"></span>Logout</li> :

                    <li className="nav-link"><Link to={(user_type == "Buyer" || localStorage.getItem("user_type") == "Buyer") ? constant.frontend_url.buyer_dashboard : constant.frontend_url.seller_login}><span className="icon sign-in"></span>Dashboard</Link></li>
                    //<li className="nav-link"><Link to={(user_type == "Buyer" || localStorage.getItem("user_type") == "Buyer") ? constant.frontend_url.buyer_login : constant.frontend_url.seller_login}><span className="icon sign-in"></span>Dashboard</Link></li>
                }

              </ul>
            </div>
          }
        </div>
      </div>
    )

  }


}

const mapStateToProps = state => ({
  state
})

const actionCall = dispatch => ({
  logout: () => {
    dispatch(logout())
  }
})

export default withRouter(connect(mapStateToProps, actionCall)(Header))