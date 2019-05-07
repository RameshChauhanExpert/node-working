import { Messages } from "./Messages"


export default class Validations {

  isUrl(strToCheck) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(strToCheck);
  }
  // This function is used for checking type od EDTextField and accordingly secures the text entry
  checkingFieldType = fieldType => {
    if (fieldType === "password") {
      return true;
    } else {
      return false;
    }
  };


  // checkForEmpty = text => {
  //   if (text.length == 0) {
  //     return {
  //       isEmpty: true,
  //       validationErrorMessage: "asdasdasdasasdas"
  //     };
  //   }  
  // }

  // Function for performing email validations
  validateEmail = (text, message = "This is a required field") => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // console.log("Regular Expression test is " + reg.test(text));
    if (text === "") {
      return message;
    }
    else if (reg.test(text) === false) {
      return Messages.validEmail

    } else {
      return "";
    }
  };

  // Function for performing Password validations
  validatePassword = (text, message = "This is a required field.") => {
    // console.log(text);
    // let reg = /^([a-zA-Z0-9@*#]{8,15})$/;
    // let reg = /^([a-zA-Z0-9@*#]{2,15})$/;
    // console.log("Regular Expression test is " + reg.test(text));
    if (text === "") {
      return message;
    }
    else if (text.length > 15) {
      return Messages.validLength

    } else {
      return ""
    }
  };

  validateFirstName = (text, message = "This is a required field.") => {
    let reg =  /[a-zA-Z]/
    if (text === "") {
      return message;
    }
    else if (reg.test(text) === false){
      return Messages.validName
    }
    else if (text.length > 15) {
      return Messages.validLength
    } else {
      return ""
    }
  }

  validatePhone = (text, message = "This is a required field.") => {
    let reg = /^[0-9]+$/
    if (text === "") {
      return message;
    } else if (reg.test(text) === false) {
      return Messages.validPhone.numerics
    }
    else if (text.length != 10) {
      return Messages.validPhone.length
    }
    else {
      return ""
    }
  }
  validateCompanyName = (text) => {
    let reg =  /[a-zA-Z]/
    if (reg.test(text) === false){
      return Messages.validName
    }
    else if (text.length > 30) {
      return 'Please enter charatcers between 0 to 30'
    } else {
      return ""
    }
  }

  validateNumericField = (text, message = "This is a required field.") => {
    if (text === ''){
      return message
    }
    else if(isNaN(text)){
      console.log('string')
      return Messages.validPhone.numerics
    }
    else{
      console.log('number')
      return ""
    }
  }

}
