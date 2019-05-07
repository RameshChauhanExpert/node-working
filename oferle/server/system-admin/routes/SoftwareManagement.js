var express = require('express');
var router = express.Router();
const db = require("./db.json");
const qb = require('node-querybuilder').QueryBuilder(db, 'mysql', 'single');
var empty = require('is-empty');

class SoftwareManagement {
    constructor() {
        const db = require("./db.json");
        const qb = require('node-querybuilder').QueryBuilder(db, 'mysql', 'single');
    }

    SoftwareList(req, res, next) {
        if (req.body.Data != undefined) {
            var Data = JSON.parse(req.body.Data);
        }

        qb.select('*');
        qb.order_by('iSoftwareId', 'desc')
        if (req.params.id) {
            qb.where({ iSoftwareId: req.params.id });
        }
        if (Data != undefined) {
            if (Data.software_name && Data.software_name != "" && Data.software_name != undefined && !empty(Data.software_name)) {
                qb.like({ vTitle: Data.software_name });
            }
            if (Data.bStatus && Data.bStatus != undefined && Data.bStatus != "" && Data.bStatus != "null") {
                qb.like({ bStatus: Data.bStatus });
            }
            if (Data.iSoftwareId && Data.iSoftwareId != undefined && Data.iSoftwareId != "" && Data.iSoftwareId != "null") {
                qb.like({ iSoftwareId: Data.iSoftwareId });
            }
            
            qb.limit(Data.limit, Data.skip);
        }
        qb.get('software', (err, response) => {
            if (err)
                return res.json("Uh oh! Couldn't get results: " + err.msg);
            if (Data != undefined) {
                if (Data.software_name && Data.software_name != "" && Data.software_name != undefined && !empty(Data.software_name)) {
                    qb.like({ vTitle: Data.software_name });
                }
                if (Data.bStatus && Data.bStatus != undefined && Data.bStatus != "" && Data.bStatus != "null") {
                    qb.like({ bStatus: Data.bStatus });
                }
                if (Data.iSoftwareId && Data.iSoftwareId != undefined && Data.iSoftwareId != "" && Data.iSoftwareId != "null") {
                    qb.like({ iSoftwareId: Data.iSoftwareId });
                }
            }
            qb.get('software', (err, totalRecord) => {
                res.json({ response: response, totalRecord: totalRecord.length });
            })
            console.log(qb.last_query())
        }
        );
    }

    SoftwareAdd(req, res, next) {
        const Data = JSON.parse(req.body.Data);
        var today = new Date();

        Data['dtCreateAt'] = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();

        qb.insert('software', Data, (err, response) => {
            if (err)
                return console.log("Uh oh! Couldn't get results: " + err.msg);
        });
    }

    SoftwareUpdate(req, res, next) {
        const Data = JSON.parse(req.body.Data);
        var today = new Date();

        Data['dtCreateAt'] = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();

        qb.update('software', Data, { iSoftwareId: Data.iSoftwareId }, (err, response) => {
            if (err)
                return console.log("qb.last_query() " + err.msg);
        });
    }

    SoftwareDisable(req, res, next) {
        if (req.params.id) {
            qb.update('software', { bStatus: (req.params.status == 0) ? "1" : "0" }, { iSoftwareId: req.params.id }, (err, resupd) => {
                if (err) return console.error(qb.last_query());
                res.json(resupd);
            });
        }
    }
}

var routes = new SoftwareManagement();
router.get('/software-list/:id', routes.SoftwareList);
router.use('/software-list', routes.SoftwareList);

//router.get('/software-list/:limit/:skip', routes.SoftwareList);
//router.get('/software-list/:limit/:skip/:software_name', routes.SoftwareList);

router.use('/software-add', routes.SoftwareAdd);
router.use('/software-update', routes.SoftwareUpdate);
router.use('/software-disable/:id/:status', routes.SoftwareDisable);
module.exports = router;