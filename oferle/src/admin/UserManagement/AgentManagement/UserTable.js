import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { lighten } from '@material-ui/core/styles/colorManipulator';


import SimpleModalWrapped from "./UserProfile";
import {Link,connect} from "../../utilities";
import {TableHead,TableRow,TableCell,Checkbox,Tooltip,TableSortLabel,Toolbar,Typography,IconButton,Paper,Table,Button,TableBody,TablePagination,} from "../../utilities/material_ui";
import {library,FontAwesomeIcon,faFacebookF,faTwitter,faLinkedinIn,faUser,faInfo,DeleteIcon,FilterListIcon} from "../../utilities/icon";
import{user_management,seller_fetch}from"../../action/" 
import { Loader } from '../../components';
library.add(faFacebookF,faTwitter,faLinkedinIn,faUser,faInfo)

let counter = 0;
function createData(sellerName, sellerEmail, sellerPhone, sellerStatus) {
  counter += 1;
  return { id: counter, sellerName, sellerEmail, sellerPhone, sellerStatus};
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'email_address', numeric: false, disablePadding: true, label: 'Email Address' },
  { id: 'seller_phone_number', numeric: false, disablePadding: true, label: 'Phone Number' },
  { id: 'seller_status', numeric: false, disablePadding: true, label: 'Status' },
  { id: 'seller_action', numeric: false, disablePadding: false, label: 'Action' },
 
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" className="table-th">
            <Checkbox color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(row => {
            return (
              <TableCell  className="table-th"
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              
            );
          }, this)}
        </TableRow>       
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" className="table-title" id="tableTitle">
            Seller Listed
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});


class EnhancedTable extends React.Component {

    constructor(props){
        super(props)
       this.UserProfileView=this.UserProfileView.bind(this)
       this.state = {
        order: 'asc',
        orderBy: 'calories',
        selected: [],
        data: [
          createData('Michael', 'michael@example.com', '+123457890', 'Active'),
          createData('David', 'david@example.com', '+123457890', 'Active'),
          
        ],
        page: 0,
        rowsPerPage: 10,
        modal:false
      };
    }
    UserProfileView(){
        this.setState({modal:(this.state.modal==true)?false:true})
    }
  

   componentDidMount()
   {
     this.props.seller_fetch()
   }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
      
    var {data}=this.props.state.seller_management
    var {utilities}=this.props.state
    const { classes } = this.props;
    const {  order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
<div className="table-wrapper">
      <Paper className="table-paper-tag">
       
        <EnhancedTableToolbar numSelected={selected.length} />
       
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead className="table-head"
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow className="table-row"
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell className="table-cell checkbox-cell"  padding="checkbox">
                        <Checkbox color="primary" checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none" className="table-cell">
                        {n.first_name}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none" className="table-cell">{n.email}</TableCell>
                      <TableCell component="th" scope="row" padding="none" className="table-cell">{n.phone}</TableCell>
                      <TableCell component="th" scope="row" padding="none" className="table-cell status-cell">{(n.status==1)?"Active":"Deactive"}</TableCell>
                      <TableCell component="th" scope="row" className="table-cell action-cell"><Link className="link-text" to="/admin/user/user-detail">View</Link> / <Button>Inacitve</Button></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />

      </Paper>
      
     <SimpleModalWrapped status={this.state.modal} />
     {(utilities.loader==true)?<Loader/>:""}
     
      </div>
    );
  }
}




EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	state
})
const actionCall = dispatch => ({
  seller_fetch:(state)=>{dispatch(seller_fetch(state))},
  
})


export default  connect(mapStateToProps,actionCall)(withStyles(styles)(EnhancedTable));
