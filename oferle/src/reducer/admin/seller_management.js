import { array } from "prop-types";
import { constant } from "../../config";

var initial_state={
    data:[]
}

export default function reducer(state=initial_state, action) {

switch(action.type){
case constant.redux.admin_type.seller_detail:{
    return Object.assign({},state,action.response)
}
default :{
return state
}

}

}