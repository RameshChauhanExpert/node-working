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
export default class CmsAboutUs extends React.Component {
constructor(props){
    super(props);
    this.state = {
      id:'',
      image: null,
      main_title: '',
      section1_title: '',
      section1_description: '',
      section1_image: null,
      section2_title: '',
      section2_description: '',
      section2_image1: null,
      section2_hover_image1: null,
      section2_title1: '',
      section2_desc1: '',
      section2_image2: null,
      section2_hover_image2: null,
      section2_title2: '',
      section2_desc2: '',
      section2_image3: null,
      section2_hover_image3: null,
      section2_title3: '',
      section2_desc3: '',
      section3_title: '',
      section3_description: '',
      section3_image: null,
      section4_title: '',
      section4_description: '',
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
  fetch(constant.base_url+constant.server_url.cms_about_us_fetch,{
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
            section1_title: responseJson.data[0].section1_title,
            section1_description: responseJson.data[0].section1_description,
            section1_image: responseJson.data[0].section1_image,
            section2_title: responseJson.data[0].section2_title,
            section2_description: responseJson.data[0].section2_description,
            section2_image1: responseJson.data[0].section2_image1,
            section2_hover_image1: responseJson.data[0].section2_hover_image1,
            section2_title1: responseJson.data[0].section2_title1,
            section2_desc1: responseJson.data[0].section2_desc1,
            section2_image2: responseJson.data[0].section2_image2,
            section2_hover_image2: responseJson.data[0].section2_hover_image2,
            section2_title2: responseJson.data[0].section2_title2,
            section2_desc2: responseJson.data[0].section2_desc2,
            section2_image3: responseJson.data[0].section2_image3,
            section2_hover_image3: responseJson.data[0].section2_hover_image3,
            section2_title3: responseJson.data[0].section2_title3,
            section2_desc3: responseJson.data[0].section2_desc3,
            section3_title: responseJson.data[0].section3_title,
            section3_description: responseJson.data[0].section3_description,
            section3_image: responseJson.data[0].section3_image,
            section4_title: responseJson.data[0].section4_title,
            section4_description: responseJson.data[0].section4_description,
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
  fetch(constant.base_url+constant.server_url.cms_about_us_update,{
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
                <h4 className="cardTitle">About Us</h4>
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
                {/* <div className="card" style={{background:"#20dacb"}} icon>
                <h4 className="cardTitle">Step 01</h4></div> */}

              </CardBody>
            </Card>
            <Card>
              <CardHeader style={{background:"#20dacb"}}>
                <h4 className="cardTitle">Section 1</h4>
              </CardHeader>
              <CardBody>
                <div className="page-title">
                    <Typography variant="title" gutterBottom>Section 1 Title</Typography>
                    <input type="text" placeholder="Section 1 Title" name="section1_title" margin="normal" color="primary" variant="outlined" className="input-conrtol formField" onChange = {this.handleChange} defaultValue={this.state.section1_title}/>
                </div>
                <div className="page-html">
                    <Typography variant="title" gutterBottom>Section 1 Description</Typography>
                    <CKEditor
                    name="section1_description"
                    data={this.state.section1_description} onChange={evt => this.setState( { section1_description: evt.editor.getData() } )}
                    />
                    <label>
                        <input name="section1_description" className="hidden"  type="text"  />
                    </label>
                </div>
                <div className="page-title">
                  <Typography variant="title" gutterBottom>Section 1 Image</Typography>
                  <input name="section1_image" accept="image/*" type="file" onChange={this.onFileChangeHandler} id="edit-label" className="input-conrtol" />
                  <img className="existingFile" src={ (this.state.section1_image!=null &&this.state.section1_image!=undefined && this.state.section1_image!="" && typeof this.state.section1_image === "string")?constant.file_url+this.state.section1_image:''} alt="" height="50px" width="50px" />
                </div>
                </CardBody>
            </Card>
            <Card>
              <CardHeader style={{background:"#20dacb"}}>
                <h4 className="cardTitle">Section 3</h4>
              </CardHeader>
              <CardBody>
                <div className="page-title">
                    <Typography variant="title" gutterBottom>Step 3 Title</Typography>
                    <input type="text" placeholder="Step 3 Title" name="section3_title" margin="normal" color="primary" variant="outlined" className="input-conrtol formField" onChange = {this.handleChange} defaultValue={this.state.section3_title} />
                </div>
                <div className="page-html">
                    <Typography variant="title" gutterBottom>Section 3 Description</Typography>
                    <CKEditor
                    name="section3_description" 
                    data={this.state.section3_description} onChange={evt => this.setState( { section3_description: evt.editor.getData() } )}
                    />
                    <label>
                        <input name="section3_description" className="hidden"  type="text"  />
                    </label>
                </div>
                <div className="page-title">
                  <Typography variant="title" gutterBottom>Section 3 Image</Typography>
                  <input name="section3_image" accept="image/x-png,image/jpeg" type="file" onChange={event => this.setState( { section3_image: event.target.files[0] } )} id="edit-label" className="input-conrtol" />
                <img className="existingFile" src={ (this.state.section3_image!=null && this.state.section3_image!=undefined && this.state.section3_image!="" && typeof this.state.section3_image === "string")?constant.file_url+this.state.section3_image:''} alt="" height="50px" width="50px" />
                </div>
                </CardBody>
            </Card>
            <Card>
              <CardHeader style={{background:"#20dacb"}}>
                <h4 className="cardTitle">Section 4</h4>
              </CardHeader>
              <CardBody>
                <div className="page-title">
                    <Typography variant="title" gutterBottom>Section 4 Title</Typography>
                    <input type="text" placeholder="Section 4 Title" name="section4_title" margin="normal" color="primary" variant="outlined" className="input-conrtol formField" onChange = {this.handleChange} defaultValue={this.state.section4_title} />
                </div>
                <div className="page-html">
                    <Typography variant="title" gutterBottom>Section 4 Description</Typography>
                    <CKEditor
                    name="section4_description" 
                    data={this.state.section4_description} onChange={evt => this.setState( { section4_description: evt.editor.getData() } )}
                    />
                    <label>
                        <input name="section4_description" className="hidden"  type="text"  />
                    </label>
                </div>
                </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader style={{background:"#20dacb"}}>
                <h4 className="cardTitle">Section 2</h4>
              </CardHeader>
              <CardBody>
                <div className="page-title">
                    <Typography variant="title" gutterBottom>Section 2 Title</Typography>
                    <input type="text" placeholder="Section 2 Title" name="section2_title" margin="normal" color="primary" variant="outlined" className="input-conrtol formField" onChange = {this.handleChange} defaultValue={this.state.section2_title}/>
                </div>

                <div className="page-html">
                    <Typography variant="title" gutterBottom>Section 2 Description</Typography>
                    <CKEditor
                    name="section2_description"
                    data={this.state.section2_description} onChange={evt => this.setState( { section2_description: evt.editor.getData() } )}
                    />
                    <label>
                        <input name="section2_description" className="hidden"  type="text"  />
                    </label>
                </div>
                <div className="card" style={{background:"#20dacb"}} icon>
                <h4 className="cardTitle"> 01 </h4></div>
                <div className="page-title">
                  <Typography variant="title" gutterBottom>Section 2 Image 1</Typography>
                  <input name="section2_image1" accept="image/*" type="file" onChange={this.onFileChangeHandler} id="edit-label" className="input-conrtol" />
                  <img className="existingFile" src={ (this.state.section2_image1!=null &&this.state.section2_image1!=undefined && this.state.section2_image1!="" && typeof this.state.section2_image1 === "string")?constant.file_url+this.state.section2_image1:''} alt="" height="50px" width="50px" />
                </div>
                <div className="page-title">
                  <Typography variant="title" gutterBottom>Section 2 Hover Image 1</Typography>
                  <input name="section2_hover_image1" accept="image/*" type="file" onChange={this.onFileChangeHandler} id="edit-label" className="input-conrtol" />
                  <img className="existingFile" src={ (this.state.section2_hover_image1!=null &&this.state.section2_hover_image1!=undefined && this.state.section2_hover_image1!="" && typeof this.state.section2_hover_image1 === "string")?constant.file_url+this.state.section2_hover_image1:''} alt="" height="50px" width="50px" />
                </div>
                <div className="page-title">
                    <Typography variant="title" gutterBottom>Section 2 Title 1</Typography>
                    <input type="text" placeholder="Section 2 Title 1" name="section2_title1" margin="normal" color="primary" variant="outlined" className="input-conrtol formField" onChange = {this.handleChange} defaultValue={this.state.section2_title1}/>
                </div>
                <div className="page-html">
                    <Typography variant="title" gutterBottom>Section 2 Description 1</Typography>
                    <CKEditor
                    name="section2_desc1"
                    data={this.state.section2_desc1} onChange={evt => this.setState( { section2_desc1: evt.editor.getData() } )}
                    />
                    <label>
                        <input name="section2_desc1" className="hidden"  type="text"  />
                    </label>
                </div>
                <div className="card" style={{background:"#20dacb"}}>
                <h4 className="cardTitle">02 </h4></div>
                <div className="page-title">
                  <Typography variant="title" gutterBottom>Section 2 Image 2</Typography>
                  <input name="section2_image2" accept="image/*" type="file" onChange={this.onFileChangeHandler} id="edit-label" className="input-conrtol" />
                  <img className="existingFile" src={ (this.state.section2_image2!=null &&this.state.section2_image2!=undefined && this.state.section2_image2!="" && typeof this.state.section2_image2 === "string")?constant.file_url+this.state.section2_image2:''} alt="" height="50px" width="50px" />
                </div>
                <div className="page-title">
                  <Typography variant="title" gutterBottom>Section 2 Hover Image 2</Typography>
                  <input name="section2_hover_image2" accept="image/*" type="file" onChange={this.onFileChangeHandler} id="edit-label" className="input-conrtol" />
                  <img className="existingFile" src={ (this.state.section2_hover_image2!=null &&this.state.section2_hover_image2!=undefined && this.state.section2_hover_image2!="" && typeof this.state.section2_hover_image2 === "string")?constant.file_url+this.state.section2_hover_image2:''} alt="" height="50px" width="50px" />
                </div>
                <div className="page-title">
                    <Typography variant="title" gutterBottom>Section 2 Title 2</Typography>
                    <input type="text" placeholder="Section 2 Title 2" name="section2_title2" margin="normal" color="primary" variant="outlined" className="input-conrtol formField" onChange = {this.handleChange} defaultValue={this.state.section2_title2}/>
                </div>
                <div className="page-html">
                    <Typography variant="title" gutterBottom>Section 2 Description 2</Typography>
                    <CKEditor
                    name="section2_desc2"
                    data={this.state.section2_desc2} onChange={evt => this.setState( { section2_desc2: evt.editor.getData() } )}
                    />
                    <label>
                        <input name="section2_desc2" className="hidden"  type="text"  />
                    </label>
                </div>
                <div className="card" style={{background:"#20dacb"}} icon>
                <h4 className="cardTitle"> 03 </h4></div>
                <div className="page-title">
                  <Typography variant="title" gutterBottom>Section 2 Image 3</Typography>
                  <input name="section2_image3" accept="image/*" type="file" onChange={this.onFileChangeHandler} id="edit-label" className="input-conrtol" />
                  <img className="existingFile" src={ (this.state.section2_image3!=null &&this.state.section2_image3!=undefined && this.state.section2_image3!="" && typeof this.state.section2_image3 === "string")?constant.file_url+this.state.section2_image3:''} alt="" height="50px" width="50px" />
                </div>
                <div className="page-title">
                  <Typography variant="title" gutterBottom>Section 2 Hover Image 3</Typography>
                  <input name="section2_hover_image3" accept="image/*" type="file" onChange={this.onFileChangeHandler} id="edit-label" className="input-conrtol" />
                  <img className="existingFile" src={ (this.state.section2_hover_image3!=null &&this.state.section2_hover_image3!=undefined && this.state.section2_hover_image3!="" && typeof this.state.section2_hover_image3 === "string")?constant.file_url+this.state.section2_hover_image3:''} alt="" height="50px" width="50px" />
                </div>
                <div className="page-title">
                    <Typography variant="title" gutterBottom>Section 2 Title 3</Typography>
                    <input type="text" placeholder="Section 2 Title 3" name="section2_title3" margin="normal" color="primary" variant="outlined" className="input-conrtol formField" onChange = {this.handleChange} defaultValue={this.state.section2_title3}/>
                </div>
                <div className="page-html">
                    <Typography variant="title" gutterBottom>Section 2 Description 3</Typography>
                    <CKEditor
                    name="section2_desc3"
                    data={this.state.section2_desc3} onChange={evt => this.setState( { section2_desc3: evt.editor.getData() } )}
                    />
                    <label>
                        <input name="section2_desc3" className="hidden"  type="text"  />
                    </label>
                </div>
                
                
               
                </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
         
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





