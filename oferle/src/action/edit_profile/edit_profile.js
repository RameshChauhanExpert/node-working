import { constant } from "../../config";


export var submit_edit_profile_data=(state)=>{

   
    return (dispatch,getstate)=>{
                    var error=false;
                        if(state.profile_picture!="")
                        {
                            var formData = new FormData()
                            var images=  Array.from(state.profile_picture)
                            images.forEach((data, i) => {
                                var type=data.type.split("/")
                                if(data.size>5000000&&error==false)
                                {
                                dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:"The file size should be less than 5 MB."}}})
                                    error=true
                                }
                                if (type[1].toLowerCase()!="jpeg"&&type[1].toLowerCase()!="png"&&type[1].toLowerCase()!="jpg"&&error==false)
                                {
                                dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:"Only JPG, JPEG, PNG files are allowed"}}})
                                error=true   
                                }
                                formData.append(i, data)
                                })
                        }
       
 
          if(error==false)
          {

            dispatch({type:"loader",response:{loader:true,snackbar:{show:false,message:""}}})
        fetch(constant.base_url+constant.server_url.edit_profile,{
            method:"POST",
            headers:{
                'Accept': 'application/json',
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
               },
               body:"Data="+JSON.stringify({user_id:localStorage.getItem("token_id"),first_name:state.first_name,last_name:state.last_name,email:state.email,phone:state.phone,user_image:state.user_image})
        }).then(res=>res.json())
        .then(response=>{
            if(response.status==200)
            {
                if(formData &&error==false)
                {    
                    formData.append("user_id",localStorage.getItem("token_id"))
                    fetch(constant.base_url+constant.server_url.seller_profile_image,{
                        method:"POST",
                        body:formData
                    }).then(res=>res.json())
                    .then(responseImage=>{
                        if(responseImage.status==200)
                        {
                            response.data[0].user_image=responseImage.image_name
                            dispatch({type:constant.redux.frontend_type.seller_detail,response:response})
                            dispatch ({type:constant.redux.frontend_type.seller_profile_edit,response:response})
                            dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:"Account details successfully updated."}}})
                          
                                setTimeout(function(){
                                    dispatch({type:"loader",response:{loader:false,snackbar:{show:false,message:""}}})
                                },3000)
                      
                        }else{
                            dispatch({type:constant.redux.frontend_type.seller_detail,response:response})
                            dispatch ({type:constant.redux.frontend_type.seller_profile_edit,response:response})
                            dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:"Account details successfully updated."}}})
                        
                            setTimeout(function(){
                                dispatch({type:"loader",response:{loader:false,snackbar:{show:false,message:""}}})
                            },3000)
                        }
                    })
                }
                else{
                dispatch({type:constant.redux.frontend_type.seller_detail,response:response})
                dispatch ({type:constant.redux.frontend_type.seller_profile_edit,response:response})
                dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:"Account details successfully updated."}}})
               
                setTimeout(function(){
                    dispatch({type:"loader",response:{loader:false,snackbar:{show:false,message:""}}})
                },3000)
            }
            }
            else if(response.status==401)
            {
                dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:response.message}}})
           
                setTimeout(function(){
                    dispatch({type:"loader",response:{loader:false,snackbar:{show:false,message:""}}})
                },3000)

            }
            else  {
                dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:constant.error.api_error}}})
           
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



export  var seller_changePassword=(state)=>{

    return dispatch=>{
        if(state.new_password!=state.conifrm_new_password)
        {
            dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:"Your password is not match."}}})
        }else
        {
            dispatch({type:"loader",response:{loader:true,snackbar:{show:false,message:""}}})
            fetch(constant.base_url+constant.server_url.seller_change_password,{
                method:"POST",
                headers:{
                    'Accept': 'application/json',
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                   },
                body:"Data="+JSON.stringify({user_id:localStorage.getItem("token_id"),"current_password":state.current_password,new_password:state.new_password})
            })
            .then(res=>res.json())
            .then(response=>{
               if(response.status==200)
               {
              //  dispatch({type:constant.redux.frontend_type.seller_detail,response:response})
                dispatch ({type:constant.redux.frontend_type.seller_profile_edit,response:response})
                dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:"Account details successfully updated."}}})
                
                setTimeout(function(){
                    dispatch({type:"loader",response:{loader:false,snackbar:{show:false,message:""}}})
                },3000)
                
               }
               else if(response.status==401)
               {
                dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:"You have entred wrong password."}}})
                setTimeout(function(){
                    dispatch({type:"loader",response:{loader:false,snackbar:{show:false,message:""}}})
                },3000)
                //dispatch({type:"loader",response:{loader:false,snackbar:{show:false,message:""}}})
            }else 
               {
                dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:constant.error.api_error}}})
                setTimeout(function(){
                    dispatch({type:"loader",response:{loader:false,snackbar:{show:false,message:""}}})
                },3000)
                // dispatch({type:"loader",response:{loader:true,snackbar:{show:false,message:""}}})   
            }
            })
            .catch(err=>{
                dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:constant.error.api_error}}})
                setTimeout(function(){
                    dispatch({type:"loader",response:{loader:false,snackbar:{show:false,message:""}}})
                },3000)
                //dispatch({type:"loader",response:{loader:true,snackbar:{show:false,message:""}}})
            })
        }
           
        
    }


}