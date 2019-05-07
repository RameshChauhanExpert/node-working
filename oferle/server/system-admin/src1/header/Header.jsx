import React from 'react';

import { Link} from 'react-router-dom';
var userdata = "";

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    if("" === localStorage.getItem("authId") || null == localStorage.getItem("authId")){
      this.props.history.push("/");
    }
    userdata = JSON.parse(localStorage.getItem("authId"));
  }
  
  logout() {
    localStorage.clear();
    window.location.reload();
  }

  render() {
    return (
      <div className="page-header navbar navbar-fixed-top">
            <div className="page-header-inner">
         	<div className="page-logo">
		     	<Link to="/Dashboard">
		        	<img src="http://192.168.1.116/react-backend/system-admin/public/assets/react/images/page-logo.png" alt="logo" className="logo-default"/>
		        </Link>
           	</div>
    <div className="top-menu">
      <ul className="nav navbar-nav pull-right">
        <li className="dropdown dropdown-user">
          <a href="" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
            <span className="username-top">{userdata.Name[0]}{userdata.Name.substr((userdata.Name.indexOf(" ")+1),1)}</span>
            <span className="username">{userdata.Name}</span>
            <i className="fa fa-angle-down"></i>
          </a>
          <ul className="dropdown-menu">
            <li>
              {
                //<a href="/Login"><i className="fa fa-key"></i> Log Out</a>
                <a href="" onClick={this.logout}><i className="fa fa-key"></i> Log Out</a>
              }
            </li>
          </ul>
        </li>

      </ul>
    </div>

  </div>
  
  </div>
    );
  }
}

export default Header;