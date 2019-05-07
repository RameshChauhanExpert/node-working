import { constant } from "../../../config";

export var login_admin=(state)=>{
   
    return (dispatch,getState)=>{
        
        if(getState().admin_login.email.trim()==""&&getState().admin_login.password.trim()=="")
        {
            
            dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:"There was an error with your E-Mail\/Password combination. Please try again."}}})
        }else
        {
         dispatch({type:"loader",response:{loader:true,snackbar:{show:false,message:""}}})
       fetch(constant.base_url+constant.server_url.admin_login,{
           method:"POST",
           headers:{
            'Accept': 'application/json',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
           },
           body:"Data="+JSON.stringify({email:getState().admin_login.email,password:getState().admin_login.password})
       })
       .then(res=>res.json())
       .then(response=>{
             if(response.status==200)
             {
                dispatch({type:"loader",response:{loader:false,snackbar:{show:false,message:""}}})
                dispatch({type:constant.redux.admin_type.admin_login_success,response:response})
            }
             else if(response.status==401)
             {
                dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:"There was an error with your E-Mail\/Password combination. Please try again."}}})
             }
       })
       .catch(data=>{

        dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:"There was an error with your E-Mail\/Password combination. Please try again."}}})
       })
    }
    }
}

export var admin_login_state=(event)=>{
    
    return(dispatch)=>{
        dispatch({type:constant.redux.admin_type.admin_login_state_update,event:event})
    }
}