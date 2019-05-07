import React from 'react';
import './dashboard.css'
import { connect, withRouter, Redirect, Link as LinkUrl, Switch } from "../../../../utilities"
import { seller_detail } from "../../../../action"
import { constant } from "../../../../config"
import { Loader } from '../../../index';
import { Link } from '@material-ui/icons';
import Routing from "./routing"
import { AccountSettin } from "../../../frontend/account_setting/account_setting"

class BuyerDashboard extends React.Component {

  constructor(props) {
    super(props)

  }



  componentWillMount() {
    this.props.seller_detail(localStorage.getItem("token_id"))
    this.props.history.push(constant.frontend_url.buyer_propert_list)
    // this.props.history.push(constant.frontend_url.buyer_property_list)
    console.log("user details on buyer dashboard %%%%%%%%%%>", this.props.state)

  }

  render() {
    var { loader } = this.props.state.utilities
    return (
      <div className="frontend-dashboard">
        {(loader == true) ? <Loader /> : ""}
        <div className="row for_register_login">

          <SideBar state={this.props.state} />
          <Routing />

        </div>

      </div>

    )

  }

}



const mapStateToProps = state => ({
  state
})
const actionCall = dispatch => ({
  seller_detail: (token) => { dispatch(seller_detail(token)) }
})
export default withRouter(connect(mapStateToProps, actionCall)(BuyerDashboard))

class SideBar extends React.Component {
  constructor(props) {
    super(props)

  }


  render() {

    return (<div className="col-sidebar col-sm-3">
      <div className="profile-picture-wrapper">
        <span className="profile-picture">
          <img src={(this.props.state.seller_dashboard.user_detail[0].user_image != undefined && this.props.state.seller_dashboard.user_detail[0].user_image != null) ? constant.file_url + this.props.state.seller_dashboard.user_detail[0].user_image : require('../../../../assets/img/profile-pic.jpg')} alt="" />
        </span>
        <span className="user-name">
          <span className="help-text">Hello</span>
          <h5>{(this.props.state.seller_dashboard.user_detail.length > 0) ? this.props.state.seller_dashboard.user_detail[0].first_name + " " + this.props.state.seller_dashboard.user_detail[0].last_name : ""}</h5>
        </span>
      </div>

      <ul className="side-nav">
        <li className={(window.location.pathname == constant.frontend_url.buyer_propert_list) ? "active" : ""}>
          <LinkUrl to={constant.frontend_url.buyer_propert_list}>
            <span className="icon icon-property"></span>
            <span className="nav-text">Properties</span>
            <span className="notification"></span>

          </ LinkUrl>
        </li>
        <li className={(window.location.pathname == constant.frontend_url.buyer_account_setting) ? "active" : ""}>
          < LinkUrl to={{ pathname: constant.frontend_url.buyer_account_setting, state: { data: this.props.state.seller_dashboard.user_detail[0] } }}>
            <span className="icon icon-account"></span>
            <span className="nav-text">Account Settings</span>

          </LinkUrl>
        </li>



      </ul>

    </div>)
  }
}


