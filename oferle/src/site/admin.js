import React from "react";
import indexRoute from "../routes/index"
import { Route, Redirect, Switch, Router } from "../utilities";
import { Page_not_found } from "../components";
//import { Login, DashboardPage, UserManagement, BuyerManagement, PropertyManagement, AccountSetting, Property_Listing, Cms, CmsAbout, EmailTemplate, RegistrationEmail, PropertyDetails, UserDetails } from "../admin";
import { Login, DashboardPage, UserManagement,BuyerManagement, PropertyManagement, AccountSetting, Property_Listing, Cms,  CmsHome, CmsAbout, CmsAboutUs, CmsFaq, CmsHowItWorks, EmailTemplate, RegistrationEmail, PropertyDetails, UserDetails } from "../admin";
import Dashboard from "../admin/sidnav/Dashboard";
import HeaderLinks from "../components/Header/HeaderLinks"
import "../assets/css/material-dashboard-react.css?v=1.5.0";

export default class Admin extends React.Component {

    constructor(props) {
        super(props)
        this.state = { login: true }
    }

    componentDidMount() {

        if (localStorage.login == "true") {

            this.setState({ login: false })
        }
        else {
            this.setState({ login: true })
        }

    }

    render() {

        return (

            <Router>
                <div className="admin-wrapper">

                    <Route path="/admin" exact component={Login} />
                    <Route path="/admin/login" exact component={Login} />


                    {(window.location.pathname != "/admin" && window.location.pathname != "/admin/" && window.location.pathname != "/admin/login" && window.location.pathname != "/admin/login/") ?

                        <div className="sidebar-main">
                            <Dashboard />


                        </div> : ""}

                    <Switch>

                        <div className="page-main-wrapper">

                        <HeaderLinks/>
                          <div className="page-main-container">
                            <Route path="/admin/dashboard" exact component={DashboardPage} />
                            <Route path="/admin/user" exact component={UserManagement} />
                            <Route path="/admin/user/buyer" exact component={BuyerManagement} />
                            <Route path="/admin/property" exact component={PropertyManagement} />
                            <Route path="/admin/property/property-details" exact component={PropertyDetails} />
                            <Route path="/admin/account-setting" exact component={AccountSetting} />
                            <Route path="/admin/cms" exact component={Cms} />
                            {/* <Route path="/admin/faq" exact component={FaqManagement} />
                            <Route path="/admin/faq-management/faq" exact component={FaqDetails} /> */}
                            <Route path="/admin/cms/cms-home" exact component={CmsHome} />
                            <Route path="/admin/cms/cms-about" exact component={CmsAbout} />
                            <Route path="/admin/cms/cms-about-us" exact component={CmsAboutUs} />
                            <Route path="/admin/cms/cms-how-it-works" exact component={CmsHowItWorks} />
                            <Route path="/admin/cms/cms-faq" exact component={CmsFaq} />
                            <Route path="/admin/email-template" exact component={EmailTemplate} />
                            <Route path="/admin/email-template/email-registration" exact component={RegistrationEmail} />
                            <Route path="/admin/user/user-detail" exact component={UserDetails} />
                            </div>  
                        </div>
                    </Switch>


                </div>
            </Router>)

    }
}