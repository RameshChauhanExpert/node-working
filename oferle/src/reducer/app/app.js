import { constant } from "../../config/constant";

var  initial_state={
        header:true,
        footer:true,
        frontend:false
        
}

export default function reducer(state=initial_state, action) {
          var patharray=window.location.pathname.split("/")
          var path="/"+patharray[1]
     
          
    switch(path){
        case "/seller-wizard": {
            return Object.assign({},state,{header:false,footer:false,frontend:true})
        }
        case constant.frontend_url.buyer_login:{
            alert("sdf")
            return Object.assign({},state,{header:false,footer:false,frontend:true})
        }
        case "/login": {
          
            return Object.assign({},state,{header:false,footer:false,frontend:true})
        }
        case "/register": {
            return Object.assign({},state,{header:false,footer:false,frontend:true})
        }
        case "/admin": {
            localStorage.setItem("login",false)
            return Object.assign({},state,{header:false,footer:false,frontend:false})
            
        }
        case "/admin/dashboard":{
            return Object.assign({},state,{header:false,footer:false,frontend:false})
        }
       
        
    }

    switch(window.location.pathname){
       case constant.frontend_url.buyer_login:{
        return Object.assign({},state,{header:false,footer:false,frontend:true})
       }

       case constant.frontend_url.buyer_sign_up:{
        return Object.assign({},state,{header:false,footer:false,frontend:true})
       }
       case constant.frontend_url.seller_signup:{
        return Object.assign({},state,{header:false,footer:false,frontend:true})
       }
       case constant.frontend_url.seller_login:{
        return Object.assign({},state,{header:false,footer:false,frontend:true})
       }
       
       
    }

    return Object.assign({},state,{header:true,footer:true,frontend:true})
    
}



