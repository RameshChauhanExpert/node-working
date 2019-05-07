var express = require('express');
var router = express.Router();
const db = require("./db.json");
const qb = require('node-querybuilder').QueryBuilder(db, 'mysql', 'single');
var empty = require('is-empty');
var datetime = require('node-datetime');

const fileUpload = require('express-fileupload');
router.use(fileUpload());

var net_Admin;
var First_Mesg;



class Ticket {
    constructor() {
        const db = require("./db.json");
        const qb = require('node-querybuilder').QueryBuilder(db, 'mysql', 'single');
    }
    

    TicketDetails(req, res, next)
    {    
        const Data = JSON.parse(req.body.Data);
        qb.order_by(['ticket_master.dtCreateAt desc '])
         qb.select("ticket_master.dtCreateAt as createDate,um.Name as assignBy,uMaster.Name as assignTo,ticket_master.vStatus,ticket_master.vScreenShot,ticket_master.tiCrateTime as createTime")
         qb.join("user_master um","um.Id=ticket_master.iGeneratorId",'Left')
         qb.join("user_master uMaster","uMaster.Id=ticket_master.iAssignTo",'Left')
         qb.where({iTicketId:Data.iTicketId});
         qb.get("ticket_master",(err,result)=>{
            
            qb.select("um.Name as assignBy,uMaster.Name as assignTo,ticket.vScreenShot,ticket.iTicketId,ticket.bStatus,ticket.vTitle,ticket.vPriority,ticket.dtCreateAt,ticket.vCurrentStatus")
            
            qb.join("user_master um","um.Id=ticket.iCreateBy","left")

           
           
            qb.join("ticket_master tm","tm.iTicketId=ticket.iTicketId","left")
            qb.join("user_master uMaster","uMaster.Id=tm.iAssignTo","left")
            qb.join('(SELECT MAX(iTicketThreadId) as iTicketThreadId FROM ticket_master GROUP BY iTicketId) vtm', 'vtm.iTicketThreadId = tm.iTicketThreadId', 'inner');

            qb.where({"ticket.iTicketId":Data.iTicketId});
            qb.get("ticket",(err,ticketData)=>{
               console.log(qb.last_query())
                res.json({ticketDetail:result,ticketData:ticketData})

             })
             
         })
    }
    TicketList(req, res, next) {
        const Data = JSON.parse(req.body.Data);

        qb.select('ticket.*,um.Name');

        if (req.params.id) {
            qb.where({ iTicketId: Data.id });
        }

        if (Data.ticketName && Data.ticketName != undefined && Data.ticketName != "") {
            qb.like({ vTitle: Data.ticketName });
        }
        if (Data.iTicketId && Data.iTicketId != undefined && Data.iTicketId != "") {
            qb.where({ "ticket.iTicketId": Data.iTicketId });
        }
        
        if (Data.bStatus && Data.bStatus != undefined && Data.bStatus != "" && Data.bStatus != "null") {
            qb.where({ vCurrentStatus: Data.bStatus });
        }

        if (Data.tDescription && Data.tDescription != undefined && Data.tDescription != "") {
            qb.like({ tDescription: Data.tDescription });
        }
        if (Data.iCreateId != null && Data.iCreateId && Data.iCreateId != "") {
            qb.where({ iCreateBy: Data.iCreateId });
        }

        if (!req.params.id) {
            // qb.join("user_master","user_master.Id=ticket.iCurrentAdmin","INNER")
            qb.join('ticket_master tm', 'tm.iTicketId = ticket.iTicketId', 'Left');
            qb.join('(SELECT MAX(iTicketThreadId) as iTicketThreadId FROM ticket_master GROUP BY iTicketId) vtm', 'vtm.iTicketThreadId = tm.iTicketThreadId', 'inner');
            qb.join("user_master um", "um.Id=tm.iAssignTo", "Left")
            // qb.join("user_master uMaster","uMaster.Id=ticket.iCurrentAdmin")

        }
        qb.order_by(['ticket.dtCreateAt'], 'DESC');
        qb.limit(Data.limit, Data.skip);
        qb.from("ticket");

        qb.get((err, response) => {
            if (err)
                return res.json("Uh oh! Couldn't get results: " + err.msg);

            if (Data.ticketName && Data.ticketName != undefined && Data.ticketName != "") {

                qb.like({ vTitle: Data.ticketName });
            }
            if (Data.bStatus && Data.bStatus != undefined && Data.bStatus != "" && Data.bStatus != "null") {
                qb.where({ vCurrentStatus: Data.bStatus });
            }
            if (Data.tDescription && Data.tDescription != undefined && Data.tDescription != "") {

                qb.like({ tDescription: Data.tDescription });
            }
            if (Data.iCreateId != null && Data.iCreateId && Data.iCreateId != "") {
                qb.where({ iCreateBy: Data.iCreateId });
            }
            if (Data.iTicketId && Data.iTicketId != undefined && Data.iTicketId != "") {
                qb.where({"ticket.iTicketId": Data.iTicketId });
            }
            if (!req.params.id) {
                // qb.join("user_master","user_master.Id=ticket.iCurrentAdmin","INNER")
                qb.join('ticket_master tm', 'tm.iTicketId = ticket.iTicketId', 'Left');
                qb.join('(SELECT MAX(iTicketThreadId) as iTicketThreadId FROM ticket_master GROUP BY iTicketId) vtm', 'vtm.iTicketThreadId = tm.iTicketThreadId', 'inner');
                qb.join("user_master um", "um.Id=tm.iAssignTo", "Left")
                // qb.join("user_master uMaster","uMaster.Id=ticket.iCurrentAdmin")

            }
            qb.get('ticket', (err, totalRecord) => {
                res.json({ response: response, totalRecord: totalRecord.length });
            });
        });
    }

