import { array } from "prop-types";

var initial_state={
  site_title:"",
    admin_email_address:"",
    default_meta_description:"",
    default_meta_title:""
}

export default function reducer(state=initial_state, action) {

switch(action.type){
case "account_setting_state_update":{
   
  return Object.assign({},state,{[action.event.target.name]:action.event.target.value})
}

 case "account_setting_fetch":{
      return Object.assign({},state,action.response)
 }

default :{
return state
}

}

}