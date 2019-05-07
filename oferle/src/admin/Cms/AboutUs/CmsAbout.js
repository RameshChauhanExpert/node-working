import React,{ Component } from "react";
import { TextField, FormControl,InputLabel,Typography, MenuItem, Button,Select,connect,withRouter} from "../../../utilities"
import { Editor } from 'react-draft-wysiwyg';
import { cms_about_fetch, cms_about_submit ,cms_about_state_update} from "../../../action";
import { EditorState } from 'draft-js';
import {validation} from "./about_validation"
import $ from "jquery";
import PropTypes from 'prop-types';
import CKEditor from 'ckeditor4-react';
import { Loader, CommanSnackBar } from "../../../components";

class CmsAbout extends React.Component {
constructor(props){
    super(props);
    this.handlechange=this.handlechange.bind(this);
    this.state={status:"",editorState: EditorState.createEmpty(),}
    this.onChange=this.onChange.bind(this)
    this.onEditorChange = this.onEditorChange.bind( this );
    this.state={content:"",status:1}
}
    handlechange(event){
            this.setState({[event.target.name]:event.target.value})

    }
    onEditorStateChange: Function = (editorState) => {
         
        this.setState({
          editorState,
        });
      };

    onEditorChange( evt ) {
      this.props.state_update({target:{name:"content",value:evt.editor.getData()}})
        this.setState( {
            content: evt.editor.getData()
        } );
    }
      onChange(event)
      {
          console.log(event)
      }

      componentDidMount()
      {
        this.props.cms_about_fetch()
        var {title,content} =this.props.state.cms_about
        this.setState({content:content})
      
        validation()
      }

      onSubmit=(event)=>{
     
    if(event!=undefined){event.preventDefault()}
    
    var form = $( "#cms_about" );
          form.validate();
          if(form.valid()==true)
          {
            this.props.about_submit()
          }
   }


    render() {
           
        const { editorState } = this.state;
        var {title,content} =this.props.state.cms_about
        var {loader,snackbar} =this.props.state.utilities
      
        return (
            <div className="page-edit-wrapper">
                <form onSubmit={this.onSubmit} id="cms_about">
                <div className="page-title">
                    <Typography variant="title" gutterBottom>Page Title</Typography>
                    <TextField type="text" value={title} name="title" onChange={this.props.state_update}  margin="normal" color="primary" variant="outlined" className="input-conrtol" />
                </div>

                <div className="page-html">
                    <Typography variant="title" gutterBottom>Page Code</Typography>
                    <CKEditor
                    data={this.state.content}
                    onChange={this.onEditorChange} 
                    name="content"
                    />
                    <label>
                        <input name="content" className="hidden"  type="text" readOnly value={this.state.content} onChange={this.props.state_update} />
                    </label>
                </div>
                <div className="page-status">
                <FormControl >
          <InputLabel htmlFor="age-native-simple">Status</InputLabel>
          <Select
            native
            value={this.state.status}
            onChange={this.props.state_update}
            inputProps={{
              name: 'status',
              id: 'age-native-simple',
            }}
          >
            <option value="" />
            <option value={1}>Active</option>
            <option value={0}>Deactive</option>
           
          </Select>
        </FormControl>
 
                </div>

                <div className="action-button">
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </div>
                
{(loader==true)?<Loader/>:""}
<CommanSnackBar state={snackbar}/>
                </form>
            </div>
        )
    }
}


const mapStateToProps = state => ({
	state
})
const actionCall = dispatch => ({
    cms_about_fetch:(route)=>{dispatch(cms_about_fetch())},
    state_update:(event)=>{dispatch(cms_about_state_update(event))},
    about_submit:(route)=>{dispatch(cms_about_submit())}
    
})
export default withRouter(connect(mapStateToProps,actionCall)(CmsAbout))




