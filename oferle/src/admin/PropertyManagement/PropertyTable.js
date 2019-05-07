import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { Button } from '@material-ui/core';
import {Table,TableBody,TableCell,TableHead,TablePagination,TableRow,TableSortLabel,Toolbar,Typography,Paper,Checkbox,IconButton,Tooltip,Modal} from "../../utilities/material_ui";

import SimpleModalWrapped from "./PropertyProfile";
import {Link} from "../../utilities";
/** new addition */

import {constant} from "../../config/constant";
import { Loader } from '../../components';
import MUIDataTable from "mui-datatables";
/**end of new addition */
import {library,FontAwesomeIcon,faFacebookF,faTwitter,faLinkedinIn,faUser,faInfo,DeleteIcon,FilterListIcon} from "../../utilities/icon";
library.add(faFacebookF,faTwitter,faLinkedinIn,faUser,faInfo)

//const columns = ["Property Name", "Seller Name", "Status", "Action"];

  const columns = [
    {
      name: "Property Name",
      options: {
        filter: true
      }
    },
    {
      name: "Seller Name",
      options: {
        filter: true
      }
    },
    {
      name: "Status",
      options: {
        filter: true
        
      }
    },
    {
      name: "Action",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return (
            <div>
           <Link className="" to={{pathname:constant.admin_url.property_details,state:{propertydetails_id:value}}}>View</Link> 
           {/* / <Button>Inactive</Button> */}
           </div>
          );
        }
      }
    }
  ];

const options = {
  filterType: 'checkbox',
};

class EnhancedTable extends React.Component {

    constructor(){
        super()
       this.UserProfileView=this.UserProfileView.bind(this)
    }
    UserProfileView(){
        
        this.setState({modal:(this.state.modal==true)?false:true})
    }
  
  state = {
    
    modal:true,
    loader:true
  };
  componentDidMount(){
   let row=[];  
  
    fetch(constant.base_url+constant.server_url.property_listing,{
       method:"POST",
       body:"Data="+JSON.stringify({"user_id":"","user_type":"","state":"","county_id":"","property_type_id":"","bed":"","bath":"","sqftFrom":"","sqftTo":"","limit":"","offset":""}),
       
        headers:{
            'Accept': 'application/json',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
           },
    }).then(res=>res.json())
    .then(response=>{  response=response.data;
                      // console.log(response);
                       response.forEach(function(v,k){          
                        let property_id=v.property_details.property_id, property_title=v.property_details.property_title,
                        seller_name=v.property_details.owner_firstname+' '+v.property_details.owner_lastname,
                        seller_price='',property_status=v.property_details.property_status;
                        property_status=(property_status==1)?'Active':'Deactive';
                        //row[k]=createData(property_id,property_title,seller_name,property_status);  // data in columns are set here ..  
                        row[k]=[property_title,seller_name,property_status,property_id];
                      });
                      this.setState({data:row}); this.setState({modal:false}); 
                      this.setState({loader:false});           
                      console.log(this.state.data);          
    })
    
  }

  render() {
  
  
    return (  
<div className="table-wrapper">
      <Paper className="table-paper-tag">
       
      <MUIDataTable   title={"Property List"}  data={this.state.data}  columns={columns}   options={options}  />

      </Paper>
     <SimpleModalWrapped status={this.state.modal} />
     {(this.state.loader==true)?<Loader/>:""}
      </div>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (EnhancedTable);
