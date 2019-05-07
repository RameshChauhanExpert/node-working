import { constant } from "../../config";

var initial_state={
              user_detail:[],
              email:"",
              password:"",
              status:402,
              login:(localStorage.getItem("login")=="true")?true:false

}

export default function reducer(state=initial_state, action) {
    
    switch(action.type){
       case constant.redux.frontend_type.front_end_login:{
            return Object.assign({},state,{status:action.response.status,user_detail:action.response.data,message:action.response.message})
       }
       
       case constant.redux.frontend_type.front_end_login_state_update:{
            return Object.assign({},state,{[action.event.target.name]:action.event.target.value})

       }
       case constant.redux.frontend_type.front_end_logout:{
           return Object.assign({},state,action.response)

       }
      

       default :{
        return state
    }
        
    }
    
}