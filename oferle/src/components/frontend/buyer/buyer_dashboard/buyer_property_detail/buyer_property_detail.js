import React from "react"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Table, TableHead, TableBody, TableRow, TableCell, Link } from "../../../../../utilities"

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

class BuyerPropertyDetail extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };


    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className="col-main col-sm-9 for_safari seller-dashboard grey-bg">

                <h3 className="section-heading">Properties details</h3>


                <div className="tabs-main-wrapper">
                    <AppBar position="static">
                        <Tabs TabIndicatorProps={{
                            style: {
                                backgroundColor: "#00d6c3"
                            }
                        }} value={value} onChange={this.handleChange}>
                            <Tab label="Properties Info" className="tabs" />
                            <Tab label="Properties Photos" className="tabs" />
                        </Tabs>
                    </AppBar>
                    {value === 0 && <TabContainer className="tab-content-wrapper">

                        <div className="row">
                            <div className="left-block-wrapper col-sm-8">
                                <div className="card-block">
                                    <h4>About Property</h4>
                                    <div className="prop-details-wrapper">
                                        <div className="property-name">3 BHK Apartment</div>
                                        <p className="property-address">Palm Harbor, Florida 34683</p>
                                        <div className="info-title">Description</div>
                                        <p className="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumasan lacus vel facilisis. Sit amet, consectetur adipiscing elit, sed do risus commodo viverra maecenas accumsan lacus vel facilisis.
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Sit amet, consectetur
                                            adipiscing elit, sed do risus commodo viverra maecenas accumsan lacus vel facilisis.</p>

                                    </div>

                                </div>

                                <div className="card-block">
                                    <h4>Features</h4>
                                    <div className="prop-details-wrapper">
                                        <div className="info-title">Basic Details</div>
                                        <div className="listing-wrapper">
                                            <ul className="flex-grid">
                                                <li>Type of Property: Single Family</li>
                                                <li>Bedrooms: 3</li>
                                                <li>Bathrooms: 3</li>
                                                <li>Year Built: 2002</li>
                                                <li>Sq ft: 2000</li>
                                                <li>Garage: No</li>
                                                <li>Cooling System: Central AC </li>
                                                <li>Waste water system: Septic</li>
                                            </ul>
                                        </div>

                                    </div>
                                    <div className="prop-details-wrapper">
                                        <div className="info-title">Community Info</div>
                                        <div className="listing-wrapper">
                                            <ul className="flex-grid">
                                                <li>Type of Property: Single Family</li>
                                                <li>Bedrooms: 3</li>
                                                <li>Bathrooms: 3</li>
                                                <li>Year Built: 2002</li>
                                                <li>Sq ft: 2000</li>
                                                <li>Garage: No</li>
                                                <li>Cooling System: Central AC </li>
                                                <li>Waste water system: Septic</li>
                                            </ul>
                                        </div>

                                    </div>

                                </div>

                                <div className="card-block">
                                    <h4>List By</h4>
                                    <div className="prop-details-wrapper">

                                        <div className="listing-wrapper">
                                            <ul className="flex-grid">
                                                <li>Comapny Phone: Xyz Real state</li>
                                                <li>Phone Number: +044 12457878</li>
                                                <li>Seller/Agent Name: Michael Jackson</li>
                                                <li>Email: michael@example.com</li>
                                                <li>License NUmber: 1545578178487</li>
                                                <li>Address: Palm Harbor, Florida 34683</li>
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
                                                <li>Brokerage Commissions Document <a href="#"><span className="download-icon"><img src={require('../images/download-icon.png')} /></span></a> </li>
                                                <li>Purchase and sale Agreement <a href="#"><span className="download-icon"><img src={require('../images/download-icon.png')} /></span></a> </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>



                            </div>



                            <div className="right-block-wrapper col-sm-4">
                                <div className="card-block">
                                    <h4>Offers</h4>
                                    <Table className="basic-table-wrapper">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell component="th" className="table-th">Offer Price</TableCell>
                                                <TableCell component="th" className="table-th">Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            <TableRow className="table-row">
                                                <TableCell component="td" scope="row" className="table-cell">$230,000</TableCell>
                                                <TableCell component="td" scope="row" className="table-cell status-cell">
                                                    Accepted
                                        </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>

                                <div className="card-block">
                                    <h4>House Condition</h4>
                                    <div className="prop-details-wrapper">

                                        <div className="listing-wrapper">
                                            <ul className="flex-grid single-item">
                                                <li>Kitchen:  Good</li>
                                                <li>Bathroom:  Average</li>
                                                <li>Interior Paint:  Good</li>
                                                <li>Flooring:  Perfect</li>
                                                <li>Ac Unit(s):  Good</li>
                                                <li>Roof:  Average</li>
                                                <li>Exterior Paint:  N/A</li>
                                                <li>Windows:  Good</li>
                                                <li>Electrical panel:  Good</li>
                                                <li>Hot water heater:  N/A</li>
                                                <li>Appliances:  Perfect</li>
                                                <li>Pool/Pool equipment(if applicable):  No</li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>



                    </TabContainer>}
                    {value === 1 && <TabContainer className="tab-content-wrapper">

                        <div className="gallery-wrapper">

                            <ul className="photo-grid">
                                <li>
                                    <img src={require('../images/photo-gallery-01.jpg')} />
                                </li>
                                <li>
                                    <img src={require('../images/photo-gallery-02.jpg')} />
                                </li>
                                <li>
                                    <img src={require('../images/photo-gallery-03.jpg')} />
                                </li>
                                <li>
                                    <img src={require('../images/photo-gallery-04.jpg')} />
                                </li>
                                <li>
                                    <img src={require('../images/photo-gallery-01.jpg')} />
                                </li>
                                <li>
                                    <img src={require('../images/photo-gallery-02.jpg')} />
                                </li>
                                <li>
                                    <img src={require('../images/photo-gallery-03.jpg')} />
                                </li>
                                <li>
                                    <img src={require('../images/photo-gallery-04.jpg')} />
                                </li>

                                <li>
                                    <img src={require('../images/photo-gallery-01.jpg')} />
                                </li>



                            </ul>


                        </div>

                    </TabContainer>}
                </div>

            </div>

        )
    }
}

export default BuyerPropertyDetail