import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Select, Upload, DatePicker } from 'antd';
import moment from 'moment';
import { Software } from '../Software/Software';
import {Header,Footer} from "../index"
const FormItem = Form.Item;
const Option = Select.Option;

var props = "";
const G_V_C = {}
let uuid = 0;
let id = sessionStorage.getItem('authId');
var userdata = "";

class Product_Form extends React.Component {
    constructor(props) {
        super(props);
        document.title = "Add Product"
        this.state =
            {
                vName: "",
                vProductBrand: "",
                vCompanyModelNumber: "",
                vBarcode: "",
                vProductType: "",
                tDescription: "",
                vRemark: "",
                vMacAddress: "",
                vOem: "",
                bStatus: "",
                iCreateBy: 1,
                iSoftwareId: [],
                vKey: "",
                editProduct: [],
                software: [],
                productType: [],
                softwareList: [],
                users: []
            };

        this.handleChange = this.handleChange.bind(this);
        this.AddProduct = this.AddProduct.bind(this);
        if ("" == localStorage.getItem("authId") || null == localStorage.getItem("authId")) {
            this.props.history.push("/");
        } else {
            userdata = JSON.parse(localStorage.getItem("authId"));
            if ("1" != userdata.isNetAdmin) {
                this.props.history.push("/");
            }
        }
    }
    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        uuid++;
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }


    handleChange(event) {

        //console.log(this.props.form.getFieldValue());
        //this.props.form.setFieldsValue(event.target.name, event.target.value);
        this.setState({ [event.target.name]: event.target.value })
        // console.log(this.state.iSoftwareId);

    }

    AddProduct(event) {
        event.preventDefault();
        //alert("hit");
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values);
                values['iProductId'] = this.props.match.params.id;
                if (values.vBarcode !=undefined &&values.vBarcode!="") {
                    if (values.vBarcode[0].response != undefined) {
                        values['vBarcode'] = values.vBarcode[0].response;
                    } else {
                        values['vBarcode'] = this.state.editProduct[0].vBarcode;
                    }
                }
                else {
                    values['vBarcode'] = "";
                }

                if (values.vBillImage!=undefined && values.vBillImage!="") {
                    if (values.vBillImage[0].response != undefined) {
                        values['vBillImage'] = values.vBillImage[0].response;
                    } else {
                        values['vBillImage'] = this.state.editProduct[0].vBillImage;
                    }
                }
                else
                {
                    values['vBillImage'] ="";
                }
                values['oldProducttypeId'] = this.state.oldProducttypeId;
                values['iCreateBy'] = userdata.Id;

                //alert("In");
                console.log(values);
                fetch((this.props.match.params.id) ? "/products/product-update" : "/products/ProductAdd", {
                    method: 'post',
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                        
                    },
                    body: "Data=" + JSON.stringify(values)
                    
                })
                    
                    .then(function (data) {
                        
                    })
                    .then(this.props.history.push("/Product", { Success: (this.props.match.params.id) ? "Product Successfully Updated" : "Product Successfully Added" })
                    )
                    .catch(function (error) {
                        console.log('Request failed', error);
                    });
            }
        });
    }
    normFile = (e) => {
        // console.log('Upload event:', e);

        if (Array.isArray(e)) {

            return e;
        }

        return e && e.fileList;
    }
    componentDidMount() {
        if (this.props.match.params.id) {
            fetch('/products/product-edit-list/' + this.props.match.params.id)
                .then(res => res.json())
                .then(editProduct => {
                    console.log(this.state.editProduct);
                    editProduct.resoponse[0].dPurchaseDate = moment(editProduct.resoponse[0].dPurchaseDate)
                    this.props.form.setFieldsValue(editProduct.resoponse[0])
                    this.setState({ editProduct: editProduct.resoponse, oldProducttypeId: editProduct.resoponse[0].vProductType })
                    if ((this.state.editProduct.length > 0) && (this.state.editProduct[0].iSoftwareId != null && this.state.editProduct[0].iSoftwareId != "")) {
                        var obj;
                        var strData = [];
                        var vkeysval = [];
                        var values = {};
                        var SoftData = {}
                        var xyz = this.state.editProduct.map(editProduct => {
                            strData.push(editProduct.iSoftwareInventoryId)
                            values[editProduct.iSoftwareInventoryId] = editProduct.vKey
                            SoftData[editProduct.iSoftwareInventoryId] = editProduct.iSoftwareId
                            //alert(editProduct.iSoftwareInventoryId+"----"+editProduct.iSoftwareId)
                        });
                        this.props.form.setFieldsValue({
                            keys: strData,
                            vBarcode: this.state.editProduct[0].vBarcode
                        });
                        this.setState({
                            vKey: values,
                            iSoftwareId: SoftData,
                            vBarcode: this.state.editProduct.vBarcode
                        });
                    }
                });
        }

        fetch("/products/product_assets", {
            method: 'post',
            mode: 'cors',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'Dat=' + JSON.stringify(this.state)
        })
            .then(res => res.json())

            .then(asset => this.setState({ productType: asset.product_type, users: asset.user_master, softwareList: asset.software }))
            //.then(asset =>console.log("Data"+asset.product_type))


            .catch(function (error) {
                // console.log('Request failed', error);
            });

    }
    render() {

        // if (this.state.editProduct.length>0) {
        //     alert(this.state.editProduct[0].vBarcode)
        //     var props = {
        //         action: "//jsonplaceholder.typicode.com/posts/",
        //         listType: "picture",
        //         defaultFileList: [{
        //             uid: -2,
        //             name: this.state.vBarcode,
        //             status: "done",
        //             url:
        //                 "cfghjdfg",
        //             thumbUrl:
        //                 "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        //         }]
        //     };
        // }
        const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;



        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 0 },
            },
        };
        getFieldDecorator('keys', { initialValue: [] });
        getFieldDecorator('bStatus', { initialValue: [] });
        const keys = getFieldValue('keys');

        const formItems = keys.map((k, index) => {
            //alert(this.state.iSoftwareId[k])
            return (
                <div>

                    <FormItem

                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                        label={index === 0 ? 'Software' : ''}
                        required={false}
                        key={k}
                    >
                        <div class="row">
                            <div class="col-lg-4">
                                {getFieldDecorator(`iSoftwareId[${k}]`, {
                                    validateTrigger: ['onChange', 'onBlur'],
                                    rules: [{
                                        required: true,

                                        message: "Please input Software named.",
                                    }],
                                    initialValue: this.state.iSoftwareId[k]
                                })(

                                    <Select name="i" placeholder="Select software">
                                        {(this.state.softwareList && this.state.softwareList.length > 0) ? this.state.softwareList.map(softwareList =>
                                            <Option value={softwareList.iSoftwareId}>{softwareList.vTitle}</Option>
                                        ) : ""}
                                    </Select>

                                )}
                            </div>
                            <div class="col-lg-4">
                                <label>Key: </label>
                                {getFieldDecorator(`vKey[${k}]`, {
                                    validateTrigger: ['onChange', 'onBlur'],

                                    initialValue: this.state.vKey[k]
                                })(
                                    <Input placeholder="Key" name="vKey[]" onChange={this.state.handleChange} value={this.state.vKey} style={{ width: '60%', marginRight: 8 }} />

                                )}

                                {keys.length > 1 ? (
                                    <Icon
                                        className="dynamic-delete-button"
                                        type="minus-circle-o"
                                        disabled={keys.length === 1}
                                        onClick={() => this.remove(k)}
                                    />
                                ) : null}
                            </div>

                        </div>
                    </FormItem>
                </div>
            );
        });

        return (

            <div class="page-content-wrapper">
                <Header />
                <div class="page-content">
                    <div class="row">
                        <div class="col-md-12">
                            <h3 class="page-title">
                                {(this.props.match.params.id) ? "Edit Product" : "Add Product"}
                            </h3>
                            <ul class="page-breadcrumb breadcrumb">
                                <li>
                                    <i class="fa fa-home"></i>
                                    <Link to="/Dashboard">Home </Link>
                                    <i class="fa fa-angle-right"></i>
                                </li>
                                <li>
                                    <Link to="/Product">product </Link>
                                    <i class="fa fa-angle-right"></i>
                                </li>
                                <li>
                                    <Link to={(this.props.match.params.id) ? this.props.location.pathname : "/Product_Add"}>
                                        {(this.props.match.params.id) ? "Edit Product" : "Add Product"}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <ul class="nav nav-tabs">
                        <li class="active"><a data-toggle="tab" href="#Hardware">Hardware</a></li>
                        <li class=""><a data-toggle="tab" href="#Software">Software</a></li>
                        <li><a data-toggle="tab" href="#Assign">Assign</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="portlet box blue  tab-pane fade  in active" id="Hardware">
                            <div class="portlet-title">
                                <div class="caption">
                                    <i class="fa fa-hdd-o" aria-hidden="true"></i> {(this.props.match.params.id) ? "Edit Hardware" : "Add Hardware"}
                                </div>
                            </div>
                            <div class="portlet-body form">

                                <div class="form-body">

                                    <Form onSubmit={this.AddProduct} className="" method="POST" encType="multipart/form-data">
                                        <Link to='/Category_Add' className="add-new-btn"><i class="fa fa-plus" aria-hidden="true"></i> Add New Product type</Link>
                                        <div class="row">
                                            <div class="col-lg-4">

                                                <FormItem

                                                    label="Product Type"
                                                    hasFeedback
                                                >
                                                    {getFieldDecorator('vProductType', {
                                                        rules: [
                                                            { required: true, message: 'Please select Product Type!' },
                                                        ],
                                                    })(
                                                        <Select placeholder="Please Select Product Type" class="form-control form-filter input-sm" >
                                                            {(this.state.productType && this.state.productType.length > 0) ? this.state.productType.map(product => <Option disabled={(product.iQuantity < 1) ? true : false} value={product.iProductTypeId}><span>{product.vTitle + " ( " + product.iQuantity + ")"}</span></Option>) : ""}
                                                        </Select>
                                                    )}

                                                </FormItem>


                                            </div>
                                            <div class="col-lg-4"
                                            >
                                                <FormItem
                                                    label="Name"
                                                    hasFeedback
                                                >
                                                    {getFieldDecorator('vName', {
                                                        rules: [{ required: true, message: 'Please input Brand Name!' }],
                                                    })(
                                                        <Input type="text" value={
                                                            this.state.vName} Name="vName" id="vName" onChange={
                                                                this.handleChange} />
                                                    )}
                                                </FormItem>
                                            </div>
                                            <div class="col-lg-4"

                                            >
                                                <FormItem
                                                    label="Brand Name"
                                                    hasFeedback
                                                >
                                                    {getFieldDecorator('vProductBrand', {
                                                        rules: [{ required: true, message: 'Please input Brand Name!' }],
                                                    })(
                                                        <Input type="text" value={
                                                            this.state.vName} Name="vProductBrand" id="vProductBrand" onChange={
                                                                this.handleChange} />
                                                    )}
                                                </FormItem>
                                            </div>

                                        </div>
                                        <div class="row">
                                            <div class="col-lg-4">
                                                <FormItem

                                                    label="Company Model Number"
                                                    hasFeedback
                                                >
                                                    {getFieldDecorator('vCompanyModelNumber', {
                                                        rules: [
                                                            { required: true, message: 'Please input Company Model Number!' },
                                                        ],
                                                    })(
                                                        <Input type="text" class="form-control" id="inputError" name="vCompanyModelNumber" value={
                                                            this.state.vCompanyModelNumber} onChange={
                                                                this.handleChange} />
                                                    )}
                                                </FormItem>

                                            </div>
                                            <div class="col-lg-4 c-textarea"
                                            >
                                                <FormItem
                                                    label="Description"
                                                    hasFeedback
                                                >
                                                    {getFieldDecorator('tDescription', {
                                                        rules: [{ required: true, message: 'Please input Description!' }],
                                                    })(
                                                        <textarea class="form-control" name="tDescription" value={
                                                            this.state.tDescription} onChange={
                                                                this.handleChange}  ></textarea>
                                                    )}
                                                </FormItem>
                                            </div>
                                            <div class="col-lg-4">
                                                <FormItem
                                                    label="Remark"
                                                    hasFeedback
                                                >
                                                    {getFieldDecorator('vRemark', {
                                                        rules: [
                                                            { required: true, message: 'Please input Remark!' },
                                                        ],
                                                    })(
                                                        <Input type="text" class="form-control" name="vRemark" value={
                                                            this.state.vRemark} onChange={
                                                                this.handleChange} />
                                                    )}
                                                </FormItem>

                                            </div>

                                        </div>
                                        <div class="row">

                                            <div class="col-lg-4">
                                                <FormItem
                                                    label="OEM"
                                                    hasFeedback
                                                >

                                                    {getFieldDecorator('vOem', {
                                                        rules: [{ required: true, message: 'Please input OEM!' }],
                                                    })(
                                                        <Input type="text" class="form-control" name="vOem" value={
                                                            this.state.vOem} onChange={
                                                                this.handleChange} />
                                                    )}
                                                </FormItem>
                                            </div>
                                            <div class="col-lg-4"

                                            >
                                                <FormItem
                                                    label="MAC Address"
                                                    hasFeedback
                                                >
                                                    {getFieldDecorator('vMacAddress', {
                                                        rules: [{ required: true, message: 'Please input MAC Address!' }],
                                                    })(
                                                        <Input type="text" class="form-control" name="vMacAddress" onChange={
                                                            this.handleChange} />
                                                    )}
                                                </FormItem>
                                            </div>
                                            <div class="col-lg-4">
                                                <FormItem
                                                    label="Price"
                                                    hasFeedback
                                                >
                                                    {getFieldDecorator('fPrice', {
                                                        rules: [{ required: true, message: 'Please input Price!' }],
                                                    })(
                                                        <Input type="number" class="form-control" name="fPrice" value={this.state.fPrice} onChange={this.handleChange} />
                                                    )}
                                                </FormItem>
                                            </div>

                                        </div>
                                        <div class="row">

                                            <div class="col-lg-4">
                                                <FormItem
                                                    label="Purchase Date"
                                                    hasFeedback
                                                >
                                                    {getFieldDecorator('dPurchaseDate', {
                                                        rules: [{ required: true, message: 'Please input Purchase Date!' }],
                                                    })(
                                                        <DatePicker name="dPurchaseDate" />
                                                    )}
                                                </FormItem>

                                                {/* <FormItem>
                                                        {getFieldDecorator('date', {
                                                            rules: [{ required: true }]
                                                        })(
                                                            <DatePicker format={`YYYY-MM-DD`} />
                                                        )}
                                                    </FormItem> */}

                                            </div>
                                            <div class="col-lg-4">
                                                <FormItem
                                                    label="Warranty Period"
                                                    hasFeedback

                                                >
                                                    {getFieldDecorator('fWarranty', {
                                                        rules: [{ required: true, message: 'Please input Warranty Period!' }],
                                                    })(
                                                        <Input type="number" value={this.state.fWarranty} onChange={this.handleChange} name="fWarranty" />
                                                    )}
                                                </FormItem>
                                            </div>
                                            <div class="col-lg-4">

                                                <FormItem

                                                    label="Status"
                                                    hasFeedback
                                                >
                                                    {getFieldDecorator('bStatus', {
                                                        rules: [
                                                            { required: true, message: 'Please select Product Type!' },
                                                        ],
                                                    })(
                                                        <Select placeholder="Please Select Status" class="form-control form-filter input-sm" name="iEmployeeId"  >
                                                            <Option value={1}>Active</Option>
                                                            <Option value={0}>Deactive</Option>

                                                        </Select>
                                                    )}
                                                </FormItem>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-4">
                                                <FormItem
                                                    {...formItemLayout}
                                                    label="Bill Image"

                                                >
                                                    {getFieldDecorator('vBillImage', {
                                                        valuePropName: 'vBillImage',
                                                        getValueFromEvent: this.normFile,

                                                    })(
                                                        <Upload name="vBillImage" action="/products/file-upload" listType="picture">
                                                            <Button>
                                                                <Icon type="upload" /> Click to upload
                                                                 </Button>
                                                        </Upload>
                                                    )}
                                                    <div className="overview-image">
                                                        {(this.state.editProduct.length > 0 && this.state.editProduct[0].vBillImage!="") ? <img src={"http://192.168.1.116/react-backend/uploads/" + this.state.editProduct[0].vBillImage} height="100px" /> : ""}</div>
                                                </FormItem>

                                            </div>
                                            <div class="col-lg-4">
                                                {//alert(this.state.vBarcode)
                                                }
                                                <FormItem
                                                    {...formItemLayout}
                                                    label="Barcode"
                                                >
                                                    {getFieldDecorator('vBarcode', {
                                                        valuePropName: 'vBarcode',
                                                        getValueFromEvent: this.normFile,


                                                    })(
                                                        <Upload name="vBarcode" action="/products/file-upload" listType="picture">
                                                            <Button>
                                                                <Icon type="upload" /> Click to upload
                                                            </Button>
                                                        </Upload>


                                                    )}
                                                    <div className="overview-image">
                                                        {(this.state.editProduct.length > 0 &&this.state.editProduct[0].vBarcode!="") ? <img src={"http://192.168.1.116/react-backend/uploads/" + this.state.editProduct[0].vBarcode} height="100px" /> : ""}</div>
                                                </FormItem>
                                            </div>

                                        </div>
                                        <div class="row">
                                            <div class="col-lg-4">
                                                <FormItem>
                                                    <Button type="primary" htmlType="submit" className="login-form-button add-new-btn">
                                                        Submit
                                                    </Button>
                                                </FormItem>
                                            </div>
                                        </div>
                                    </Form>
                                </div>

                            </div>
                        </div>
                        <div class="portlet box blue tab-pane fade" id="Software">
                            <div class="portlet-title">
                                <div class="caption">
                                    <i class="fa fa-desktop" aria-hidden="true"></i> {(this.props.match.params.id) ? "Edit Software" : "Add Software"}
                                </div>
                            </div>
                            <div class="portlet-body form-software">
                                <Form onSubmit={this.AddProduct} encType="multipart/form-data">
                                    <Link to='/Software_Add' className="add-new-btn"><i class="fa fa-plus" aria-hidden="true"></i> Add New Software</Link>
                                    {formItems}
                                    <FormItem {...formItemLayoutWithOutLabel}>
                                        <Button type="dashed" onClick={this.add} style={{ width: '55.5%' }}>
                                            <Icon type="plus" /> Add field
                                        </Button>
                                    </FormItem>
                                    <FormItem {...formItemLayoutWithOutLabel}>
                                        <Button type="primary" htmlType="submit">Submit</Button>
                                    </FormItem>
                                </Form>
                            </div>
                        </div>
                        {/*Assign start*/}
                        <div class="portlet box blue tab-pane fade" id="Assign">
                            <div class="portlet-title">
                                <div class="caption">
                                    <i class="fa fa-user-o" aria-hidden="true"></i> Assign
                                </div>
                            </div>
                            <div class="portlet-body">
                                <Form onSubmit={this.AddProduct} className="login-form" encType="multipart/form-data">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <FormItem

                                                label="Employee Name"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('iEmployeeId', {

                                                })(
                                                    <Select placeholder="Please Select Employee" class="form-control form-filter input-sm" name="iEmployeeId"  >

                                                        {(this.state.users && this.state.users.length > 0) ? this.state.users.map(user =>
                                                            <Option value={user.Id}>{user.Name}</Option>) : ""}
                                                    </Select>
                                                )}
                                            </FormItem>

                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12"> <FormItem {...formItemLayoutWithOutLabel}>
                                            <Button type="primary" htmlType="submit">Submit</Button>
                                        </FormItem> </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        );
    }
}
export const Product_Add = Form.create()(Product_Form);