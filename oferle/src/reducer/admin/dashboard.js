import { array } from "prop-types";
import { constant } from "../../config";

var initial_state={
    user_master:{total_user:0,active_user_array:[]},
    properties:{total_property:0,active_property_array:[]},
    status:1,
}

export default function reducer(state=initial_state, action) {

switch(action.type){
case constant.redux.admin_type.dashboard_fetchAndUpdate :{
   
  return Object.assign({},state,action.response)
}

 

default :{
return state
}

}

}