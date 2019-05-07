import React from 'react';
import ProperySearch from "./property_search/property_search"
import HomeSlider from "./hero-slider/sliderMain"
import Usps from "./usp/usp"
import HowItWorks from "./how-it-works/howItWorks"
import AboutSection from "./about-section/aboutSection"
import SellUs from "./sell-us/sellUs"



export default class LandingPage extends React.Component {
  render() {
    return (
      <div className="section-wrapper">
        <div className="hero-section">
          <div className="container-fluid">
            <ProperySearch />
            <HomeSlider />
          </div>
        </div>
        <Usps />
        <HowItWorks />
        <AboutSection />
        <SellUs/>
     
      </div>
    )
  }

}