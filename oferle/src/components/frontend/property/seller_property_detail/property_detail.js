import React from "react";
import '../main.css'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Table, TableHead, TableBody, TableRow, TableCell, Link, connect, withRouter } from "../../../../utilities"
import { constant } from "../../../../config/"
import { seller_properties_image_upload } from "../../../../action";
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 0 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});


class PropertyDetail extends React.Component {

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    console.log("Props data of detail", this.props.state)
    var { data } = this.props.location.state
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className="col-main col-sm-9 for_safari seller-dashboard grey-bg">

        <h3 className="section-heading">Seller Property details</h3>
        <div className="tabs-main-wrapper">
          <AppBar position="static">
            <Tabs TabIndicatorProps={{
              style: {
                backgroundColor: "#00d6c3"
              }
            }} value={value} onChange={this.handleChange}>
              <Tab label="Property Info" className="tabs" />
              <Tab label="Offers" className="tabs" />
              <Tab label="Property Photos" className="tabs" />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer className="tab-content-wrapper">

            <div className="row">
              <div className="left-block-wrapper col-sm-8">
                <div className="card-block">
                  <h4>About Property</h4>
                  <div className="prop-details-wrapper">
                    <p className="property-address">{data.street_address + "," + data.city + "," + data.state + ",(" + data.zipcode + ")"}</p>

                  </div>

                </div>

                <div className="card-block">
                  <h4>Features</h4>
                  <div className="prop-details-wrapper">
                    <div className="info-title">Basic Details</div>
                    <div className="listing-wrapper">
                      <ul className="flex-grid">
                        <li>Type of Property: {data.type_of_property}</li>
                      </ul>
                      {(data.type_of_property == "Vacant Land") ?
                        <ul className="flex-grid">
                          <li>Sq ft: {data.sq_ft}</li>
                        </ul>
                        :
                        <span>
                          {/*  Family units */}
                          {Family(data)}


                          <ul className="flex-grid">
                            <li>Year Built: {data.year_built}</li>
                            <li>Sq ft: {data.sq_ft}</li>
                            <li>Garage: {(data.is_garage == 0) ? "No" : "Yes"}</li>
                            <li>Cooling System: {(data.cooling_system == 0) ? "Central AC" : "Wall unit AC"} </li>
                            <li>Waste water system: {(data.sewer == 0) ? "Septic" : "City sewer"}</li>
                          </ul>
                        </span>
                      }


                    </div>

                  </div>
                  {(data.type_of_property != "Vacant Land") ?
                    <div className="prop-details-wrapper">
                      <div className="info-title">Community Info</div>
                      <div className="listing-wrapper">
                        <ul className="flex-grid">
                          <li>Is there an HOA?: {(data.hoa == 0) ? "No" : "Yes"}</li>
                          <li>HOA Dues: {data.hoa_paid + " $"}</li>
                          <li>How often are they paid?: {data.hoa_paid_other}</li>

                          <li>Pool: {(data.amenities_pool == 0) ? "No" : "Yes"}</li>
                          <li>Gym: {(data.amenities_gym == 0) ? "No" : "Yes"}</li>
                          <li>Spa: {(data.amenities_spa == 0) ? "No" : "Yes"}</li>
                          <li>Recreation area: {(data.amenities_recreation_area == 0) ? "No" : "Yes"}</li>
                          <li>Golf: {(data.amenities_golf == 0) ? "No" : "Yes"}</li>
                          <li>Other amenities: {(data.amenities_other == 0) ? "No" : "Yes"}</li>

                          <li>Is there an HOA?: {(data.condo_assocation == 0) ? "No" : "Yes"}</li>
                          <li>HOA Dues: {data.condo_paid + " $"}</li>
                          <li>How often are they paid?: {data.condo_paid_other}</li>

                          <li>55 community ? :{(data["55_community"] == 0) ? "No" : "Yes"}</li>
                          <li>Rental Restrictions : {(data.rental_restrictions_description == "") ? "No" : data.rental_restrictions_description}</li>

                        </ul>
                      </div>

                    </div>
                    : ""}
                </div>

