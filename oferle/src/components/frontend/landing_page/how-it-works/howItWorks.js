import React from 'react';

export default class HowItWorks extends React.Component {
    render() {
        return (
            <div className="how-it-works-section section">               
            <div className="container-fluid">
            <div className="section-header text-center">
                <h3 className="section-title" data-aos="fade-up" data-aos-duration="1000">
                        <span>Built  to ease the process of viewing <br/>a property </span>
                </h3>              
            </div>
            <div className="process-steps mt-xl- 5 pt-md-5 text-center" data-aos="fade-up" data-aos-duration="1000">
                <img src={require('../../../../assets/img/how-it-works-process.png')} alt="" />
            </div>


            </div>
          </div>

        )

    }
}