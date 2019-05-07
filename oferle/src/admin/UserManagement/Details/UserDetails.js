import React from "react";
import {
  TextField,
  Typography,
  MenuItem,
  Button,
  Select,
  InputLabel,
  Snackbar
} from "../../../utilities";
//import { constant } from "../../../config";
import { constant } from "../../../config/constant";
import { Loader, FadeSnackbar } from "../../../components";
import SimpleModalWrapped from "./../UserProfile";
import { connect } from "../../../utilities/";
import { admin_seller_detail } from "../../../action";
import Validations from "../../../config/Validations";

class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    //this.handleChange = this.handleChange.bind(this);
    this.Validations = new Validations();
  }

  state = {
    data: "",
    modal: true,
    loader: true,
    validationMessage: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      phone: ""
    },
    hasErrors: false,
    dropdown: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    created_at: "",
    status: "",
    updated_at: "",
    snackbar_show: false,
    snackbar_message: ""
  };
  /* select drop down code */
  handleChange = event => {
    //console.log(event.target.name,event.target.value);
    this.setState({ dropdown: event.target.value, status: event.target.value });
    // console.log(event.target.name,event.target.value);
  };
  /* end of select drop down */

  UserDetailUpdate = () => {
    let { first_name, last_name, email, password, phone, status } = this.state;
    console.log(first_name, last_name, email, password, phone, status);

    //alert('your profile updated');

    fetch(constant.base_url + constant.server_url.detail_update, {
      method: "POST", // user_id is logged user id for sending request.
      body:
        "Data=" +
        JSON.stringify({
          user_id: this.props.location.state.userdetails,
          first_name: first_name,
          last_name: last_name,
          company_name: "",
          email: email,
          password: password,
          confirm_password: password,
          phone: phone,
          years_experience: "",
          recent_properties: "",
          proof_of_funds: "",
          interested_counties: "",
          interested_properties: "",
          other_notes: "",
          user_type: "",
          status: this.state.status
        }),
      headers: {
        Accept: "application/json",
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(response => {
        if (response.status == 200) {
          console.log(response);
          this.setState({
            snackbar_show: true,
            snackbar_message: response.message
          });
          setTimeout(
            ()=>{this.setState({ snackbar_show: false, snackbar_message: "" })},
            4000
          );
        } else if (response.status == 401) {
            this.setState({
                snackbar_show: true,
                snackbar_message: response.message
              });
              setTimeout(()=>{
                this.setState({ snackbar_show: false, snackbar_message: "" })},
                4000
              );
        }
      });
  };

  state_update = e => {
    let name = e.target.name,
      value = e.target.value;
    this.setState({ [name]: value });
    this.setState({ data: { [e.target.name]: e.target.value } }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, fieldValue) {
    let errorMessage = this.state.validationMessage;
    let hasError = this.state.hasErrors;
    switch (fieldName) {
      case "email":
        errorMessage.email = this.Validations.validateEmail(fieldValue);
        if (errorMessage.email === "") {
          hasError = false;
        } else {
          hasError = true;
        }
        break;
      case "password":
        errorMessage.password = this.Validations.validatePassword(fieldValue);
        if (errorMessage.password === "") {
          hasError = false;
        } else {
          hasError = true;
        }
        break;
      case "first_name":
        errorMessage.first_name = this.Validations.validateFirstName(
          fieldValue
        );
        if (errorMessage.first_name === "") {
          hasError = false;
        } else {
          hasError = true;
        }
        break;
      case "last_name":
        errorMessage.last_name = this.Validations.validateFirstName(fieldValue);
        if (errorMessage.last_name === "") {
          hasError = false;
        } else {
          hasError = true;
        }
        break;
      case "phone":
        errorMessage.phone = this.Validations.validatePhone(fieldValue);
        if (errorMessage.phone === "") {
          hasError = false;
        } else {
          hasError = true;
        }
        break;
      case "company_name":
        errorMessage.company_name = this.Validations.validateCompanyName(
          fieldValue
        );
        break;
      case "interested_counties":
        if (this.state.interested_counties.length === 0) {
          errorMessage.interested_counties = "This field is required";
          hasError = true;
        } else {
          errorMessage.interested_counties = "";
          hasError = false;
        }
      case "interested_properties":
        if (this.state.interested_properties.length === 0) {
          errorMessage.interested_properties = "This field is required";
          hasError = true;
        } else {
          errorMessage.interested_properties = "";
          hasError = false;
        }
      default:
        break;
    }
    this.setState({ validationMessage: errorMessage, hasErrors: hasError });
  }

  componentDidMount() {
    let user_id = this.props.location.state.userdetails;
//console.log(this.props.location.state.userdetails);
    fetch(constant.base_url + constant.server_url.fetch_user_details, {
      method: "POST", // user_id is logged user id for sending request.
      body: "Data=" + JSON.stringify({ user_id: user_id }),
      headers: {
        Accept: "application/json",
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(response => {
        //console.log(response.data);
        let responsedata = response.data;

        console.log(responsedata);

        if (response.status == 200) {
          this.setState({
            data: responsedata,
            modal: false,
            loader: false,
            dropdown: responsedata.status
          });
          this.setState(responsedata); // setting single local state...
        } else if (response.status == 401) {
          this.setState({ modal: true, loader: true });
        }
      });
  }
  render() {
    return (
      <div className="page-detail-wrapper">
        <Typography className="title" variant="title">
          User Details{" "}
        </Typography>

        <SimpleModalWrapped status={this.state.modal} />
        {this.state.loader == true ? <Loader /> : ""}

        <form onSubmit={this.onSubmit} id="user_detail_updation_form">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-title">
                <Typography variant="title" gutterBottom>
                  First Name
                </Typography>
                <TextField
                  name="first_name"
                  type="text"
                  value={this.state.data.first_name}
                  onChange={this.state_update}
                  margin="normal"
                  color="primary"
                  variant="outlined"
                  className="input-conrtol"
                  error={
                    this.state.validationMessage.first_name
                      ? this.state.hasErrors
                      : null
                  }
                  helperText={this.state.validationMessage.first_name}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="page-title">
                <Typography variant="title" gutterBottom>
                  Last Name
                </Typography>
                <TextField
                  name="last_name"
                  type="text"
                  value={this.state.data.last_name}
                  onChange={this.state_update}
                  margin="normal"
                  color="primary"
                  variant="outlined"
                  className="input-conrtol"
                  error={
                    this.state.validationMessage.last_name
                      ? this.state.hasErrors
                      : null
                  }
                  helperText={this.state.validationMessage.last_name}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="page-title">
                <Typography variant="title" gutterBottom>
                  Email Address
                </Typography>
                <TextField
                  type="text"
                  value={this.state.data.email}
                  onChange={this.state_update}
                  name="email"
                  margin="normal"
                  color="primary"
                  variant="outlined"
                  className="input-conrtol"
                  error={
                    this.state.validationMessage.email
                      ? this.state.hasErrors
                      : null
                  }
                  helperText={this.state.validationMessage.email}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="page-title col-sm-12">
              <Typography variant="title" gutterBottom>
                Password
              </Typography>
              <TextField
                type="password"
                value={this.state.data.password}
                onChange={this.state_update}
                name="password"
                margin="normal"
                color="primary"
                variant="outlined"
                className="input-conrtol"
                error={
                  this.state.validationMessage.password
                    ? this.state.hasErrors
                    : null
                }
                helperText={this.state.validationMessage.password}
              />
            </div>
          </div>
          <div className="row">
            <div className="page-title col-sm-12">
              <Typography variant="title" gutterBottom>
                Phone
              </Typography>
              <TextField
                type="text"
                value={this.state.data.phone}
                onChange={this.state_update}
                name="phone"
                margin="normal"
                color="primary"
                variant="outlined"
                className="input-conrtol"
                error={
                  this.state.validationMessage.phone
                    ? this.state.hasErrors
                    : null
                }
                helperText={this.state.validationMessage.phone}
              />
            </div>
          </div>
          <div className="row">
            <div className="page-title col-sm-12">
              <Typography variant="title" gutterBottom>
                Created at:{" "}
              </Typography>
              {this.state.data.created_at}
            </div>
          </div>
          <div className="row">
            <div className="page-title col-sm-12">
              <Typography variant="title" gutterBottom>
                Status
              </Typography>

              <Select
                className="status_select"
                value={this.state.dropdown}
                inputProps={{
                  name: "status",
                  id: "demo-controlled-open-select"
                }}
                onChange={this.handleChange}
              >
                <MenuItem value="0">Deactive</MenuItem>
                <MenuItem value="1">Active</MenuItem>
              </Select>
            </div>
          </div>
          <div className="row">
            <div className="page-title col-sm-12">
              <Typography variant="title" gutterBottom>
                Updated At
              </Typography>
              {this.state.data.updated_at == null
                ? "Never"
                : this.state.data.updated_at}
            </div>
          </div>
          <div className="action-button">
            <button
              type="button"
              className=" btn btn-primary"
              onClick={this.UserDetailUpdate}
            >
              Save
            </button>
          </div>
        </form>
        <FadeSnackbar
          snackbar={{
            show: this.state.snackbar_show,
            message: this.state.snackbar_message
          }}
         
        />
      </div>
    );
  }
}

const Props = state => {
  return state;
};
const action = dispatch => ({
  seller_detail: user_id => {
    dispatch(admin_seller_detail(user_id));
  }
});

export default connect(
  Props,
  action
)(UserDetails);
