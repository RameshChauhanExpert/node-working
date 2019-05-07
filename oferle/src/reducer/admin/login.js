import { array } from "prop-types";
import { constant } from "../../config";

var initial_state={
   status:"",
   email:"",
   password:""
}

export default function reducer(state=initial_state, action) {

switch(action.type){

    case constant.redux.admin_type.admin_login_state_update:{
       
        return Object.assign({},state,{[action.event.target.name]:action.event.target.value})
    }
    case constant.redux.admin_type.admin_login_success:{
        return Object.assign({},state,{status:action.response.status,data:action.response.data})
    }
  

default :{
return state
}

}

}