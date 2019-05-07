
var initial_state={
    loader:false,
    snackbar:{show:false,message:""},
    status:402,
    validate:false
    

}

export default function reducer(state=initial_state, action) {


    switch(action.type){
        case "sign_up":
        {
            return Object.assign({},state,{status:action.response.status})
        }
        case "sign_up_success":{

            return Object.assign({},state,action.response)
        }

        
    
        default : return state
    }

}

