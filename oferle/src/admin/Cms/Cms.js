import React from "react";
import { withStyles } from '@material-ui/core/styles';
import {Table,TableHead,TableBody, TableRow,TableCell, Link} from "../../utilities"
import Edit from "@material-ui/icons/Edit";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Business from "@material-ui/icons/Business";
import Collapse from '@material-ui/core/Collapse';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import Person from '@material-ui/icons/Person';
import Email from '@material-ui/icons/Email';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Settings from '@material-ui/icons/Settings';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import Dashboard from '@material-ui/icons/Dashboard';

class Cms extends React.Component{
    constructor(){
        super();
        this.state = {
          open: true,
        };
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick = () => {
      this.setState(state => ({ open: !state.open }));
    };

    render(){
        return(<div>
            
            <Table className="basic-table-wrapper">
            <TableHead>
            <TableRow>
                <TableCell component="th" className="table-th">Page Name</TableCell>
                <TableCell component="th" className="table-th">Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
              
                    <TableRow className="table-row">                      
                      <TableCell component="td" scope="row" className="table-cell">Home Page</TableCell>
                      <TableCell component="td" scope="row" className="table-cell action-cell"><Link to="/admin/cms/cms-home" className="btn-link"> 
                      <ListItemIcon className="icon"><Edit /></ListItemIcon><span className="text">Edit</span></Link></TableCell>
                    </TableRow>
                    <TableRow className="table-row">                       
                      <TableCell component="td" scope="row" className="table-cell">About Us</TableCell>
                      <TableCell component="td" scope="row" className="table-cell action-cell"><Link to="/admin/cms/cms-about-us" className="btn-link"> 
                      <ListItemIcon className="icon"><Edit /></ListItemIcon><span className="text">Edit</span></Link></TableCell>
                    </TableRow>
                    <TableRow className="table-row">                      
                      <TableCell component="td" scope="row" className="table-cell">How it Works</TableCell>
                      <TableCell component="td" scope="row" className="table-cell action-cell"><Link to="/admin/cms/cms-how-it-works" className="btn-link"> 
                      <ListItemIcon className="icon"><Edit /></ListItemIcon><span className="text">Edit</span></Link></TableCell>
                    </TableRow>
                    <TableRow className="table-row">                      
                      <TableCell component="td" scope="row" className="table-cell">FaQ Content</TableCell>
                      <TableCell component="td" scope="row" className="table-cell action-cell"><Link to="/admin/cms/cms-faq" className="btn-link"> 
                      <ListItemIcon className="icon"><Edit /></ListItemIcon><span className="text">Edit</span></Link></TableCell>
                     
                    </TableRow>
                    {/* <TableRow className="table-row">  
                    <TableCell component="td" scope="row" className="table-cell" onClick={this.handleClick}>FAQ Content</TableCell>
                    <TableCell><ListItem button className="expand_btn" onClick={this.handleClick}> {this.state.open ? <ExpandLess /> : <ExpandMore />}</ListItem></TableCell>
                    
                    </TableRow>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <TableRow className="table-row">                      
                      <TableCell component="td" scope="row" className="table-cell">Home Page</TableCell>
                      <TableCell component="td" scope="row" className="table-cell action-cell"><Link to="/admin/cms/cms-home" className="btn-link"> 
                      <ListItemIcon className="icon"><Edit /></ListItemIcon><span className="text">Edit</span></Link></TableCell>
                    </TableRow>
                    </Collapse> */}
                    
                    
                    
            </TableBody>
          </Table>

         


        </div>)
    }
}

export default Cms