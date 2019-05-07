import { constant } from "../../config";
var initial_state={
    status:401,
    data:[]
}
export default function reducer(state=initial_state, action) {


    switch(action.type)
    {
    
        case  constant.redux.frontend_type.zone_list :{
            return Object.assign({},state,action.response)
        }

        default :return state
    }


}