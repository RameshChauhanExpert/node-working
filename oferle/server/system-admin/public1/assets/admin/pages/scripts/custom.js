/**
Custom module for you to write your own javascript functions
**/
var Custom = function () {

    // private functions & variables

    var myFunc = function(text) {
        alert(text);
    }

    // public functions
    return {

        //main function
        init: function () {
            //initialize here something.            
        },

        //some helper function
        doSomeStuff: function () {
            myFunc();
        }

    };

}();


/***
Usage
***/
//Custom.init();
//Custom.doSomeStuff();


$(document).ready(function () {

    $('#productAdd').submit(function (e) {
      $('#productAdd').validate({
        rules: {
          vName: 'required',
          vProductBrand: 'required',
          vCompanyModelNumber:'required',
          vBarcode:'required',
          vProductType:'required',
          tDescription:'required',
          vRemark:'required',
          vMacAddress:'required',
          vOem:'required',
          bStatus:'required',
          vMacAddress:'required',
          vMacAddress:'required',
          user_email: {
            required: true,
            email: true,
          },
          psword: {
            required: true,
            minlength: 8,
          }
        },
        messages: {
          vName: 'This field is required',
          lname: 'This field is required',
          user_email: 'Enter a valid email',
          psword: {
            minlength: 'Password must be at least 8 characters long'
          }
        },
        submitHandler: function (form) {
          form.submit();
        }
      });

    })


    $('#categoryForm').submit(function (e) {
        $('#categoryForm').validate({
          rules: {
            vTitle: 'required'
            
          },
          messages: {
            vName: 'This field is required',
            lname: 'This field is required',
            user_email: 'Enter a valid email',
            psword: {
              minlength: 'Password must be at least 8 characters long'
            }
          },
          submitHandler: function (form) {
              
            form.submit();
          }
        });
  
      })
  })