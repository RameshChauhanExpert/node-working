import React from 'react';

export default class AboutSection extends React.Component {
    render() {
        return (
            <div className="about-section section">
                <div className="container">
                    <div className="row justify-content-end ">

                        <div className="images-blocks col-sm-6">
                            <div className="image-01" data-aos="fade-up" data-aos-duration="1000">
                                <img src={require('../../../../assets/img/about-block-img-1.jpg')} alt="" />
                            </div>
                            <div className="image-02" data-aos="fade-up" data-aos-duration="1000">
                              <img src={require('../../../../assets/img/about-block-img-2.jpg')} alt="" />
                            </div>
                            <div className="image-03" data-aos="fade-up" data-aos-duration="1000">
                               <img src={require('../../../../assets/img/about-block-img-3.jpg')} alt="" />

                            </div>
                        </div>
                        <div className="content-block col-sm-6">
                        <div className="section-header">
                            <h3 className="section-title" data-aos="fade-up" data-aos-duration="1000">
                                    <span>Know more about<br/>Offerlane properties</span>
                            </h3>              
                        </div> 
                        <div className="description" data-aos="fade-up" data-aos-duration="1000">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>
                        </div>
                        <a href="/about" className="clearfix mt-4 btn btn-lg btn-primary" data-aos="fade-up" data-aos-duration="1000"><span>Read More</span></a>
                        </div>
                    </div>

                </div>
            </div>

        )

    }
}