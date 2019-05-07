import React from "react"

import {Route,Switch } from "../../../../utilities";
import { constant } from "../../../../config";
import BuyerPropertyList from "./buyer_propert_list/buyer_propert_list";
import BuyerAccountSetting from "./buyer_account_setting/buyer_account_setting";
import BuyerPropertyDetail from "./buyer_property_detail/buyer_property_detail";
import PropertyList from '../../property/propertyList' 


class Routing extends React.Component{


    render()
    {
        return (
    <Switch>
        <Route path={constant.frontend_url.buyer_propert_list} component={BuyerPropertyList} />
        <Route path={constant.frontend_url.buyer_account_setting} component={BuyerAccountSetting} />
        <Route path={constant.frontend_url.buyer_property_detail} component={BuyerPropertyDetail} />
        <Route path={constant.frontend_url.buyer_property_list} component = {PropertyList} />
   </Switch>


        )
    }
}

export default Routing