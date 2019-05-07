import { constant } from "../../../config";
import {filter_user,filter_properties} from "./dashboard_action"


export var fetch_dashboard_details=()=>{


    return dispatch=>{
        dispatch({type:"loader",response:{loader:true,snackbar:{show:false,message:""}}})

        fetch(constant.base_url+constant.server_url.fetch_dashboard_details,{
            method:"GET"
        })
        .then(res=>res.json())
        .then(response=>{
            if(response.status==200)
            {           
                response['user_master']=filter_user(response.user_master)
                response['properties']=filter_properties(response.properties)
                dispatch({type:constant.redux.admin_type.dashboard_fetchAndUpdate,response:response})
            }else
            {
                dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:constant.error.api_error}}})
            }
        }).catch(err=>{

            dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:constant.error.api_error}}})
        })
    }
}