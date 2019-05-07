import React from 'react';
import { forwardRef, useRef, useImperativeHandle } from "react"
import { LocationSearchInput } from "../../../index"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";
import { constant } from '../../../../config';
import { withRouter } from "../../../../utilities"
import "./style.css"

class ProperySearch extends React.Component {
    constructor(props) {
        super()
        this.state = { wellcome_video: false, street_address: "", city: "", state: "", postal_code: "" }
        this.locationRef
    }
    handleClose = () => {
        var d = new Date();
        var a = d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = "wellcome_video" + "=" + "true" + ";" + expires + ";path=/";
        this.setState({ wellcome_video: false })
    }
    componentDidMount() {

        var cookiedata = /(^|;\s?)wellcome_video=/.test(document.cookie)


        if (cookiedata == false) {
            this.setState({ wellcome_video: true })
        }
    }

    submit = (event) => {
        event.preventDefault();

        var { street_address, city, state, postal_code } = this.state
        if (street_address != "" || city != "" || state != "" || postal_code != "") {
            this.props.history.push({
                pathname: constant.frontend_url.seller_wizard,
                state: { location_search: this.state }
            })
        } else {
            this.locationRef.clearSearch()
        }

    }


    location_select = (street_address, city, state, postal_code) => {
        this.setState({ street_address: street_address, city: city, state: state, postal_code: postal_code })
    }

    render() {
        return (
            <div className="property-search-block">

                <Dialog className="customized-dialog-popup "
                    onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.wellcome_video}
                >
                    {/* <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                                    Welcome to offerlane !
                                </DialogTitle> */}
                    <DialogContent className="dialogContent-wrap">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/JAFnmMBwMCg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        <Button onClick={this.handleClose} color="primary" className="close-btn">
                            &times;
                                    </Button>
                    </DialogContent>
                </Dialog>


                <h1 data-aos="fade-up" data-aos-duration="1000">Get your property offer <br />in <span className="primary-color">24 Hours</span></h1>
                <p data-aos="fade-up" data-aos-duration="1000" className="lead-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                <div data-aos="fade-up" data-aos-duration="1000" className="search_form location-search">
                    <form method="post" onSubmit={this.submit}>
                        <LocationSearchInput setReference={(ref) => {
                            this.locationRef = ref
                        }}
                            location_select={this.location_select} className="input-text" placeholder="Enter Your Property Address " />
                        {/* <input type="text" className="input-text" placeholder="Enter Your Property Address " /> */}
                        <button type="submit" className="submit-btn">GO</button>
                    </form>

                </div>

            </div>

        )

    }
}


export default withRouter(ProperySearch)