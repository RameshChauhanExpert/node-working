import React from 'react';

import {  Link } from 'react-router-dom';
import {Header,Footer} from "../index"

import { Form,  Input, Button, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
var userdata = "";

export class SoftwareAdd extends React.Component {
    constructor(props) {
        super(props);
        {(this.props.match.params.id) ?  document.title="Edit Software" :  document.title="Add Software "}
       
        this.state =
            {
                vTitle: "",
                tDescription: "",
                bStatus: "",
                products: []
            };
        this.handleChange = this.handleChange.bind(this);
        this.AddProduct = this.AddProduct.bind(this);
        if ("" == localStorage.getItem("authId") || null == localStorage.getItem("authId")) {
            this.props.history.push("/");
        }else{
            userdata = JSON.parse(localStorage.getItem("authId"));
            if("1" != userdata.isNetAdmin){
                this.props.history.push("/");
            }
        }
    }
    handleChange(event) {
        // this.props.form.setFieldsValue(event.target.name,event.target.value);
        this.setState({ [event.target.name]: event.target.value });
    }
    AddProduct(event) {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                values['iCreateBy'] = userdata.Id;
                values['iSoftwareId'] = this.props.match.params.id;
                delete this.state.products;
                fetch((this.props.match.params.id) ? "/software/software-update" : "/software/software-add", {
                    method: 'post',
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                    },
                    body: 'Data=' + JSON.stringify(values)
                })
                    .then(function (data) {
                        console.log('Request succeeded with JSON response', data);
                    })
                    .then(this.props.history.push("/Software", { Success: (this.props.match.params.id) ? "Software Successfully Updated" : "Software Successfully Added" }))
                    .catch(function (error) {
                        console.log('Request failed', error);
                    });
            }
        })
    }
    componentDidMount() {

        if (this.props.match.params.id) {
            fetch('/software/software-list/' + this.props.match.params.id)
                .then(res => res.json())
                .then(products => {
                    this.setState(products.response[0])
                    console.log("updated" + products.response[0])
                    this.props.form.setFieldsValue(products.response[0]);
                });
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div class="page-content-wrapper">
                <Header/>
                <div class="page-content">
                    <div class="row">
                        <div class="col-md-12">
                            <h3 class="page-title">
                                {(this.props.match.params.id) ? "Edit Software" : "Add Software"}
                            </h3>
                            <ul class="page-breadcrumb breadcrumb">
                                <li>
                                    <i class="fa fa-home"></i>
                                    <Link to="/Dashboard">Home </Link>
                                    <i class="fa fa-angle-right"></i>
                                </li>
                                <li>
                                    <Link to="/Software">Software </Link>
                                    <i class="fa fa-angle-right"></i>
                                </li>
                                <li>
                                    <Link to={(this.props.match.params.id) ? this.props.location.pathname : "/Software_Add"}>
                                        {(this.props.match.params.id) ? "Edit Software" : "Add Software"}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="portlet box blue ">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="fa fa-edit"></i> {(this.props.match.params.id) ? "Edit Software" : "Add Software"}
                            </div>
                        </div>
                        <div class="portlet-body ">
                            <Form onSubmit={
                                this.AddProduct} className="Category-add-form">

                                <div class="form-body">
                                    <div class="form-group ">

                                        <FormItem
                                            label="Software Title"
                                            hasFeedback
                                        >

                                            {getFieldDecorator('vTitle', {
                                                rules: [{ required: true, message: 'Please input Title!' }], value: "dzxg"
                                            })(
                                                <Input type="text" name="vTitle" class="form-control" id="inputSuccess" value={(this.state.products.length > 0) ? this.state.vTitle : this.state.vTitle} onChange={this.handleChange} />
                                            )}
                                        </FormItem>

                                    </div>
                                    {/* <input type="text" name="vTitle" class="form-control" id="inputSuccess" value={this.state.products.length>0&&this.state.products[0]!=undefined&&this.state.products[0].vTitle!=undefined?
                    this.state.products[0].vTitle:""} onChange={
                    this.handleChange} /> */}
                                    <div class="form-group ">


                                        <FormItem
                                            label="Description"
                                            hasFeedback
                                        >

                                            {getFieldDecorator('tDescription', {
                                                rules: [{ required: true, message: 'Please input Description!' }],
                                            })(
                                                <textarea name="tDescription" class="form-control" value={
                                                    (this.state.products.length > 0) ? this.state.tDescription : this.state.tDescription} onChange={
                                                        this.handleChange}></textarea>
                                            )}
                                        </FormItem>


                                    </div>
                                    <div class="form-group ">

                                        <FormItem
                                            label="License Key"
                                            hasFeedback
                                        >

                                            {getFieldDecorator('vLicense', {
                                                rules: [{ required: true, message: 'Please input License Key!' }], value: "dzxg"
                                            })(
                                                <Input type="text" name="vLicense" class="form-control" id="inputSuccess"  />
                                            )}
                                        </FormItem>

                                    </div>
                                    <div class="form-group ">
                                       
                                        <FormItem
                                            label="Status"
                                            hasFeedback
                                        >

                                            {getFieldDecorator('bStatus', {
                                                rules: [{ required: true, message: 'Please select Status!' }],
                                            })(
                                                <Select name="bStatus" placeholder="select status" class="form-control form-filter input-sm" value={(this.state.products.length > 0) ? this.state.bStatus : this.state.bStatus}>
                                                   
                                                    <Option value={1}>Active</Option>
                                                    <Option value={0}>Deactive</Option>
                                                </Select>
                                            )}
                                        </FormItem>


                                    </div>
                                </div>
                                <div class="form-actions">
                                    <FormItem>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            Submit
                                                    </Button>
                                    </FormItem>
                                    <Link to="/Software"><button type="button" class="ant-btn login-form-button ant-btn-primary">Cancel</button></Link>

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
export const Software_Add = Form.create()(SoftwareAdd);