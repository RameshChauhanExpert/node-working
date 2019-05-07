import { constant } from "../../../config";

export var admin_seller_detail=(user_id)=>{


    return (dispatch)=>{
        dispatch({type:"loader",response:{loader:true,snackbar:{show:false,message:""}}})
        fetch(constant.base_url+constant.server_url.fetch_seller_detail,{
            method:"POST",
            headers:{
                'Accept': 'application/json',
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
               },
               body:"Data="+JSON.stringify({user_id:user_id}),
        }).then(res=>res.json())
        .then(response=>{
           if(response.status==200)
           {
            dispatch({type:"loader",response:{loader:false,snackbar:{show:false,message:""}}})
            dispatch({type:constant.redux.admin_type.seller_detail_page,response:response})
           }else if(response.status==401)
           {
            dispatch({type:"loader",response:{loader:false,snackbar:{show:false,message:""}}})
           }

        }).catch(err=>{

            dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:constant.error.api_error}}})
        })


    }
}