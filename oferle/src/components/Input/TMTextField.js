import React, { Component } from "react";
import { TextField } from "../../utilities"
// import {Messages, Validations} from "../../config"
import Validations from "../../config/Validations"


export default class TMTextField extends Component {


  constructor(props) {
    super(props);
    this.Validations = new Validations();
    this.state = {};
  }


  // fieldKeyboardType() {
  //   if (this.props.type === TextFieldTypes.email) {
  //     return "email-address";
  //   } else if (this.props.type === TextFieldTypes.password) {
  //     return "default";
  //   } else if (this.props.type === TextFieldTypes.amount) {
  //     return "number-pad";
  //   } else if (this.props.type === TextFieldTypes.description) {
  //     return "default"
  //   }
  // }

  // shouldAutoCapitalise() {
  //   if (this.props.type === TextFieldTypes.email) {
  //     return "none";
  //   } else if (this.props.type === TextFieldTypes.password) {
  //     return "none";
  //   }
  // }

  // callTextChangeHandler = (textToSend) => {
  //   if (this.props.callBackFromParent != undefined) {
  //     this.props.callBackFromParent(textToSend, this.props.type)
  //   }
  // }

  validateFields = (fieldName, fieldValue) => {
    // console.log("fieldValue ->", fieldValue.email)
    switch (fieldName) {
      case "email":
        this.Validations.validateEmail(fieldValue.email)
        // console.log('name', fieldName)
        break;
      // console.log('value', fieldValue)
      default:
        break;
    }
  }

  render() {

    // console.log("Value from TMTextField:", this.props.value)
    // console.log("State of form_>", this.props.state)

    return (
    <div className="inline-element">
      <TextField
        label={this.props.label}
        margin={(!this.props.margin) ? "" : this.props.margin}
        className={this.props.className}
        onChange={this.props.onChange}
        name={this.props.name}
        //onBlur={this.validateFields(this.props.name, this.props.state)}
        error={this.props.error}
        helperText = {this.props.errorMessage}
        type = {this.props.type}
        inputProps = {{ min: this.props.min , max: this.props.max }}
      />
      {/* <span className="error-msg">
        {this.props.errorMessage}
      </span> */}
    </div>
    );
  }
}


// labelFontSize={12}
// fontSize={16}
// tintColor={TMColors.theme}
// baseColor={TMColors.text}
// textColor={TMColors.text}
// autoCapitalize={this.props.autoCapitalize}
// keyboardType={this.props.keyboardType}
// errorColor={TMColors.error}
// style={this.props.style || styles.textFieldStyle}
// secureTextEntry={this.props.secureTextEntry}
// labelTextStyle={{ fontFamily: TMFonts.medium, color: TMColors.text }}
// titleTextStyle={{ fontFamily: TMFonts.medium, color: TMColors.text }}
// error={this.props.error}
// onChangeText={text => this.callTextChangeHandler(text)}
// renderAccessory={this.props.renderAccessory}
// characterRestriction={this.props.characterRestriction}
// keyboardType={this.fieldKeyboardType()}
// contextMenuHidden={true}
// autoCapitalize={this.shouldAutoCapitalise()}
// editable={this.props.editable}
// onFocus={this.props.onFocus}
// value={this.props.value}
// onBlur={this.props.onBlur}
// maxLength = {this.props.maxLength}