
export var nav_operation=(data)=>{
  
  return (dispatch)=>{
        var routeCheck= data.split("/");
        routeCheck.map(route=>{
          if(route=="admin"){
          data="/admin"
            return 
          }
        })
      dispatch({type:data})
  }
}