import React from "react";
import { TextField, Typography, MenuItem, Button,Select } from "../../../utilities"
import { Editor } from 'react-draft-wysiwyg';
class RegistrationEmail extends React.Component {
constructor(props){
    super(props);
    this.handlechange=this.handlechange.bind(this);
    this.state={status:"",title:"",template:""}
}
    handlechange(event){ console.log(event.target.name,event.target.value);

            this.setState({[event.target.name]:event.target.value})

    }

    editorstateupdate(e){
        console.log(e);

    }
    submit=()=>{
       console.log(this.state);
    }
    
    render() {
        return (
            <div className="page-edit-wrapper">
                <form name="emailtemplate"  action="/admin/email-template" onSubmit={this.submit}>
                <div className="page-title">
                    <Typography variant="title" gutterBottom>Template Title</Typography>
                    <TextField name="title" type="text"  margin="normal" color="primary" variant="outlined" className="input-conrtol"  onChange={this.handlechange}/>
                </div>

                <div className="page-html">
                    <Typography variant="title" gutterBottom>Template Code</Typography>
                    <Editor name="template"
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        editorStyle={{lineHeight: '75%', height:'320px', border:'1px #F1F1F1 solid'}} onChange={this.editorstateupdate}
                    />
                </div>
                <div className="page-status">
                    <Typography variant="title" gutterBottom>Status</Typography>
                    <Select name="status" variant="outlined" className="select-box"
                        value={this.state.status}
                        onChange={this.handlechange}
                    >
                        <MenuItem value="1">Active</MenuItem>
                        <MenuItem value="0">Deactive</MenuItem>
                    </Select>
                </div>

                <div className="action-button">
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </div>
                </form>


            </div>
        )
    }
}

export default RegistrationEmail