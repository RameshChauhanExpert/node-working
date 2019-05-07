import React from "react";
import {TextField,FormControl,InputLabel,Select,MenuItem} from "../../utilities"

 
export default class SelectBox  extends React.Component{
    constructor(props){
        super(props);
        this.state={error:""}
        this.handleChange=this.handleChange.bind(this);
        
    }
    
     onSubmit(event)
     {
        if(this.props.required[0]==true)
        {
           if(this.required(event)==true)
           {
                this.props.state.isValidate(false,false)
                return  this.setState({error:this.props.required[1]})
           }else{
              
                this.props.state.isValidate((this.props.state.finalCheckAll=="false"||this.props.state.finalCheckAll==undefined)?false:true,false)
                return  this.setState({error:""})
           } 
        }
    
     } 


    handleChange(event)
    {   
      
        this.props.change(event)
       
      
        if(this.props.required[0]==true)
        {
           if(this.req(event)==true)
           {
             return  this.setState({error:this.props.required[1]})
           }else{
              this.setState({error:""})
               } 
        }
    }
    req(e)
    {
       if(e.target.value=="")
       {
        return true;
       }else{
        return false;
       } 
    }
    required(event)
    {
           if(document.getElementsByName(this.props.name)[0].value=="")
           {
         
                   return true;
           }else{
            
            return false;
            }  
    }
    
    
    render(){
        return(<div className="inline-element">
            {/* <TextField  type={this.props.type} name={this.props.name} onChange={this.handleChange} className={this.props.className} label={this.props.label} />
            */}

            <FormControl onChange={this.handleChange} className={this.props.className}>
          <InputLabel htmlFor="age-simple">{this.props.label+" *"}</InputLabel>
          <Select className="select-inner"
            value={(this.props.state[this.props.name]==undefined)?"":this.props.state[this.props.name]}
            onChange={this.handleChange}
            inputProps={{
              name:this.props.name,
              id: 'age-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.props.data.map(data=>{
                return(<MenuItem value={data.value}>{data.name}</MenuItem>)
            })}
          </Select>
        </FormControl>
            <span className="error-msg">
            {this.state.error}
            </span>
            {(this.props.validate==true)?this.onSubmit():""}
        </div>)
    }
}
