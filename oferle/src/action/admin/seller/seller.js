import { constant } from "../../../config";

export var seller_fetch=(state)=>{


    return (dispatch)=>{
        dispatch({type:"loader",response:{loader:true,snackbar:{show:false,message:""}}})
        fetch(constant.base_url+constant.server_url.fetch_seller,{
            method:"POST",
            headers:{
                'Accept': 'application/json',
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
               },
        }).then(res=>res.json())
        .then(response=>{
           if(response.status==200)
           {
            dispatch({type:"loader",response:{loader:false,snackbar:{show:false,message:""}}})
            dispatch({type:constant.redux.admin_type.seller_detail,response:response})
           }else if(response.status==401)
           {
            dispatch({type:"loader",response:{loader:false,snackbar:{show:false,message:""}}})
           }

        }).catch(err=>{

            dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:constant.error.api_error}}})
        })


    }
}