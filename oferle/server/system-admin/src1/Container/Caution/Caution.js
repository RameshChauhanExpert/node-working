import React from 'react';
//import ReactDOM from 'react-dom';
import { /*BrowserRouter as Router, Switch, Route,*/ Link } from 'react-router-dom';
import Pagination from "react-js-pagination";

import Moment from 'react-moment';
import { Modal, Button } from 'antd';

import {Header,Footer} from "../index";

//For Notifications
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Switch, Icon } from 'antd';
var userdata = "";

export class Caution extends React.Component {
	constructor(props) {
		super(props);
		document.title = "Ticket"
		if ("" === localStorage.getItem("authId") || null === localStorage.getItem("authId")) {
			this.props.history.push("/");
		} else {
			userdata = JSON.parse(localStorage.getItem("authId"));
		}
		this.state = { visible: false, Caution: [], activePage: 1, totalRecord: -1, limit: 5, skip: 0, ticketName: "", iCreateId: userdata.Id, ticketDetails: [], ticketData: [] }
		this.DisableStatus = this.DisableStatus.bind(this);
		this.Pagination = this.Pagination.bind(this);
		this.search = this.search.bind(this);
	}
	showModal = (iTicketId) => {

		fetch("/ticket/ticket-detail", {
			method: 'post',
			mode: 'cors',
			headers: {
				"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			body: 'Data=' + JSON.stringify({ iTicketId: iTicketId })
		})
			.then(res => res.json())
			.then(ticketDetails => this.setState({ ticketDetails: ticketDetails.ticketDetail, ticketData: ticketDetails.ticketData }))

			.catch(function (error) {
				console.log('Request failed', error);
			});

		//console.log(this.state.ticketData)
		this.setState({
			visible: true,
		});
	}

	handleOk = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
	}
	componentDidMount() {
		document.getElementById("overlayParent").classList.add("overlay");
		document.getElementById("overlayChild").classList.remove("childOverlay");
		if (this.props.location.state && this.props.location.state.Success != null) {
			NotificationManager.success('Success Message', this.props.location.state.Success)
			this.props.history.push("/Caution", { Success: null })
		}
		fetch("/ticket/ticket-list", {
			method: 'post',
			mode: 'cors',
			headers: {
				"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			body: 'Data=' + JSON.stringify(this.state)
		})
			.then(res => res.json())
			.then(fetchData => this.setState({ Caution: fetchData.response, totalRecord: fetchData.totalRecord }))
			.then(document.getElementById("overlayParent").classList.remove("overlay"))
			.then(document.getElementById("overlayChild").classList.add("childOverlay"))
			.catch(function (error) {
				console.log('Request failed', error);
			});
	}

	search(event) {
		this.setState({ [event.target.name]: event.target.value });
		this.setState({ activePage: 1, skip: 0 });

		setTimeout(function () {
			this.componentDidMount()
		}.bind(this), 1000);
	}

	DisableStatus(index, status) {
		fetch('/ticket/ticket-disable/' + index + "/" + status)
			.then(res => res.json())
			.then(products => {
				(products.affectedRows === 1) ? this.componentDidMount() : ""
			})
			.then(NotificationManager.info(("Resolve" == status || "Close" == status) ? "Ticket Close" : "Ticket Open"));
	}

	Pagination(pageNumber) {
		console.log(`active page is ${pageNumber}`);
		this.setState({ activePage: pageNumber });
		this.setState({ skip: this.state.limit * pageNumber - this.state.limit });
		this.componentDidMount(this.state.limit, this.state.skip);
		setTimeout(function () {
			this.componentDidMount()

		}.bind(this), 1000);
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
							<h3 className="page-title">Ticket</h3>
							<ul className="page-breadcrumb breadcrumb">
								<li>
									<i className="fa fa-home"></i>
									<Link to="/Dashboard">Home </Link>
									<i className="fa fa-angle-right"></i>
								</li>
								<li><Link to="/Caution">Ticket </Link></li>
							</ul>
						</div>
					</div>


					<div className="row">
						<div className="col-md-12">
							{/* Begin: life time stats */}
							<div className="portlet box">
								<div className="portlet-title blue-grid">
									<div className="caption">
										<i class="fa fa-ticket" aria-hidden="true"></i>Ticket
							</div>
									<div className="actions">
										<Link to="/Caution_Add" className="btn btn-primary add-more-btn">Ticket Generate </Link>
									</div>
								</div>
								<div className="portlet-body">
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
													<th width="10%">
														Ticket ID
													</th>

													<th width="15%">
														Title
									</th>

													<th>Assigned To</th>
													<th>Priority</th>
													<th>
														Created Date
										</th>
													<th>Resolved Date</th>
													<th width="10%">
														Status
									</th>




													<th width="20%">
														Actions
									</th>
												</tr>
												<tr role="row" className="filter">
													<td>
														<input type="number" className="form-control form-filter input-sm" onChange={this.search} name="iTicketId" />
													</td>

													<td>
														<input type="text" className="form-control form-filter input-sm" value={this.state.ticketName} onChange={this.search} name="ticketName" />
													</td>




													<td> </td>
													<td>
														<div className="margin-bottom-5">

														</div>

													</td>
													<td></td>

													<td>

													</td>
													<td><select name="bStatus" onChange={this.search} className="form-control form-filter input-sm">
														<option value="">Select...</option>
														<option value="Open">Open</option>
														<option value="InProgress">In Progress</option>
														<option value="Resolved">Resolved</option>
														<option value="Reopen">Reopen</option>
														<option value="Close">Close</option>

													</select></td>
													<td> </td>
												</tr>
											</thead>
											<tbody>
												{(this.state.Caution.length > 0) ? this.state.Caution.map(Caution => <tr>
													<td>{Caution.iTicketId}</td>
													<td>{Caution.vTitle}</td>


													<td>{Caution.Name}</td>

													<td>{Caution.vPriority}</td>
													<td><Moment format="YYYY-MM-DD hh:mm a">{Caution.dtCreateAt}</Moment></td>
													<td>{(Caution.vCurrentStatus == "Resolved") ? <Moment format="YYYY/MM/DD hh:mm a">{Caution.dtUpdateAt}</Moment> : "N/A"}</td>
													<td>{Caution.vCurrentStatus} </td>


													<td>
														<Link to={'/Edit_ticket/' + Caution.iTicketId} params={{ id: "hello" }} ><button className="btn btn-sm primary  filter-cancel"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button></Link>
														<button className="btn btn-sm primary" onClick={() => { this.showModal(Caution.iTicketId) }} ><i class="fa fa-eye" aria-hidden="true"></i> View Ticket</button>
														{/* <button className="btn btn-sm red filter-cancel" onClick={() => this.DisableStatus(Caution.iTicketId,(Caution.vCurrentStatus=="Close"||Caution.vCurrentStatus=="Resolve") ?"Open":"Close")}> {(Caution.vCurrentStatus=="Close"||Caution.vCurrentStatus=="Resolve") ?"Open":"Close"}</button> */}
													</td>

												</tr>) : <tr><td colSpan={8}> <h3>Data not found</h3></td></tr>}
											</tbody>

										</table>

									</div>
									<div className="pagination-section">
										<div className="show-record-section">Showing {(this.state.Caution.length > 0) ? (this.state.skip + 1) + " to " + (parseInt(this.state.Caution.length) + parseInt(this.state.skip)) + " of " + this.state.totalRecord : ""} entries</div>
										<Pagination
											activePage={this.state.activePage}
											itemsCountPerPage={this.state.limit}
											totalItemsCount={this.state.totalRecord}
											pageRangeDisplayed={2}
											onChange={this.Pagination}
										/>
									</div>
								</div>



							</div>
							{/* End: life time stats */}
						</div>
					</div>
				</div>
				<Modal
					title="Ticket History"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleOk}
					className="ticket-history-div"
				>
					<table className="table" cellspacing="1">
						<thead>
							<tr>
								<th>Ticket Id</th>
								<th>Ticket</th>
								<th>Priority</th>
								<th>Created Date</th>
								<th>Status</th>
							</tr>
						</thead>

						{(this.state.ticketData.length > 0) ? <tbody>
							<tr>
								<td>{this.state.ticketData[0].iTicketId}</td>
								<td>{this.state.ticketData[0].vTitle}</td>
								<td>{this.state.ticketData[0].vPriority}</td>
								<td><Moment format="YYYY/MM/DD">{this.state.ticketData[0].dtCreateAt}</Moment></td>
								<td>{this.state.ticketData[0].vCurrentStatus}</td>
							</tr>
							<tr>
								<td colSpan="5" className="seperator"></td>
							</tr>
							<tr>
								<td colSpan={2}>Reporter</td>
								<td colSpan={3}>{this.state.ticketData[0].assignBy}</td>
							</tr>
							<tr>
								<td colSpan={2}>Assigned To</td>
								<td colSpan={3}>{this.state.ticketData[0].assignTo}</td>
							</tr>
							<tr>
								<td colSpan={2}>Status</td>
								<td colSpan={3}>{this.state.ticketData[0].vCurrentStatus}</td>
							</tr>
							<tr>
								<td colSpan={2}>File upload</td>
								<td colSpan={3}>{(this.state.ticketData[0].vScreenShot != "" && this.state.ticketData[0].vScreenShot != null) ? <img src={"http://192.168.1.116/react-backend/uploads/" + this.state.ticketData[0].vScreenShot} height="100px" /> : "No File attached"}</td>
							</tr>
						</tbody> : ""}
					</table>
					<div>
						<label>Ticket Logs</label>
						
                         <div className="row thumbnail">
						 <div className="col-lg-4"><h4>Date Modfied</h4></div>
						 <div className="col-lg-4"><h4>Username</h4></div>
						 <div className="col-lg-4"><h4>Field</h4></div>
						 </div>

						{(this.state.ticketDetails && this.state.ticketDetails.length > 0) ? this.state.ticketDetails.map(tDetails =>
							<div className="row thumbnail">
								<div className="col-lg-4"><Moment format="YYYY/MM/DD">{tDetails.createDate}</Moment>&nbsp;
								{tDetails.createTime}
								</div>
								<div className="col-lg-4">{tDetails.assignBy}</div>
								<div className="col-lg-4">Status : {tDetails.vStatus}</div>
								<br />
								<div className="col-lg-4"><Moment format="YYYY/MM/DD">{tDetails.createDate}</Moment>&nbsp;
								{tDetails.createTime}</div>
								<div className="col-lg-4">{tDetails.assignBy}</div>
								<div className="col-lg-4">Assigned To :{tDetails.assignTo}</div>

								<div className="col-lg-4"><Moment format="YYYY/MM/DD">{tDetails.createDate}</Moment>&nbsp;
								{tDetails.createTime}</div>
								<div className="col-lg-4">{tDetails.assignBy}</div>
								<div className="col-lg-4">Note Added</div>
								<br />
								{(tDetails.vScreenShot != null && tDetails.vScreenShot != "") ?
									<span>
										<div className="col-lg-4"><Moment format="YYYY/MM/DD">{tDetails.createDate}</Moment>&nbsp;
								{tDetails.createTime}</div>
										<div className="col-lg-4">{tDetails.assignBy}</div>
										<div className="col-lg-4">File Added</div>
										<br /></span> : ""

								}
							</div>
						) : ""}
					</div>
				</Modal>
				<NotificationContainer />
				<Footer />
			</div>

		);

	}
}