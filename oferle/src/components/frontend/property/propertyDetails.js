import React from 'react';
import Typography from '@material-ui/core/Typography'
import './main.css'
import Slider from "react-slick";
import PropertySlider from './propertySlider';
import { floridaCounties, propertiesType } from '../../../config/floridaCounties';
import { TextField, Dialog } from "../../../utilities"
import { DialogTitle, DialogContent, DialogActions, Button, DialogContentText, InputAdornment } from '@material-ui/core';
import Validations from '../../../config/Validations';
import FadeSnackbar from '../../SnackBar/SnackBar';
import { connect, withRouter } from "../../../utilities"
import {constant} from '../../../config/constant'


class PropertyDetails extends React.Component {
  constructor(props) {
    super(props);
    this.Validations = new Validations();
    this.state = {
      nav1: null,
      nav2: null,
      propertyData: '',
      propertyId: '',
      isDialogOpen: false,
      hasErrors: true,
      offerPrice: '',
      offerDeposit: '',
      offerInspectionDays: '',
      offerClosingDays: '',
      offerTerms: '',
      validationMessage: {offerPrice:'', offerDeposit: '', offerInspectionDays: '', offerClosingDays: ''},
      snackbar_open: false,
      api_message: ''
    };
    this.offerFormData = {}
  }

