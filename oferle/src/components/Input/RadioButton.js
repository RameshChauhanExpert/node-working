import React from "react";
import {RadioGroup,FormControl,Radio,FormControlLabel} from "../../utilities"

 
export default class RadioButton  extends React.Component{
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
            if(this.required(event)==true)
            {
              return  this.setState({error:this.props.required[1]})
            }else{
               this.setState({error:""})
                } 
         }
           }
    
    required(event)
    {
        var radioData=document.getElementsByName(this.props.name)
     var isvalidate  
     this.props.data.map((data,index)=>{

        if( document.getElementsByName(this.props.name)[index].checked==true)
        {
            isvalidate= true;
        }
       })

        
           if(isvalidate!=true)
           {
              
                   return true;
           }else{
           
            return false;
            }  
    }
    
    min(event)
    {
       if(event.target.value<this.props.min[1])
       {
           return true;
       }
       else{
           return false;
       }
    }
    
    

    componentWillReceiveProps()
    {
       // alert("validate"+this.props.validate)
    }
    render(){
        return(<div className="inline-element radio-controls">
            <FormControl component="fieldset" onChange={this.handleChange} className={this.props.className}>
                <RadioGroup
                  

                 value={this.props.state[this.props.name]}
                  aria-label="position"
                  name={this.props.name}
                  row={this.props.row}
                  column={this.props.column}
                  className="radio-group"
                  
                >
                {this.props.data.map(data=>{
                        return(<FormControlLabel
                        value={data.value} className={(this.props.state[this.props.name]==data.value)?"radio-button active":"radio-button"}
                        control={<Radio color="primary" />}
                        label={data.name}
                        labelPlacement="left"
                       
                        />)
                    })}
                
                  
                </RadioGroup>
              </FormControl>
         
            <span className="error-msg">
            {this.state.error}
            </span>
            
            {(this.props.validate==true)?this.onSubmit():""}
        </div>)
    }
}
