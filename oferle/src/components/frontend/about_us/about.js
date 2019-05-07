import React from 'react';
import {Header} from "../../../components"
import '../about_us/about.css'
import '../about_us/responsive.css'
import {library,FontAwesomeIcon,faFacebookF,faTwitter,faLinkedinIn} from "../../../utilities"
library.add(faFacebookF,faTwitter,faLinkedinIn)

export default class About extends React.Component {

        render(){
          document.body.scrollTop = 200;
            return(
                <div class="aboutus-page">
                <div className="hero-section aboutus-banner">
                  <div className="container">
                    <div className="banner-content">
                        <h1  data-aos="fade-up" data-aos-duration="1000">About Us</h1>
                    </div>
                  </div>
                </div>
                <div className="about-offerlane-property-section section">
                  <div className="container">
                     <div className="row justify-content-start ">
                       <div className="content-block col-sm-6">
                          <div className="section-header" data-aos="fade-up" data-aos-duration="1000">
                            <h3 className="section-title"><span>About <br/>Offerlane Properties</span></h3>
                          </div>
                          <div className="description" data-aos="fade-up" data-aos-duration="1000">
                           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas 
cumsan lacus vel facilisis <br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                          </div>
                       </div>
                       <div className="images-block col-sm-6" data-aos="fade-up" data-aos-duration="1000">
                         <div className="image-figure">
                         <img src={require('../../../assets/img/aboutus-detail-left-img.png')} alt="" />
                         </div>
                       </div>
                  </div>
                </div>
                </div>
                <div className="our-value-section section">
                  <div className="container">
                    <div class="section-header text-center" data-aos="fade-up" data-aos-duration="1000">
                        <h3 class="section-title"><span>Our Values</span></h3>
                        <p class="lead mx-xl-auto w-75" data-aos="fade-up" data-aos-duration="1000">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="our-value-service-section">
                    <div className="row">
                    <div className="col-sm-4 services-wrapper" data-aos="fade-up" data-aos-duration="1000">
                        <div className="inner-content">
                            <span className="icon-section multiper-offer"></span>
                            <span className="content-section">
                             <h4>Multiple Offers</h4>
                             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. </p>
                            </span>
                        </div>
                    </div>
                    <div className="col-sm-4 services-wrapper" data-aos="fade-up" data-aos-duration="1000">
                        <div className="inner-content">
                            <span className="icon-section closing-hours"></span>
                            <span className="content-section">
                             <h4>24 Hours Closing</h4>
                             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. </p>
                            </span>
                        </div>
                    </div>
                    <div className="col-sm-4 services-wrapper" data-aos="fade-up" data-aos-duration="1000">
                        <div className="inner-content">
                            <span className="icon-section all-in-one"></span>
                            <span className="content-section">
                             <h4>All-in one(Consolidated)</h4>
                             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. </p>
                            </span>
                        </div>
                    </div>
                    </div>
                    </div>
                  </div>
                </div>
                <div className="lets-buy-section section">
                  <div className="container">
                  <div className="row justify-content-end ">
                       <div className="images-block col-sm-6" data-aos="fade-up" data-aos-duration="1000">
                         <div className="image-figure">
                         <img src={require('../../../assets/img/aboutus-detail-right-img.png')} alt="" />
                         </div>
                       </div>
                       <div className="content-block col-sm-6">
                          <div className="section-header" data-aos="fade-up" data-aos-duration="1000">
                            <h3 className="section-title"><span>Lets Buy Something Great Together</span></h3>
                          </div>
                          <div className="description" data-aos="fade-up" data-aos-duration="1000">
                           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
                          </div>
                       </div>
                  </div>
                  </div>
                </div>
                <div className="our-team-section section">
                  <div className="container">
                   <div class="section-header text-center" data-aos="fade-up" data-aos-duration="1000">
                        <h3 class="section-title"><span>Our Team</span></h3>
                        <p class="lead mx-xl-auto w-75" data-aos="fade-up" data-aos-duration="1000">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>
                 </div>
                 <div className="team-detail-section">
                     <div className="row">
                       <div className="col-sm-4" data-aos="fade-up" data-aos-duration="1000">
                         <div className="inner-section">
                           <div className="image-block" >
                             <img src={require('../../../assets/img/our-team-image1.png')}  alt="" />
                              <a className="view-btn" href="#">View</a>
                              <ul className="social-icons">
                              <li data-aos="fade-up" data-aos-duration="400" data-aos-easing="linear"><a href="#"><FontAwesomeIcon icon={['fab', 'facebook-f']} /></a></li>
                               <li data-aos="fade-up" data-aos-duration="400" data-aos-easing="linear"><a href="#"><FontAwesomeIcon icon={['fab', 'twitter']} /></a></li>
                               <li data-aos="fade-up" data-aos-duration="400" data-aos-easing="linear"><a href="#"><FontAwesomeIcon icon={['fab', 'linkedin-in']} /></a></li>
                              </ul>
                             </div>
                           <div className="content-block">
                              <h4>Stefan Hook</h4>
                              <span>General Manager</span>
                           </div>
                          </div>
                       </div>
                       <div className="col-sm-4" data-aos="fade-up" data-aos-duration="1000">
                         <div className="inner-section">
                           <div className="image-block">
                             <img src={require('../../../assets/img/our-team-image2.png')}  alt="" />
                              <a className="view-btn" href="#">View</a>
                              <ul className="social-icons">
                              <li data-aos="fade-up" data-aos-duration="400" data-aos-easing="linear"><a href="#"><FontAwesomeIcon icon={['fab', 'facebook-f']} /></a></li>
                               <li data-aos="fade-up" data-aos-duration="400" data-aos-easing="linear"><a href="#"><FontAwesomeIcon icon={['fab', 'twitter']} /></a></li>
                               <li data-aos="fade-up" data-aos-duration="400" data-aos-easing="linear"><a href="#"><FontAwesomeIcon icon={['fab', 'linkedin-in']} /></a></li>
                              </ul>
                             </div>
                           <div className="content-block">
                              <h4>Caroline Parker</h4>
                              <span>Broker</span>
                           </div>
                          </div>
                       </div>
                       <div className="col-sm-4" data-aos="fade-up" data-aos-duration="1000">
                         <div className="inner-section">
                           <div className="image-block">
                             <img src={require('../../../assets/img/our-team-image3.png')}  alt="" />
                              <a className="view-btn" href="#">View</a>
                              <ul className="social-icons">
                               <li data-aos="fade-up" data-aos-duration="400" data-aos-easing="linear"><a href="#"><FontAwesomeIcon icon={['fab', 'facebook-f']} /></a></li>
                               <li data-aos="fade-up" data-aos-duration="400" data-aos-easing="linear"><a href="#"><FontAwesomeIcon icon={['fab', 'twitter']} /></a></li>
                               <li data-aos="fade-up" data-aos-duration="400" data-aos-easing="linear"><a href="#"><FontAwesomeIcon icon={['fab', 'linkedin-in']} /></a></li>
                              </ul>
                             </div>
                           <div className="content-block">
                              <h4>John Deo</h4>
                              <span>Founder</span>
                           </div>
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