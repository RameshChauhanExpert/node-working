import $ from "jquery";
import validate from "jquery-validation"



export  var validation=()=>{
    $("#contact-us").validate({
        rules: {
            name: {
                required: true,
                maxlength:15,
                
                normalizer: function(value) {
                    return $.trim(value);
                },
               
            },
            email_address: {
                required: true,
                maxlength:15,
                
                normalizer: function(value) {
                    return $.trim(value);
                },
               
            },
            phone_number: {
                required: true,
                maxlength:15,
                number:true,
                
                normalizer: function(value) {
                    return $.trim(value);
                },
               
            },
            message: {
                required: true,
                maxlength:15,
                
                normalizer: function(value) {
                    return $.trim(value);
                },
               
            },
        }
    }
    )
}