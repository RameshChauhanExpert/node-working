import React from 'react';
//import ReactDOM from 'react-dom';
import { /*BrowserRouter as Router, Switch, Route,*/ Link } from 'react-router-dom';
import {Header,Footer} from "../index"
import { Form, /*Icon, Input,*/ Button, Select,Upload,Icon } from 'antd';
//import {Spinner} from "../../utility"
const FormItem = Form.Item;
const Option = Select.Option;


var userdata = "";
export class CautionAdd extends React.Component {
    constructor(props) {
        super(props);

        document.title = "Ticket Add"
        this.state =
            {
                vTitle: "",
                tDescription: "",
                vPriority: "",
                vRemark: "",
                vNetworkAdmin: "",
                bStatus: "",
                iCreateBy: "1",
                netAdmin: []

            };

        this.handleChange = this.handleChange.bind(this);
        this.AddProduct = this.AddProduct.bind(this);
        if ("" === localStorage.getItem("authId") || null === localStorage.getItem("authId")) {
            this.props.history.push("/");
        } else {
            userdata = JSON.parse(localStorage.getItem("authId"));
        }
    }
    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
    componentDidMount() {
        fetch("/UserManagement/net-admin-list", {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'Data=' + JSON.stringify("")
        })
            .then(res => res.json())
            .then(netAdmin => this.setState({ netAdmin: netAdmin }))
            //.then(netAdmin => console.log(netAdmin))
            // .then(function (data) {
            //     console.log('Request succeeded with JSON response', data);

            // })

            .catch(function (error) {
                console.log('Request failed', error);
            });
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    AddProduct(event) {
        event.preventDefault();
        console.log(this.props)
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                values['iCreateBy'] = userdata.Id;
                values['vCurrentStatus'] = values['bStatus'];
                values['iCurrentAdmin'] = values['vNetworkAdmin'];
                if(values.vScreenShot!=undefined && values.vScreenShot[0].name!="")
                {
                values['vScreenShot']=values.vScreenShot[0].name;
                }
                else
                {
                    values['vScreenShot']="";
                }
                console.log(values)
                fetch("/ticket/ticket-add", {
                    method: 'post',
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                    },
                    body: 'Data=' + JSON.stringify(values)
                })
                    .then(res => (res.status == 200) ? this.props.history.push("/Caution", { Success: "Ticket Successfully Added!" }) : "")

                    .catch(function (error) {
                        console.log('Request failed', error)

                    });
                
            }
        });
    }
    render() {

        const { getFieldDecorator } = this.props.form;
        return (
            <div className="page-content-wrapper">
                <Header />
                <div className="page-content">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="page-title">Add Ticket</h3>
                            <ul className="page-breadcrumb breadcrumb">
                                <li>
                                    <i className="fa fa-home"></i>
                                    <Link to="/Dashboard">Home </Link>
                                    <i className="fa fa-angle-right"></i>
                                </li>
                                <li>
                                    <Link to="/Caution">Ticket </Link>
                                    <i className="fa fa-angle-right"></i>
                                </li>
                                <li><Link to="/Caution_Add">Add Ticket </Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="portlet box blue ">
                        <div className="portlet-title">
                            <div className="caption">
                                <i class="fa fa-ticket" aria-hidden="true"></i> Add Ticket
                                </div>
                        </div>
                        <div className="portlet-body">
                        
                            <Form onSubmit={
                                this.AddProduct} className="Category-add-form" method="POST" encType="multipart/form-data" >

                                <div className="form-body">
                                    <div className="form-group ">

                                        <FormItem
                                            label="Title"
                                            hasFeedback
                                        >

                                            {getFieldDecorator('vTitle', {
                                                rules: [{ required: true, message: 'Please input Title!' }],
                                            })(
                                                <input type="text" name="vTitle" className="form-control" id="inputSuccess" value={
                                                    this.state.vTitle} onChange={
                                                        this.handleChange} />
                                            )}
                                        </FormItem>

                                    </div>


                                    <div className="form-group ">

                                        <FormItem
                                            label="Description"
                                            hasFeedback
                                        >

                                            {getFieldDecorator('tDescription', {
                                                rules: [{ required: true, message: 'Please input Description!' }],
                                            })(
                                                <textarea name="tDescription" className="form-control" value={
                                                    this.state.tDescription} onChange={
                                                        this.handleChange}></textarea>
                                            )}
                                        </FormItem>


                                    </div>

                                    <div className="form-group ">


                                        <FormItem

                                            label="Priority"
                                            hasFeedback
                                        >
                                            {getFieldDecorator('vPriority', {
                                                rules: [
                                                    { required: true, message: 'Please select Product Type!' },
                                                ],
                                            })(
                                                <Select placeholder="Select Priority" class="form-control form-filter input-sm" name="vPriority"  >
                                                    <Option value="High">High</Option>
                                                    <Option value="Medium">Medium</Option>
                                                    <Option value="Low">Low</Option>
                                                </Select>
                                            )}
                                        </FormItem>


                                    </div>
                                    <div className="form-group ">

                                        <FormItem
                                            label="Remark"
                                            hasFeedback
                                        >

                                            {getFieldDecorator('vRemark', {
                                                rules: [{ required: true, message: 'Please select Priority!' }],
                                            })(
                                                <input type="text" name="vRemark" className="form-control" id="inputError" value={
                                                    this.state.vRemark} onChange={
                                                        this.handleChange} />
                                            )}
                                        </FormItem>

                                    </div>


                                    <div className="form-group ">
                                        <FormItem
                                            label="Assign to Network Admin"
                                            hasFeedback
                                        >
                                            {getFieldDecorator('vNetworkAdmin', {
                                                rules: [
                                                    { required: true, message: 'Please select Product Type!' },
                                                ],
                                            })(
                                                <Select placeholder="Please Select Employee" class="form-control form-filter input-sm" name="vNetworkAdmin"  >

                                                    {(this.state.netAdmin && this.state.netAdmin.length > 0) ? this.state.netAdmin.map(user =>
                                                        <Option value={user.Id}>{user.Name}</Option>) : ""}
                                                </Select>
                                            )}
                                        </FormItem>

                                    </div>
                                    <div className="form-group ">
                                        <FormItem
                                            label="Status"
                                            hasFeedback
                                        >
                                            {getFieldDecorator('bStatus', {
                                                rules: [
                                                    { required: true, message: 'Please select Product Type!' },
                                                ],
                                            })(
                                                <Select placeholder="Please Select Status" class="form-control form-filter input-sm" name="bStatus"  >
                                                    <Option value="Open">Open</Option>
                                                    <Option value="InProgress">In Progress</Option>
                                                    <Option value="Resolved">Resolved</Option>
                                                    <Option value="Reopen">Reopen</Option>
                                                    <Option value="Close">Close</Option>
                                                </Select>
                                            )}
                                        </FormItem>
                                    </div>
                                    <div className="form-group ">
                                        <FormItem
                                            label="Add Attachment"
                                        >
                                            {getFieldDecorator('vScreenShot', {
                                                valuePropName: 'fileList',
                                                getValueFromEvent: this.normFile,
                                            })(
                                                <Upload name="vScreenShot" action="/ticket/file-upload" listType="picture">
                                                    <Button>
                                                        <Icon type="upload" /> Click to upload
                                                   </Button>
                                                </Upload>
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="form-actions">
                                    <FormItem>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            Submit
                                                    </Button>
                                    </FormItem>
                                    <Link to="/Caution"> <button type="button" className="ant-btn login-form-button ant-btn-primary">Cancel</button></Link>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
export const Caution_Add = Form.create()(CautionAdd);