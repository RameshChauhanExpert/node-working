import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import {Header,Footer} from "../index"

//For Notifications
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
var userdata = "";

export class Category extends React.Component {
	constructor(props) {
		super(props);
		document.title = "Category"
		this.state = { productType: [], activePage: 1, totalRecord: -1, limit: 5, skip: 0, categoryName: "" }
		this.DisableStatus = this.DisableStatus.bind(this);
		this.Pagination = this.Pagination.bind(this);
		this.search = this.search.bind(this);

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
		this.setState({ [event.target.name]: event.target.value });
		this.setState({ activePage: 1, skip: 0 });
		setTimeout(function () {
			this.componentDidMount()
		}.bind(this), 1000);
	}

	Pagination(pageNumber) {
		console.log(`active page is ${pageNumber}`);
		this.setState({ activePage: pageNumber });
		this.setState({ skip: this.state.limit * pageNumber - this.state.limit });
		setTimeout(function () {
			this.componentDidMount()
		}.bind(this), 1000);
	}

	componentDidMount() {
		document.getElementById("overlayParent").classList.add("overlay");
		document.getElementById("overlayChild").classList.remove("childOverlay");
		if (this.props.location.state && this.props.location.state.Success != null) {
			NotificationManager.success('Success Message', this.props.location.state.Success)
			this.props.history.push("/Category", { Success: null })
		}
		fetch("/product-type/Product-type-list/", {
			method: 'post',
			mode: 'cors',
			headers: {
				"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			body: 'Data=' + JSON.stringify(this.state)
		})
			.then(res => res.json())
			.then(productType => this.setState({ productType: productType.response, totalRecord: productType.totalRecord }))
			.then(document.getElementById("overlayParent").classList.remove("overlay"))
			.then(document.getElementById("overlayChild").classList.add("childOverlay"))
			.catch(function (error) {
				console.log('Request failed', error);
			});
	}

	DisableStatus(index, status) {
		fetch('/product-type/product-type-disable/' + index + "/" + status)
			.then(res => res.json())
			.then(products => {
				(products.affectedRows === 1) ? this.componentDidMount() : ""
			})
			.then(NotificationManager.info("", (0 === status) ? "Product Type Activated" : "Product Type Deactivated"));
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
							<h3 className="page-title">Product Type</h3>
							<ul className="page-breadcrumb breadcrumb">
								<li>
									<i className="fa fa-home"></i>
									<Link to="/Dashboard">Home </Link>
									<i className="fa fa-angle-right"></i>
								</li>
								<li>
									<Link to="/Category">Product Type </Link>
								</li>
							</ul>
						</div>
					</div>

					<div className="row">
						<div className="col-md-12">
							{/* Begin: life time stats */}
							<div className="portlet box">
								<div className="portlet-title blue-grid">
									<div className="caption">
										<i class="fa fa-cart-arrow-down" aria-hidden="true"></i>Product Type
							</div>
									<div className="actions">
										<Link to="/Category_Add" className="btn btn-primary add-more-btn">Add </Link>
									</div>
								</div>
								<h4>	{(this.props.location.state ? this.props.location.state.Success : "")}</h4>
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
											</select> records</div>
										<table className="table table-striped table-bordered table-hover" id="datatable_products">
											<thead>
												<tr role="row" className="heading">
													<th width="10%">
													Product Type ID
													</th>
													<th width="15%">
														Title
									</th>
													<th width="15%" >Quantity</th>
													<th width="10%">
														Status
									</th>
													<th width="10%">
														Actions
									</th>
												</tr>
												<tr role="row" className="filter">
													<td>
													<input type="number" className="form-control form-filter input-sm" name="iProductTypeId"  onChange={this.search} />
													</td>

													<td>
														<input type="text" className="form-control form-filter input-sm" name="categoryName" value={this.state.categoryName} onChange={this.search} />
													</td>
													<td></td>
													<td>
														<select name="bStatus" className="form-control form-filter input-sm" onChange={this.search} >
															<option value="null">Select...</option>
															<option value="1">Active</option>
															<option value="0">Deactive</option>

														</select>
													</td>
													<td>
														<div className="margin-bottom-5">
														</div>
													</td>
												</tr>
											</thead>
											<tbody>
												{(this.state.productType.length > 0) ? this.state.productType.map(product => <tr>
													<td>{product.iProductTypeId}</td>
													<td>{product.vTitle}</td>
													<td> {product.iQuantity} </td>
													<td>{(product.bStatus === 1) ? <span>Active</span> : <span>DeActive</span>} </td>
													<td>
														<Link to={"/Category_Add/" + product.iProductTypeId}><button className="btn btn-sm primary  filter-cancel"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button></Link>
														<button className="btn btn-sm red filter-cancel" onClick={() => this.DisableStatus(product.iProductTypeId, product.bStatus)}  > {(product.bStatus === 1) ? <span><i class="fa fa-ban" aria-hidden="true"></i> Deactivate</span> : <span><i class="fa fa-check" aria-hidden="true"></i> Activate</span>}</button></td>
												</tr>) : <tr><td colSpan={5}> <h3>Data not found</h3></td></tr>}
											</tbody>
										</table>

									</div>
									<div className="pagination-section">
										<div className="show-record-section">Showing {(this.state.productType.length > 0) ? (this.state.skip + 1) + " to " + (parseInt(this.state.productType.length) + parseInt(this.state.skip)) + " of " + this.state.totalRecord : ""} entries</div>
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
				<NotificationContainer />
				<Footer />
			</div>
		);
	}
}