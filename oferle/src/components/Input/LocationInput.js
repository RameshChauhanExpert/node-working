import React, {
  Component
} from 'react';
import {
  TextField,
  connect,
  withRouter
} from "../../utilities"
import Script from 'react-load-script';
import {
  landing_page_search_bar,
  save_search_location
} from '../../action';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  constant
} from '../../config';

import $ from "jquery"

var emailExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

class LocationInput extends Component {
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      city: '',
      query: ''
    };

    this.componentForm = {
      premise: "long_name",
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      sublocality_level_2: "long_name",
      sublocality_level_1: "long_name",

      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name'
    };
    // Bind Functions
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.geolocate = this.geolocate.bind(this)
    this.initAutocomplete = this.initAutocomplete.bind(this)
    this.fillInAddress = this.fillInAddress.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.county
  }



  handleClose = () => {
    if (document.getElementById("email").value.trim() != "") {
      if (emailExp.test(document.getElementById("email").value) == true) {
        //this.props.history.push(constant.frontend_url.home_page)
        this.setState({ dialog: false })
      } else {
        this.setState({
          emailErro: "Please enter valid email address"
        })
      }
    } else {
      this.setState({ dialog: false })
      //this.props.history.push(constant.frontend_url.home_page)
    }
  }


  initAutocomplete() {
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'), {
        types: ['geocode'],
        componentRestrictions: {
          country: 'us'
        }
      });
    this.autocomplete.setFields('address_components');
    this.autocomplete.addListener('place_changed', this.fillInAddress);

    this.geocoder = new google.maps.Geocoder();

  }

  fillInAddress() {
    var zone_list = this.props.zone_list
    var _this = this
    var street_address = ""
    var place = this.autocomplete.getPlace();
    if (place.address_components != undefined) {
      //
      if (place.address_components != undefined) {
        this.county = place.address_components.find(function (element, index) {
          return element.types.find(function (type) {
            if (type == "administrative_area_level_2") {
              return zone_list.data.find(function (data) {
                // alert(place.address_components[index].short_name+"---"+ data.county_name)
                if (place.address_components[index].short_name.toLowerCase().trim() == data.county_name.toLowerCase().trim()) {
                  //
                  //alert(place.address_components[index].short_name+"---"+ data.county_name)
                  for (var i = 0; i < place.address_components.length; i++) {
                    var addressType = place.address_components[i].types[0];
                    if (_this.componentForm[addressType]) {
                      if (addressType == "premise") {
                        street_address += " " + place.address_components[i][_this.componentForm["premise"]];
                        let event = {
                          target: {
                            name: "street_address",
                            value: street_address
                          }
                        }
                        _this.props.change(event)
                      }
                      if (addressType == "street_number") {
                        street_address += " " + place.address_components[i][_this.componentForm["street_number"]];
                        let event = {
                          target: {
                            name: "street_address",
                            value: street_address
                          }
                        }
                        _this.props.change(event)
                      }
                      if (addressType == "route") {
                        street_address += " " + place.address_components[i][_this.componentForm["route"]];
                        let event = {
                          target: {
                            name: "street_address",
                            value: street_address
                          }
                        }
                        _this.props.change(event)
                      }
                      if (addressType == "locality") {
                        var val = place.address_components[i][_this.componentForm[addressType]];
                        let event = {
                          target: {
                            name: "city",
                            value: val
                          }
                        }
                        _this.props.change(event)
                      }

                      if (addressType == "administrative_area_level_1") {
                        var val = place.address_components[i][_this.componentForm[addressType]];

                        let event = {
                          target: {
                            name: "state",
                            value: "FL"
                          }
                        }
                        _this.props.change(event)
                      }
                      if (addressType == "postal_code") {
                        var val = place.address_components[i][_this.componentForm[addressType]];
                        let event = {
                          target: {
                            name: "zipcode",
                            value: val
                          }
                        }
                        _this.props.change(event)
                      }
                    }
                  }
                  console.log("maps data ___--->", data)
                  return data
                }

              })
            }
          })
        })
      }

      if (this.county == undefined) {
        this.setState({
          dialog: true
        })
        document.getElementById("autocomplete").setAttribute("data", undefined)
        this.props.save_search_location(place.address_components)
      } else {
        document.getElementById("autocomplete").setAttribute("data", "Done")
      }
      //



    }
  }
  handleScriptLoad() {
    // Declare Options For Autocomplete
    var options = {
      types: ['(cities)'],
    };
    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options,
    );
    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }


  geolocate() {
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(function (position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        this.autocomplete.setBounds(circle.getBounds());
      });

    }
  }



  handlePlaceSelect() {

    // Extract City From Address Object
    let addressObject = this.autocomplete.getPlace();
    let address = addressObject.address_components;

    // Check if address is valid
    if (address) {
      this.setState({
        city: address[0].long_name,
        query: addressObject.formatted_address,
      });
    }
  }

  onSubmit(event) {
    var error = false
    var errorMessage = "";
    if (this.props.required && error == false) {
      if (this.props.required[0] == true && error == false) {
        if (this.required(event) == true) {
          error = true
          errorMessage = this.props.required[1]
        } else {
          error = false
          this.setState({
            error: ""
          })
        }
      }
    }
    if (this.props.max && error == false) {

      if (this.props.max[0] == true) {

        if (this.max(event) == true) {
          error = true;

          errorMessage = this.props.max[2]
        } else {

          error = false
          this.setState({
            error: ""
          })
        }
      }
    }
    if (error == true) {
      this.props.state.isValidate(false, false)
      return this.setState({
        error: errorMessage
      })
    } else {
      this.props.state.isValidate((this.props.state.finalCheckAll == "false" || this.props.state.finalCheckAll == undefined) ? false : true, false)
      return this.setState({
        error: errorMessage
      })
    }
  }

  handleChange(event) {
    document.getElementById("autocomplete").setAttribute("data", undefined)
    var error = false
    var errorMessage = "";

    if (this.props.max && error == false) {


      if (this.props.max[0] == true) {

        if (this.max(event) == true) {

          error = true;

          errorMessage = this.props.max[2]
        } else {

          error = false;
          this.setState({
            error: ""
          })
        }
      }
    }


    if (error == false) {
      this.props.change(event)
    }

    if (this.props.required && error == false) {
      if (this.props.required[0] == true && error == false) {
        if (this.required(event) == true) {
          error = true;

          errorMessage = this.props.required[1]
        } else {
          error = false;
        }
      }
    }
    if (this.props.max && error == false) {


      if (this.props.max[0] == true) {
        if (this.max(event) == true) {

          error = true;

          errorMessage = this.props.max[2]
        } else {
          error = false;
          this.setState({ error: "" })
        }
      }
    }

    if (error == true) {

      this.setState({
        error: errorMessage
      })
    } else {
      // this.props.change(event)
      this.setState({
        error: ""
      })
    }

  }

  required(event) {
    if (document.getElementsByName(this.props.name)[0].value == "" || document.getElementsByName(this.props.name)[0].value.trim() == "") {
      return true;
    } else {

      return false;
    }
  }

  max(event) {

    if (document.getElementsByName(this.props.name)[0].value.trim().length > this.props.max[1]) {

      return true;
    } else {

      return false;
    }
  }

  componentWillMount() {
    this.props.county_list()
  }

  componentDidMount() {
    var _this = this
    $(document).ready(function () {
      $("#autocomplete").focusout(function () {
        var searchData = $("#autocomplete").attr("data")
        if (searchData == "undefined") {
          document.getElementById("autocomplete").value = ""
          //  console.log(_this)
          _this.props.change({ target: { name: "street_address", value: "" } })
        }
      })
    }.bind(this))
  }
  render() {
    return (
      <div className="inline-element">
        {/* <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCGh2j6KRaaSf96cTYekgAD-IuUG0GkMVA&libraries=places&callback=initAutocomplete" */}
        <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBIADAzOmD-_UsCp1pU6LSmlp50Rp943KA&libraries=places&callback=initAutocomplete"
          async defer
          onLoad={
            this.initAutocomplete
          }
        />

        <
          TextField
          id="autocomplete"
          label={
            this.props.label
          }

          value={
            (this.props.state[this.props.name] == undefined) ? "" : this.props.state[this.props.name]
          }
          name={
            this.props.name
          }
          onChange={
            this.handleChange
          }

          className={
            this.props.className
          }

          placeholder="" />

        <
          span className="error-msg" > {
            this.state.error
          } </span> {
          (this.props.validate == true) ? this.onSubmit() : ""
        }

        {
          /* Dialog box start */
        }

        <Dialog open={this.state.dialog} aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="search-dialog"
        >
          <
            DialogContent >
            <
              DialogContentText id="alert-dialog-description" >
              Sorry, but we aren’ t buying in your area just yet.Your home is outside of our buying area.We are growing quickly, and may be in your area, IN soon.To view the markets we are currently purchasing homes in ,<br /> please visit <a href={
                constant.fronend_base_url
              }>{
                  constant.fronend_base_url
                }</a>
              <br />
              <br />
              <b > Please give your email address
    for future use. </b>
              <input type="email"
                name="email"
                id="email"
                placeholder="Email address"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                className={
                  this.props.className
                }
              />            <span className="error" style={{ "color": "red" }} > {this.state.emailErro} </span>     </DialogContentText > </DialogContent> <
                DialogActions >
            < Button onClick={this.handleClose}
              color="primary"
              autoFocus >
              Okay </Button> </DialogActions > </Dialog>

        {
          /* Dialog box end */
        }

      </div>
    );
  }
}

//export default LocationInput;

const prop = (state) => ({
  ...state
})
const action = dispatch => ({
  county_list: () => {
    dispatch(landing_page_search_bar())
  },
  save_search_location: (location) => {
    dispatch(save_search_location(location))
  }
})
export default withRouter(connect(prop, action)(LocationInput))