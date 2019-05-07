import React from 'react';
import './main.css'
import { TextField, Typography, MenuItem, Button, Checkbox, Select, FormControl, FormGroup, FormControlLabel, Link, Input, Chip } from "../../../utilities"

import { LocationSearchInput, GoogleMarkerMap } from "../../index"
import Menu from '@material-ui/core/Menu';
import { constant } from '../../../config';
import { floridaCounties, propertiesType } from '../../../config/floridaCounties';
import Loader from '../../loader/loader';


export default class PropertyList extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.interested_properties = JSON.parse(localStorage.getItem('interested_properties'))
    this.interested_counties = JSON.parse(localStorage.getItem('interested_counties'))
    this.state = {
      anchorEl: null,
      property_filter: false,
      properties: [],
      properties_count: '',
      stateCounty: '',
      county: this.interested_counties,
      bed: '',
      bath: '',
      sq_from: '',
      sq_to: '',
      propertiesTitleArr: this.interested_properties,
      isLoading: false,
      hasMore: false,
      limit: 5,
      offset: 0
    };

    this.initial_params = {
      user_id: "",
      user_type: "",
      state: "",
      // county_id: JSON.parse(this.interested_counties), 
      county_id: this.interested_counties,
      // property_type_id: JSON.parse(this.interested_properties), 
      property_type_id: this.interested_properties,
      bed: "",
      bath: "",
      sqftFrom: "",
      sqftTo: "",
      limit: "5",
      offset: "0"
    }

  }

  open_filter = () => {
    this.setState({ property_filter: true })
  }
  close_filter = () => {
    this.setState({ property_filter: false })
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChange(event) {

    var name = event.target.name
    var value = event.target.value

    this.setState({ [name]: value, offset: 0, properties: [] })
    setTimeout(() => {
      console.log('state after change', this.state)
      var params = {
        user_id: "",
        user_type: "",
        state: this.state.stateCounty,
        county_id: this.state.county,
        property_type_id: this.state.propertiesTitleArr,
        bed: this.state.bed,
        bath: this.state.bath,
        sqftFrom: this.state.sq_from,
        sqftTo: this.state.sq_to,
        // limit: "5",
        limit: this.state.limit,
        // offset: "0"
        offset: this.state.offset
      }
      this.fetchPropertiesList(params)
    }, 100)

  }
  handleCheckBox = (event) => {
    var propertiesArr = []
    var propertiesChecked = []
    var checked_item = document.getElementsByName('propertyType');
    // console.log('node list values', checked_item)
    for (var data of checked_item) {
      if (data.checked === true) {
        // console.log(data.value+' is checked')
        propertiesArr.push({ title: data.value, isChecked: true })
      }
      else {
        // console.log(data.value+' is not checked')
        propertiesArr.push({ title: data.value, isChecked: false })
      }
    }
    console.log(propertiesArr)
    propertiesArr.map((data, index) => {
      if (data.isChecked === true) {
        propertiesChecked.push(data.title)
      }
    })
    this.setState({ propertiesTitleArr: propertiesChecked, offset: 0, properties: [] })
    setTimeout(() => {
      console.log('state after change', this.state)
      var params = {
        user_id: "",
        user_type: "",
        state: this.state.stateCounty,
        county_id: this.state.county,
        property_type_id: this.state.propertiesTitleArr,
        bed: this.state.bed,
        bath: this.state.bath,
        sqftFrom: this.state.sq_from,
        sqftTo: this.state.sq_to,
        // limit: "5",
        limit: this.state.limit,
        // offset: "0"
        offset: this.state.offset
      }
      this.fetchPropertiesList(params)
    }, 100)
  }

  fetchPropertiesList = (params) => {

    console.log('Fetch params $$$#@>', params)
    this.setState({ isLoading: true })
    // fetch("http://localhost/offerlane/server/admin/property_info/property_listing", {
    fetch(constant.base_url+constant.server_url.property_listing, {
      method: "POST",
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: "Data=" + JSON.stringify(params)
    }).then((response) => {
      return response.json()
    }).then((result) => {
      this.setState({
        properties: this.state.properties.concat(result.data),
        properties_count: result.total_count,
        isLoading: false
      })
      console.log(result)

    }).catch(
      err => {
        console.log('Errors in request', err)
        this.setState({ isLoading: false })
      })
  }

  componentDidMount() {

    console.log('Buyer data in local storage =========>', localStorage)
    // var interested_properties = localStorage.getItem('interested_properties')
    // var interested_counties = localStorage.getItem('interested_counties')

    // console.log(this.interested_counties)


    // let initial_params = {
    //     user_id: "",
    //     user_type: "",
    //     state: "",
    //     // county_id: JSON.parse(this.interested_counties), 
    //     county_id: this.interested_counties,
    //     // property_type_id: JSON.parse(this.interested_properties), 
    //     property_type_id: this.interested_properties,
    //     bed: "",
    //     bath: "",
    //     sqftFrom: "",
    //     sqftTo: "",
    //     limit: "5",
    //     offset: "0"
    // }

    this.fetchPropertiesList(this.initial_params)

    this.refs.pScroll.addEventListener("scroll", () => {
      if (this.refs.pScroll.scrollTop + this.refs.pScroll.clientHeight >= this.refs.pScroll.scrollHeight) {

        if (this.state.properties_count <= this.state.limit) {
          console.log('Less than or equal to 5 properties available')
        }
        else {
          this.setState({ offset: this.state.offset + this.state.limit })
          setTimeout(() => {
            console.log('offset is: ', this.state.offset)
            if (this.state.offset > this.state.properties_count) {
              console.log('No more properties')
            }
            else {
              var updatedParams = {
                user_id: "",
                user_type: "",
                state: this.state.stateCounty,
                county_id: this.state.county,
                property_type_id: this.state.propertiesTitleArr,
                bed: this.state.bed,
                bath: this.state.bath,
                sqftFrom: this.state.sq_from,
                sqftTo: this.state.sq_to,
                // limit: "5",
                limit: this.state.limit,
                // offset: "0"
                offset: this.state.offset
              }
              this.fetchPropertiesList(updatedParams)
            }
          }, 100)

        }



        // if(this.state.properties_count <= this.state.limit){
        //   console.log('Less than or equal to 5 properties available')
        // }
        // else{
        //   if(this.state.properties_count <= this.state.offset){
        //     console.log('properties: '+this.state.properties_count+' are less than offset: '+ this.state.offset)
        //   }
        //   else{
        //     this.setState({offset: this.state.offset + 5})
        //     if(this.state.properties_count % this.state.limit == 0){
        //       console.log('no more items')
        //     }
        //     else{
        //       this.setState({offset: this.state.offset + this.state.properties_count % this.state.limit})
        //       setTimeout(() => {
        //         console.log('offset is: ', this.state.offset)
        //         var updatedParams = {
        //           user_id: "",
        //           user_type: "",
        //           state: this.state.stateCounty,
        //           county_id: this.state.county,
        //           property_type_id: this.state.propertiesTitleArr,
        //           bed: this.state.bed,
        //           bath: this.state.bath,
        //           sqftFrom: this.state.sq_from,
        //           sqftTo: this.state.sq_to,
        //           // limit: "5",
        //           limit: this.state.limit,
        //           // offset: "0"
        //           offset: this.state.offset
        //         }
        //         this.fetchPropertiesList(updatedParams)
        //       }, 100)
        //     }

        //   }

        // }
        // this.loadMoreItems();
      }
    });

  }

  render() {

    return (
      <div className="property-list-wrapper">
        {this.state.isLoading ? <Loader /> : null}
        <div className="filter-section">
          <div className="container-fluid">
            <form action="#">
              <div className="search-input-wrap">
                <input type="text" className="form-control" />
              </div>
              <Select
                name="stateCounty"
                className="select-box"
                value={this.state.stateCounty}
                onChange={this.handleChange}
                label="State"
              >
                <MenuItem value="FL">Florida</MenuItem>

              </Select>

              <Select
                multiple
                value={this.state.county}
                onChange={this.handleChange}
                inputProps={{
                  name: 'county',
                  id: 'id-county',
                }}
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                  <div>
                    {selected.map(value => (
                      <Chip key={value} label={value} />
                    ))}
                  </div>
                )}
              >
                {floridaCounties.map((county, index) => {
                  return (
                    <MenuItem value={county.county_name} key={index}>
                      <em>{county.county_name}</em>
                    </MenuItem>
                  )
                })}
              </Select>

              <div className="filter-dropdown-wrap">
                <div className="filter-toggle" onClick={this.open_filter}>Property</div>
                {(this.state.property_filter == true) ? <div className="dropdown-filter">
                  <span onClick={this.close_filter} className="close-icon" >&times;</span>

                  <div className="fields-wrapper">
                    <form>
                      <div className="form-group form-fields">
                        <div className="form-field">
                          <label>Bed</label>
                          <Select name="bed" className="select-box"
                            value={this.state.bed}
                            onChange={this.handleChange}
                            label="bed"
                          >
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                            <MenuItem value="6">6</MenuItem>
                            <MenuItem value="7">7</MenuItem>
                            <MenuItem value="8+">8+</MenuItem>
                            <MenuItem value=""></MenuItem>
                          </Select>
                        </div>
                        <div className="form-field">
                          <label>Bath</label>
                          <Select name="bath" className="select-box"
                            value={this.state.bath}
                            onChange={this.handleChange}
                            label="bath"
                          >
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                            <MenuItem value="6+">6+</MenuItem>
                            <MenuItem value=""></MenuItem>
                          </Select>
                        </div>
                      </div>
                      <div className="form-group form-fields">
                        <label>Square Feet</label>
                        <div className="form-field">
                          <TextField id="outlined-name" name='sq_from' label="min" value={this.state.sq_from} onChange={this.handleChange} margin="normal" variant="outlined" className="input-field" />
                        </div>
                        <div className="form-field">
                          <TextField id="outlined-name" name='sq_to' label="max" value={this.state.sq_to} onChange={this.handleChange} margin="normal" variant="outlined" className="input-field" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Type</label>
                        <div className="form-field">
                          <FormControl component="fieldset" >
                            <FormGroup className="checkbox-group">
                              <FormControlLabel className="checkbox-input"
                                control={
                                  <Checkbox
                                    color="primary"
                                    //name = 'single_family'
                                    name='propertyType'
                                    value='Single Family'
                                    //defaultChecked={this.interested_properties.includes('Single Family') ? true : false}
                                    // value = {this.state.single_family} 
                                    checked = {this.state.propertiesTitleArr.includes('Single Family') ? true : false}
                                    onChange={this.handleCheckBox}
                                  />
                                }
                                label="Single Family"

                              />
                              <FormControlLabel className="checkbox-input"
                                control={
                                  <Checkbox
                                    color="primary"
                                    //name = 'townhouse'
                                    name='propertyType'
                                    value='Townhouse'
                                    onChange={this.handleCheckBox}
                                    //defaultChecked={this.interested_properties.includes('Townhouse') ? true : false}
                                    checked = {this.state.propertiesTitleArr.includes('Townhouse') ? true : false}
                                  />
                                }
                                label="Townhouse"

                              />
                              <FormControlLabel className="checkbox-input"
                                control={
                                  <Checkbox
                                    color="primary"
                                    name='propertyType'
                                    value='Condo'
                                    onChange={this.handleCheckBox}
                                    //defaultChecked={this.interested_properties.includes('Condo') ? true : false}
                                    checked = {this.state.propertiesTitleArr.includes('Condo') ? true : false}                                    
                                  />
                                }
                                label="Condo"
                              />
                              <FormControlLabel className="checkbox-input"
                                control={
                                  <Checkbox
                                    color="primary"
                                    name='propertyType'
                                    value='Multifamily'
                                    onChange={this.handleCheckBox}
                                    //defaultChecked={this.interested_properties.includes('Multifamily') ? true : false}
                                    checked = {this.state.propertiesTitleArr.includes('Multifamily') ? true : false}                                    

                                  />
                                }
                                label="Multifamily"
                              />
                              <FormControlLabel className="checkbox-input"
                                control={
                                  <Checkbox
                                    color="primary"
                                    name='propertyType'
                                    value='Vacant Land'
                                    onChange={this.handleCheckBox}
                                    //defaultChecked={this.interested_properties.includes('Vacant Land') ? true : false}
                                    checked = {this.state.propertiesTitleArr.includes('Vacant Land') ? true : false}                                    
                                  />
                                }
                                label="Vacant Land"
                              />


                            </FormGroup>
                          </FormControl>
                        </div>


                      </div>

                    </form>
                  </div>


                </div> : ""}

              </div>


              <button type="submit" className="btn btn-primary">Search</button>
            </form>


          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 property-list" ref="pScroll">
            <div className="totle-count">{this.state.properties_count ? this.state.properties_count : null} Properties</div>

            {
              this.state.properties ?
                this.state.properties.map((data, index) => {
                  return (
                    <PropertyElement
                      key={index}
                      title={data.property_details.property_title}
                      main_image={data.property_main_image}
                      address={data.property_details.street_address}
                      state={data.property_details.state}
                      zipcode={data.property_details.zipcode}
                      area={data.property_details.sq_ft}
                      fullData={data}
                      propertyId={data.property_details.property_id}
                    />
                  )
                }) :
                (
                  <div>
                    <h1>No properties found, Try changing the filters!!</h1>
                  </div>
                )
            }
          </div>
          <div className="col-sm-6 map-iframe">
            <GoogleMarkerMap propertyCoordinates={[
              { lat: 25.761681, lng: -80.191788 },
              { lat: 28.538336, lng: -81.379234 },
              { lat: 27.964157, lng: -82.452606 }
            ]} />
          </div>
        </div>
      </div>

    )

  }

}

