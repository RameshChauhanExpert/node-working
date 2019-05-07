import { constant } from "../../../config";
import { constants } from "os";



export var cms_about_state_update =(event)=>{

    return (dispatch)=>{
     

        dispatch({type:constant.redux.admin_type.admin_adbout_state_update,event:event})
    }

}

export var cms_about_submit=(state)=>{

    return (dispatch,getstate)=>{
        console.log(getstate())
        dispatch({type:"loader",response:{loader:true,snackbar:{show:false,message:""}}})
        fetch(constant.base_url+constant.server_url.cms_about_update,{
            method:"POST",
            headers:{
                'Accept': 'application/json',
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
               },
               body:"Data="+JSON.stringify(getstate().cms_about)
        })
        .then(res=>res.json())
        .then(response=>{
            if(response.status==200)
            {
                
                dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:response.message}}})
           
               setTimeout(function(){
                dispatch({type:"loader",response:{loader:false,snackbar:{show:false,message:""}}})
               },3000)
           
            }else if(response.status==401){
                dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:response.message}}})
                setTimeout(function(){
                    dispatch({type:"loader",response:{loader:false,snackbar:{show:false,message:""}}})
                   },3000)
            }

        })
        .catch(err=>{
            dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:"There are technical issue,please try again."}}})
            setTimeout(function(){
                dispatch({type:"loader",response:{loader:false,snackbar:{show:false,message:""}}})
               },3000)
        })
        
        
    }
}

export var cms_about_fetch=(state)=>{

    return dispatch=>{
        dispatch({type:"loader",response:{loader:true,snackbar:{show:false,message:""}}})
         
        fetch(constant.base_url+constant.server_url.cms_about_fetch,{
            method:"GET",
            headers:{
                'Accept': 'application/json',
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                // 'Access-Control-Allow-Origin':'*',
                // 'mode': "cors"
               },
        }).then(res=>res.json())
        .then(response=>{
            if(response.status==200)
            {
                dispatch({type:"account_setting_fetch",response:response.data[0]})
                dispatch({type:"loader",response:{loader:false,snackbar:{show:false,message:""}}})
            }
        })

    }
   

}