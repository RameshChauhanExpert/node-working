import React from "react";
import { withStyles } from '@material-ui/core/styles';
import {Table,TableHead,TableBody, TableRow,TableCell, Link} from "../../utilities"
import Edit from "@material-ui/icons/Edit";
import ListItemIcon from "@material-ui/core/ListItemIcon";


class EmailTemplate extends React.Component{
    constructor(){
        super()
    }

    

    render(){
        return(<div>
            
            <Table className="basic-table-wrapper">
            <TableHead>
            <TableRow>
                <TableCell component="th" className="table-th">Template Name</TableCell>
                <TableCell component="th" className="table-th">Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
              
                    <TableRow className="table-row">                      
                      <TableCell component="td" scope="row" className="table-cell">Registration</TableCell>
                      <TableCell component="td" scope="row" className="table-cell action-cell"><Link to="/admin/email-template/email-registration" className="btn-link"> 
                      <ListItemIcon className="icon"><Edit /></ListItemIcon><span className="text">Edit</span></Link></TableCell>
                    </TableRow>
                    <TableRow className="table-row">                      
                      <TableCell component="td" scope="row" className="table-cell">Forgot Password</TableCell>
                      <TableCell component="td" scope="row" className="table-cell action-cell"><Link to="/admin/email-template/email-registration" className="btn-link"> 
                      <ListItemIcon className="icon"><Edit /></ListItemIcon><span className="text">Edit</span></Link></TableCell>
                    </TableRow>
                    <TableRow className="table-row">                      
                      <TableCell component="td" scope="row" className="table-cell">Newsletter</TableCell>
                      <TableCell component="td" scope="row" className="table-cell action-cell"><Link to="/admin/email-template/email-registration" className="btn-link"> 
                      <ListItemIcon className="icon"><Edit /></ListItemIcon><span className="text">Edit</span></Link></TableCell>
                    </TableRow>
                  
            </TableBody>
          </Table>

         


        </div>)
    }
}

export default EmailTemplate