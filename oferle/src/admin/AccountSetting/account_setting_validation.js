import $ from "jquery";
import validate from "jquery-validation"

export  var validation=()=>{
    $("#admin_account_setting").validate({
        rules: {
            site_title: {
                required: true,
                maxlength:15,
                
                normalizer: function(value) {
                    return $.trim(value);
                },
               
            },
            admin_email_address:{
                required: true
            },
            default_meta_title:{
                required:true
            },
            default_meta_description:{required:true}

        }
    });
}