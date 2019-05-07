import React from "react";
import { TextField, Typography, MenuItem, Button, Select,connect,withRouter } from "../../utilities"
import{account_setting_state_update,account_setting_submit,account_setting_fetch} from "../../action/account_setting/account_setting"
import {Loader,FadeSnackbar,CommanSnackBar} from "../../components";
import $ from "jquery";
import {validation} from "./account_setting_validation"
class AccountSetting extends React.Component {
    constructor() {
        super()
      
    }
   onSubmit=(event)=>{
     
    if(event!=undefined){event.preventDefault()}
    
    var form = $( "#admin_account_setting" );
          form.validate();
          if(form.valid()==true)
          {
            this.props.form_submit()
          }
   }

    componentDidMount()
    {
        this.props.fetch_state()
        validation()
    }

    render() {
        
      var {utilities,}=this.props.state
      var {page_title,site_title,admin_email_address,default_meta_title,default_meta_description}= this.props.state.account_setting
        return (
            <div className="page-edit-wrapper">
            
             <form onSubmit={this.onSubmit} id="admin_account_setting" >
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="page-title">
                                <Typography variant="title" gutterBottom>Site Title</Typography>
                                <TextField type="text" value={site_title} onChange={this.props.state_update}  name="site_title" margin="normal" color="primary" variant="outlined" className="input-conrtol" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="page-title">
                                <Typography variant="title" gutterBottom>Admin Email Address</Typography>
                                <TextField type="text" value={admin_email_address} onChange={this.props.state_update} name="admin_email_address" margin="normal" color="primary" variant="outlined" className="input-conrtol" />
                            </div>
                        </div>
                    </div>

                    <div className="page-title">
                        <Typography variant="title" gutterBottom>Default Meta Title</Typography>
                        <TextField type="text" value={default_meta_title} onChange={this.props.state_update} name="default_meta_title" margin="normal" color="primary" variant="outlined" className="input-conrtol" />
                    </div>
                    <div className="page-title">
                        <Typography variant="title" gutterBottom>Default Meta Description</Typography>
                        <TextField type="text" value={default_meta_description} onChange={this.props.state_update} name="default_meta_description" margin="normal" color="primary" variant="outlined" multiline rows="4" className="input-conrtol" />
                    </div>
                    <div className="action-button">
                        <button type="submit"  className="btn btn-primary">
                            Save
                </button>
                    </div>
                
{(utilities.loader==true)?<Loader/>:""}
<CommanSnackBar state={utilities.snackbar}  />
           </form>
          
            </div>

        )
    }
}



const mapStateToProps = state => ({
	state
})
const actionCall = dispatch => ({
    state_update:(event)=>{dispatch(account_setting_state_update(event))},
    form_submit:()=>{dispatch(account_setting_submit())},
    fetch_state:()=>{dispatch(account_setting_fetch())}
})
export default withRouter(connect(mapStateToProps,actionCall)(AccountSetting))
