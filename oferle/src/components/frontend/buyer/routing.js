import React from "react"
import { Switch,Route,Router } from "../../../utilities";
import { constant } from "../../../config";
import BuyerLogin from "./buyer_login/buyer_login";
import BuyerDashboard from "./buyer_dashboard/buyer_dashboard"
import BuyerPropertyDetail from "./buyer_dashboard/buyer_property_detail/buyer_property_detail";
import BuyerSignup from "./buyer_sign_up/buyer_signup"
import BuyerForgotPassword from "./forgot_password/forgot_password"
import BuyHome from "./buyer_cms/buy_home"
import PropertyDetails from "../property/propertyDetails"
import PropertyList from "../property/propertyList"

class Routing extends React.Component{


    render()
    {
        return(
            <Switch>
              <Route  path={constant.frontend_url.buyer_login} component={BuyerLogin} />
              <Route  path={constant.frontend_url.buyer_sign_up} component={BuyerSignup} />
              <Route  path={constant.frontend_url.buyer_dashboard} component={BuyerDashboard} />
              <Route  path={constant.frontend_url.buyer_forgot_password} component={BuyerForgotPassword} />
              <Route  path={constant.frontend_url.buy_home} component={BuyHome}/>
              <Route  path={constant.frontend_url.property_detail} component = {PropertyDetails} />
              <Route path={constant.frontend_url.buyer_property_list} component = {PropertyList} />
              {/* <Route  path={constant.frontend_url.property_detail + '/:id'} component = {PropertyDetails} /> */}
            </Switch>
        )
    }
}


export default Routing