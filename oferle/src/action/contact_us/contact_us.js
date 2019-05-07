import { constant } from "../../config";

export var send_contact_details=(formData)=>{
   
     
    return dispatch=>{
        dispatch({type:"loader", response:{loader:true,snackbar:{show:false,message:""}}})
        fetch(constant.base_url+constant.server_url.send_contact_detail,{
            method:"POST",
            
               body:formData
        })
        .then(res=>res.json())
        .then(response=>{
            if(response.status==200)
            {
                dispatch({type:"loader", response:{loader:false,snackbar:{show:true,message:constant.message.contact_us_messsage}}})
                setTimeout(function(){
                    dispatch({type:"loader", response:{loader:false,snackbar:{show:false,message:""}}})
                 },3000)
           
            }else
            {
                dispatch({type:"loader", response:{loader:false,snackbar:{show:true,message:constant.error.api_error}}})
           
                setTimeout(function(){
                    dispatch({type:"loader", response:{loader:false,snackbar:{show:false,message:""}}})
                 },3000)
            }
           
        })
        .catch(err=>{
            dispatch({type:"loader", response:{loader:false,snackbar:{show:true,message:constant.error.api_error}}})
            setTimeout(function(){
                dispatch({type:"loader", response:{loader:false,snackbar:{show:false,message:""}}})
             },3000)   
        })
    }

}