import React from 'react';
//import ReactDOM from 'react-dom';
import { /*BrowserRouter as Router, Switch, Route,*/ Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Moment from 'react-moment';

//For Notifications
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {Header,Footer} from "../index"
var userdata = "";

export class UserManagement extends React.Component {
    constructor(props) {
        super(props);
        document.title = "User Management"
        this.state = { users: [], activePage: 1, totalRecord: -1, limit: 5, userName: "", Email: "", skip: 0, Success: "Updated List", details: [] }
        this.sync = this.sync.bind(this);
        this.Pagination = this.Pagination.bind(this);
        this.search = this.search.bind(this);
        this.DisableStatus = this.DisableStatus.bind(this);
        this.MakeAdmin = this.MakeAdmin.bind(this);
        this.viewDetails = this.viewDetails.bind(this);

        if ("" === localStorage.getItem("authId") || null === localStorage.getItem("authId")) {
            this.props.history.push("/");
        } else {
            userdata = JSON.parse(localStorage.getItem("authId"));
            if (1 !== userdata.isNetAdmin) {
                this.props.history.push("/");
            }
        }
    }

    search(event) {
        // alert(event.target.name+"  "+event.target.value);
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ activePage: 1, skip: 0 });
        setTimeout(function () {
            this.componentDidMount()
        }.bind(this), 1000);
    }

    Pagination(pageNumber) {
        this.setState({ activePage: pageNumber });
        this.setState({ skip: this.state.limit * pageNumber - this.state.limit });
        setTimeout(function () {
            this.componentDidMount()
        }.bind(this), 1000);
    }

    sync() {
        fetch("/UserManagement/Sync", {
            method: 'post',
            mode: 'cors',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'Data=' + JSON.stringify(this.state)
        })
            .then(res => res.json())
            .then(setTimeout(
                function () {
                    this.componentDidMount()
                }
                    .bind(this),
                1000
            ))
            .then(NotificationManager.info("","User Syncronization Completed!"))
            .catch(function (error) {
                console.log('Request failed', error);
            });
    }

    DisableStatus(index, status) {
        fetch('/UserManagement/user-disable/' + index + "/" + status)
            .then(res => res.json())
            .then(products => {
                (products.affectedRows === 1) ? this.componentDidMount() : ""
            })
            .then(NotificationManager.info("", (0 === status) ? "User Activated" : "User Deactivated"));
    }

    viewDetails(id) {
        fetch("/UserManagement/product-detail/" + id, {
            method: 'post',
            mode: 'cors',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'Data=' + JSON.stringify(this.state)
        })
            .then(res => res.json())
            .then(details => this.setState({ details: details }))
            .catch(function (error) {
                console.log('Request failed', error);
            });
    }

    componentDidMount(limit, skip) {
        document.getElementById("overlayParent").classList.add("overlay");
        document.getElementById("overlayChild").classList.remove("childOverlay");
        fetch("/UserManagement/user-list/", {
            method: 'post',
            mode: 'cors',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'Data=' + JSON.stringify(this.state)
        })
            .then(res => res.json())
            .then(users => this.setState({ users: users.response, totalRecord: users.totalRecord }))
            .then(document.getElementById("overlayParent").classList.remove("overlay"))
            .then(document.getElementById("overlayChild").classList.add("childOverlay"))
            .catch(function (error) { console.log('Request failed', error); });
    }

    MakeAdmin(index, status) {
        fetch('/UserManagement/make-admin/' + index + "/" + status)
            .then(res => res.json())
            .then(products => {
                (products.affectedRows === 1) ? this.componentDidMount() : ""
            })
            .then(NotificationManager.info("", (0 === status) ? "User is now Network Admin" : "User removed as Network Admin"));
    }

    render() {
        return (
            <div className="page-content-wrapper">
                <Header />
                <div id="overlayParent">
                    <div id="overlayChild" className="childOverlay">Loading.....</div>
                </div>
                <div className="page-content">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="page-title">User Management</h3>
                            <ul className="page-breadcrumb breadcrumb">
                                <li>
                                    <i className="fa fa-home"></i>
                                    <Link to="/Dashboard">Home</Link>
                                    <i className="fa f7a-angle-right"></i>
                                </li>
                                <li><a href="/UserManagement">User Management</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            {/* Begin: life time stats */}
                            <div className="portlet box">
                                <div className="portlet-title blue-grid">
                                    <div className="caption">
                                        <i class="fa fa-ticket" aria-hidden="true"></i> User Management
                                    </div>
                                    <button className="btn btn-primary sync add-more-btn" onClick={this.sync}>Sync</button>
                                </div>
                                <div className="portlet-body user-managememt-section">
                                    <div className="table-container">
                                        <div className="records-section">
                                            <select name="rajat" onChange={(event) => {
                                                this.setState({ limit: event.target.value }); setTimeout(function () {
                                                    this.componentDidMount()
                                                }.bind(this), 1000);
                                            }}>
                                                <option value={5}>5</option>
                                                <option value={10}>10</option>
                                                <option value={25}>25</option>
                                                <option value={50}>50</option>
                                                <option value={100}>100</option>
                                                <option value={this.state.totalRecord}>All records</option>
                                            </select> records
                                   </div>
                                        <table className="table table-striped table-bordered table-hover" id="datatable_products">
                                            <thead>
                                                <tr role="row" className="heading">
                                                    <th width="10%">User ID</th>
                                                    <th width="10%">Punching Id</th>
                                                    <th width="10%">Name</th>
                                                    <th width="10%">Email</th>
                                                    <th width="10%">Department</th>
                                                    <th width="10%">Joining Date</th>
                                                    <th width="10%">Status</th>
                                                    <th width="30%">Actions</th>
                                                </tr>
                                                <tr role="row" className="filter">
                                                    <td>
                                                    <input type="number" className="form-control form-filter input-sm" name="Id"  onChange={this.search} />
                                                    </td>
                                                    <td>
                                                    
                                                    </td>
                                                    <td>
                                                        <input type="text" className="form-control form-filter input-sm" name="userName" value={this.state.userName} onChange={this.search} />
                                                    </td>

                                                    <td>
                                                        <input type="text" className="form-control form-filter input-sm" name="Email" value={this.state.Email} onChange={this.search} />
                                                    </td>
                                                    <td> </td>
                                                    <td>
                                                        <select name="product_status" name="JoiningDate" onChange={this.search} className="form-control form-filter input-sm">
                                                            <option value="null">Sort</option>
                                                            <option value="1">OrderBy Date</option>

                                                        </select>
                                                    </td>
                                                    <td>
                                                        <select name="product_status" name="bStatus" onChange={this.search} className="form-control form-filter input-sm">
                                                            <option value="null">Select...</option>
                                                            <option value="1">Active</option>
                                                            <option value="0">Deactive</option>
                                                        </select>
                                                    </td>

                                                    <td><div className="margin-bottom-5"></div></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(this.state.users.length > 0) ? this.state.users.map(user => <tr>
                                                    <td>{user.Id}</td>
                                                    <td>{user.PunchingId}</td>
                                                    <td>{user.Name}</td>
                                                    <td>{user.UserName}</td>
                                                    <td>{user.Department}</td>
                                                    <td> <Moment format="YYYY/MM/DD">{user.JoiningDate}</Moment> </td>
                                                    <td>{(user.IsActive === 1) ? "Active" : "Deactive"}</td>
                                                    <td>
                                                        <button className="btn btn-sm red filter-cancel" onClick={() => this.DisableStatus(user.Id, user.IsActive)} > {(user.IsActive === 1) ? <span><i class="fa fa-ban" aria-hidden="true"></i> Deactivate</span> : <span><i class="fa fa-check" aria-hidden="true"></i> Activate</span>}</button>
                                                        <button className="btn btn-primary" onClick={() => this.MakeAdmin(user.Id, user.isNetAdmin)}>{(user.isNetAdmin === 1) ? <span><i class="fa fa-user-times" aria-hidden="true"></i> Remove From Admin </span> : <span><i class="fa fa-user-circle-o" aria-hidden="true"></i> Make as Admin</span>}</button>
                                                        <button className="btn btn-info" onClick={() => this.viewDetails(user.Id)} data-toggle="modal" data-target="#myModal"><i class="fa fa-reply-all" aria-hidden="true"></i> View Inventory</button>
                                                    </td>
                                                </tr>) : <tr><td colSpan={7}> <h3>Data not found</h3></td></tr>}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="pagination-section">
                                        <div className="show-record-section">Showing  {(this.state.users.length > 0) ? (this.state.skip + 1) + " to " + (parseInt(this.state.users.length) + parseInt(this.state.skip)) + " of " + this.state.totalRecord : ""} entries</div>
                                        <Pagination
                                            activePage={this.state.activePage}
                                            itemsCountPerPage={this.state.limit}
                                            totalItemsCount={this.state.totalRecord}
                                            pageRangeDisplayed={2}
                                            onChange={this.Pagination}
                                        />
                                    </div>
                                </div>

                                <div className="modal user-managament-modal fade" id="myModal" role="dialog">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="row thumbnail">
                                                    <div className="col-lg-3">Product Id</div>

                                                    <div className="col-lg-3">Product name</div>
                                                    <div className="col-lg-3">Status</div>
                                                    <div className="col-lg-3">Date </div>
                                                </div>
                                                {this.state.details.map(details =>
                                                    <div className="row">
                                                        <div className="col-lg-3">{details.iProductId}</div>

                                                        <div className="col-lg-3">{details.vName}</div>
                                                        <div className="col-lg-3">{(details.productStatus == 1) ? "Active" : "Deactive"}</div>
                                                        <div className="col-lg-3"><Moment format="YYYY/MM/DD">{details.dtCrateAt}</Moment></div>
                                                    </div>
                                                )}
                                                {(this.state.details.length === 0) ? "No data found" : ""}
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            {/* End: life time stats */}
                        </div>
                    </div>
                </div>
                <NotificationContainer />
                <Footer />
            </div>
        );
    }
}