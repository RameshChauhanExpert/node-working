// Imports
import React, {
  Component
} from 'react';
import {
  TextField,
  connect
} from "../../utilities"
// Import Search Bar Components

//import SearchBar from 'material-ui-search-bar';
// Import React Script Library to load Google object
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

var emailExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


class InputText extends Component {
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      city: '',
      query: '',
      dialog: false
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
  }
  getAlert = () => {
    alert('getAlert from Child');
  }

  fillInAddress() {
    var zone_list = this.props.state.zone_list
    var _this = this
    var street_address = ""
    var place = this.autocomplete.getPlace();
    if (place.address_components != undefined) {
      console.log(place.address_components)
      var county = place.address_components.find(function (element, index) {
        return element.types.find(function (type) {

          if (type == "administrative_area_level_2") {
            return zone_list.data.find(function (data) {
              if (place.address_components[index].short_name.toLowerCase().trim() == data.county_name.toLowerCase().trim()) {

                // location match
                var street_address = "";
                var city = ""
                var state = ""
                var postal_code = ""

                for (var i = 0; i < place.address_components.length; i++) {
                  var addressType = place.address_components[i].types[0];
                  if (_this.componentForm[addressType]) {

                    if (addressType == "premise") {
                      street_address += " " + place.address_components[i][_this.componentForm["premise"]];

                    }
                    if (addressType == "street_number") {
                      street_address += " " + place.address_components[i][_this.componentForm["street_number"]];

                    }
                    if (addressType == "route") {
                      street_address += " " + place.address_components[i][_this.componentForm["route"]];

                    }
                    if (addressType == "locality") {
                      city = place.address_components[i][_this.componentForm[addressType]];

                    }

                    if (addressType == "administrative_area_level_1") {
                      state = place.address_components[i][_this.componentForm[addressType]];

                    }
                    if (addressType == "postal_code") {
                      postal_code = place.address_components[i][_this.componentForm[addressType]];

                    }
                  }
                }

                ///location match end

                // this.setState({street_address:street_address,city:city,state:state,postal_code:postal_code})

                _this.props.location_select(street_address, city, state, postal_code)
                return data.county_name



              }
            })
          }
        })
      })


      if (county == undefined) {
        this.setState({
          dialog: true
        })
        document.getElementById("autocomplete").value = ""
        this.props.save_search_location(place.address_components)
      }
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
      console.log(address)
      this.setState({
        city: address[0].long_name,
        query: addressObject.formatted_address,
      });
    }
  }

  componentDidMount() {
    this.props.setReference(this)
    this.props.county_list()
  }

  clearSearch = () => {
    this.setState({ dialog: true })
    document.getElementById("autocomplete").value = ""
  }

  handleClose = () => {
    if (document.getElementById("email").value.trim() != "") {
      if (emailExp.test(document.getElementById("email").value) == true) {
        this.setState({
          dialog: false
        })
      } else {
        this.setState({
          emailErro: "Please enter valid email address"
        })
      }
    } else {
      this.setState({
        dialog: false
      })
    }

  }
  render() {

    return (<div className="inline-element" >
      <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCGh2j6KRaaSf96cTYekgAD-IuUG0GkMVA&libraries=places&callback=initAutocomplete"
        //<Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBIADAzOmD-_UsCp1pU6LSmlp50Rp943KA&libraries=places&callback=initAutocomplete"

        async defer
        onLoad={
          this.initAutocomplete
        }
      />
      <input id="autocomplete"
        className={
          this.props.className
        }
      />

      <Dialog open={
        this.state.dialog
      }
        //onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="search-dialog"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description" >
            Sorry, but we aren’ t buying in your area just yet.Your home is outside of our buying area.We are growing quickly, and may be in your area, IN soon.To view the markets we are currently purchasing homes in ,<br /> please visit <a href={
              constant.fronend_base_url
            }>{
                constant.fronend_base_url
              }</a>
            <br />
            <br />
            <b> Please give your email address for future use. </b>
            <input type="email"
              name="email"
              id="email"
              placeholder="Email address"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              className={
                this.props.className
              }
            />
            <span className="error" > {
              this.state.emailErro
            } </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={
            this.handleClose
          }
            color="primary"
            autoFocus >
            Okay </Button> </DialogActions> </Dialog> </div>
    );
  }
}

const prop = (state) => ({
  state
})
const action = dispatch => ({
  county_list: () => {
    dispatch(landing_page_search_bar())
  },
  save_search_location: (location) => {
    dispatch(save_search_location(location))
  }
})
export var LocationSearchInput = connect(prop, action)(InputText)