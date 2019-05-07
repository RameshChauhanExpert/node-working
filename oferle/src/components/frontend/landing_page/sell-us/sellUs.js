import React from 'react';

export default class SellUs extends React.Component {
    render() {
        return (
            <div className="sellUs-section section">
            <div className="container">
                <div className="row justify-content-start ">
                <div className="content-block col-sm-6">
                    <div className="section-header">
                        <h3 className="section-title" data-aos="fade-up" data-aos-duration="1000">
                                <span>Sell Us</span>
                        </h3>              
                    </div> 
                    <div className="description" data-aos="fade-up" data-aos-duration="1000">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>
                    </div>
                    <a href="/seller-wizard" className="clearfix mt-4 btn btn-lg btn-primary" data-aos="fade-up" data-aos-duration="1000"><span>Read More</span></a>
                    </div>
                    <div className="images-block col-sm-6" data-aos="fade-left" data-aos-duration="1000" data-aos-offset="200">
                        <div className="image-figure">   
                        <img src={require('../../../../assets/img/sell-us-img.jpg')} alt="" />                           
                        </div>
                       
                    </div>
                  
                </div>

            </div>
        </div>

        )

    }
}