  componentDidMount() {

    // console.log("REdux state in property details", this.props.state.login_component.user_detail[0].user_id)

    fetch(constant.base_url+constant.server_url.fetch_detail, {
      method: "POST",
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: "Data=" + JSON.stringify({ property_id: this.props.location.state.propertyId })
    }).then((response) => {
      // console.log('response from server', response)
      return response.json()
    }).then((result) => {
      console.log('data from server', result)
      this.setState({ propertyData: result.data.details })
    }).catch(
      err => {
        console.log('Errors in request', err)
      }
    )

    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  handleDialogClose = () => {
    this.setState({ isDialogOpen: false });
  };

  openOfferForm = () => {
    console.log('Offer form opens ------------------------>')
    this.setState({ isDialogOpen: true })
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value }, () => { this.validateField(name, value) })

  }

  validateField(fieldName, fieldValue) {
    let errorMessage = this.state.validationMessage
    let hasError = this.state.hasErrors
    switch (fieldName) {
      case 'offerPrice':
        errorMessage.offerPrice = this.Validations.validateNumericField(fieldValue)
        if (errorMessage.offerPrice === '') { 
          hasError = false } 
        else { 
          hasError = true }
        break;
      case 'offerDeposit':
        errorMessage.offerDeposit = this.Validations.validateNumericField(fieldValue)
        if (errorMessage.offerDeposit === '') { hasError = false } else { hasError = true }
        break;
      case 'offerInspectionDays':
        errorMessage.offerInspectionDays = this.Validations.validateNumericField(fieldValue)
        if (errorMessage.offerInspectionDays === '') { hasError = false } else { hasError = true }
        break;
      case 'offerClosingDays':
        errorMessage.offerClosingDays = this.Validations.validateNumericField(fieldValue)
        if (errorMessage.offerClosingDays === '') { hasError = false } else { hasError = true }
        break;
      default:
        break;
    }
    this.setState({validationMessage: errorMessage, hasErrors: hasError})

  }

  createOffer = (offerFormData) => {
    fetch(constant.base_url + constant.server_url.offer_creation,{
      method: "POST",
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: "Data=" + JSON.stringify(offerFormData)
    }).then((response) => {
      console.log('response from server', response)
      return response.json()
    }).then((data) => {
      if (data.status == 200) {
        console.log('message from server', data.message)
        this.setState({snackbar_open: true, api_message: data.message, isDialogOpen: false})
        setTimeout(() => {this.setState({snackbar_open: false, api_message: ''})},4000)
      }
      else{
        console.log('message from server', data.message)
        this.setState({snackbar_open: true, api_message: data.message, isDialogOpen: false})
        setTimeout(() => {this.setState({snackbar_open: false, api_message: ''})},4000)
      }
    }).catch(
      err => {
        console.log('Errors in request', err)
      })
  }

  handleOfferSubmit = () => {
    if(this.state.hasErrors === true){
      this.validateField('offerPrice',this.state.offerPrice)
      this.validateField('offerDeposit',this.state.offerDeposit)
      this.validateField('offerInspectionDays',this.state.offerInspectionDays)
      this.validateField('offerClosingDays',this.state.offerClosingDays)
    }
    else{
      console.log("Your offer made successfully",this.state)
      this.offerFormData = {
        user_id: localStorage.getItem('token_id'), // coming from local storage
        // user_id: this.props.state.login_component.user_detail[0].user_id, // coming from redux
        property_id: this.state.propertyData.property_id,
        price_offered: this.state.offerPrice,
        deposit_offered: this.state.offerDeposit,
        inspection_days: this.state.offerInspectionDays,
        closing_days: this.state.offerClosingDays,
        other_offer_terms: this.state.offerTerms,
      }
      this.createOffer(this.offerFormData)
    }
  }

  render() {
    // var data=this.props.location.state.data
    //console.log(data)
    let data = this.state.propertyData
    let propertyType = propertiesType.map((type, index) => {
      if (data.property_type_id === type.property_type_id) {
        return type.property_type_name
      }
      else {
        return ''
      }
    })
    return (

      <div className="property-details-wrapper">
        <Dialog
          open={this.state.isDialogOpen}
          onClose={this.handleDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle>Make an Offer</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill all the necessary fields below to make an offer.
            </DialogContentText>
            <div className="form-field register_signup">
              <TextField
                margin="dense"
                name="offerPrice"
                label="Offer Price"
                type="number"
                value={this.state.offerPrice}
                onChange={(event) => { this.handleChange(event) }}
                error = {this.state.validationMessage.offerPrice.length === 0 ? false : true}
                helperText = {this.state.validationMessage.offerPrice}
                InputProps={{startAdornment:<InputAdornment position="start">$</InputAdornment>}}
              />
            </div>
            <div className="form-field register_signup">
              <TextField
                margin="dense"
                name="offerDeposit"
                label="Deposit"
                type="number"
                value={this.state.offerDeposit}
                onChange={(event) => { this.handleChange(event) }}
                error = {this.state.validationMessage.offerDeposit.length === 0 ? false : true}
                helperText = {this.state.validationMessage.offerDeposit}
                InputProps={{startAdornment:<InputAdornment position="start">$</InputAdornment>}}              
              />
            </div>
            <div className="form-field register_signup">
              <TextField
                margin="dense"
                name="offerInspectionDays"
                label="Number of days inspection"
                type="number"
                value={this.state.offerInspectionDays}
                onChange={(event) => { this.handleChange(event) }}
                error = {this.state.validationMessage.offerInspectionDays.length === 0 ? false : true}
                helperText = {this.state.validationMessage.offerInspectionDays}
              />
            </div>
            <div className="form-field register_signup">
              <TextField
                margin="dense"
                name="offerClosingDays"
                label="Number of days to close"
                type="number"
                value={this.state.offerClosingDays}
                onChange={(event) => { this.handleChange(event) }}
                error = {this.state.validationMessage.offerClosingDays.length === 0 ? false : true}
                helperText = {this.state.validationMessage.offerClosingDays}
              />
            </div>
            <div className="form-field register_signup">
              <TextField
                margin="dense"
                name="offerTerms"
                label="Other offer terms"
                type="text"
                value={this.state.offerTerms}
                onChange={(event) => { this.handleChange(event) }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleOfferSubmit} color="primary">
              Submit Offer
            </Button>
          </DialogActions>
        </Dialog>

        <div className="container-fluid">

          <div className="main-section">
            <div className="property-slider">
              <PropertySlider />
            </div>
            <div className="property-sidebar">
              <div className="property-name-wrap">
                <h3 className="property-name">{data.property_title}</h3>
                <p className="address-text">{data.street_address}, {data.state} {data.zipcode}</p>
              </div>
              <div className="features-list">
                <p>Details :<span>{data.sq_ft} sq.ft</span></p>
              </div>
              <ul className="facility-list">
                <li>
                  <span className="icon"> <img src={require('./images/bed-icon.png')} /></span>
                  <span className="text">3 Bed - N/A  </span>
                </li>
                <li>
                  <span className="icon"> <img src={require('./images/bath-icon.png')} /></span>
                  <span className="text">3 Bath</span>
                </li>
                <li>
                  <span className="icon"> <img src={require('./images/parking-icon.png')} /></span>
                  <span className="text">Parking</span>
                </li>
              </ul>

              <div className="description-text">
                <h6>About 3 BHK Apartment</h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumasan lacus
                    vel facilisis. </p>
                <a href="#" className="btn-link">See more details</a>
                <button style={{ margin: 10 }} onClick={this.openOfferForm}>Submit offer</button>
              </div>

              <div className="option-wrap">
                <ul>
                  <li>
                    <span><img src={require('./images/map-pin-icon.png')} /></span>
                    <h6>Map</h6>
                  </li>
                  <li>
                    <span><img src={require('./images/street-icon.png')} /></span>
                    <h6>Street</h6>
                  </li>
                  <li>
                    <span><img src={require('./images/direction-icon.png')} /></span>
                    <h6>Direction</h6>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          <div className="properties-details">

            <Typography variant="subheading" className="subheading">Features</Typography>
            <div className="listing-wrapper">
              <Typography variant="h4" className="h4-heading">Basic Details</Typography>

              <ul className="flex-grid">
                <li>Type of Property: {propertyType}</li>
                <li>Bedrooms: 3</li>
                <li>Bathrooms: 3</li>
                <li>Year Built: {data.year_built}</li>
                <li>Sq ft:  {data.sq_ft}</li>
                <li>Garage: {data.is_garage === '0' ? "No" : 'Yes'}</li>
                <li>Cooling System:{data.cooling_system === '0' ? 'Central AC' : 'Wall unit AC'} </li>
                <li>Waste water system: {data.sewer === '0' ? 'City sewer' : 'Septic'}</li>
              </ul>
            </div>

            <div className="listing-wrapper">
              <Typography variant="h4" className="h4-heading">Community Info</Typography>

              <ul className="flex-grid">
                <li>HOA:  {data.hoa === '0' ? "No" : "Yes"}</li>
                <li>Communities Aminities:  {data.amenities_golf === '1' ? 'Golf' : ''}, {data.amenities_gym === '1' ? 'Gym' : ''}, {data.amenities_spa === '1' ? 'Spa' : ''}, {data.amenities_pool === '1' ? 'Pool' : ''}, {data.amenities_recreation_area === '1' ? 'Recreation area' : ''} {data.amenities_other}</li>
                <li>Condo Association: {data.condo_assocation === '0' ? 'No' : 'Yes'}</li>
                <li>55+ Community: {data['55_community'] === '0' ? 'No' : 'Yes'}</li>
                <li>Rental Restrictions for new owners: {data.rental_restrictions === '0' ? 'No' : 'Yes'}</li>
              </ul>
            </div>


            <Typography variant="subheading" className="subheading">House Condition Rating out of 10</Typography>
            <div className="listing-wrapper">
              <ul className="flex-grid">
                <li>Kitchen: {data.condition_kitchen}</li>
                <li>Bathroom: {data.condition_bathrooms}</li>
                <li>Interior Paint: {data.condition_interior_paint}</li>
                <li>Flooring: {data.condition_flooring}</li>
                <li>Ac Unit(s): {data.condition_ac_units}</li>
                <li>Roof:{data.condition_roof}</li>
                <li>Exterior Paint: {data.condition_exterior_paint}</li>
                <li>Windows: {data.condition_windows}</li>
                <li>Electrical panel: {data.condition_electrical_panel}</li>
                <li>Hot water heater: {data.condition_water_heater}</li>
                <li>Appliances: {data.condition_appliances}</li>
                <li>Pool/Pool equipment(if applicable): {data.condition_pool_equipment}</li>
              </ul>
            </div>
            <Typography variant="subheading" className="subheading">Discription</Typography>
            <div className="description">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumasan lacus vel facilisis. Sit amet, consectetur adipiscing elit, sed do risus commodo viverra maecenas accumsan lacus vel facilisis. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Sit amet, consectetur adipiscing elit, sed do risus commodo viverra maecenas accumsan lacus vel facilisis. </p>
            </div>

            <Typography variant="subheading" className="subheading">Documents</Typography>
            <div className="listing-wrapper documents">
              <p>The following documents are available for Palm Harbor, Florida 34683 </p>
              <ul className="flex-wrap">
                <li> <span className="document-icon"><img src={require('./images/document-icon.png')} /></span>Brokerage Commissions Document <a href="#"><span className="download-icon"><img src={require('./images/download-icon.png')} /></span></a> </li>
                <li> <span className="document-icon"><img src={require('./images/document-icon.png')} /></span>Purchase and sale Agreement <a href="#"><span className="download-icon"><img src={require('./images/download-icon.png')} /></span></a> </li>
              </ul>
            </div>

            <Typography variant="subheading" className="subheading">Listed By</Typography>
            <div className="listing-wrapper">
              <ul className="flex-wrap">
                <li><span>Comapny Phone</span> <span className="hidden-text">*******************</span></li>
                <li><span>Agent Name</span> <span className="hidden-text">**********</span></li>
                <li><span>License Name</span> <span className="hidden-text">***********</span></li>
                <li><span>Address </span><span className="hidden-text">***********</span></li>

              </ul>
            </div>

            <Typography variant="subheading" className="subheading">Offerlane Firm</Typography>
            <div className="listing-wrapper">
              <ul className="flex-wrap">
                <li><span>Offerlane Licenses</span> <span className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit</span></li>
              </ul>
            </div>
          </div>
        </div>
        <FadeSnackbar 
          snackbar = {{show: this.state.snackbar_open, message: this.state.api_message}}
          //duration = {4000}
        />
      </div>
    )

  }

}
const mapStateToProps = state => ({
  state
})
export default  withRouter(connect(mapStateToProps)(PropertyDetails))