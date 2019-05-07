import { array } from "prop-types";

var initial_state={
    user_detail:Array({first_name:""})
}

export default function reducer(state=initial_state, action) {

switch(action.type){
case "seller_detail":{
  return Object.assign({},state,{status:action.response.status,user_detail:action.response.data,message:action.response.message})
}
case "sellerdashboard_err":{

  return Object({},state)
}
default :{
return state
}

}

}