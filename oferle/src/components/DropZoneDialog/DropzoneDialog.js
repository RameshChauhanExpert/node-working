import React, {Component} from 'react'
import {DropzoneArea,DropzoneDialog} from 'material-ui-dropzone'
import FadeSnackbar from "../SnackBar/SnackBar"
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { Theaters } from '@material-ui/icons';
import { ImageBlobStorage } from '../../utilities';

export default class DropzoneDialogExample extends Component{
  constructor(props){
    super(props);
    
    this.imageBlob=ImageBlobStorage.imageBlob

    this.imageState=Array()
    this.delete=this.delete.bind(this)
    
    this.onsnackbar=this.onsnackbar.bind(this)
    this.delete=this.delete.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.createImage=this.createImage.bind(this)

    this.state = {
      files: [],
      show:false,
      message:"",
      open:false
    };
  }
  onsnackbar(data)
  {
    
    this.setState({show:data,message:"this file is deleted"})
    setTimeout(function(){ 
      this.setState({show:false,message:""})
     }.bind(this), 3000);

  }

  delete(files)
  {  
  
   
  var imageUrl=Array();
  this.props.state.image_drop.map((data,index)=>{
   
    if(data.name!=files)
    {
    
     imageUrl.push({value:data.value,name:data.name})
     this.imageBlob.push({value:data.value,name:data.name,blob_data:data.blob_data})
    }
  })
  ImageBlobStorage.imageBlob=imageUrl
   this.imageBlob=imageUrl
    var event={target:{name:this.props.name,value:files}}
    this.setState({
      files:imageUrl,
      show:true,message:"This file is deleted" ,
     
    });

    this.props.change(event,imageUrl)
 
  setTimeout(function(){ 
    this.setState({show:false,message:"",})
   }.bind(this), 3000);
    
  }

  
  handleChange(event)
  {    
   
        //var files=Object.values(event.target.files)
          var files=Array.from(event.target.files)
       
       files.map((data,index)=>{
        var type=data.type.split("/")
        if(data.size>5000000)
        {
          this.setState({show:true,message:"The file size of "+data.name+" should be less than 5 MB"})
        }
        else if(type[1].toLowerCase()!="jpeg"&&type[1].toLowerCase()!="png"&&type[1].toLowerCase()!="jpg"){
          this.setState({show:true,message:"Only JPG, JPEG, PNG files are allowed"})
        }
        else{
         
         
           if(index<=20)
          {
            this.createImage(data,index)
          }else
          {
            this.setState({show:true,message:"Only 20 images allowed to upload."})
          }
        }
       })
    
    let imageBlob=this.imageBlob
    this.setState({files:imageBlob},()=>{
      this.props.change({target:{name:"image_drop",value:imageBlob}},this.state.files)
    })
   
     document.getElementById('image_drop').value='';
    
    setTimeout(function(){ 
     this.setState({})
     }.bind(this), 500);
    
  }

  createImage(file,index) {
    
   
    var d=new Date();
   
    let reader = new FileReader();
    reader.onload = (e) => {
     
    this.imageBlob.push({value:e.target.result,name:file.name.trim().toLowerCase()+Math.round(d.getMilliseconds()*5548548),blob_data:file}) 
 
  };
    reader.readAsDataURL(file);
  }

  componentDidMount()
  {
    this.setState({open:true,message:""})
    
  }
  render(){
    
    return (

      <div className="custom-drag-upload">

        <div className="custom-drop-box">
          <input  type="file" onChange={this.handleChange.bind(this)} id="image_drop" name="image_drop" multiple></input>
          <label className="upload-text" for="image_drop">Drag or Upload Your Image</label>

        </div>

             {(this.props.state.image_drop)?<ul className="preview-photos">
          {this.props.state.image_drop.map((data,index)=>{
            return(<li><img src={data.value} height="100" width="100"/>
            <span  id={data.name} className="delete-icon" onClick={()=>{
              this.delete(data.name)
            }} ><DeleteOutlinedIcon/></span></li>)
          })}


          
        </ul>:""}
       
        <FadeSnackbar snackbar={this.state} onclose={this.onsnackbar}/>
      
        </div>
    )  
  }
} 


class Image extends React.Component{

constructor(props)
{
  super(props)
  this.handleChange=this.handleChange.bind(this)
}

handleChange(event)
{
const files = Object.values(event.target.files)
var formData=new FormData()
files.forEach((file, i) => {
 
  formData.append(i, file)
})



fetch("/user_master/create_user/",{
  method: 'POST',
  
  body: formData
})
  

}


  render()
  {
    return(<div>
    <input type="file"  onChange={this.handleChange} />





    </div>)
  }
}