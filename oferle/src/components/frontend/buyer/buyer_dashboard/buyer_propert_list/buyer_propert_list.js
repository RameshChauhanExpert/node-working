

import React from "react"
import { Link as LinkUrl, withRouter, connect } from "../../../../../utilities"
import { seller_detail } from "../../../../../action";
import { constant } from "../../../../../config";

class BuyerPropertyList extends React.Component {

  constructor(props) {
    super(props)
  }


  componentDidMount() {
    this.props.seller_detail(localStorage.getItem("token_id"))
  }

  render() {
    return (
      <div className="frontend-dashboard">
        <div className="row">
          <div className="col-main col-sm-9">
            <h3 className="page-title">Properties</h3>
            <div className="properties-grid">
              <div className="row">
                <div className="col-sm-3 grid-item">
                  <div className="grid-card">
                    <div className="figure">
                    <span className="notification">Notification <span className="count">2</span></span>
                      <img src={require('./img/photo001.jpg')} alt="" />
                      <div className="badge_text">Accepting Offers</div>
                    </div>
                    <div className="figure-caption">
                      <div className="property-name-info">
                        <h4>Cozy Apartment</h4>
                        <p>1158 Carson Ave New York</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3 grid-item">
                  <div className="grid-card">
                    <div className="figure">
                    <span className="notification">Notification <span className="count">2</span></span>
                      <img src={require('./img/photo001.jpg')} alt="" />
                      <div className="badge_text">Sold</div>
                    </div>
                    <div className="figure-caption">
                      <div className="property-name-info">
                        <h4>Cozy Apartment</h4>
                        <p>1158 Carson Ave New York</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3 grid-item">
                  <div className="grid-card">
                    <div className="figure">
                    <span className="notification">Notification <span className="count">2</span></span>
                      <img src={require('./img/photo001.jpg')} alt="" />
                      <div className="badge_text">Your offer Accepted</div>
                    </div>
                    <div className="figure-caption">
                      <div className="property-name-info">
                        <h4>Cozy Apartment</h4>
                        <p>1158 Carson Ave New York</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export default withRouter(connect(mapStateToPropss, actionCalls)(BuyerPropertyList))
