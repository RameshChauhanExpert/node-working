import {constant} from "../../config/constant"
import{seller_detail} from "../"
import { array } from "prop-types";
export var seller_wizard=(state)=>{

 
    return (dispatch)=>{
      if(state.image_drop.length>0 && typeof(state.image_drop.length))
      // if(state.image_drop.length>0 && typeof(state.image_drop.length) !== 'undefined') // bug in alltimefit 
      {

       var formData = new FormData()
       var image=false
       state.image_drop.forEach((data, i) => {
         image=true
         formData.append(i, data.blob_data)
       })
     
         delete state.image_drop



      }
      dispatch({type:"loader_open"})
        fetch(constant.base_url+constant.server_url.seller_wizard,{
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
               if(image==true)
               {
                formData.append("property_id",response.property.property_last_id)
                fetch(constant.base_url+constant.server_url.seller_wizard_property_image_upload,{
                  method: 'POST',
                  body: formData
                })
                .then(image_res=>image_res.json)
                .then(image_response=>{
               
                  dispatch(seller_detail(response.user.user_id)) 
                  dispatch({type:"seller_wizard",response:response})

                })
                .catch(err=>{

                })
               }else
               {
                dispatch(seller_detail(response.user.user_id)) 
                dispatch({type:"seller_wizard",response:response})
               }
             
             
             }else{
              dispatch({type:"seller_wizard",response:response})
              setTimeout(function(){
                dispatch({type:"close_snackbar"})
             },10000)
             }
             
            
        })
        .catch(data=>{
          var response={message:constant.error.api_error,status:1064}
          dispatch({type:"seller_wizard_api_error",response:response})
          setTimeout(function(){
            dispatch({type:"close_snackbar"})
         },10000)
        })
    }
}

export var seller_wizard_image_upload=(image_drop,property_id)=>{
       
       
      
  return (dispatch)=>{
    dispatch({type:"loader", response:{loader:true,snackbar:{show:false,message:""}}})
    
    var formData = new FormData()
      if(image_drop.image_drop.length>0)
      {
       image_drop.image_drop.map((data,index)=>{
        formData.append(index,data.blob_data)
       })
      }
  formData.append("property_id",property_id)
  fetch(constant.base_url+constant.server_url.seller_wizard_image_upload,{
          method:"POST",
          body:formData
      })
      .then(res=>res.json())
      .then(response=>{
           if(response.status==200)
           {  
            dispatch({type:"loader", response:{loader:false,snackbar:{show:true,message:"Your property image successfully uploded"}}})
            setTimeout(function(){
              dispatch({type:"seller_wizard_image_upload",response:response})
           },3000)
            
           }else if(response.status==401) { 
            dispatch({type:"loader", response:{loader:false,snackbar:{show:true,message:constant.error.api_error}}})
            setTimeout(function(){
              dispatch({type:"loader", response:{loader:false,snackbar:{show:false,message:constant.error.api_error}}})
           },3000)
           }else
           {
            dispatch({type:"loader", response:{loader:false,snackbar:{show:true,message:"Your property image successfully uploded"}}})
            setTimeout(function(){
              dispatch({type:"seller_wizard_image_upload",response:{status:200}})
           },3000)
            
           }
           
          
      })
      .catch(data=>{
        var response={message:constant.error.api_error,status:1064}
        dispatch({type:"seller_wizard_api_error",response:response})
        
        setTimeout(function(){
          dispatch({type:"close_snackbar"})
       },10000)

      })
  }

}