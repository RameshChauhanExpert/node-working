import $ from "jquery";
import validate from "jquery-validation"

export  var validation=()=>{
    $("#cms_about").validate({
        rules: {
            title: {
                required: true,
                maxlength:15,
                
                normalizer: function(value) {
                    return $.trim(value);
                },
               
            },
            content:{
                required: true,
                normalizer: function(value) {
                    return $.trim(value);
                },
            },
            status:{
                required:true,
                normalizer: function(value) {
                    return $.trim(value);
                },
            },
            default_meta_description:{
                required:true
            }

        }
    });
}