import React from "react";
import classNames from "classnames";
import "./sidebar.css"
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
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
// core components
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import logo from "../../admin-logo.png";
import sidebarStyle from "assets/jss/material-dashboard-react/components/sidebarStyle.jsx";
import { Link } from "../../utilities";


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});


class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      open: true,
    };
    this.activeRoute = this.activeRoute.bind(this)
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };


  render() {
    const { classes, color, image, logoText, routes, style } = this.props;

    var links = (
      <div className="sidebar-section">
        <List
          component="nav"
          className="sidebar-nav"
        >
          <ListItem button className="nav_button">
            <NavLink to="/admin/dashboard">
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText inset primary="Dashboard" className="nav-text" />
            </NavLink>
          </ListItem>
          <ListItem button className="nav_button expand_more" onClick={this.handleClick}>

            <ListItemIcon>
              <PeopleOutline />
            </ListItemIcon>
            <ListItemText inset primary="User Management" className="nav-text" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}

          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" className="sub-menu">
              <ListItem button className={classes.nested}>
                <NavLink to="/admin/user/">
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText inset primary="Seller" className="nav-text" />
                </NavLink>
              </ListItem>
              {/* <ListItem button className={classes.nested}>
                <NavLink to="/admin/user">
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText inset primary="Agent" className="nav-text" />
                </NavLink>
              </ListItem> */}
              <ListItem button className={classes.nested}>
                <Link to="/admin/user/buyer/" >
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText inset primary="Buyer" className="nav-text" />
                </Link>
              </ListItem>
            </List>
          </Collapse>
          <ListItem button className="nav_button">
            <NavLink to="/admin/property">
              <ListItemIcon>
                <Business />
              </ListItemIcon>
              <ListItemText inset primary="Property Management" className="nav-text" />
            </NavLink>
          </ListItem>
          <ListItem button className="nav_button">
            <NavLink to="/admin/email-template">
              <ListItemIcon>
                <Email />
              </ListItemIcon>
              <ListItemText inset primary="Email Templates" className="nav-text" />
            </NavLink>
          </ListItem>
          <ListItem button className="nav_button">
            <NavLink to="/admin/cms">
              <ListItemIcon>
                <LibraryBooks />
              </ListItemIcon>
              <ListItemText inset primary="CMS Management" className="nav-text" />
            </NavLink>
          </ListItem>
          <ListItem button className="nav_button">
            <NavLink to="/admin/account-setting">
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText inset primary="Account Settings" className="nav-text" />
            </NavLink>
          </ListItem>

        </List>




      </div>
    );



    var brand = (
      <div className={classes.logo}>
        <Link to="/admin/dashboard" className={classes.logoLink}>
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className="logo-img" />
          </div>
          {logoText}
        </Link>
      </div>
    );




    return (
      <div>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="right"
            open={this.props.open}
            classes={{
              paper: classes.drawerPaper
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {brand}
            <div className={classes.sidebarWrapper}>
              <HeaderLinks />
              {links}
            </div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            anchor="left"
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {brand}
            <div className={classes.sidebarWrapper}>{links}</div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(sidebarStyle)(Sidebar);