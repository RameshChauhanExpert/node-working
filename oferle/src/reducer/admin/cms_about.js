import { array } from "prop-types";

var initial_state={
    title:"",
    content:"",
    status:1,
}

export default function reducer(state=initial_state, action) {

switch(action.type){
case "admin_adbout_state_update":{
   
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