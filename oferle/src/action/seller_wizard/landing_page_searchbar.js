import { constant } from "../../config";

export var landing_page_search_bar=(state)=>{


    return dispatch=>{

        dispatch({type:"loader", response:{loader:true,snackbar:{show:false,message:""}}})
      fetch(constant.base_url+constant.server_url.county_list,{
          method:"GET"
      }).then(res=>res.json())
      .then(response=>{
          
      dispatch({type:constant.redux.frontend_type.zone_list,response:response})
      })
      .catch(err=>{
         // dispatch({loader:false,snackbar:{show:true,message:constant.error.api_error}})
      })
    }

}