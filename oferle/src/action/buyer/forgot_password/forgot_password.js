import { constant } from "../../../config";

export var buyer_forgot_password_mail=(state)=>{


    return dispatch=>{

        if(state.email=="")
        {
            dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:"email error"}}})
        }else{
            dispatch({type:"loader",response:{loader:true,snackbar:{show:false,message:""}}})
            fetch(constant.base_url+constant.server_url.buyer_forgot_password,{
                method:"POST",
                headers:{
                    'Accept': 'application/json',
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                   },
                   body:"Data="+JSON.stringify(state)
            })
            .then(res=>res.json())
            .then(response=>{
                if(response.status==200)
                {   
                    dispatch({type:constant.redux.frontend_type.forgot_password,response:{email_sent:true}})
                    
                    dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:response.message}}})
                    setTimeout(function(){
                        dispatch({type:"loader",response:{loader:false,snackbar:{show:false,message:""}}})
                    },3000)
                }
                else if(response.status==401)
                {
                    dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:constant.error.user_not_exist}}})
                    setTimeout(function(){
                        dispatch({type:"loader",response:{loader:false,snackbar:{show:false,message:""}}})
                    },3000)

                }
                else{
                    dispatch({type:"loader",response:{loader:false,snackbar:{show:false,message:constant.error.api_error}}})
                    setTimeout(function(){
                        dispatch({type:"loader",response:{loader:false,snackbar:{show:false,message:""}}})
                    },3000)
                }
                    

            })
            .catch(err=>{
                
                dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:constant.error.api_error}}})
                setTimeout(function(){
                    dispatch({type:"loader",response:{loader:false,snackbar:{show:false,message:""}}})
                },3000)
    
            })
        }
        
    }
}