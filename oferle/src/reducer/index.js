import { combineReducers } from 'redux'
import app from "./app/app";
import login from "./login/login"
import seller_dashboard from "./seller_dashboard/seller_dashboard"
import seller_wizard from "./seller_wizard/seller_wizard"	 
import sign_up from "./sign_up/sign_up"
import utilities from "./utilities"
import account_setting from "./account_setting/account_setting"
import seller_management from "./admin/seller_management"
import cms_about from "./admin/cms_about"
import admin_login from "./admin/login"
import  edit_profile  from './edit_profile/edit_profile.js';
import  user_section from "./user_section"
import forgot_password from "./forgot_password/forgot_password"
import zone_list from "./seller_wizard/zone"


/**** Admin panel */



//dashboard
import admin_dashnoard from "./admin/dashboard"




export var  combine_reducer= combineReducers({
	app_component:app,
	login_component:login,
	seller_dashboard:seller_dashboard,
	seller_wizard:seller_wizard,
	sign_up:sign_up,
	utilities:utilities,
	account_setting:account_setting,
	seller_management:seller_management,
	cms_about:cms_about,
	admin_login:admin_login,
	edit_profile:edit_profile,
	user_info:user_section,
	forgot_password:forgot_password,
	zone_list:zone_list,
	admin_dashnoard:admin_dashnoard,
})
