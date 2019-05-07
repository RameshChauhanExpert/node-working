import { constant } from "../config";

var initial_state={
    user_detail:[],
    login_type:"",
    status:402,
    login:(localStorage.getItem("login")=="true")?true:false

}

export default function reducer(state=initial_state, action) {

switch(action.type){
case constant.redux.frontend_type.user_section_login:{
  return Object.assign({},state,{status:action.response.status,user_detail:action.response.data,message:action.response.message})
}
default :{
return Object.assign({},state)
}

}

}