import React from 'react';
import { Link }
    from 'react-router-dom';
    import {Header,Footer} from "../index"
var userdata = "";

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        if ("" === localStorage.getItem("authId") || null === localStorage.getItem("authId")) {
            this.props.history.push("/");
        } else {
            userdata = JSON.parse(localStorage.getItem("authId"));
        }
        this.state = { inventory: "", software: "", users: [], ticket: "", user: "", openTickets: [], latestComments: [], userdets: userdata, ResolveTicket: [], CloseTicket: [], InProgress: [], Reopen: [],TotalUser:"" }
    }

    componentDidMount(limit, skip) {

        fetch("/Dashboard/Module_Count/", {
            method: 'post',
            mode: 'cors',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'Data=' + JSON.stringify(this.state)
        })
            .then(res => res.json())
            .then(users => this.setState(users))
            .catch(function (error) {
                console.log('Request failed', error);
            });

    }

    render() {
        return (
            <div className="page-content-wrapper">
                <Header />
                <div className="page-content dashboard-page">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="page-title">Dashboard</h3>
                            <ul className="page-breadcrumb breadcrumb">
                                <li>
                                    <i className="fa fa-home"></i>
                                    <Link to="/Dashboard">Home </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        {(1 === userdata.isNetAdmin) ?
                            <Link to="/Product">
                                <div className="col-lg-3 col-md-3 col-sm-2 col-xs-12">
                                    <div className="dashboard-stat">
                                        <div className="card-header yellow-card">
                                            <div className="visual"><i className="fa fa-external-link-square" aria-hidden="true"></i></div>
                                            <div className="details">
                                                <div className="desc">Inventory</div>
                                                <div className="number">{this.state.inventory}</div>
                                            </div>
                                        </div>
                                        <span className="more">View more <i className="fa fa-paper-plane-o" aria-hidden="true"></i></span>
                                    </div>
                                </div>
                            </Link>
                            : ""
                        }

                        {(1 === userdata.isNetAdmin) ?
                            <Link to="/Software">
                                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                    <div className="dashboard-stat">
                                        <div className="card-header runtime-card">
                                            <div className="visual"><i className="fa fa-desktop" aria-hidden="true"></i></div>
                                            <div className="details">
                                                <div className="desc">Software</div>
                                                <div className="number">{this.state.software}</div>

                                            </div>
                                        </div>
                                        <span className="more">View more <i className="fa fa-paper-plane-o" aria-hidden="true"></i></span>
                                    </div>
                                </div>
                            </Link>
                            : ""
                        }

                        <Link to={(1 === userdata.isNetAdmin) ?"All_tickets":"Caution"}>
                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <div className="dashboard-stat">
                                    <div className="card-header green-card">
                                        <div className="visual"><i class="fa fa-ticket" aria-hidden="true"></i></div>
                                        <div className="details">
                                            <div className="desc">Tickets</div>
                                            <div className="number">{this.state.ticket}</div>

                                        </div>
                                    </div>
                                    <span className="more">View more <i className="fa fa-paper-plane-o" aria-hidden="true"></i></span>
                                </div>
                            </div>
                        </Link>
                        

                        {(1 === userdata.isNetAdmin) ?
                            <Link to="/UserManagement">
                                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                    <div className="dashboard-stat">
                                        <div className="card-header blue-card">
                                            <div className="visual"><i class="fa fa-users" aria-hidden="true"></i></div>
                                            <div className="details">
                                                <div className="desc">Active User <span className="number">{this.state.user}</span></div>
                                                <div className="desc total-user-block">Total User <span className="number">{this.state.TotalUser}</span></div>

                                            </div>
                                        </div>
                                        <span className="more">View more <i className="fa fa-paper-plane-o" aria-hidden="true"></i></span>
                                    </div>
                                </div>
                            </Link>
                            : ""
                        }
                    </div>

                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <div className="portlet box dashboard-page-ticket dashboard-page-content-common">
                                <div className="portlet-title blue-grid">
                                    <div className="caption"><i className="fa fa-ticket" aria-hidden="true"></i>Tickets</div>
                                </div>
                                <div className="portlet-body portlet-body-dashboard ">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="wrap-dashboard">
                                                <div className="heading-top"><h3><i class="fa fa-folder-open-o" aria-hidden="true"></i> Open</h3></div>
                                                <div className="scroller_123" data-always-visible="1" data-rail-visible="0">
                                                    <ul className="feeds">

                                                        {(this.state.openTickets.length > 0) ? this.state.openTickets.map(op =>
                                                            <li>
                                                                <div className="col1">
                                                                    <div className="cont">
                                                                        <div className="cont-col1">
                                                                            <div className="label label-sm label-info"><i className="fa fa-check"></i></div>
                                                                        </div>
                                                                        <div className="cont-col2">
                                                                            <div className="desc">
                                                                                <span className="ticket_title">Ticket Number : {op.iTicketId}</span><br />
                                                                                <span className="ticket_title">{op.vTitle}</span>
                                                                                <span className="label label-sm label-warning ">
                                                                                    <Link to={"/Edit_ticket/" + op.iTicketId}>Take action <i className="fa fa-share"></i></Link>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="col2">
                                                        <div className="date">Just now</div>
                                                    </div> */}
                                                            </li>
                                                        ) :<span className="not-found"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> "There is no one open ticket"</span>}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" col-md-4">
                                            <div className="wrap-dashboard">
                                                <div className="heading-top"><h3><i class="fa fa-check-square-o" aria-hidden="true"></i> Resolve</h3></div>
                                                <div className="scroller_123" data-always-visible="1" data-rail-visible="0">
                                                    <ul className="feeds">
                                                        {(this.state.ResolveTicket.length > 0) ? this.state.ResolveTicket.map(op =>
                                                            <li>
                                                                <div className="col1">
                                                                    <div className="cont">
                                                                        <div className="cont-col1">
                                                                            <div className="label label-sm label-info"><i className="fa fa-check"></i></div>
                                                                        </div>
                                                                        <div className="cont-col2">
                                                                            <div className="desc">
                                                                                <span className="ticket_title">Ticket Number : {op.iTicketId}</span><br />
                                                                                <span className="ticket_title">{op.vTitle}</span>
                                                                                <span className="label label-sm label-warning ">
                                                                                    <Link to={"/Edit_ticket/" + op.iTicketId}>Take action <i className="fa fa-share"></i></Link>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="col2">
                                                        <div className="date">Just now</div>
                                                    </div> */}
                                                            </li>
                                                        ) :<span className="not-found"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> "There is no one resolve ticket"</span>}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="wrap-dashboard">
                                                <div className="heading-top"><h3><i class="fa fa-window-close" aria-hidden="true"></i> Close</h3></div>
                                                <div className="scroller_123" data-always-visible="1" data-rail-visible="0">
                                                    <ul className="feeds">
                                                        {(this.state.CloseTicket.length > 0) ? this.state.CloseTicket.map(op =>
                                                            <li>
                                                                <div className="col1">
                                                                    <div className="cont">
                                                                        <div className="cont-col1">
                                                                            <div className="label label-sm label-info"><i className="fa fa-check"></i></div>
                                                                        </div>
                                                                        <div className="cont-col2">
                                                                            <div className="desc">
                                                                                <span className="ticket_title">Ticket Number : {op.iTicketId}</span><br />
                                                                                <span className="ticket_title">{op.vTitle}</span>
                                                                                <span className="label label-sm label-warning ">
                                                                                    <Link to={"/Edit_ticket/" + op.iTicketId}>Take action <i className="fa fa-share"></i></Link>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="col2">
                                                        <div className="date">Just now</div>
                                                    </div> */}
                                                            </li>
                                                        ) :<span className="not-found"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> "There is no one close ticket"</span>}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" col-md-4">
                                            <div className="wrap-dashboard">
                                                <div className="heading-top"><h3><i class="fa fa-spinner" aria-hidden="true"></i> In Progress</h3></div>
                                                <div className="scroller_123" data-always-visible="1" data-rail-visible="0">
                                                    <ul className="feeds">
                                                        {(this.state.InProgress.length > 0) ? this.state.InProgress.map(op =>
                                                            <li>
                                                                <div className="col1">
                                                                    <div className="cont">
                                                                        <div className="cont-col1">
                                                                            <div className="label label-sm label-info"><i className="fa fa-check"></i></div>
                                                                        </div>
                                                                        <div className="cont-col2">
                                                                            <div className="desc">
                                                                                <span className="ticket_title">Ticket Number : {op.iTicketId}</span><br />
                                                                                <span className="ticket_title">{op.vTitle}</span>
                                                                                <span className="label label-sm label-warning ">
                                                                                    <Link to={"/Edit_ticket/" + op.iTicketId}>Take action <i className="fa fa-share"></i></Link>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="col2">
                                                        <div className="date">Just now</div>
                                                    </div> */}
                                                            </li>
                                                        ) :<span className="not-found"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> "There is no one progressive ticket"</span>}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" col-md-4">
                                            <div className="wrap-dashboard">
                                                <div className="heading-top"><h3><i class="fa fa-repeat" aria-hidden="true"></i> Reopen</h3></div>
                                                <div className="scroller_123" data-always-visible="1" data-rail-visible="0">
                                                    <ul className="feeds">
                                                        {(this.state.Reopen.length > 0) ? this.state.Reopen.map(op =>
                                                            <li>
                                                                <div className="col1">
                                                                    <div className="cont">
                                                                        <div className="cont-col1">
                                                                            <div className="label label-sm label-info"><i className="fa fa-check"></i></div>
                                                                        </div>
                                                                        <div className="cont-col2">
                                                                            <div className="desc">
                                                                                <span className="ticket_title">Ticket Number : {op.iTicketId}</span><br />
                                                                                <span className="ticket_title">{op.vTitle}</span>
                                                                                <span className="label label-sm label-warning ">
                                                                                    <Link to={"/Edit_ticket/" + op.iTicketId}>Take action <i className="fa fa-share"></i></Link>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="col2">
                                                        <div className="date">Just now</div>
                                                    </div> */}
                                                            </li>
                                                        ) : <span className="not-found"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> "There is no Reopen Ticket"</span>}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="portlet box dashboard-page-comments dashboard-page-content-common">
                                                <div className="portlet-title blue-grid">
                                                    <div className="caption"><i className="fa fa-comments-o" aria-hidden="true"></i>Latest Comments</div>
                                                </div>
                                                <div className="portlet-body">
                                                    <div className="scroller_123" data-always-visible="1" data-rail-visible="0">
                                                        <ul className="feeds">
                                                            {(this.state.latestComments.length > 0) ? this.state.latestComments.map(lc =>
                                                                <li>
                                                                    <div className="col1">
                                                                        <div className="cont">
                                                                            <div className="cont-col1">
                                                                                <div className="label label-sm label-info"><i className="fa fa-check"></i></div>
                                                                            </div>
                                                                            <div className="cont-col2">
                                                                                <div className="desc">
                                                                                    <span className="ticket_title">Ticket number : {lc.iTicketId}</span>
                                                                                    <br/>
                                                                                    <span className="ticket_title">{lc.tMessage}</span>
                                                                                    <span className="label label-sm label-warning ">
                                                                                        <Link to={"/Edit_ticket/" + lc.iTicketId}>Take action <i className="fa fa-share"></i></Link>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* <div className="col2">
                                                        <div className="date">Just now</div>
                                                    </div> */}
                                                                </li>
                                                            ) :<span className="not-found"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> "There is no one latest comments"</span>}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}