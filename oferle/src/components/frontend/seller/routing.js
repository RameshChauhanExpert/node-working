import React from "react"
import { Link, Switch, Route, BrowserRouter } from "react-router-dom"

import SellerPropertyListing from "./property_list"
import AccountSetting from "../account_setting/account_setting"
import { constant } from "../../../config";
import PropertyDetail from "../property/seller_property_detail/property_detail";

export class Routing extends React.Component {
    render() {
        return (
            <Switch >
                <Route path={constant.frontend_url.seller_property_list} component={SellerPropertyListing} />
                <Route path={constant.frontend_url.seller_account_setting} component={AccountSetting} />
                <Route path={constant.frontend_url.seller_property_detail} component={PropertyDetail} />
            </Switch>
        )
    }
}


