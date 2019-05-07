import React from 'react';
import Header from '../../../components'
import '../how_it_works/how_it_work.css'
import '../how_it_works/responsive.css'
import {library,FontAwesomeIcon,faFacebookF,faTwitter,faLinkedinIn} from "../../../utilities"
library.add(faFacebookF,faTwitter,faLinkedinIn)


export default class How_it_work extends React.Component{
     
      render(){
          return(
            <div className="how_it-works-page">
              <div className="hero-section banner-section how_it_work_banner">
                  <div className="container">
                    <div className="banner-content">
                        <h1  data-aos="fade-up" data-aos-duration="1000">How it Works</h1>
                        <p data-aos="fade-up" data-aos-duration="1000">To see how  offerlane property works Watch the video</p>
                        <button class="clearfix btn btn-lg btn-primary" data-aos="fade-up" data-aos-duration="1000"  data-aos-offset="5"><span>Watch Video</span></button>
                    </div>
                  </div>
                </div>
                <div className="offerlane_work_section section">
                  <div className="container">
                    <div class="section-header text-center" data-aos="fade-up" data-aos-duration="1000">
                            <h3 class="section-title"><span>How Offerlane Works</span></h3>
                            <p class="lead mx-xl-auto w-75" data-aos="fade-up" data-aos-duration="1000">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem Ipsum is simply dummy text of has been the industry's.</p>
                    </div>
                    <div className="offerlane_work_process">
                       <div className="process_steps_wrapper" data-aos="fade-up" data-aos-duration="1000">
                        <div className="process_info_content-section">
                          <span class="process-num">01</span>
                          <h2>Submit Property <span>Information</span></h2>
                          <p>Lorem ipsum dolor sit amet, 
                             consectetur adipiscing elit, sed do 
                             eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum </p>
                        </div>
                        <div className="process_info_image-section">
                         <img src={require('../../../assets/img/offerlane-work-process-image1.png')} alt="" />
                        </div>
                        <div className="process-step-section">
                        <div class="line-separator">
                         <div class="triangle"> </div>
                          <div class="side-line"> </div>
                        </div>
                        </div>
                       </div>
                       <div className="process_steps_wrapper reverse_section" data-aos="fade-up" data-aos-duration="1000">
                        <div className="process_info_image-section">
                         <img src={require('../../../assets/img/offerlane-work-process-image2.png')} alt="" />
                        </div>
                        <div className="process_info_content-section">
                          <span class="process-num">02</span>
                          <h2>Heading goes <span>Here</span></h2>
                          <p>Lorem ipsum dolor sit amet, 
                             consectetur adipiscing elit, sed do 
                             eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum </p>
                        </div>
                        <div className="process-step-section">
                        <div class="line-separator">
                         <div class="triangle"> </div>
                          <div class="side-line"> </div>
                        </div>
                        <div className="process-title">
                        <span className="img-icon"><img src={require('../../../assets/img/info-icon.png')} alt="" /></span><span>Information sent</span>
                        </div>
                        </div>
                       </div>
                       <div className="process_steps_wrapper" data-aos="fade-up" data-aos-duration="1000">
                        <div className="process_info_content-section">
                          <span class="process-num">03</span>
                          <h2>Multiple <span> Buyers</span></h2>
                          <p>Lorem ipsum dolor sit amet, 
                             consectetur adipiscing elit, sed do 
                             eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum </p>
                        </div>
                        <div className="process_info_image-section">
                         <img src={require('../../../assets/img/offerlane-work-process-image3.png')} alt="" />
                        </div>
                        <div className="process-step-section multi-offer">
                        <div className="process-title">
                        <span className="img-icon"><img src={require('../../../assets/img/multi-offer-icon.png')} alt="" /></span><span>Multiple Offers</span>
                        </div>
                        <div class="line-separator">
                         <div class="triangle"> </div>
                          <div class="side-line"> </div>
                        </div>
                        </div>
                       </div>
                       <div className="process_steps_wrapper reverse_section" data-aos="fade-up" data-aos-duration="1000">
                        <div className="process_info_image-section">
                         <img src={require('../../../assets/img/offerlane-work-process-image4.png')} alt="" />
                        </div>
                        <div className="process_info_content-section">
                          <span class="process-num">04</span>
                          <h2>REview <span>Offer</span></h2>
                          <p>Lorem ipsum dolor sit amet, 
                             consectetur adipiscing elit, sed do 
                             eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum </p>
                        </div>
                        <div className="process-step-section review-offer">
                        <div class="line-separator">
                         <div class="triangle"> </div>
                          <div class="side-line"> </div>
                        </div>
                        <div className="process-title">
                        <span>Contract</span>
                        </div>
                        </div>
                       </div>
                       <div className="process_steps_wrapper" data-aos="fade-up" data-aos-duration="1000">
                        <div className="process_info_content-section">
                          <span class="process-num">05</span>
                          <h2>24 hour <span>CLosing</span></h2>
                          <p>Lorem ipsum dolor sit amet, 
                             consectetur adipiscing elit, sed do 
                             eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum </p>
                        </div>
                        <div className="process_info_image-section">
                         <img src={require('../../../assets/img/offerlane-work-process-image5.png')} alt="" />
                        </div>
                       </div>
                    </div>
                  </div>
                </div>
            </div>
          );
      }
}