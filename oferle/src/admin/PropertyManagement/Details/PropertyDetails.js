import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Table, TableHead, TableBody, TableRow, TableCell, Link } from "../../../utilities"
import { constant } from "../../../config/constant";
import { propertiesType } from "../../../config/floridaCounties";

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



class PropertyDetails extends React.Component {
   
    state={
        value:0,
        data:{
                   "details": {
                    "property_id": "643",
                    "user_id": "732",
                    "property_title": "bghjnm ",
                    "street_address": "1600 Pennsylvania Avenue Northwest",
                    "county_id": "29",
                    "state": "FL",
                    "zipcode": "20500",
                    "property_owner": "Owner",
                    "property_listedby_agent": null,
                    "owner_firstname": "Rajat",
                    "owner_lastname": "Doshi",
                    "property_type_id": "1",
                    "multifamily_units": "0",
                    "year_built": "2013",
                    "sq_ft": "56",
                    "is_garage": "0",
                    "howmany_carport": "0",
                    "ac_units": "",
                    "sewer": "0",
                    "hoa": "0",
                    "hoa_dues": null,
                    "hoa_paid": "",
                    "hoa_paid_other": "",
                    "community_amenities": "1",
                    "amenities_pool": "1",
                    "amenities_gym": "0",
                    "amenities_spa": "0",
                    "amenities_golf": "0",
                    "amenities_recreation_area": "0",
                    "amenities_other": "",
                    "condo_assocation": "0",
                    "condo_paid": "",
                    "condo_paid_other": "",
                    "55_community": "0",
                    "rental_restrictions": "0",
                    "rental_restrictions_description": "",
                    "cooling_system": "0",
                    "occupancy": "Vacant",
                    "created_at": "2019-03-05 11:01:15",
                    "update_at": null,
                    "visibility": "1",
                    "property_status": "1",
                    "brokerage_name": "",
                    "occupancy_rent_amount": "",
                    "zoning_info": null,
                    "condition_id": "615",
                    "condition_kitchen": "0",
                    "condition_bathrooms": "0",
                    "condition_interior_paint": "0",
                    "condition_flooring": "0",
                    "condition_ac_units": "0",
                    "condition_roof": "0",
                    "condition_exterior_paint": "0",
                    "condition_windows": "0",
                    "condition_electrical_panel": "0",
                    "condition_water_heater": "0",
                    "condition_appliances": "0",
                    "condition_pool_equipment": "0",
                    "other_condition_issue": null,
                    "unites_id": "598",
                    "bedrooms": "8",
                    "bathrooms": "6",
                    "rent_amount": null
                    },
                    "property_offers": [
                    {
                        "offer_id": "1",
                        "user_id": "732",
                        "property_id": "643",
                        "price_offered": "963.00",
                        "deposit_offered": "1284.00",
                        "inspection_days": "4",
                        "closing_days": "5",
                        "other_offer_terms": "",
                        "offer_status": "",
                        "first_name": "Rajat",
                        "last_name": "Doshi",
                        "company_name": "",
                        "email": "rajat@evincedev.com",
                        "phone": "7420038449",
                        "password": "Evince12#",
                        "user_type": "Seller",
                        "user_image": "user/732/42739_0.jpg",
                        "interested_counties": "",
                        "interested_properties": "",
                        "years_experience": "0",
                        "recent_properties": "0",
                        "proof_of_funds": "",
                        "other_notes": "",
                        "status": "0",
                        "isAdmin": "0",
                        "created_at": "2019-04-10 16:14:01",
                        "updated_at": null
                    },
                    {
                        "offer_id": "2",
                        "user_id": "732",
                        "property_id": "643",
                        "price_offered": "963.00",
                        "deposit_offered": "1284.00",
                        "inspection_days": "4",
                        "closing_days": "5",
                        "other_offer_terms": "",
                        "offer_status": "",
                        "first_name": "Rajat",
                        "last_name": "Doshi",
                        "company_name": "",
                        "email": "rajat@evincedev.com",
                        "phone": "7420038449",
                        "password": "Evince12#",
                        "user_type": "Seller",
                        "user_image": "user/732/42739_0.jpg",
                        "interested_counties": "",
                        "interested_properties": "",
                        "years_experience": "0",
                        "recent_properties": "0",
                        "proof_of_funds": "",
                        "other_notes": "",
                        "status": "0",
                        "isAdmin": "0",
                        "created_at": "2019-04-10 16:14:01",
                        "updated_at": null
                    },
                    {
                        "offer_id": "3",
                        "user_id": "732",
                        "property_id": "643",
                        "price_offered": "963.00",
                        "deposit_offered": "1284.00",
                        "inspection_days": "4",
                        "closing_days": "5",
                        "other_offer_terms": "test offer terms",
                        "offer_status": "",
                        "first_name": "Rajat",
                        "last_name": "Doshi",
                        "company_name": "",
                        "email": "rajat@evincedev.com",
                        "phone": "7420038449",
                        "password": "Evince12#",
                        "user_type": "Seller",
                        "user_image": "user/732/42739_0.jpg",
                        "interested_counties": "",
                        "interested_properties": "",
                        "years_experience": "0",
                        "recent_properties": "0",
                        "proof_of_funds": "",
                        "other_notes": "",
                        "status": "0",
                        "isAdmin": "0",
                        "created_at": "2019-04-10 16:14:01",
                        "updated_at": null
                    },
                    {
                        "offer_id": "4",
                        "user_id": "732",
                        "property_id": "643",
                        "price_offered": "963.00",
                        "deposit_offered": "1284.00",
                        "inspection_days": "4",
                        "closing_days": "5",
                        "other_offer_terms": "",
                        "offer_status": "",
                        "first_name": "Rajat",
                        "last_name": "Doshi",
                        "company_name": "",
                        "email": "rajat@evincedev.com",
                        "phone": "7420038449",
                        "password": "Evince12#",
                        "user_type": "Seller",
                        "user_image": "user/732/42739_0.jpg",
                        "interested_counties": "",
                        "interested_properties": "",
                        "years_experience": "0",
                        "recent_properties": "0",
                        "proof_of_funds": "",
                        "other_notes": "",
                        "status": "0",
                        "isAdmin": "0",
                        "created_at": "2019-04-10 16:14:01",
                        "updated_at": null
                    },
                    {
                        "offer_id": "5",
                        "user_id": "733",
                        "property_id": "643",
                        "price_offered": "963.00",
                        "deposit_offered": "1284.00",
                        "inspection_days": "4",
                        "closing_days": "5",
                        "other_offer_terms": "Hello test",
                        "offer_status": "",
                        "first_name": "Ramesh",
                        "last_name": "Chauhan",
                        "company_name": "",
                        "email": "ramesh@evincedev.com",
                        "phone": "65656565",
                        "password": "Evince12#",
                        "user_type": "Seller",
                        "user_image": "",
                        "interested_counties": "",
                        "interested_properties": "",
                        "years_experience": "0",
                        "recent_properties": "0",
                        "proof_of_funds": "",
                        "other_notes": "",
                        "status": "1",
                        "isAdmin": "0",
                        "created_at": "2019-04-27 16:33:56",
                        "updated_at": "2019-04-27 01:03:56"
                    },
                    {
                        "offer_id": "7",
                        "user_id": "732",
                        "property_id": "643",
                        "price_offered": "7.00",
                        "deposit_offered": "8.00",
                        "inspection_days": "9",
                        "closing_days": "10",
                        "other_offer_terms": "give me",
                        "offer_status": "",
                        "first_name": "Rajat",
                        "last_name": "Doshi",
                        "company_name": "",
                        "email": "rajat@evincedev.com",
                        "phone": "7420038449",
                        "password": "Evince12#",
                        "user_type": "Seller",
                        "user_image": "user/732/42739_0.jpg",
                        "interested_counties": "",
                        "interested_properties": "",
                        "years_experience": "0",
                        "recent_properties": "0",
                        "proof_of_funds": "",
                        "other_notes": "",
                        "status": "0",
                        "isAdmin": "0",
                        "created_at": "2019-04-10 16:14:01",
                        "updated_at": null
                    },
                    {
                        "offer_id": "8",
                        "user_id": "732",
                        "property_id": "643",
                        "price_offered": "7.00",
                        "deposit_offered": "8.00",
                        "inspection_days": "9",
                        "closing_days": "10",
                        "other_offer_terms": "give me",
                        "offer_status": "",
                        "first_name": "Rajat",
                        "last_name": "Doshi",
                        "company_name": "",
                        "email": "rajat@evincedev.com",
                        "phone": "7420038449",
                        "password": "Evince12#",
                        "user_type": "Seller",
                        "user_image": "user/732/42739_0.jpg",
                        "interested_counties": "",
                        "interested_properties": "",
                        "years_experience": "0",
                        "recent_properties": "0",
                        "proof_of_funds": "",
                        "other_notes": "",
                        "status": "0",
                        "isAdmin": "0",
                        "created_at": "2019-04-10 16:14:01",
                        "updated_at": null
                    },
                    {
                        "offer_id": "9",
                        "user_id": "732",
                        "property_id": "643",
                        "price_offered": "4.00",
                        "deposit_offered": "5.00",
                        "inspection_days": "56",
                        "closing_days": "66",
                        "other_offer_terms": "lakdfjl",
                        "offer_status": "",
                        "first_name": "Rajat",
                        "last_name": "Doshi",
                        "company_name": "",
                        "email": "rajat@evincedev.com",
                        "phone": "7420038449",
                        "password": "Evince12#",
                        "user_type": "Seller",
                        "user_image": "user/732/42739_0.jpg",
                        "interested_counties": "",
                        "interested_properties": "",
                        "years_experience": "0",
                        "recent_properties": "0",
                        "proof_of_funds": "",
                        "other_notes": "",
                        "status": "0",
                        "isAdmin": "0",
                        "created_at": "2019-04-10 16:14:01",
                        "updated_at": null
                    }
                    ],
                    "user_info": {
                    "user_id": "732",
                    "first_name": "Rajat",
                    "last_name": "Doshi",
                    "company_name": "",
                    "email": "rajat@evincedev.com",
                    "phone": "7420038449",
                    "password": "Evince12#",
                    "user_type": "Seller",
                    "user_image": "user/732/42739_0.jpg",
                    "interested_counties": "",
                    "interested_properties": "",
                    "years_experience": "0",
                    "recent_properties": "0",
                    "proof_of_funds": "",
                    "other_notes": "",
                    "status": "0",
                    "isAdmin": "0",
                    "created_at": "2019-04-10 16:14:01",
                    "updated_at": null
                    },
                    "property_images": [
                    {
                        "asset_id": "410",
                        "property_id": "643",
                        "image_base_64": "property/643/fantasy-landscape-wallpaper-1080p-144103.jpg",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "424",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-01-31_12-23-23.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "425",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-07-59.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "426",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-06-37.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "427",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-06-43.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "428",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-01-28_16-58-57.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "429",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-01-31_12-23-231.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "430",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-06-371.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "431",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-01-29_16-53-00.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "432",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-01-31_12-23-232.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "433",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-06-372.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "434",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-06-431.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "435",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-11-02.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "436",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-04_12-10-46.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "437",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-01-31_12-23-233.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "438",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-06-373.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "439",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-06-432.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "440",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-11-021.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "441",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-04_12-10-461.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "442",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-11-022.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "443",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-07-591.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "444",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-07-592.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "445",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-11-023.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "446",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-04_12-10-462.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "447",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-07-593.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "448",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-07-594.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "449",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-11-25.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "450",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-11-024.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "451",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-11-025.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "452",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-06-433.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "453",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-11-026.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "454",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-01-29_16-53-001.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "455",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-01-12_16-52-26.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "456",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-01-28_14-56-40.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "457",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-01-12_14-33-25.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "458",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-01-31_12-23-234.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "459",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-06-374.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "460",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-06-434.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "461",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-07-595.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "462",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-11-027.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "463",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-11-251.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "464",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-01-28_16-58-571.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "465",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-07_15-15-59.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "466",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-07_15-16-10.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "467",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-12_16-30-22.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "468",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-13_18-59-25.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "469",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-13_18-38-30.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "470",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-11_12-39-41.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "471",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-04_14-28-05.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "472",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-11_11-25-42.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "473",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-01-12_17-47-56.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "474",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-01-31_12-23-235.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "475",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-06-375.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "476",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-06-435.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "477",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-06-376.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "478",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-06-436.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "479",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-11-028.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "480",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-11-029.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "481",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-01-12_14-33-251.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "482",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-06-377.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "483",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-06-437.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "484",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-07-596.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "485",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-11-0210.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "486",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-11-252.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "487",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-07_15-15-591.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "488",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-04_14-28-051.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "489",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-01-12_14-33-252.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "490",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-06-378.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "491",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-06-438.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "492",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-07-597.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "493",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-11-0211.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "494",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-11-253.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "495",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-07_15-15-592.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "496",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-04_14-28-052.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "497",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-01-12_14-33-253.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "498",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-06-379.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "499",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-06-439.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "500",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-07-598.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "501",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-11-0212.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "502",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-11-254.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "503",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-07_15-15-593.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "504",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-04_14-28-053.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "505",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-01-28_14-56-401.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "506",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-01-31_12-23-236.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "507",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-11-255.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "508",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-11-0213.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "509",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-11-0214.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "510",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-07-599.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "511",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-01-28_16-58-572.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "512",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-11-256.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "513",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-01-29_16-53-002.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "514",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-06-3710.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "515",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-06-3711.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "516",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-06-4310.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "517",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-06-3712.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "518",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-06-4311.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "519",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-07-5910.png",
                        "main_image": "No"
                    },
                    {
                        "asset_id": "520",
                        "property_id": "643",
                        "image_base_64": "property/643/Screenshot_from_2019-02-01_17-11-0215.png",
                        "main_image": "No"
                    }
                    ]
             }
            
    }

   
    componentDidMount() {
        let property_id = this.props.location.state.propertydetails_id;
    
        fetch(constant.base_url + constant.server_url.fetch_detail, {
          method: "POST", // user_id is logged user id for sending request.
          body: "Data=" + JSON.stringify({ property_id: property_id }),
          headers: {
            Accept: "application/json",
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
          .then(res => res.json())
          .then(response => {           
            let responsedata = response.data;    
          
            if (response.status == 200) {
              this.setState({data: responsedata,modal: false,loader: false,dropdown: responsedata.status});
           //   this.setState(responsedata); // setting single local state...
           console.log(this.state.data);
            } else if (response.status == 401) {
              this.setState({ modal: true, loader: true });
            }
          });
      }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;
     //   console.log(this.state.data);
        // return (

        //     <div></div>
        // );
      
        return (
            <div className="tabs-main-wrapper">
                <AppBar position="static">
                    <Tabs TabIndicatorProps={{
                        style: {
                            backgroundColor: "#00d6c3"
                        }
                    }} value={value} onChange={this.handleChange}>
                        <Tab label="Properties Info" className="tabs" />
                        <Tab label="Offers" className="tabs" />
                        <Tab label="Properties Photos" className="tabs" />
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer className="tab-content-wrapper">

                    <div className="page-detail-wrapper properties-details">
                        <div className="row section-header">
                            <div className="col-sm-10">
                                <Typography variant="title" className="title">{this.state.data.details.property_title}</Typography>
                                <p className="address-text">{this.state.data.details.street_address}</p>
                            </div>
                            <div className="col-sm-2">
                                {/* <p className="price-text">{this.state.data.dataetails.price_offered}</p> */}
                            </div>
                        </div>
                        <Typography variant="subheading" className="subheading">About</Typography>
                        <div className="description about">
                            <p>{this.state.data.details["55_community"]}</p>
                        </div>
                        <Typography variant="subheading" className="subheading">Features</Typography>
                        <div className="listing-wrapper">
                            <Typography variant="h4" className="h4-heading">Basic Details</Typography>

                            <ul className="flex-grid">
                                <li>Type of Property:  {this.state.data.details.property_type_id}</li>
                                <li>Bedrooms: {this.state.data.details.bedrooms}</li>
                                <li>Bathrooms: {this.state.data.details.bathrooms}</li>
                                <li>Year Built: {this.state.data.details.year_built}</li>
                                <li>Sq ft: {this.state.data.details.sq_ft}</li>
                                <li>Garage: {this.state.data.details.is_garage}</li>
                                <li>Cooling System: {this.state.data.details.cooling_system} </li>
                                <li>Waste water system: {this.state.data.details.wastewatersystem}</li>
                            </ul>
                        </div>

                        <div className="listing-wrapper">
                            <Typography variant="h4" className="h4-heading">Community Info</Typography>

                            <ul className="flex-grid">
                                <li>HOA:  {this.state.data.details.hoa}</li>
                                <li>Communities Aminities:  {this.state.data.details.community_amenities}</li>
                                <li>Condo Association:  {this.state.data.details.condo_assocation}</li>
                                <li>55+ Community:  {this.state.data.details["55_community"]}</li>
                                <li>Rental Restrictions for new owners:  {this.state.data.details.rental_restrictions_description}</li>
                            </ul>
                        </div>


                        <Typography variant="subheading" className="subheading">House Condition</Typography>
                        <div className="listing-wrapper">
                            <ul className="flex-grid">
                                <li>Kitchen : {this.state.data.details.condition_kitchen}</li>
                                <li>Ac Unit(s): {this.state.data.details.ac_units}</li>
                                <li>Electrical Panel: {this.state.data.details.condition_electrical_panel}</li>
                                <li>Bathroom: {this.state.data.details.condition_bathrooms}</li>
                                <li>Roof: {this.state.data.details.condition_roof}</li>
                                <li>Hot Water Heater: {this.state.data.details.condition_water_heater}</li>
                                <li>Interior Paint: {this.state.data.details.condition_interior_paint} </li>
                                <li>Exterior Paint: {this.state.data.details.condition_exterior_paint}</li>
                                <li>Appliances: {this.state.data.details.condition_appliances}</li>
                                <li>Flooring: {this.state.data.details.condition_flooring}</li>
                               
                                <li>Windows: {this.state.data.details.condition_windows}</li>
                                <li>Pool/Pool equipment(if applicable): {this.state.data.details.condition_pool_equipment}</li>
                            </ul>
                        </div>
                        <Typography variant="subheading" className="subheading">Discription</Typography>
                        <div className="description">
                            <p>{this.state.data.description}</p>
                        </div>

                        <Typography variant="subheading" className="subheading">Listed By</Typography>
                        <div className="listing-wrapper">
                            <ul className="flex-grid">
                                <li>Company: {this.state.data.user_info.company_name}</li>
                                <li>Seller/Agent Name: {this.state.data.details.property_listedby_agent}</li>
                                <li>Email: {this.state.data.user_info.email}</li>
                                <li>Phone Number: {this.state.data.user_info.phone}</li>
                                <li>License Number: {this.state.data.user_info.licence_number}</li>
                                <li>Address: {this.state.data.user_info.street_address}</li>
                            </ul>
                        </div>
                    </div>

                </TabContainer>}
                {value === 1 && <TabContainer className="tab-content-wrapper">

                    <div className="page-detail-wrapper properties-details">
                        <Typography variant="title" className="title">Offers</Typography>

                        <Table className="basic-table-wrapper">
                            <TableHead>
                                <TableRow>
                                    <TableCell component="th" className="table-th">Buyer Name</TableCell>
                                    <TableCell component="th" className="table-th">Offer Price</TableCell>
                                    <TableCell component="th" className="table-th">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                               { 
                                   
                                this.state.data.property_offers.map((k)=>{
                                   return (
                                    <TableRow className="table-row">
                                    <TableCell component="td" scope="row" className="table-cell">{k.first_name+' '+k.last_name}</TableCell>
                                    <TableCell component="td" scope="row" className="table-cell">{k.price_offered}</TableCell>
                                    <TableCell component="td" scope="row" className="table-cell status-cell">{k.offer_status==''? 'Reviewing':'Accepted'}</TableCell>
                                    </TableRow> );
                                        
                                    })
                                    
                                }
                            </TableBody>
                        </Table>
                    </div>
                </TabContainer>}
                {value === 2 && <TabContainer className="tab-content-wrapper">

                    <div className="page-detail-wrapper properties-photos">

                        <ul>
                            {

                                this.state.data.property_images.map((v)=>{
                                    
                                    return (
                                    <li>
                                    <img src={constant.file_url+v.image_base_64} alt="" />
                                     </li>
                                    );
                                })

                            }
                            
                         
                            

                        </ul>

                    </div>

                </TabContainer>}
            </div>
        );
    }
}

PropertyDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default PropertyDetails
