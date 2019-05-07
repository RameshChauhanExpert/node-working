import { constant } from "../../config";

export var save_search_location=(location)=>{


    return dispatch=>{
        fetch(constant.base_url+constant.server_url.save_locaion_search,{method:"POST",headers:{
            'Accept': 'application/json',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            // 'mode': 'no-cors',
            // "Access-Control-Allow-Origin": "*", 
            // "Access-Control-Allow-Headers": "X-Requested-With"
           },
           body:"Data="+JSON.stringify(location)       
         })


    }
}