                <div className="card-block">
                  <h4>List By</h4>
                  <div className="prop-details-wrapper">

                    <div className="listing-wrapper">
                      <ul className="flex-grid">
                        <li>Company Phone: {data.phone}</li>
                        <li>Phone Number: {data.phone}</li>
                        <li>Seller/Agent Name: {data.first_name}</li>
                        <li>Email: {data.email}</li>
                        <li>License NUmber: 1545578178487</li>
                        <li>Address: {data.street_address + "," + data.city + "," + data.state + ",(" + data.zipcode + ")"}</li>
                      </ul>
                    </div>
                  </div>

                </div>

                <div className="card-block">
                  <h4>Documents</h4>
                  <div className="prop-details-wrapper">
                    <div className="listing-wrapper documents">
                      <p>The following documents are available for Palm Harbor, Florida 34683 </p>
                      <ul className="flex-wrap">
                        <li>Brokerage Commissions Document <span className="download-icon" style={{ "cursor": "pointer" }}><img src={require('../images/download-icon.png')} /></span> </li>
                        <li>Purchase and sale Agreement   <span className="download-icon" style={{ "cursor": "pointer" }} ><img src={require('../images/download-icon.png')} /></span></li>
                      </ul>
                    </div>
                  </div>

                </div>





              </div>

              {(data.type_of_property != "Vacant Land") ?

                <div className="right-block-wrapper col-sm-4">
                  <div className="card-block">
                    <h4>House Condition</h4>
                    <div className="prop-details-wrapper">

                      <div className="listing-wrapper">
                        <ul className="flex-grid single-item">
                          <li>Kitchen:  {(data.condition_kitchen >= 50) ?
                            (data.condition_kitchen == 100) ? "Perfect" : "Good"
                            : "Bad"}</li>
                          <li>Bathroom:   {(data.condition_bathrooms >= 50) ?
                            (data.condition_bathrooms == 100) ? "Perfect" : "Good"
                            : "Bad"}</li>
                          <li>Interior Paint:   {(data.condition_interior_paint >= 50) ?
                            (data.condition_interior_paint == 100) ? "Perfect" : "Good"
                            : "Bad"}</li>
                          <li>Flooring:   {(data.condition_flooring >= 50) ?
                            (data.condition_flooring == 100) ? "Perfect" : "Good"
                            : "Bad"}</li>
                          <li>Ac Unit(s):   {(data.condition_ac_units >= 50) ?
                            (data.condition_ac_units == 100) ? "Perfect" : "Good"
                            : "Bad"}</li>
                          <li>Roof:   {(data.condition_roof >= 50) ?
                            (data.condition_roof == 100) ? "Perfect" : "Good"
                            : "Bad"}</li>
                          <li>Exterior Paint:  {(data.condition_exterior_paint >= 50) ?
                            (data.condition_exterior_paint == 100) ? "Perfect" : "Good"
                            : "Bad"}</li>
                          <li>Windows:   {(data.condition_windows >= 50) ?
                            (data.condition_windows == 100) ? "Perfect" : "Good"
                            : "Bad"}</li>
                          <li>Electrical panel:  {(data.condition_electrical_panel >= 50) ?
                            (data.condition_electrical_panel == 100) ? "Perfect" : "Good"
                            : "Bad"}</li>
                          <li>Hot water heater:  {(data.condition_water_heater >= 50) ?
                            (data.condition_water_heater == 100) ? "Perfect" : "Good"
                            : "Bad"}</li>
                          <li>Appliances:  {(data.condition_appliances >= 50) ?
                            (data.condition_appliances == 100) ? "Perfect" : "Good"
                            : "Bad"}</li>
                          <li>Pool/Pool equipment(if applicable):   {(data.condition_pool_equipment >= 50) ?
                            (data.condition_pool_equipment == 100) ? "Perfect" : "Good"
                            : "Bad"}</li>
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>
                : ""}
            </div>



