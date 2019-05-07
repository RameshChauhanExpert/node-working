export var filter_user=(user)=>{
  
    let total_user=user.length;
    let active_user_array= user.filter(data => data.status ==1);
    let user_master={"total_user":total_user,active_user_array:active_user_array};

    
    return user_master 
    
  }


  export var filter_properties=(property)=>{

      let total_property=property.length;
      let active_property_array=  property.filter(data=> data);
      
      let property_master={total_property:total_property,active_property_array:active_property_array};

      return property_master

  }
    

