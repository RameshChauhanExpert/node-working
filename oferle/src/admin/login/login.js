import React from "react";
import '../login/login.css'
import {connect,TextField,Card,CardActionArea,Button,Typography,CardActions,CardContent,CardMedia,Link} from "../../utilities"
import {TextBox, Loader, CommanSnackBar} from "../../components";
import logo from '../../assets/img/logo.png';
import {admin_login_state,login_admin} from "../../action/admin/login/login";
import { constant } from "../../config";

class Login extends React.Component{

    constructor(props){
        super(props)

        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this)
        
        this.state={email:"",password:"",snackbar:{show:false,message:""}}
        

    }

    handleChange(event)
    {
        this.setState({[event.target.name]:event.target.value})
    }
    handleSubmit()
    {
      this.props.login(this.state)

    }
    
      
    

    render(){
        
           var {email,password,status} = this.props.state.admin_login
           var{loader,snackbar} =this.props.state.utilities
       
            if(status==200)
            {
                window.location.href=constant.frontend_url.admin_dashboard
                
            }
        return(
        <div class="login_wrapper">
           

            <Card className="login_card">
  
       
        <CardContent className="login_card_content">
          <div className="logo">
               <img src={logo} alt="" />
          </div>
        <TextField
          id="outlined-email-input"
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          margin="normal" 
          color="primary"
          variant="outlined" className="input-conrtol"
          value={email}
          onChange={this.props.state_update}
        />
        <br/>
           <TextField
          id="outlined-email-input"
          label="Password"
          value={password}
          onChange={this.props.state_update}
          type="password"
          name="password"
          autoComplete="email" color="primary"
          margin="normal" className="input-conrtol"
          variant="outlined"
        />

  <br/>
      <div className="label-link"><a href="#">Forgot Password?</a></div>    
     {/* <a href="/admin/dashboard"  className="button-primary">
        Login   
      </a>        */}
      <Button className="button-primary" onClick={this.props.login}> login</Button>
        </CardContent>
     
    </Card>
    {(loader==true)? <Loader/>:""}
    <CommanSnackBar state={snackbar}/>
         </div>

        );
    }
}
const mapStateToProps = state => ({
	state
})
const actionCall = dispatch => ({
    login:(state)=>{dispatch(login_admin(state))},
    state_update:(event)=>{dispatch(admin_login_state(event))}
})

export default connect(mapStateToProps,actionCall)(Login)
 