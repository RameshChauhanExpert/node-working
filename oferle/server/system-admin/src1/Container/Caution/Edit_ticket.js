import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Clock from 'react-live-clock';
import {Header,Footer} from "../index"
import moment from 'moment';




import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Select, Upload, DatePicker, Modal } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

var userdata = "";

class EditTicket extends React.Component {
    constructor(props) {
        super(props);
        document.title = "Edit Ticket"
        if (1 === localStorage.getItem("authId") || null == localStorage.getItem("authId")) {
            this.props.history.push("/");
        } else {
            userdata = JSON.parse(localStorage.getItem("authId"));
        }
        this.state =
            {
                Caution: [],
                FirstMesg: [],
                tMessage: "",
                iAssignTo: "",
                vStatus: "",
                iGeneratorId: userdata.Id,
                iTicketId: this.props.match.params.id,
                netAdmin: [],
                vScreenShot: ""
            }
        this.CautionThread = this.CautionThread.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    showModal = (vScreenShot) => {
        this.setState({
            visible: true, vScreenShot: vScreenShot
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    componentDidMount() {
        fetch('/ticket/ticket-master-list/' + this.props.match.params.id)
            .then(res => res.json())
            .then(Caution =>{ this.setState({ Caution: Caution.TicketMaster, FirstMesg: Caution.FirstMesg, netAdmin: Caution.netAdmin, tMessage: "", iAssignTo: "", vStatus: "" }),this.props.form.setFieldsValue({iAssignTo:Caution.FirstMesg[0].ticketOwner}) ;});
              
            
        }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    CautionThread(event) {

        event.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                values["iGeneratorId"] = userdata.Id;
                values["iTicketId"] = this.props.match.params.id;
                if (values.vScreenShot != undefined && values.vScreenShot != "") {
                    values['vScreenShot'] = values.vScreenShot[0].name;
                }
                else {
                    values['vScreenShot'] = null;
                }
                fetch("/ticket/ticket-update", {
                    method: 'post',
                    headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
                    body: 'Data=' + JSON.stringify(values)
                })
                    //.then(json)
                    .then(function (data) {
                        console.log('Request succeeded =>', data)
                    })
                    .then(this.props.form.setFieldsValue({tMessage:"",iAssignTo:"",vStatus:"",vScreenShot:""}))
                    .catch(function (error) {
                        console.log('Request failed =>', error);
                    });
                this.componentDidMount();

            }
        });

        // delete this.state.Caution;
        // delete this.state.netAdmin;
        // delete this.state.FirstMesg;
        // event.preventDefault();

    }
    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
    render() {
        
        const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
        
        return (
            <div class="page-content-wrapper">
                <Header />
                <div class="page-content">
                    <div class="row">
                        <div class="col-md-12">
                            <h3 class="page-title">Edit Ticket</h3>
                            <ul class="page-breadcrumb breadcrumb">
                                <li>
                                    <i class="fa fa-home"></i>
                                    <Link to="/Dashboard">Home </Link>
                                    <i class="fa fa-angle-right"></i>
                                </li>
                                <li>
                                    <Link to="/Caution">Ticket </Link>
                                    <i class="fa fa-angle-right"></i>
                                </li>
                                <li><Link to={this.props.location.pathname}>Edit Ticket </Link></li>
                            </ul>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <Form method="POST" onSubmit={this.CautionThread} method="POST" encType="multipart/form-data">
                                <ul class="timeline">
                                    <li class="timeline-blue">
                                        <div class="timeline-time">
                                            <span class="date"><Clock format={'YYYY/MM/DD'} ticking={true} /></span>
                                            <span class="time"><Clock format={'hh:mm:ss a'} ticking={true} /></span>
                                        </div>
                                        <div class="timeline-icon"><i class="fa fa-comments-o" aria-hidden="true"></i></div>
                                        <div class="timeline-body">
                                            <h2>Reply</h2>
                                            <div class="timeline-content">
                                                <FormItem

                                                    label="Message"
                                                >
                                                    {getFieldDecorator('tMessage', {
                                                        rules: [{
                                                            required: true, message: 'Please Enter Message',
                                                        }],
                                                    })(
                                                        <textarea class="form-control" id="tMessage" Name="tMessage" value={this.state.tMessage} ></textarea>
                                                    )}
                                                </FormItem>

                                            </div>
                                            <div className="row">
                                                <div class="col-lg-6">
                                                {console.log(this.state.FirstMesg)}
                                                    <FormItem

                                                        label="Assign To"
                                                    >
                                                        {getFieldDecorator('iAssignTo', {
                                                            rules: [{
                                                                required: true, message: 'Please Select User',
                                                            }],
                                                        })(
                                                            <Select class="form-control"  placeholder="Select User " id="iAssignTo" Name="iAssignTo" value={this.state.iAssignTo}>

                                                                {this.state.FirstMesg.map(fmsg =>  <Option value={fmsg.ticketOwner} >{"Ticket Owner : " + fmsg.assignBy}</Option>)}
                                                                {(this.state.netAdmin.length > 0 && this.state.netAdmin) ? this.state.netAdmin.map(netAdmin => <Option value={netAdmin.Id}>{netAdmin.Name}</Option>) : ""}
                                                            </Select>
                                                        )}
                                                    </FormItem>
                                                </div>
                                                <div class="col-lg-6">
                                                    <FormItem

                                                        label="Status"
                                                    >
                                                        {getFieldDecorator('vStatus', {
                                                            rules: [{
                                                                required: true, message: 'Please Select User',
                                                            }],
                                                        })(
                                                            <Select class="form-control" placeholder="Please Select Status" Name="vStatus" value={this.state.vStatus} >

                                                                <Option value="Open">Open</Option>
                                                                <Option value="Reopen">Reopen</Option>
                                                                <Option value="Close">Close</Option>
                                                                <Option value="Resolved">Resolve</Option>
                                                                <Option value="InProgress">In Progress</Option>
                                                            </Select>
                                                        )}
                                                    </FormItem>

                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
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
                                            {/* <div class="timeline-footer"></div> */}
                                            <div class="timeline-footer"><button type="submit" class="btn btn-primary add-more-btn">Submit</button></div>
                                        </div>
                                    </li>
                                </ul>
                            </Form>
                        </div>
                    </div>
                    {(this.state.Caution.length>0)?this.state.Caution.map(Caution =>
                        <div class="row">
                            <div class="col-md-12">
                                <ul class="timeline">
                                    <li class="timeline-yellow">
                                        <div class="timeline-time">
                                            <span class="date"><Moment format="YYYY/MM/DD">{Caution.dtCreateAt}</Moment></span>
                                            
                                            <span class="time"><Moment format="hh:mm:ss a">{Caution.dtCreateAt}</Moment></span>
                                            
                                           
                                        </div>
                                        <div class="timeline-icon"><i class="fa fa-check-square-o" aria-hidden="true"></i></div>
                                        <div class="timeline-body">
                                            <div className="caution-status-section"><h3 className="assign-to assign-block"><i class="fa fa-repeat" aria-hidden="true"></i> Assign to: {Caution.assignTo}</h3><h3 className="assignBy-line assign-block"><i class="fa fa-undo" aria-hidden="true"></i> Assign by: {Caution.assignBy}</h3></div>
                                            <div class="timeline-content edit-message-section">
                                                {/* <img class="timeline-img pull-left" src="../../assets/admin/pages/media/blog/2.jpg" alt="" /> */}
                                                {Caution.tMessage}
                                            </div>
                                            <div className="footer edit-ticket-footer">
                                                <h3 className={ "status-name "+Caution.vStatus}>Status: { Caution.vStatus}</h3>
                                                <h3 className="attachment-section-detail">Attachment: {(Caution.vScreenShot != null && Caution.vScreenShot !="" ) ? <div className="attachment-preview-div"><img src={"http://192.168.1.116/react-backend/uploads/" + Caution.vScreenShot} onClick={() => { this.showModal(Caution.vScreenShot) }} /></div> : "No Attachment"}</h3>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ):"<h3>No Data Found </h3>"}
                    {//this.state.FirstMesg.map(FirstMesg =>
                        // <div class="row">
                        //     <div class="col-md-12">
                        //         <ul class="timeline">
                        //             <li class="timeline-yellow">
                        //                 <div class="timeline-time">
                        //                     <span class="date"><Moment format="YYYY/MM/DD">{FirstMesg.dtCreateAt}</Moment></span>
                        //                     <span class="time"><Moment format="HH:mm:ss">{FirstMesg.dtCreateAt}</Moment></span>
                        //                 </div>
                        //                 <div class="timeline-icon"><i class="fa fa-trophy"></i></div>
                        //                 <div class="timeline-body">

                        //                     <h2>Assign to : {FirstMesg.assignTo} ----Assign By : {FirstMesg.assignBy}</h2>
                        //                     <div class="timeline-content">
                        //                         {/* <img class="timeline-img pull-left" src="../../assets/admin/pages/media/blog/2.jpg" alt="" /> */}
                        //                         {FirstMesg.tDescription}
                        //                     </div>
                        //                     <div className="footer">
                        //                    <h3>Status :{FirstMesg.bStatus}</h3>
                        //                         </div>
                        //                 </div>

                        //             </li>
                        //         </ul>
                        //     </div>
                        // </div>
                        // )
                    }

                </div>
                <Footer />
                <Modal
                    // title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleOk}
                    className="image-preview-div"
                >
                    <img src={"http://192.168.1.116/react-backend/uploads/" + this.state.vScreenShot} />
                </Modal>

            </div>
        );
    }
}
export const Edit_ticket = Form.create()(EditTicket);