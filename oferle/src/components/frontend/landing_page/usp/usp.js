import React from 'react';

export default class Usps extends React.Component {
    render() {
        return (
            <div className="usp-section section">               
            <div className="container">
            <div className="section-header text-center" data-aos="fade-up" data-aos-duration="1000">
                <h3 className="section-title">
                        <span>Why Sell to Offerlane</span>
                </h3>
                <p className="lead mx-xl-auto w-75" data-aos="fade-up" data-aos-duration="1000">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>

            </div>

                <div className="usp-grid mt-md-5">
                    <div className="row">
                        <div className="grid-item col-sm-4" data-aos="fade-up" data-aos="fade-up" data-aos-duration="1000">
                            <div className="inner-content text-center">
                                <span className="icon multiple-offers"></span>
                                <h4>Multiple Offers</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>                               
                            </div>
                        </div>
                        <div className="grid-item col-sm-4" data-aos="fade-down" data-aos="fade-up" data-aos-duration="1000">
                            <div className="inner-content text-center">
                                <span className="icon closing-24h"></span>
                                <h4>24 Hours Closing</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>                               
                            </div>
                        </div>
                        <div className="grid-item col-sm-4" data-aos="fade-up" data-aos="fade-up" data-aos-duration="1000">
                            <div className="inner-content text-center">
                                <span className="icon consolidated"></span>
                                <h4>All in one(consolidated)</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>                               
                            </div>
                        </div>
                        
                    </div>
                </div>

            </div>
          </div>

        )

    }
}