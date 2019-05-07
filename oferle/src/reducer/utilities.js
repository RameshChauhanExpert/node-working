
var initial_state={
    loader:false,
    snackbar:{show:false,message:""},
    
    

}

export default function reducer(state=initial_state, action) {


    switch(action.type){
        case "utilities":
        {
            return Object.assign({},state,action.response)
        }
        case "loader":
        {
             
            return Object.assign({},action.response)
        }
        default : return Object.assign({},{loader:false,snackbar:{show:false,message:""}})
    }

}