    TicketAdd(req, res, next) {

        const Data = JSON.parse(req.body.Data);
        var today = new Date();
         console.log(Data)
        Data['dtCreateAt'] = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        //console.log(today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate());
         console.log(Data)
        qb.insert('ticket', Data, (err, response) => {
            console.log(qb.last_query())
            if (err)
                return console.log("Uh oh! Couldn't get results: " + err.msg);
            //console.log(response);
            qb.insert('ticket_master', { iGeneratorId: Data.iCreateBy, tMessage: Data.tDescription, iTicketId: response.insertId, iAssignTo: Data.vNetworkAdmin, vStatus: Data.bStatus, dtCreateAt: today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(), tiCrateTime: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),vScreenShot:Data.vScreenShot }, (err, tmRes) => {
                res.json(tmRes)
            })

        });
    }

    TicketUpdate(req, res, next) {
        const Data = JSON.parse(req.body.Data);

       // console.log(Data)
        var today = new Date();
        Data['tiCrateTime'] = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        Data['dtCreateAt'] = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()+" "+Data['tiCrateTime'];
       
        qb.insert('ticket_master', Data, (err, response) => {
            console.log(qb.last_query());
            if (err)
                return console.log( err.msg);

            qb.update("ticket", { vCurrentStatus: Data.vStatus, dtUpdateAt: Data['dtCreateAt']+" "+Data['tiCrateTime'] }, { iTicketId: Data.iTicketId }, (err, update) => {
                console.log("success")
            })

            res.json(response);
        });
    }

    // TicketUpdate(req, res, next) {
    //     const Data = JSON.parse(req.body.Data);

    //     var today = new Date();
    //     console.log(Data);
    //     Data['dtCreateAt'] = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
    //     Data['tiCrateTime'] = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //     //console.log(today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate());

    //     qb.insert('ticket_master', Data, (err, response) => {
    //         if (err)
    //             return console.log(qb.last_query() + err.msg);
    //         console.log(qb.last_query());
    //     });
    // }

    TicketMasterList(req, res, next) {
        //Start: Code for getting Network Admin
        qb.select('*');

        qb.from('user_master');
        qb.where({ 'isNetAdmin': "1" });
        qb.get((err, res_netAdmin) => {
            if (err)
                return console.log(qb.last_query() + err.msg);
            net_Admin = res_netAdmin;
            //console.log(net_Admin);
        });
        //End: Code for getting Network Admin

        //Start: Code for getting First Message
        qb.select('t.iTicketId,t.bStatus,t.tDescription,t.dtCreateAt, t.iCreateBy as ticketOwner,um.Id,um.Name as assignTo,uMaster.Name as assignBy');
        qb.from('ticket t');
        if (req.params.id) {
            qb.join('user_master um', 'um.Id=t.vNetworkAdmin', 'INNER');
            qb.join('user_master uMaster', 'uMaster.Id=t.iCreateBy', "INNER");


            qb.where({ 't.iTicketId': req.params.id });
        }

        qb.get((err, response) => {
            if (err)
                return console.log(qb.last_query() + err.msg);
            console.log(qb.last_query());
            First_Mesg = response;
        });
        //End: Code for getting First Message

        //Start: Code for getting All Message
        qb.select('t.iTicketId,tm.vScreenShot, t.tDescription,tm.vStatus, t.dtCreateAt as t_dtCreateAt, tm.iTicketThreadId, tm.tMessage, tm.dtCreateAt , tm.tiCrateTime, um.Id, um.Name as assignBy,uMaster.Name as assignTo');
        qb.from('ticket t');
        if (req.params.id) {
            qb.join('ticket_master tm', 'tm.iTicketId=t.iTicketId', 'INNER');
            qb.join('user_master um', 'um.Id=tm.iGeneratorId', 'INNER');
            qb.join('user_master uMaster', 'uMaster.Id=tm.iAssignTo', 'INNER');
            qb.where({ 't.iTicketId': req.params.id });
            qb.order_by(['tm.dtCreateAt', 'tm.tiCrateTime'], 'DESC')
        }

        qb.get((err, response) => {
            if (err)
                return console.log(qb.last_query() + err.msg);
            res.json({ TicketMaster: response, FirstMesg: First_Mesg, netAdmin: net_Admin });
        });
        //End: Code for getting All Message
    }

    TicketDisable(req, res, next) {
        if (req.params.id) {
            qb.update('ticket', { vCurrentStatus: req.params.status }, { iTicketId: req.params.id }, (err, resupd) => {
                if (err) return console.error(qb.last_query());
                res.json(resupd);
            });
        }
    }


    FileUpload(req, res, next) {
        
        var past = new Date();
        var pastDateTime = datetime.create(past);
         
        if (req.files.vScreenShot && req.files.vScreenShot != null) {
          
            var tmpname =  req.files.vScreenShot.name;
            req.files.vScreenShot.mv('uploads/' +tmpname.trim(), function (err) {
                if (err)
                    return res.status(500).send(err);
                res.json({ name: tmpname });
            });
        }


    }
}
var routes = new Ticket();

router.get('/ticket-list/:id', routes.TicketList);
router.use('/ticket-list', routes.TicketList);
router.use('/ticket-add', routes.TicketAdd);
router.use('/ticket-update', routes.TicketUpdate);
router.use('/ticket-master-list/:id', routes.TicketMasterList);
router.use('/ticket-list/:limit/:skip/:ticketName', routes.TicketList);
router.use('/ticket-list/:limit/:skip', routes.TicketList);

router.use('/ticket-master-list/', routes.TicketMasterList);
router.use('/ticket-disable/:id/:status', routes.TicketDisable);
router.use("/ticket-detail/",routes.TicketDetails);

router.use('/file-upload', routes.FileUpload);
module.exports = router;