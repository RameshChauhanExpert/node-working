import React from 'react';
import '../contact_us/contact.css'
import {library,FontAwesomeIcon,faFacebookF,faTwitter,faLinkedinIn,connect} from "../../../utilities"
import $ from "jquery";
import {validation} from "./contact_us_validation"
import{send_contact_details} from "../../../action/"
library.add(faFacebookF,faTwitter,faLinkedinIn)


class Contact extends React.Component {

    componentDidMount()
    {
         validation()
    }
    onSubmit=(event)=>{
        let formData = new FormData(document.getElementById("contact-us"));
       
        if(event!=undefined){event.preventDefault()}
        
        let form = $( "#contact-us" );
              form.validate();
              if(form.valid()==true)
              {
                this.props.send(formData)
                $("#contact-us")[0].reset();
              }
       }
    render() {
        return (

            <div className="contact-page">
                <div className="top-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 contact-info">
                                <div className="section-header" data-aos="fade-up" data-aos-duration="1000">
                                    <h3 className="section-title">
                                        <span>Get in touch</span>
                                    </h3>
                                </div>
                                <div className="contact-details" data-aos="fade-up" data-aos-duration="1000">
                                    <h4>Address</h4>
                                    <p>Lorem ipsum dolor sit amet, consecte
tur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  </p>
                                    <div className="spacer clearfix"></div>
                                    <h4>Email</h4>
                                    <p><a href="mailto:johndoe@gmail.com">johndoe@gmail.com</a></p>
                                    <div className="spacer clearfix"></div>
                                    <h4>Phone  Number</h4>
                                    <p><a href="tel:1263784999">1263784999</a></p>
                                </div>
                            </div>
                            <div className="col-sm-6 contact-form">
                                <div className="form-wrapper">
                                    <h3 data-aos="fade-in">Say  Something</h3>
                                <form onSubmit={this.onSubmit} id="contact-us">
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="name" maxlength="15" placeholder="Your Name" />
                                    </div>
                                    <div className="form-group">
                                        <input type="email" maxlength="255" name="email_address" className="form-control" placeholder="Email Address" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" maxlength="10" name="phone_number" pattern="[0-9]{10}" className="form-control" placeholder="Phone number" />
                                    </div>
                                    <div className="form-group">
                                        <textarea placeholder="Your message" name="message" maxlength="255" className="form-control textarea">

                                        </textarea>
                                    </div>
                                    <div className="form-group text-center" data-aos="fade-up" data-aos-duration="1000">
                                        <button type="submit" className="submit-button">Submit</button>
                                    </div>

                                </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="social-media-wrapper">
                    <div className="container">
                        <h6>Social Media</h6>
                        <ul className="social-icon">
                            <li data-aos="fade-up" data-aos-duration="400" data-aos-easing="linear">
                                <a href="#">
                            <FontAwesomeIcon icon={['fab', 'facebook-f']} /></a>
                            
                            </li>
                            <li data-aos="fade-up" data-aos-duration="800" data-aos-easing="linear">
                            <a href="#">  
                            <FontAwesomeIcon icon={['fab', 'twitter']} /></a>
                            </li>
                            <li data-aos="fade-up" data-aos-duration="1200" data-aos-easing="linear">
                            <a href="#">
                            <FontAwesomeIcon icon={['fab', 'linkedin-in']} /></a>
                                
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="map-wrapper">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26361049.303227354!2d-113.75088133262027!3d36.2418860236224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited+States!5e0!3m2!1sen!2sin!4v1544427583831" width="100%" height="450" frameborder="0" style={{border:0}}></iframe>
                </div>
            </div>

        )
    }

}

const mapStateToProps = state => ({
	state
})
const actionCall = dispatch => ({
    send:(formData)=>{dispatch(send_contact_details(formData))},
    
    
})
export default  connect (mapStateToProps,actionCall)(Contact)


