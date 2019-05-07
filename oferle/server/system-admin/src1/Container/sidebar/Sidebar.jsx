import React from 'react';
//import ReactDOM from 'react-dom';
//import {Link} from  "react-router";
import { /*BrowserRouter as Router, Switch, Route,*/ Link } from 'react-router-dom';
var URL = "";
var urlArr = "";
var userdata = "";

export class Sidebar extends React.Component {
	constructor(props) {
	  super(props);
	  userdata = JSON.parse(localStorage.getItem("authId"));
	}
	
	render() {
		URL = window.location.href;
		URL = URL.split('/');
		urlArr = (URL[URL.length - 1])?URL[URL.length - 1]:"Dashboard";
    	return (
                <div className="page-sidebar-wrapper">
                    <div className="page-sidebar navbar-collapse collapse">
                        <ul className="page-sidebar-menu" data-auto-scroll="false" data-auto-speed="200">
							<li className="sidebar-toggler-wrapper">
								<div className="sidebar-toggler">
									<i className="fa fa-ellipsis-v" aria-hidden="true"></i>
								</div>
							</li>
							<li className={('Dashboard' === urlArr)?'start active':'start '}>
								<Link to="/Dashboard">
									<i className="fa fa-th-large" aria-hidden="true"></i>
									<span className="title">Dashboard</span>
								</Link>
							</li>
							
							{(1 === userdata.isNetAdmin)?
								<li className={('Category' === urlArr || 'Product' === urlArr || URL.find((element) => {return element === "Category_Add";}) || URL.find((element) => {return element === "Product_Add";}))?'start active':'start '}>
									<a href="">
										<i className="fa fa-external-link-square" aria-hidden="true"></i>
										<span className="title">Inventory Management</span>
										<span className="arrow"></span>
									</a>
									<ul className="sub-menu">
										<li className={('Product' === urlArr)?'start active':'start '}>
											<Link to="/Product">
												<i className="fa fa-external-link-square" aria-hidden="true"></i>
												<span className="title">Product</span>
											</Link>
										</li>
										<li className={('Category' === urlArr)?'start active':'start '}>
											<Link to="/Category">
												<i className="fa fa-external-link-square" aria-hidden="true"></i>
												<span className="title">Product type</span>
											</Link>
										</li>
									</ul>
								</li>
								:""
							}
							
							{(1 === userdata.isNetAdmin)?
								<li className={('Software' === urlArr || 'Software_Add' === urlArr || URL.find((element) => {return element === "Software_Edit";}))?'start active':'start '}>
									<a href="javascript:;">
										<i className="fa fa-desktop" aria-hidden="true"></i>
										<span className="title">Software Management</span>
										<span className="arrow"></span>
									</a>
									<ul className="sub-menu">
										<li className={('Software' === urlArr)?'start active':'start '}>
											<Link to="/Software">
												<i className="fa fa-desktop" aria-hidden="true"></i>
												<span className="title">Software</span>
											</Link>
										</li>
									</ul>
								</li>
								:""
							}

							<li className={('Caution' === urlArr || 'All_tickets' === urlArr || 'Caution_Add' === urlArr || URL.find((element) => {return element === "Edit_ticket";}))?'start active':'start '}>
								<a href="javascript:;">
									<i className="fa fa-ticket" aria-hidden="true"></i>
									<span className="title">Ticket</span>
									<span className="arrow "></span>
								</a>
								<ul className="sub-menu">
									<li className={('Caution' === urlArr)?'start active':'start '}>
										<Link to="/Caution">
											<i className="fa fa-ticket" aria-hidden="true"></i>
											<span className="title">My Ticket</span>
											
										</Link>
									</li>
									{( 1 === userdata.isNetAdmin)?
										<li className={('All_tickets' === urlArr)?'start active':'start '}>
											<Link to="/All_tickets">
											<i className="fa fa-ticket" aria-hidden="true"></i>
												<span className="title">All Ticket</span>
												
											</Link>
										</li>
									:""
									}
								</ul>
							</li>
							{(1 === userdata.isNetAdmin)?
								<li className={('UserManagement' === urlArr)?'start active':'start '}>
									<Link to="/UserManagement">
										<i className="fa fa-users" aria-hidden="true"></i>
										<span className="title">User Management</span>
										
									</Link>
								</li>
							:""
							}
                        </ul>
                    </div>
                    <div className="sidebar-background"></div>
                </div>
    	);
	}
}