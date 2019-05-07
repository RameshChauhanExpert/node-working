import React from "react";
import '../forgot_password/forgot_password.css'
import { TextField, connect, withRouter } from "../../../../utilities"
import { buyer_forgot_password_mail } from "../../../../action"
import { Loader } from "../../..";
import CommanSnackBar from "../../../SnackBar/comman_snackbar";
import logo from "../../../../assets/img/logo.png"


class BuyerForgotPassword extends React.Component {


    constructor(props) {
        super(props)
        this.state = { email: "" }
    }
    handleChang = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    onClick = () => {
        this.props.send_mail(this.state)
    }

    render() {

        var { loader, snackbar } = this.props.state.utilities
        return (<div>
            <div className="row for_register_login">
                <div className="col-sm-6 figure-part">
                    <img src={require('../../../../assets/img/login-figure.jpg')} alt="" />
                </div>
                <div className="col-sm-6 form-part forgot-form">
                    <div className="card-wrapper">

                        <div className="logo">
                            <a href="/"> <img src={logo} alt="" /></a>
                        </div>

                        <div className="tagline">Forgot Password</div>
              <p>Please enter your email address below and we will send you information to change your password.</p>
                        <div className="forgot_password_wrapper">
                            <div className="all_filed_password">
                                <div className="forgot_text_field">
                                    <form className="form__wrapper">
                                        <TextField label="Enter your email address" name="email" onChange={this.handleChang} />
                                        <button type="button" className="btn-large btn-primary" onClick={this.onClick}>Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    state
})
const actionCall = dispatch => ({
    send_mail: (state) => { dispatch(buyer_forgot_password_mail(state)) }
})
export default withRouter(connect(mapStateToProps, actionCall)(BuyerForgotPassword))