          </TabContainer>}
          {value === 1 && <TabContainer className="tab-content-wrapper">
            <div className="card-block">
              <h4>Offers</h4>
              <Table className="basic-table-wrapper">
                <TableHead>
                  <TableRow>
                    <TableCell component="th" className="table-th">Buyer Name</TableCell>
                    <TableCell component="th" className="table-th">Offer Price</TableCell>
                    <TableCell component="th" className="table-th">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow className="table-row">
                    <TableCell component="td" scope="row" className="table-cell">John Doe</TableCell>
                    <TableCell component="td" scope="row" className="table-cell">$230,000</TableCell>
                    <TableCell component="td" scope="row" className="table-cell status-cell">
                      <button className="btn btn-primary">Accept</button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="table-row">
                    <TableCell component="td" scope="row" className="table-cell">Rob Brown</TableCell>
                    <TableCell component="td" scope="row" className="table-cell">$270,000</TableCell>
                    <TableCell component="td" scope="row" className="table-cell status-cell"><button className="btn btn-primary">Accept</button></TableCell>
                  </TableRow>
                  <TableRow className="table-row">
                    <TableCell component="td" scope="row" className="table-cell">John Doe</TableCell>
                    <TableCell component="td" scope="row" className="table-cell">$275,000</TableCell>
                    <TableCell component="td" scope="row" className="table-cell status-cell"><button className="btn btn-primary">Accept</button></TableCell>
                  </TableRow>
                  <TableRow className="table-row">
                    <TableCell component="td" scope="row" className="table-cell">Paul Smith</TableCell>
                    <TableCell component="td" scope="row" className="table-cell">$280,000</TableCell>
                    <TableCell component="td" scope="row" className="table-cell status-cell"><button className="btn btn-primary">Accept</button></TableCell>
                  </TableRow>
                  <TableRow className="table-row">
                    <TableCell component="td" scope="row" className="table-cell">Rob Brown</TableCell>
                    <TableCell component="td" scope="row" className="table-cell">$270,000</TableCell>
                    <TableCell component="td" scope="row" className="table-cell status-cell"><button className="btn btn-primary">Accept</button></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabContainer>}
          {value === 2 && <TabContainer className="tab-content-wrapper">
            <div className="gallery-wrapper">
              <ul className="photo-grid">
                {data.images.map(data => {
                  return (
                    <li>
                      <img src={constant.file_url + data.image_base_64} />
                    </li>
                  )
                })}
                <li className="add-photos-action">
                  <label for="edit-label" className="btn-text">Add Photos</label>
                  <input accept="image/x-png,image/jpeg" type="file" id="edit-label" name="property_image" onChange={(event) => {
                    this.props.image_upload(event, data.property_id)
                  }} className="edit-input" />
                </li>
              </ul>
            </div>
          </TabContainer>}
        </div>
      </div>
    )
  }
}

var Family = (data) => {
  // if (data.multifamily_units.length > 0) {

  //   return data.multifamily_units.map(family => {
  //     return (
  //       <ul className="flex-grid">
  //         <li>Bedroom : {family.bedrooms} </li>
  //         <li>Bathroom : {family.bathrooms} </li>
  //         {(family.rent_amount != undefined) ?
  //           <li>Rent amount : {family.rent_amount} </li> : ""
  //         }


  //       </ul>)
  //   })

  // }
  // else {
   // return (<div>dfs</div>)
  // }
}
const mapStateToProps = state => ({
  state

})
const actionCall = dispatch => ({
  image_upload: (event, property_id) => { dispatch(seller_properties_image_upload(event, property_id)) }
})
export default withRouter(connect(mapStateToProps, actionCall)(PropertyDetail))