import React,{ Component } from "react";
import { TextField, FormControl,InputLabel,Typography, MenuItem, Button,Select,connect,withRouter} from "../../../utilities"
import { Editor } from 'react-draft-wysiwyg';
import { cms_home_fetch, cms_home_submit ,cms_home_state_update} from "../../../action";
import { EditorState } from 'draft-js';
import $ from "jquery";
import PropTypes from 'prop-types';
import CKEditor from 'ckeditor4-react';
//import { Loader, CommanSnackBar } from "../../../components";
import { constant } from "../../../config";
// core components
// material-ui
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Language from "@material-ui/icons/Language";
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../components/Grid/GridItem.jsx";
import Card from "../../../components/Card/Card.jsx";
import CardBody from "../../../components/Card/CardBody.jsx";
import CardHeader from "../../../components/Card/CardHeader.jsx";
import CardIcon from "../../../components/Card/CardIcon.jsx";
import FadeSnackbar from '../../../components/SnackBar/SnackBar.js';
import Loader from '../../../components/loader/loader.js';

import "../Cms.css";
export default class CmsHowItWorks extends React.Component {
constructor(props){
    super(props);
    this.state = {
      id:'',
      image: null,
      main_title: '',
      content: '',
      title: '',
      description: '',
      step1_title: '',
      step1_desc: '',
      step1_image: null,
      step2_title: '',
      step2_desc: '',
      step2_image: null,
      step3_title: '',
      step3_desc: '',
      step3_image: null,
      step4_title: '',
      step4_desc: '',
      step4_image: null,
      step5_title: '',
      step5_desc: '',
      step5_image: null,
      snackbar_open: false,
      api_message: '',
      isLoading: false,
  }
  this.handleChange=this.handleChange.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  //this.imageAction=this.imageAction.bind(this);
  this.onFileChangeHandler=this.onFileChangeHandler.bind(this);
  //this.fileUpload=this.fileUpload.bind(this);
  //this.createImage=this.createImage.bind(this);
}
handleChange(e){
  this.setState({ [e.target.name]: e.target.value});
}
componentWillMount(){
  this.setState({ isLoading: true })
  fetch(constant.base_url+constant.server_url.cms_how_it_works_fetch,{
    method:"GET",
    headers:{
     'Accept': 'application/json',
     "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.status==200)
        {
          //console.log(responseJson.data[0].title);
          this.setState({ 
            id: responseJson.data[0].id,
            image : responseJson.data[0].image, 
            main_title: responseJson.data[0].main_title,
            content: responseJson.data[0].content,
            title: responseJson.data[0].title,
            description: responseJson.data[0].description,
            step1_title: responseJson.data[0].step1_title,
            step1_desc: responseJson.data[0].step1_desc,
            step1_image: responseJson.data[0].step1_image,
            step2_title: responseJson.data[0].step2_title,
            step2_desc: responseJson.data[0].step2_desc,
            step2_image: responseJson.data[0].step2_image,
            step3_title: responseJson.data[0].step3_title,
            step3_desc: responseJson.data[0].step3_desc,
            step3_image: responseJson.data[0].step3_image,
            step4_title: responseJson.data[0].step4_title,
            step4_desc: responseJson.data[0].step4_desc,
            step4_image: responseJson.data[0].step4_image,
            step5_title: responseJson.data[0].step5_title,
            step5_desc: responseJson.data[0].step5_desc,
            step5_image: responseJson.data[0].step5_image,
           });
           this.setState({ isLoading: false })
        }
      })
      .catch((error) => {
        console.error(error);
        this.setState({ isLoading: false })
      });
    
}

onFileChangeHandler(event){
  console.log(event.target.files[0]);
  this.setState({[event.target.name]:event.target.files[0]});
}

handleSubmit(e){
  this.setState({ isLoading: true })
  e.preventDefault();
  console.log("state data",this.state);
  fetch(constant.base_url+constant.server_url.cms_how_it_works_update,{
      method:"POST",
      headers:{
          'Accept': 'application/json',
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8;  multipart/form-data",
        },
        
        body:"Data="+JSON.stringify(this.state)
  })
  .then(res=>res.json())
  .then(response=>{ console.log(response);
      if(response.status==200)
      {
        this.setState({ isLoading: false })
        this.setState({snackbar_open: true, api_message: response.message})
        setTimeout(() => {this.setState({snackbar_open: false, api_message: ''})},4000)
        console.log(response.status);
      }
      else if(response.status==401){
        this.setState({ isLoading: false })
        this.setState({snackbar_open: true, api_message: response.message})
        setTimeout(() => {this.setState({snackbar_open: false, api_message: ''})},4000)
        console.log(response.status);
      }
    })
    .catch(error=>{
      this.setState({ isLoading: false })
      console.error(error);
    })
}

render() {
  return (
    <div className="page-edit-wrapper">
    {this.state.isLoading ? <Loader /> : null}
    <form id="cms_home" onSubmit = {this.handleSubmit}>
                
      <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader style={{background:"#20dacb"}}>
                <h4 className="cardTitle">How It Works Main Content</h4>
              </CardHeader>
              <CardBody>
                <div className="page-title">
                    <Typography variant="title" gutterBottom>Main Title</Typography>
                    <input type="text"  placeholder="Main Title" name="main_title" margin="normal" color="primary" variant="outlined" className="input-conrtol formField" onChange = {this.handleChange} defaultValue={this.state.main_title}  />
                </div>

                <div className="page-title">
                  <Typography variant="title" gutterBottom>Image</Typography>
                  <input name="image" accept="image/*" type="file" onChange={this.onFileChangeHandler} id="edit-label" className="input-conrtol" />
                  <img className="existingFile" src={ (this.state.image!=null &&this.state.image!=undefined && this.state.image!="" && typeof this.state.image === "string")?constant.file_url+this.state.image:''} alt="" height="50px" width="50px" />
                </div>

                <div className="page-html">
                    <Typography variant="title" gutterBottom>Content</Typography>
                    <CKEditor
                    name="content"
                    data={this.state.content} onChange={evt => this.setState( { content: evt.editor.getData() } )}
                    />
                    <label>
                        <input name="content" className="hidden"  type="text" />
                    </label>
                </div>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader style={{background:"#20dacb"}}>
                <h4 className="cardTitle">Page Content</h4>
              </CardHeader>
              <CardBody>
                <div className="page-title">
                    <Typography variant="title" gutterBottom>Main Title</Typography>
                    <input type="text" placeholder="Main Title" name="title" margin="normal" color="primary" variant="outlined" className="input-conrtol formField" onChange = {this.handleChange} defaultValue={this.state.title}/>
                </div>
                <div className="page-html">
                    <Typography variant="title" gutterBottom>Main Description</Typography>
                    <CKEditor
                    name="description"
                    data={this.state.description} onChange={evt => this.setState( { description: evt.editor.getData() } )}
                    />
                    <label>
                        <input name="description" className="hidden"  type="text"  />
                    </label>
                </div>
                </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader className="card" style={{background:"#20dacb",width: "100px"}} icon>
                <h4 className="cardTitle">Step 01</h4>
              </CardHeader>
              <CardBody>
                <div className="page-title">
                    <Typography variant="title" gutterBottom>Step 1 Title</Typography>
                    <input type="text" placeholder="Step 1 Title" name="step1_title" margin="normal" color="primary" variant="outlined" className="input-conrtol formField" onChange = {this.handleChange} defaultValue={this.state.step1_title}/>
                </div>

                <div className="page-html">
                    <Typography variant="title" gutterBottom>Step 1 Description</Typography>
                    <CKEditor
                    name="step1_desc"
                    data={this.state.step1_desc} onChange={evt => this.setState( { step1_desc: evt.editor.getData() } )}
                    />
                    <label>
                        <input name="step1_desc" className="hidden"  type="text"  />
                    </label>
                </div>

                <div className="page-title">
                  <Typography variant="title" gutterBottom>Step 1 Image</Typography>
                  <input name="step1_image" accept="image/*" type="file" onChange={this.onFileChangeHandler} id="edit-label" className="input-conrtol" />
                  <img className="existingFile" src={ (this.state.step1_image!=null &&this.state.step1_image!=undefined && this.state.step1_image!="" && typeof this.state.step1_image === "string")?constant.file_url+this.state.step1_image:''} alt="" height="50px" width="50px" />
                </div>
               
                </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader className="card" style={{background:"#20dacb",width: "100px"}} icon>
                <h4 className="cardTitle">Step 02</h4>
              </CardHeader>
              <CardBody>
                <div className="page-title">
                    <Typography variant="title" gutterBottom>Step 2 Title</Typography>
                    <input type="text" placeholder="Step 2 Title" name="step2_title" margin="normal" color="primary" variant="outlined" className="input-conrtol formField" onChange = {this.handleChange} defaultValue={this.state.step2_title} />
                </div>
                <div className="page-html">
                    <Typography variant="title" gutterBottom>Step 2 Description</Typography>
                    <CKEditor
                    name="step2_desc" 
                    data={this.state.step2_desc} onChange={evt => this.setState( { step2_desc: evt.editor.getData() } )}
                    />
                    <label>
                        <input name="step2_desc" className="hidden"  type="text"  />
                    </label>
                </div>
                <div className="page-title">
                  <Typography variant="title" gutterBottom>Step 2 Image</Typography>
                  <input name="step2_image" accept="image/x-png,image/jpeg" type="file" onChange={event => this.setState( { step2_image: event.target.files[0] } )} id="edit-label" className="input-conrtol" />
                <img className="existingFile" src={ (this.state.step2_image!=null && this.state.step2_image!=undefined && this.state.step2_image!="" && typeof this.state.step2_image === "string")?constant.file_url+this.state.step2_image:''} alt="" height="50px" width="50px" />
                </div>
                </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader className="card" style={{background:"#20dacb",width: "100px"}} icon>
                <h4 className="cardTitle">Step 03</h4>
              </CardHeader>
              <CardBody>
                <div className="page-title">
                    <Typography variant="title" gutterBottom>Step 3 Title</Typography>
                    <input type="text" placeholder="Step 3 Title" name="step3_title" margin="normal" color="primary" variant="outlined" className="input-conrtol formField" onChange = {this.handleChange} defaultValue={this.state.step3_title} />
                </div>
                <div className="page-html">
                    <Typography variant="title" gutterBottom>Step 3 Description</Typography>
                    <CKEditor
                    name="step3_desc" 
                    data={this.state.step3_desc} onChange={evt => this.setState( { step3_desc: evt.editor.getData() } )}
                    />
                    <label>
                        <input name="step3_desc" className="hidden"  type="text"  />
                    </label>
                </div>
                <div className="page-title">
                  <Typography variant="title" gutterBottom>Step 3 Image</Typography>
                  <input name="step3_image" accept="image/x-png,image/jpeg" type="file" onChange={event => this.setState( { step3_image: event.target.files[0] } )} id="edit-label" className="input-conrtol" />
                <img className="existingFile" src={ (this.state.step3_image!=null && this.state.step3_image!=undefined && this.state.step3_image!="" && typeof this.state.step3_image === "string")?constant.file_url+this.state.step3_image:''} alt="" height="50px" width="50px" />
                </div>
                </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader className="card" style={{background:"#20dacb",width: "100px"}} icon>
                <h4 className="cardTitle">Step 04</h4>
              </CardHeader>
              <CardBody>
                <div className="page-title">
                    <Typography variant="title" gutterBottom>Step 4 Title</Typography>
                    <input type="text" placeholder="Step 4 Title" name="step4_title" margin="normal" color="primary" variant="outlined" className="input-conrtol formField" onChange = {this.handleChange} defaultValue={this.state.step4_title} />
                </div>
                <div className="page-html">
                    <Typography variant="title" gutterBottom>Step 4 Description</Typography>
                    <CKEditor
                    name="step4_desc" 
                    data={this.state.step4_desc} onChange={evt => this.setState( { step4_desc: evt.editor.getData() } )}
                    />
                    <label>
                        <input name="step4_desc" className="hidden"  type="text"  />
                    </label>
                </div>
                <div className="page-title">
                  <Typography variant="title" gutterBottom>Step 4 Image</Typography>
                  <input name="step4_image" accept="image/x-png,image/jpeg" type="file" onChange={event => this.setState( { step4_image: event.target.files[0] } )} id="edit-label" className="input-conrtol" />
                <img className="existingFile" src={ (this.state.step4_image!=null && this.state.step4_image!=undefined && this.state.step4_image!="" && typeof this.state.step4_image === "string")?constant.file_url+this.state.step4_image:''} alt="" height="50px" width="50px" />
                </div>
                </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader className="card" style={{background:"#20dacb",width: "100px"}} icon>
                <h4 className="cardTitle">Step 05</h4>
              </CardHeader>
              <CardBody>
                <div className="page-title">
                    <Typography variant="title" gutterBottom>Step 5 Title</Typography>
                    <input type="text" placeholder="Step 5 Title" name="step5_title" margin="normal" color="primary" variant="outlined" className="input-conrtol formField" onChange = {this.handleChange} defaultValue={this.state.step5_title} />
                </div>
                <div className="page-html">
                    <Typography variant="title" gutterBottom>Step 5 Description</Typography>
                    <CKEditor
                    name="step5_desc" 
                    data={this.state.step5_desc} onChange={evt => this.setState( { step5_desc: evt.editor.getData() } )}
                    />
                    <label>
                        <input name="step5_desc" className="hidden"  type="text"  />
                    </label>
                </div>
                <div className="page-title">
                  <Typography variant="title" gutterBottom>Step 5 Image</Typography>
                  <input name="step5_image" accept="image/x-png,image/jpeg" type="file" onChange={event => this.setState( { step5_image: event.target.files[0] } )} id="edit-label" className="input-conrtol" />
                <img className="existingFile" src={ (this.state.step5_image!=null && this.state.step5_image!=undefined && this.state.step5_image!="" && typeof this.state.step5_image === "string")?constant.file_url+this.state.step5_image:''} alt="" height="50px" width="50px" />
                </div>
                </CardBody>
            </Card>
          </GridItem>
        </GridContainer>

        <div className="action-button">
          <input type="submit" className="btn btn-primary pull-right" name="submit" value="Submit"/>
        </div>

        

      </form>
      <FadeSnackbar 
          snackbar = {{show: this.state.snackbar_open, message: this.state.api_message}}
          //duration = {4000}
        />
    </div>
    )
}
}





