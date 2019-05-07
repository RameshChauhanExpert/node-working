import React from 'react';

import {  Link } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import {Header,Footer} from "../index"

import { Form, Input, Button, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
var userdata = "";

export class CategoryAdd extends React.Component {
	constructor(props) {
		super(props);

		{(this.props.match.params.id) ?  document.title="Edit Category" :  document.title="Add Category "}
		this.state =
		{
			vTitle: "",
			tDescription: "",
			bStatus: "",
			productType: []
		};
		
		this.AddProduct = this.AddProduct.bind(this);
		if("" == localStorage.getItem("authId") || null == localStorage.getItem("authId")){
				this.props.history.push("/");
		}else{

		userdata = JSON.parse(localStorage.getItem("authId"));
			if("1" != userdata.isNetAdmin){
				this.props.history.push("/");
			}
			
		}
	}

	componentDidMount() {
		if (this.props.match.params.id) {
			fetch('/product-type/Product-type-list/' + this.props.match.params.id)
			.then(res => res.json())
			.then(productType => {
				this.setState(productType.response[0])
				// console.log("updated" + productType.response[0].vTitle);
				this.props.form.setFieldsValue(productType.response[0]);
			});
		}
	}

	AddProduct(event) {
		event.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				values['iProductTypeId']=this.props.match.params.id;
				values['iCreateBy']= userdata.Id;
				delete this.state.productType
				fetch((this.props.match.params.id) ? "/product-type/Product-type-update" : "/product-type/Product-type-add", {
						method: 'post',
						headers: {
								"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
						},
						body: 'Data=' + JSON.stringify(values)
				})
				//.then(json)
				.then(function (data) {
					console.log('Request succeeded with JSON response', data);

				})
				.then(this.props.history.push("/Category", { Success: (this.props.match.params.id) ? "Product Type Successfully Updated" : "Product Type Successfully Added" }))
				.catch(function (error) {
					console.log('Request failed', error);
				});
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div class="page-content-wrapper">
				<Header/>
				<div class="page-content">
					<div class="row">
						<div class="col-md-12">
							<h3 class="page-title">{(this.props.match.params.id ? "Edit Product Type" : "Add Product Type")}</h3>
							<ul class="page-breadcrumb breadcrumb">
								<li>
									<i class="fa fa-home"></i>
									<Link to="/Dashboard">Home </Link>
									<i class="fa fa-angle-right"></i>
								</li>
								<li>
									<Link to="/Category">Product type </Link>
									<i class="fa fa-angle-right"></i>
								</li>
								<li>
									<Link to={(this.props.match.params.id) ? this.props.location.pathname : "/Caution_Add"}>
										{(this.props.match.params.id ? "Edit Product Type" : "Add Product Type")}
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div class="portlet box blue ">
						<div class="portlet-title">
							<div class="caption">
								<i class="fa fa-cart-plus" aria-hidden="true"></i> {(this.props.match.params.id ? "Edit Product Type" : "Add Product Type")}
							</div>
						</div>
						<div class="portlet-body form">
							<Form onSubmit={this.AddProduct} className="Category-add-form">
								<div class="form-body">
									<div class="form-group ">
										<FormItem label="Title" hasFeedback>
											{getFieldDecorator('vTitle', {
												rules: [{ required: true, message: 'Please Input Title!' }],
											})(
												<Input type="text" class="form-control" name="vTitle" id="cfghnj"  />
											)}
										</FormItem>
									</div>
									<div class="form-group ">
										<FormItem label="Quantity" hasFeedback>
											{getFieldDecorator('iQuantity', {
												rules: [{ required: true, message: 'Please Input Quantity!' }],
											})(
												<Input type="number" class="form-control" name="iQuantity" id="cfghnj"  />
											)}
										</FormItem>
									</div>
									<div class="form-group ">
										<FormItem label="Description" hasFeedback>
											{getFieldDecorator('tDescription', {
												rules: [{ required: true, message: 'Please Input Description!' }],
											})(
												<textarea class="form-control" name="tDescription" ></textarea>
											)}
										</FormItem>
									</div>
									<div class="form-group ">
										<FormItem label="Status" hasFeedback>
											{getFieldDecorator('bStatus', {
												rules: [{ required: true, message: 'Please select Status!' }],
											})(
												<Select class="form-control form-filter Input-sm" placeholder="Select Status" id={"bStatus"} >
													<Option value={1}>{'Active'}</Option>
													<Option value={0}>{'Deactive'}</Option>
												</Select>
											)}
										</FormItem>
									</div>
								</div>
								<div class="form-actions">
									<FormItem>
										<Button type="primary" htmlType="submit" className="login-form-button">Submit</Button>
									</FormItem>
									<Link to="/Category"><button type="button" class="ant-btn login-form-button ant-btn-primary">Cancel</button></Link>
								</div>
							</Form>
						</div>
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}

export const Category_Add = Form.create()(CategoryAdd);