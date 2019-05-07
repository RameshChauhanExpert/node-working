import React from 'react';
import './footer.css'
import {Link ,withRouter,connect} from "../../../utilities"
import { CommanSnackBar } from '../..';
 class Footer extends React.Component {
  render() {
    var{snackbar}=this.props.state.utilities
    console.log("Footer props",this.props)
    return (
      <div className="footer">
        <div className="container">
        <div className="row">
          <div className="footer-logo col-md-4">
          <a href="/">
              <img src={require('../../../assets/img/logo-white.png')} alt="" />
            </a>
          </div>
          <div className="links-right col-md-8">
            <ul>
           
              <li><a href="/about">About Us</a></li>
              <li><a href="/how-it-works">How it Works</a></li>
              <li><a href="/seller-wizard">Sell</a></li>
              <li><a href="#">Buy</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
          </div>
          <div className="footer-bottom clearfix">
            <div className="row">
              <div className="col-sm-6">
                <div className="copyright">
                Copyright &copy; 2019 Offerlane Allright Reserved
                </div>
              </div>
              <div className="col-sm-6">
              <div className="poweredby">
              Build by : <span className="ed-icon"> <img src={require('../../../assets/img/evince-icon.png')} alt="" /></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CommanSnackBar state={snackbar}/>
      </div>
    )

  }


}

const mapStateToProps = state => ({
	state
})

export default withRouter(connect(mapStateToProps)(Footer))