class PropertyElement extends React.Component {

  render() {
    return (

      <div className="list-row">
        <div className="figure">

          <img src={constant.file_url + this.props.main_image} />
        </div>
        <div className="property-details">
          <div className="property-name-wrap">
            <h3 className="property-name">{this.props.title}</h3>
            <p className="address-text">{this.props.address}, {this.props.state} {this.props.zipcode}</p>
          </div>
          <div className="features-list">
            <p>Details :<span>{this.props.area} sq.ft.</span></p>
            <p>Status : <span>Unfurnished, Immediately Available</span></p>
          </div>
          <ul className="facility-list">
            <li>
              <span className="icon"> <img src={require('./images/bed-icon.png')} /></span>
              <span className="text">3 Bed</span>
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
          <div className="actions">
            <a href="#" className="wishlist">Wishlist</a>
            <Link className="offer-btn" to={{ pathname: constant.frontend_url.property_detail, state: { fullData: this.props.fullData, propertyId: this.props.propertyId } }}  >Submit Offer</Link>
            {/* <Link className="offer-btn" to={{ pathname: constant.frontend_url.property_detail +'/'+ this.props.fullData.property_details.property_id, state: {fullData: this.props.fullData} }}  >Submit Offer</Link> */}
          </div>
        </div>

      </div>

    )
  }

}