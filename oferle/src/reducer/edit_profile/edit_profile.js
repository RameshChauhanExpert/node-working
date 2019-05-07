import { constant } from "../../config";


var  initial_state={
status:401
    
    
}

export  default function reducer(state=initial_state, action) {
     
      
switch(action.type){
    
    case constant.redux.frontend_type.seller_profile_edit:{
       
        return Object.assign({},action.response)
    }
    default :{
        return initial_state
    }
    
}

}



