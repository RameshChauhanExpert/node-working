import React from 'react';
import { Switch, Route } from '../utilities';
import { Header,Footer, About,Contact, LandingPage, AccountSetting,SellerWizard,Page_not_found,How_it_work, PropertyList, PropertyDetails, Login, SellerDashboard,Registration,ForgotPassword,PropertyDetail, PrivacyPolicy, SellerFaq, BuyerFaq} from '../components';
import indexRoutes from "../routes";
import {constant} from "./index"
import property_image_upload from '../components/frontend/seller_wizard/property_image_upload';
import Buyer from '../components/frontend/buyer';

export default class Routing extends React.Component{

    render(){

        return(
            <div className="main-container clearfix">
               <Switch>
                   {/* Basic pages */}
                   <Route  path="/" exact component={LandingPage}/>             
                   <Route  path={constant.frontend_url.about} exact component={About}/> 
                   <Route  path={constant.frontend_url.contact} exact component={Contact}/> 
                   <Route  path={constant.frontend_url.how_it_work} exact component={How_it_work}/>                    
                   <Route  path={constant.frontend_url.home_page} exact component={LandingPage}/>  
                   <Route  path={constant.frontend_url.buyer_property_list} exact component={PropertyList}/>  
                   <Route  path={constant.frontend_url.seller_faq} exact component={SellerFaq} />  
                   <Route  path={constant.frontend_url.buyer_faq} exact component={BuyerFaq} />                   
                   <Route  path={constant.frontend_url.privacy_policy} exact component={PrivacyPolicy} />  

                   <Route  path="/property-detail" exact component={PropertyDetails} />  
                  
                   
                   
                   
                   
                   <Route  path="/login" exact component={Login}/>  
                   <Route path={constant.frontend_url.buyer} component={Buyer} />
                   <Route  path={constant.frontend_url.seller_signup} exact component={Registration}/> 
                   <Route path="/seller-wizard/property-image-upload/:id" exact component={property_image_upload} /> 
                  
                   
                    {/*  Buyer routing */}
                    <Route  path={constant.frontend_url.buyer } component={Buyer}/>
                    <Route  path={constant.frontend_url.buyer_property_list} exact component={PropertyList}/>  
                     
                    {/*  Seller routing */}
                    <Route  path={constant.frontend_url.seller_login} exact component={Login}/>  
                    <Route  path={constant.frontend_url.seller_signup} exact component={Registration}/>
                    <Route path="/seller-wizard/property-image-upload/:id" exact component={property_image_upload} /> 
                    <Route  path={constant.frontend_url.seller_wizard} exact component={SellerWizard}/> 
                    <Route path={constant.frontend_url.seller_forgot_password} exact component={ForgotPassword} /> 


                   {(localStorage.getItem("login")=="true")?<AfterLogin/>:""}
                </Switch>
            </div>

        )
    }
}

export class AfterLogin extends React.Component{
    

    render(){
        return( <Switch>
            <Route  path={constant.frontend_url.seller_dashboard}  component={SellerDashboard}/> 
            <Route  path={constant.frontend_url.property_detail} exact component={PropertyDetails}/> 
            <Route  path={constant.frontend_url.seller_property_detail} exact component={PropertyDetail}/>
            
        </Switch>)
    }
}