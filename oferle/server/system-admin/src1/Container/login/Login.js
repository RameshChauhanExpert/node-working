import React from 'react';

import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = { Email: "", EmailPassword: "" }
		this.login = this.login.bind(this);
		this.handleState = this.handleState.bind(this);
		var l=localStorage!==null?localStorage:0;
if(0) { alert("Your Browser is not support local storage.Please active local storage and try again ")}
	}

	handleState(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	login(event) {
		event.preventDefault();
		fetch("/UserManagement/login", {
			method: 'post',
			mode: 'cors',
			headers: {
				"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			body: 'Data=' + JSON.stringify(this.state)
		})
		.then(res => res.json())
		.then(users => localStorage.setItem("authId",JSON.stringify(users.response[0])) )
		.then(()=>{
			
			//setTimeout(()=>{
				if("" == localStorage.getItem("authId") || "undefined" == localStorage.getItem("authId") || null == localStorage.getItem("authId")){
					localStorage.clear();
					{NotificationManager.error("Error Message","User Name or Password Wrong!")}
				}else{
					//alert(localStorage.getItem("authId"));
					window.location.reload();
				}
			//},100);
		})
		.catch((error)=> {
			//alert("Fail");
			{NotificationManager.error("Error Message","User Name or Password Wrong!")}
			//console.log('Request failed', error);
		});
	}

	render() {
		return (
			<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
					<img src="http://192.168.1.116/system-admin/public/assets/react/images/page-logo.png" alt="img"/>
				</div>
				<form role="form" onSubmit={this.login} class="login-form">
					<span class="login100-form-title">
						User Login
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input type="text" className="form-control input100" id="usrname" name="Email" onChange={this.handleState} value={this.state.Email} placeholder="Enter email" />
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div class="wrap-input100 validate-input " data-validate = "Password is required">
						<input type="password" className="form-control input100" id="psw" name="EmailPassword" value={this.state.EmailPassword} onChange={this.handleState} placeholder="Enter password" />
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div class="container-login100-form-btn">
						<button class="login100-form-btn">
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
		<NotificationContainer/>
	</div>
		);
	}
}