import React from 'react';
import {connect} from "react-redux"
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import {Header,Footer} from "../index"
import Moment from 'react-moment';
import {Spinner} from "../../utility"

//For Notifications
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { fromBits } from 'long';

import {fetch_product} from "../../actions/index";
var userdata = "";

 class Product extends React.Component {
	constructor(props) {
		super(props);
		document.title = "Product"
		this.state = { products: [], activePage: 1, totalRecord: -1, limit: 5, skip: 0, product_name: "" }
		this.handlePageChange = this.handlePageChange.bind(this);
		this.search = this.search.bind(this);
		this.DisableStatus = this.DisableStatus.bind(this);

		if ("" === localStorage.getItem("authId") || null === localStorage.getItem("authId")) {
			this.props.history.push("/");
		} else {
			userdata = JSON.parse(localStorage.getItem("authId"));
			if (1 !== userdata.isNetAdmin) {
				this.props.history.push("/");
			}
		}
	}

	handlePageChange(pageNumber) {
		this.setState({ activePage: pageNumber });
		this.setState({ skip: this.state.limit * pageNumber - this.state.limit });
		setTimeout(function () {
			this.componentDidMount()
		}.bind(this), 1000);
	}

	search(event) {

		this.setState({ [event.target.name]: event.target.value });
		this.setState({ activePage: 1, skip: 0 });
		setTimeout(function () {
			this.componentDidMount()
		}.bind(this), 1000);
	}

	DisableStatus(index, status) {
		fetch('/products/products-disable/' + index + "/" + status)
			.then(res => res.json())
			.then(products => {
				(products.affectedRows === 1) ? this.componentDidMount() : ""
			})
			.then(NotificationManager.info("", (0 === status) ? "Products Activated" : "Products Deactivated"));
	}

	componentDidMount() {
          
		document.getElementById("overlayParent").classList.add("overlay");
		document.getElementById("overlayChild").classList.remove("childOverlay");
		if (this.props.location.state && this.props.location.state.Success != null) {
			NotificationManager.success('Success Message', this.props.location.state.Success)
			this.props.history.push("/Product", { Success: null })
		}
		delete this.state.product;
		fetch("/products/ProductList/", {
			method: 'post',
			mode: 'cors',
			headers: {
				"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
				//"Content-Type":"multipart/form-data"
			},
			body: 'Data=' + JSON.stringify(this.state)
		})
			.then(res => res.json())
			.then(products => this.setState({ products: products.resoponse, totalRecord: products.totalRecord }))
			.then(document.getElementById("overlayParent").classList.remove("overlay"))
			.then(document.getElementById("overlayChild").classList.add("childOverlay"))
			.catch(function (error) {
				console.log('Request failed', error);
			});


	}

	getOptions(listLength) {

	}
	render() {


		var listLength = Math.ceil(this.state.totalRecord / this.state.limit);
		var listIncreaser = (listLength) => {
			var list = [];
			for (var i = 1; i <= listLength; i++) {
				list.push(<option value={i * this.state.limit}>{i * this.state.limit}</option>)
			}
			return list
		}


		return (
			<div className="page-content-wrapper">
			
				<Header />
				<div id="overlayParent">
					<div id="overlayChild" className="childOverlay">Loading.....</div>
				</div>
				<div className="page-content">
					<div className="row">
						<div className="col-md-12">
							<h3 className="page-title">Product</h3>
							<ul className="page-breadcrumb breadcrumb">
								<li>
									<i className="fa fa-home"></i>
									<Link to="/Dashboard">Home </Link>
									<i className="fa fa-angle-right"></i>
								</li>
								<li><Link to="/Product">Product </Link></li>
							</ul>
						</div>
						<h1 onClick={()=>{

this.props.addProduct(this.state)
						}}>ID:{console.log("props data",this.props)}</h1>
						<span onClick={this.props.product.fetch_product}>Click</span>
					</div>


					<div className="row">
						<div className="col-md-12">

							<div className="portlet box">
								<div className="portlet-title blue-grid">
									<div className="caption">
										<i class="fa fa-cart-arrow-down" aria-hidden="true"></i>Product
							</div>
									<div className="actions">
										<div className="btn-group">
											<Link to="/Product_Add">  <button className="form-control btn btn-primary add-more-btn">Add< /button></Link>
										</div>
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
											<div className="table-actions-wrapper">
												<span>
												</span>
												<select className="table-group-action-input form-control input-inline input-small input-sm">
													<option value="">Select...</option>
													<option value="1">Publish</option>
													<option value="0">Un-publish</option>
													<option value="delete">Delete</option>
												</select>
												<button className="btn btn-sm yellow table-group-action-submit"><i className="fa fa-check"></i> Submit</button>
											</div>
											<table className="table table-striped table-bordered table-hover" id="datatable_products">

												<thead>

													<tr role="row" className="heading">
														<th width="1%">
														Product ID
														</th>
														<th width="15%">
															Product&nbsp;Name
										                </th>
														<th width="15%">
															Company&nbsp;Model&nbsp;Number
										                </th>
														<th width="15%">
															Assigned&nbsp;To
										                </th>
														<th width="15%">
															Created&nbsp;Date
										                </th>
														<th width="10%">
															Status
										                </th>
														<th width="20%">
															Actions
			                                        	</th>
													</tr>
													<tr role="row" className="filter">
														<th>
                                                        <input type="number" onKeyUp={this.search} name="iProductId"/>
														</th>
														<th>
															<input type="text" className="form-control form-filter input-sm" name="product_name" onKeyUp={this.search} />
														</th>
														<th>
														</th>
														<th></th>
														<th></th>
														<th>
															<select name="bStatus" onChange={this.search} className="form-control form-filter input-sm">
																<option value="null">Select...</option>
																<option value="1">Active</option>
																<option value="0">Deactive</option>
															</select>
														</th>
														<th>
															<div className="margin-bottom-5">
															</div>
														</th>
													</tr>
												</thead>
												<tbody>
													{(this.state.products.length > 0) ? this.state.products.map(product => <tr>
														<td>{product.iProductId}</td>
														<td>{product.vName}</td>
														<td>{product.vCompanyModelNumber}</td>
														<td>{product.assignEmployee}</td>
														<td><Moment format="YYYY/MM/DD hh:mm a">{product.dtCreateAt}</Moment></td>
														<td>{(product.bStatus === 1) ? <span>Active</span> : <span>DeActive</span>}</td>
														<td>
															<Link to={"/Product_Add/" + product.iProductId}><button className="btn btn-sm primary  filter-cancel"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button></Link>
															<button className="btn btn-sm red filter-cancel" onClick={() => this.DisableStatus(product.iProductId, product.bStatus)} > {(product.bStatus === 1) ? <span><i class="fa fa-ban" aria-hidden="true"></i> Deactivate</span> : <span><i class="fa fa-check" aria-hidden="true"></i> Activate</span>}</button></td>
													</tr>) : <tr><td colSpan={7}> <h3>Data not found</h3></td></tr>}

												</tbody>
											</table>

											<div className="pagination-section">
												<div className="show-record-section">Showing  {(this.state.products.length > 0) ? (this.state.skip + 1) + " to " + (parseInt(this.state.products.length) + parseInt(this.state.skip)) + " of " + this.state.totalRecord : ""} entries</div>

												<Pagination
													activePage={this.state.activePage}
													itemsCountPerPage={this.state.limit}
													totalItemsCount={this.state.totalRecord}
													pageRangeDisplayed={2}
													onChange={this.handlePageChange}
												/>
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

const mapDispatchToProps = (dispatch,state) => ({
  addProduct:(dispatch,state) => {
   // dispatch(fetch_product(dispatch,state))
  }
});
function mapStateToProps(state) {
	
	return {product:state};
}


export default connect(mapStateToProps,mapDispatchToProps)(Product)