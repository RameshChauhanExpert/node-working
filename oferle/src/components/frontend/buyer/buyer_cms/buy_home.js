import React from 'react';
import { Link, Route, Router, Switch } from '../../../../utilities'
// import {Redirect, Link, Route, Router} from 'react-router-dom'
import { constant } from '../../../../config'
import BuyerSignup from '../buyer_sign_up/buyer_signup'
// import './contact.css'
export default class BuyHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                {/* <div>
                    <h1>
                        This is Buyer CMS
                    </h1>
                    <Link to={constant.frontend_url.buyer_sign_up}>Apply Now</Link>
                </div> */}
                <div className="cms-pages">
                    <div className="hero-section privacy-banner">
                        <div className="container">
                            <div className="banner-content">
                                <h1>Buyer CMS</h1>
                            </div>
                        </div>
                    </div>
                    <div className="content-wrapper">
                        <div className="container">
                            <div className="section-header text-center">
                                <h3 className="section-title"><span></span></h3>
                                
                                <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                            </div>

                            <div className="middle-content">
                                <h4> <span className="bullet-icon"><img src={require('../../../../assets/img/buller-icon.png')} />  </span> Protecting your personal data</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p><p> but also the leap into electronic typesetting, remaining essentially unchanged.
    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    
</p>

                                <h4> <span className="bullet-icon"><img src={require('../../../../assets/img/buller-icon.png')} />  </span> How we use the information we collect</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p><p> but also the leap into electronic typesetting, remaining essentially unchanged.
    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    
</p>
                            </div>
                            <div className="form-group text-center aos-init aos-animate" data-aos="fade-up" data-aos-duration="1000"><button type="submit" className="submit-button"><Link to={constant.frontend_url.buyer_sign_up}>Apply Now</Link></button></div>
                            {/* <button className='search-input-wrap'><Link to={constant.frontend_url.buyer_sign_up}>Apply Now</Link></button> */}
                        </div>
                    </div>
                </div>


            </div>

        )
    }
}

// function BuyerApplcationForm({ match }) {
//     return (
//         <div>
//             <h2>
//                 {match.params.id}
//                 hello
//             </h2>
//         </div>
//     )
// }