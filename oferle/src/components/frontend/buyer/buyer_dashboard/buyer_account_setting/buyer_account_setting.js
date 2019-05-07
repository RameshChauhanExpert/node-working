import React from 'react';
import { TextField, Button, Checkbox, Link, connect, withRouter, Route } from "../../../../../utilities"
import { TextBox, Loader } from "../../../../index"
import logo from "../../../../../assets/img/logo.png"
import { signup, buyer_edit_profile_data, buyer_changePassword } from "../../../../../action/"
import { constant } from '../../../../../config';
import comman_snackbar from '../../../../SnackBar/comman_snackbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';



function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});
class BuyerAccountSetting extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone: "",
      isValidate: this.isValidate,
      validate: false,
      user_image: "",

      profile_picture: "",
      current_password: "",
      new_password: "",
      conifrm_new_password: "",
      password_err: "",

      value: 0,
      passwordValidate: this.passwordValidate
    }
    this.handleChange = this.handleChange.bind(this)
    this.imageAction = this.imageAction.bind(this)
    this.totalElement = 4;
    this.elementIndex = 0;
    this.isValidateAll = 0;

  }

  handleChangeTab = (event, value) => {
    this.setState({ value });
  };

  imageAction(event) {
    var blobArray = Array.from(event.target.files)

    this.setState({ user_image: URL.createObjectURL(blobArray[0]), profile_picture: blobArray })

  }
  handleSubmit = (event) => {
    this.totalElement = 4
    this.elementIndex = 0;
    this.isValidateAll = 0
    event.preventDefault();
    this.setState({ validate: true, finalCheckAll: "true", })
  }

  passwordSubmit = (event) => {
    event.preventDefault();
    if (this.state.new_password == this.state.conifrm_new_password || this.state.new_password == "" || this.state.current_password == "" && this.state.conifrm_new_password) {
      this.setState({ password_err: "" })
      this.totalElement = 3;
      this.elementIndex = 0;
      this.isValidateAll = 0

      this.setState({ validate: true, finalCheckAll: "true", })
    } else {



    }

  }



  isValidate = (isValidate, validate) => {

    if (isValidate == true) {
      this.elementIndex++;
    }


    this.setState({ validate: validate }, () => {
      if (this.elementIndex == this.totalElement) {
        this.isValidateAll++

        if (this.isValidateAll == this.totalElement) {
          if (this.state.value == 0) {
            this.props.submit(this.state)
          } else {
            this.props.buyer_changePassword(this.state)
          }

        }
      }
    })

  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentDidMount() {
    if (this.props.location.state.data) {
      this.setState(this.props.location.state.data)
    } else {
      this.props.history.push(constant.frontend_url.buyer_propert_list)
    }

  }

  render() {

    const { classes } = this.props;
    const { value } = this.state;

    if (this.props.state.edit_profile.status == 200) {
      //  this.props.history.push(constant.frontend_url.seller_property_list)
    }

    return (
      <div className="col-main col-sm-9 for_safari">


        <div >
          <div className="tabs-main-wrapper account-settings">
            <AppBar position="static">
              <Tabs TabIndicatorProps={{
                style: {
                  backgroundColor: "#00d6c3"
                }
              }} value={value} onChange={this.handleChangeTab}>
                <Tab label="Edit Profile" className="tabs" />
                <Tab label="Change Password" className="tabs" />
              </Tabs>
            </AppBar>
            {value === 0 && <TabContainer>
              <div className="for_register_login">
                <div className="account-setting-wrapper card-block">
                  <form action="#" onSubmit={this.handleSubmit} className="form__wrapper ">
                    <div className="edit-picture-wrapper">
                      <span className="profile-picture">
                        <img src={(this.state.user_image != null && this.state.user_image != undefined && this.state.user_image != "") ?

                          (this.state.user_image.search("blob:") < 0) ?
                            constant.file_url + this.state.user_image :
                            this.state.user_image
                          : require('../../../../../assets/img/profile-pic.jpg')} alt="" /></span>
                      <div className="edit-icon">
                        <label for="edit-label"><img src={require('../../../../../assets/img/camera-icon.png')} alt="" /></label>
                        <input accept="image/x-png,image/jpeg" type="file" id="edit-label" onChange={this.imageAction} className="edit-input" />
                      </div>
                    </div>
                    <div className="clearfix"></div>

                    <div className="form-fields">

                      <div className="form-field register_signup">

                        <TextBox label="First Name"
                          type="text"
                          value={this.state.first_name}
                          name="first_name"
                          onBlur={false}
                          state={this.state}
                          change={this.handleChange}
                          validate={this.state.validate}
                          className="input-conrtol"
                          margin="normal"
                          required={[true, "Please enter first name"]}
                          max={[true, 15, ""]}

                        />
                      </div>
                      <div className="form-field register_signup">
                        <TextBox label="Last Name"
                          type="text"
                          value={this.state.last_name}
                          name="last_name"
                          onBlur={false}
                          state={this.state}
                          change={this.handleChange}
                          validate={this.state.validate}
                          className="input-conrtol"
                          margin="normal"
                          required={[true, "Please enter last name"]}
                          max={[true, 15, ""]}
                        />
                      </div>
                    </div>
                    <div className="form-fields">
                      <div className="form-field register_signup">
                        <TextBox label="Email"
                          type="text"
                          value={this.state.email}
                          name="email"
                          onBlur={true}
                          state={this.state}
                          change={this.handleChange}
                          validate={this.state.validate}
                          className="input-conrtol"
                          margin="normal"
                          required={[true, "Please enter email"]}
                          max={[true, 70, ""]}
                          email={[true, "Sorry you entered invalid email"]}
                        />
                      </div>
                      <div className="form-field register_signup">
                        <TextBox label="Phone"
                          type="text"
                          value={this.state.phone}
                          name="phone"
                          onBlur={false}
                          state={this.state}
                          change={this.handleChange}
                          validate={this.state.validate}
                          className="input-conrtol"
                          margin="normal"
                          required={[true, "Please enter phone number"]}
                          max={[true, 10, ""]}
                          min_value={[true, 0, "Please enter valid phone number"]}
                          only_number={[true, "Phone number support only number"]}

                        />
                      </div>
                    </div>

                    <button type="submit" className="btn-large btn-primary">Save</button>
                  </form>
                </div>
              </div>
            </TabContainer>}
            {value === 1 && <TabContainer>

              <div className="for_register_login">
                <div className="account-setting-wrapper card-block">
                  <form action="#" onSubmit={this.passwordSubmit} className="form__wrapper ">
                    <div className="form-group">
                      <div className="form-field register_signup">
                        <TextBox label="Current password"
                          type="password"
                          value={this.state.current_password}
                          name="current_password"
                          onBlur={true}
                          state={this.state}
                          change={this.handleChange}
                          validate={this.state.validate}
                          className="input-conrtol"
                          margin="normal"
                          required={[true, "Please enter current password"]}
                          max={[true, 15, ""]}
                          password={[true, "A minimum 8 characters password contains a combination of 1 uppercase and 1 number."]}
                        />
                      </div>
                    </div>
                    <div className="form-group form-fields">
                      <div className="form-field register_signup">
                        <TextBox label="New password"
                          type="password"
                          value={this.state.new_password}
                          name="new_password"
                          onBlur={true}
                          state={this.state}
                          change={this.handleChange}
                          validate={this.state.validate}
                          className="input-conrtol"
                          margin="normal"
                          required={[true, "Please enter password"]}
                          max={[true, 15, ""]}
                          password={[true, "A minimum 8 characters password contains a combination of 1 uppercase and 1 number."]}

                        />
                      </div>
                      <div className="form-field register_signup">
                        <TextBox label="Confirm new password"
                          type="password"
                          value={this.state.conifrm_new_password}
                          name="conifrm_new_password"
                          onBlur={true}
                          state={this.state}
                          change={this.handleChange}
                          validate={this.state.validate}
                          className="input-conrtol"
                          margin="normal"
                          required={[true, "Please enter password"]}
                          max={[true, 15, ""]}
                          password={[true, "A minimum 8 characters password contains a combination of 1 uppercase and 1 number."]}
                          password_macth={[true, "Those password didn't match.Try again."]}
                        />

                      </div>
                    </div>


                    <button type="submit" className="btn-large btn-primary">Save</button>
                  </form>
                </div>
              </div>
            </TabContainer>}
          </div>

        </div>



        {(this.props.state.utilities.loader == true) ? <Loader /> : ""}
        <comman_snackbar state={this.props.state.utilities.snackbar} />
      </div>
    )

  }

}

const mapStateToProps = state => ({
  state
})
const actionCall = dispatch => ({
  submit: (state) => { dispatch(buyer_edit_profile_data(state)) },
  buyer_changePassword: (state) => { dispatch(buyer_changePassword(state)) }
})
export default withRouter(connect(mapStateToProps, actionCall)(BuyerAccountSetting))