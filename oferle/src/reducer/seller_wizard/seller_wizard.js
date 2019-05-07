var initial_state={
              loader:false,
              snackbar:{show:false,message:""},
              status:402,
              data:{}

}

export default function reducer(state=initial_state, action) {
    
    switch(action.type){
       case "seller_wizard":{
           if(action.response.status==200)
           {
            return Object.assign({},state,{status:action.response.status,user_detail:action.response.user,loader:false,user_exist:action.response.user_exist})
           }
           else
           {
            return Object.assign({},state,{status:action.response.status,loader:false, snackbar:{show:true,message:action.response.message}})
           }
            
       }
       case 'close_snackbar':{
            return Object.assign({},state,{
                snackbar:{
                    show:false,
                    message:'',
                }
            })
       }
       case "loader_open":{
        return Object.assign({},state,{
            loader:true
        })
       }
       case "seller_wizard_api_error":{
        return Object.assign({},state,{
            loader:false,
            snackbar:{
                show:false,
                message:action.response.message,
            }
        })
       }
       case "seller_wizard_image_upload":{
           if(action.response.status==401)
           return Object.assign({},{status:action.response.status,message:action.response.message})

           return Object.assign({},state,{status:action.response.status})
       }

       default :{
        return state
    }
        
    }
    
}