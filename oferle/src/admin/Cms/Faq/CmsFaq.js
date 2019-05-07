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
export default class CmsFaq extends React.Component {
constructor(props){
    super(props);
    this.state = {
      id:'',
      main_title: '',
      image: null,
      content_title: '',
      content_image: null,
      description: '',
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
  fetch(constant.base_url+constant.server_url.cms_faq_fetch,{
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
            content_title: responseJson.data[0].content_title,
            content_image: responseJson.data[0].content_image,
            description: responseJson.data[0].description,
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
  fetch(constant.base_url+constant.server_url.cms_faq_update,{
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
                <h4 className="cardTitle">Faq Content</h4>
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
                    <Typography variant="title" gutterBottom>Content Title</Typography>
                    <input type="text"  placeholder="Content Title" name="content_title" margin="normal" color="primary" variant="outlined" className="input-conrtol formField" onChange = {this.handleChange} defaultValue={this.state.content_title}  />
                </div>

                <div className="page-title">
                  <Typography variant="title" gutterBottom>Content Image</Typography>
                  <input name="content_image" accept="image/*" type="file" onChange={this.onFileChangeHandler} id="edit-label" className="input-conrtol" />
                  <img className="existingFile" src={ (this.state.content_image!=null &&this.state.content_image!=undefined && this.state.content_image!="" && typeof this.state.content_image === "string")?constant.file_url+this.state.content_image:''} alt="" height="50px" width="50px" />
                </div>
                </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader style={{background:"#20dacb"}}>
                <h4 className="cardTitle">Page Description (optional) </h4>
              </CardHeader>
              <CardBody>
                <div className="page-html">
                    <Typography variant="title" gutterBottom>Description</Typography>
                    <CKEditor
                    name="description"
                    data={this.state.description} onChange={evt => this.setState( { description: evt.editor.getData() } )}
                    />
                    <label>
                        <input name="description" className="hidden"  type="text" />
                    </label>
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





