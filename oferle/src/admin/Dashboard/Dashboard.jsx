import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons

import {Warning,Store,DateRange,LocalOffer,Accessibility,Update,ArrowUpward,AccessTime,BugReport,Code,Cloud,Link,withRouter,connect} from "../../utilities"
// core components
import {GridContainer,GridItem,Card,CardHeader,CardIcon,CardFooter,Danger,CardBody,CustomTabs,Tasks,Table, Loader, CommanSnackBar} from "../../components"
import { bugs, website, server } from "variables/general.jsx";
import '../Dashboard/dashboard.css'

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { fetch_dashboard_details } from "../../action";

class Dashboard extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  componentWillMount()
  {

    this.props.fetch_dashboard_details()
  }
  render() {
    const { classes } = this.props;
    const { user_master ,properties} = this.props.state.admin_dashnoard;
    const { loader,snackbar } = this.props.state.utilities
    return (
      <div>
        <GridContainer>

          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Users</p>
                <h3 className={classes.cardTitle}>
                  {user_master.active_user_array.length}/{user_master.total_user} 
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Link className="btn btn-link" to="/admin/user">View Detail</Link>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Properties</p>
                <h3 className={classes.cardTitle}>
                {properties.active_property_array.length}/{properties.total_property}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                <Link className="btn btn-link" to="/admin/property">View Details</Link>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Offers</p>
                <h3 className={classes.cardTitle}>75</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                <a className="btn btn-link" href="#">View Details</a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Support Request</p>
                <h3 className={classes.cardTitle}>+245</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                <a className="btn btn-link" href="#">View Details</a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>No. Of Offers</h4>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                <a className="btn btn-link" href="#">View Details</a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="warning">
              <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>No. Of Properties</h4>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                <a className="btn btn-link" href="#">View Details</a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          {/* {<GridItem xs={12} sm={12} md={6}>}
            <CustomTabs
              title="Tasks:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Bugs",
                  tabIcon: BugReport,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0, 3]}
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={bugs}
                    />
                  )
                },
                {
                  tabName: "Website",
                  tabIcon: Code,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0]}
                      tasksIndexes={[0, 1]}
                      tasks={website}
                    />
                  )
                },
                {
                  tabName: "Server",
                  tabIcon: Cloud,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[1]}
                      tasksIndexes={[0, 1, 2]}
                      tasks={server}
                    />
                  )
                }
              ]}
            />
          </GridItem> */} 
          <GridItem xs={12} sm={12} md={12}>
            <Card className="add-properties">
              <CardHeader color="warning" className="card-header">
                <h4 className={classes.cardTitleWhite}>Recently Added Properties</h4>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Name", "Post By User", "Post Date"]}
                  tableData={[
                    ["01", "Dakota Rice", "$36,738", "Niger"],
                    ["02", "Minerva Hooper", "$23,789", "Curaçao"],
                    ["03", "Sage Rodriguez", "$56,142", "Netherlands"],
                    ["04", "Philip Chaney", "$38,735", "Korea, South"]
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
     
        {(loader==true)?<Loader/>:""}
        <CommanSnackBar state={snackbar} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	state
})
const actionCall = dispatch => ({
	fetch_dashboard_details:(route)=>{dispatch(fetch_dashboard_details())}
})

export default   connect(mapStateToProps,actionCall)( withStyles(dashboardStyle)(Dashboard)) 
//withRouter(connect(withStyles(dashboardStyle)(Dashboard)));
