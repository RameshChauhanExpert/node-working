import {constant} from "../../config/constant"
export var seller_detail=(token_id)=>{
    
    return (dispatch)=>{
        dispatch({type:"loader",response:{loader:true,snackbar:{show:false,message:""}}})
        fetch(constant.base_url+constant.server_url.seller_dashboard,{
            method:"POST",
            headers:{
             'Accept': 'application/json',
             "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body:"Data="+JSON.stringify({user_id:token_id})
        })
        .then(res=>res.json())
        .then(response=>{
             dispatch({type:"seller_detail",response:response})
             dispatch({type:"loader",response:{loader:false,snackbar:{show:false,message:""}}})
        })
        .catch(data=>{
            
            dispatch({type:"sellerdashboard_err",response:{}})
        
        })
    }
} 


export var seller_properties_image_upload=(event,property_id)=>{

   
    return (dispatch,getstate)=>{
        dispatch({type:"loader",response:{loader:true,snackbar:{show:false,message:""}}})
        
       var formData = new FormData()
       var images=  Array.from(event.target.files)

    
       var error=false
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

        formData.append("property_id", property_id)
        if(error==false)
        {

        
        fetch(constant.base_url+constant.server_url.seller_property_image_upload,{
            method:"POST",
            body:formData
        }).then(res=>res.json())
        .then(response=>{
                if(response.status==200)
                {
                    dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:constant.message.image_uploades}}})
                    getstate().seller_dashboard.user_detail.map(data=>{
                       if(data.property_id==response.data.property_id)
                       {
                           data.images.push(response.data)
                       }
                    })
                   
                     dispatch({type:seller_detail,response:{status:200,data:getstate().seller_dashboard}})

                }else{
                    dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:constant.error.api_error}}})
                }
        })
        .catch(err=>{
            dispatch({type:"loader",response:{loader:false,snackbar:{show:true,message:constant.error.api_error}}})
        })
    }
   
    }
    

        
    
    
       
     
}

 