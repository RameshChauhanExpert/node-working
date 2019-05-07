var express = require('express');
var router = express.Router();
const db = require("./db.json");
const qb = require('node-querybuilder').QueryBuilder(db, 'mysql', 'single');
var resCount = [];

var info = "";
var ticket="";
var request = require('request');
var cors = require('cors')

class Dashboard {
    constructor() {
        const db = require("./db.json");
        const qb = require('node-querybuilder').QueryBuilder(db, 'mysql', 'single');
       // var resCount = [];
      // var  info = "";
    }

    ModuleCount(req, res, next) {
        info = "";
        info = JSON.parse(req.body.Data);
        console.log(info);
        qb.select('*');
        qb.where('bStatus', '1');
        qb.get('product', (err, invCnt) => {
            if (err) { return res.json("Uh oh! Couldn't get results: " + err.msg); }
            resCount[0] = invCnt.length;
        });

        qb.select('*');
        qb.where('bStatus', '1');
        qb.get('software', (err, softwareCnt) => {
            if (err) { return res.json("Uh oh! Couldn't get results: " + err.msg); }
            resCount[1] = softwareCnt.length;
        })

        qb.select('*');
        //qb.where('bStatus', '1');
        if("0" == info.userdets.isNetAdmin){
            qb.where('iCreateBy', info.userdets.Id);
        }
        qb.get('ticket', (err, ticketCnt) => {
            //console.log(qb.last_query());
            if (err) { return res.json("Uh oh! Couldn't get results: " + err.msg); }
            resCount[2]=ticket = ticketCnt.length;
            console.log(resCount[2])
        })

        
        

        qb.select('*');
        qb.where('IsActive', '1');
        qb.get('user_master', (err, userCnt) => {
            if (err) { return res.json("Uh oh! Couldn't get results: " + err.msg); }
            resCount[3] = userCnt.length;
        });

        qb.select("*");
        qb.from("ticket t");
        qb.join('ticket_master tm', 'tm.iTicketId = t.iTicketId', 'inner');
        qb.join('(SELECT MAX(iTicketThreadId) as iTicketThreadId FROM ticket_master GROUP BY iTicketId) vtm', 'vtm.iTicketThreadId = tm.iTicketThreadId', 'inner');
        qb.where({ 'tm.vStatus': "Open" });
        if("0" == info.userdets.isNetAdmin){
            qb.where('t.iCreateBy', info.userdets.Id);
        }
        qb.get((err, open_tickets) => {
            if(err)
                return console.log("error=>" + err.msg);
            resCount[4] = open_tickets;
        });

        
        
        qb.select("*");
        qb.from("ticket t");
        qb.join('ticket_master tm', 'tm.iTicketId = t.iTicketId', 'inner');
        qb.join('(SELECT MAX(iTicketThreadId) as iTicketThreadId FROM ticket_master GROUP BY iTicketId) vtm', 'vtm.iTicketThreadId = tm.iTicketThreadId', 'inner');
        if("0" == info.userdets.isNetAdmin){
            qb.where('t.iCreateBy', info.userdets.Id);
        }
        qb.get((err, latest_comments) => {
            if(err)
                return console.log("error=>" + err.msg);
            resCount[5] = latest_comments;
            
            

        });

        qb.select("*");
        qb.from("ticket t");
        qb.join('ticket_master tm', 'tm.iTicketId = t.iTicketId', 'inner');
        qb.join('(SELECT MAX(iTicketThreadId) as iTicketThreadId FROM ticket_master GROUP BY iTicketId) vtm', 'vtm.iTicketThreadId = tm.iTicketThreadId', 'inner');
        qb.where({ 'tm.vStatus': "Resolve" });
        if("0" == info.userdets.isNetAdmin){
            qb.where('t.iCreateBy', info.userdets.Id);
        }
        qb.get((err, open_tickets) => {
            if(err)
                return console.log("error=>" + err.msg);
            resCount[6] = open_tickets;
            
        });

        qb.select("*");
        qb.from("ticket t");
        qb.join('ticket_master tm', 'tm.iTicketId = t.iTicketId', 'inner');
        qb.join('(SELECT MAX(iTicketThreadId) as iTicketThreadId FROM ticket_master GROUP BY iTicketId) vtm', 'vtm.iTicketThreadId = tm.iTicketThreadId', 'inner');
        qb.where({ 'tm.vStatus': "Close" });
        if("0" == info.userdets.isNetAdmin){
            qb.where('t.iCreateBy', info.userdets.Id);
        }
        qb.get((err, open_tickets) => {
            if(err)
                return console.log("error=>" + err.msg);
            resCount[7] = open_tickets;
            
        });

        qb.select("*");
        qb.from("ticket t");
        qb.join('ticket_master tm', 'tm.iTicketId = t.iTicketId', 'inner');
        qb.join('(SELECT MAX(iTicketThreadId) as iTicketThreadId FROM ticket_master GROUP BY iTicketId) vtm', 'vtm.iTicketThreadId = tm.iTicketThreadId', 'inner');
        qb.where({ 'tm.vStatus': "InProgress" });
        if("0" == info.userdets.isNetAdmin){
            qb.where('t.iCreateBy', info.userdets.Id);
        }
        qb.get((err, open_tickets) => {
            if(err)
                return console.log("error=>" + err.msg);
            resCount[8] = open_tickets;
           
        });

        qb.select('*');
        qb.get('user_master', (err, userCnt) => {
        if (err) { return res.json("Uh oh! Couldn't get results: " + err.msg); }
            resCount[10] = userCnt.length;
        });

        qb.select("*");
        qb.from("ticket t");
        qb.join('ticket_master tm', 'tm.iTicketId = t.iTicketId', 'inner');
        qb.join('(SELECT MAX(iTicketThreadId) as iTicketThreadId FROM ticket_master GROUP BY iTicketId) vtm', 'vtm.iTicketThreadId = tm.iTicketThreadId', 'inner');
        qb.where({ 'tm.vStatus': "Reopen" });
        if("0" == info.userdets.isNetAdmin){
            qb.where('t.iCreateBy', info.userdets.Id);
        }
        qb.get((err, open_tickets) => {
            if(err)
                return console.log("error=>" + err.msg);
            resCount[9] = open_tickets;
            res.json({ inventory: resCount[0], software: resCount[1], ticket: ticket, user: resCount[3], openTickets: resCount[4], latestComments: resCount[5],ResolveTicket:resCount[6],CloseTicket:resCount[7],InProgress:resCount[8],Reopen:resCount[9],TotalUser:resCount[10] });
        });
       
       
    }
}

var routes = new Dashboard();
//router.use(cors())
router.use('/Module_Count', routes.ModuleCount);

module.exports = router;