

import React from "react"
import { Link as LinkUrl, withRouter, connect } from "../../../utilities"
import { seller_detail } from "../../../action";
import { constant } from "../../../config";

class SellerPropertyListing extends React.Component {

  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.seller_detail(localStorage.getItem("token_id"))
  }
  render() {
    return (

      <div className="col-main col-sm-9 for_safari">
        <h3 className="page-title">Properties</h3>
        {(this.props.state.seller_dashboard.user_detail.length > 0) ? (this.props.state.seller_dashboard.user_detail[0].street_address == undefined) ? "No property found !" : "" : ""}
        <div className="properties-grid">
          <div className="row">
            {(this.props.state.seller_dashboard.user_detail.length > 0) ?

              this.props.state.seller_dashboard.user_detail.map(data => {
                if (data.street_address != null) {
                  return (
                    <div className="col-sm-3 grid-item">
                      <div className="grid-card">
                        <div class="figure">
                          {/* <span className="notification">Notification <span className="count">2</span></span> */}
                          {(data.image_base_64 == null) ? <img src={require('./img/photo001.jpg')} alt="" /> :
                            <img src={constant.file_url + data.image_base_64} alt="" />}
                          { /* <div className="badge_text">Sold</div>*/ }
                        </div>
                        <div class="figure-caption">
                          <div class="property-name-info">
                            {/* <h4>Cozy Apartment</h4> */}
                            <p className="address_name">{data.street_address + "," + data.city + "," + data.state}</p>
                            <div class="profile-status">
                              {(data.image_base_64 == null) ?
                                <div class="profile-progress-bar">
                                  <div class="progressing-bar" style={{ width: '90%' }}></div>
                                </div> : <div class="profile-progress-bar">
                                  <div class="progressing-bar" style={{ width: '100%' }}></div>
                                </div>}
                              {(data.image_base_64 == null) ? <span className="help-text">80% profile completed</span> :
                                <span className="help-text">100% profile completed</span>
                              }
                            </div>
                            <div className="details-offer">
                              <span>Offers Received: <span className="count">40</span></span>
                              <span className="btn btn-small">
                                <LinkUrl to={{ pathname: constant.frontend_url.seller_property_detail, state: { data: data } }}> Details </LinkUrl>
                              </span>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>)
                }
              })
              : ""}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToPropss = state => ({
  state
})
const actionCalls = dispatch => ({
  seller_detail: (token) => { dispatch(seller_detail(token)) }
})

export default withRouter(connect(mapStateToPropss, actionCalls)(SellerPropertyListing))
