var express = require('express');
var router = express.Router();
var md5 = require('md5');
const db = require("./db.json");
const qb = require('node-querybuilder').QueryBuilder(db, 'mysql', 'single');
var request = require('request');
var cors = require('cors')

class UserManagement {
    constructor() {
        const db = require("./db.json");
        const qb = require('node-querybuilder').QueryBuilder(db, 'mysql', 'single');
    }

    Sync(req, res, next) {
        request('http://pms.evdpl.com/api/employee/get', function (error, response, body) {
                
        const info = JSON.parse(body);
        console.log(info)

            for (var i = 0; i < info.length; i++) {
                const data = info[i];
                delete data['$id'];
                var tmpPwd = 'Evdpl@123';
                //var tmpPwd = data['EmailPassword'];
                data['EmailPassword'] = md5(tmpPwd);

                qb.select('*')
                .where({ Id: data['Id'] })
                .get('user_master', (err, response) => {
                    if (err)
                        return console.error("Uh oh! Couldn't get results: " + err.msg);
                    
                    if (response.length != 0) {
                        qb.update('user_master', data, { Id: data['Id'] }, (err, res) => {
                            if (err)
                                return console.error("Uh oh! Couldn't get results: " + err);
                        });
                    } else {
                        qb.insert('user_master', data, (err, res) => {
                            if (err)
                                return console.error("Uh oh! Couldn't get results: " + err);
                            const page_data = {
                                article_id: res.insert_id,
                            }
                        });
                    }
                });
            }
        });
    }

    UserList(req, res, next) {
        const Data = JSON.parse(req.body.Data);

        qb.select('*');
        if (Data.userName && Data.userName != "" && Data.userName != undefined) {
            qb.like({ Name: Data.userName });
        }
        if (Data.Id && Data.Id != "" && Data.Id != undefined) {
            qb.where({ Id: Data.Id });
        }
        if (Data.Email && Data.Email != "" && Data.Email != undefined) {
            qb.like({ Email: Data.Email });
        }
        if (Data.bStatus && Data.bStatus != "" && Data.bStatus != undefined && Data.bStatus != "null") {
            qb.like({ IsActive: Data.bStatus });
        }
        if (Data.JoiningDate && Data.JoiningDate != "" && Data.JoiningDate != undefined && Data.JoiningDate != "null") {
            qb.order_by('JoiningDate', (Data.JoiningDate == 1) ? 'asc' : 'desc')
        }
        qb.limit(Data.limit, Data.skip);

        qb.order_by('Id', 'asc');
        qb.get('user_master', (err, response) => {
            if (err)
                return res.json("Uh oh! Couldn't get results: " + err.msg);

            if (Data.userName && Data.userName != "" && Data.userName != undefined) {
                qb.like({ Name: Data.userName });
            }
            if (Data.Email && Data.Email != "" && Data.Email != undefined) {
                qb.like({ Email: Data.Email });
            }
            if (Data.bStatus && Data.bStatus != "" && Data.bStatus != undefined && Data.bStatus != "null") {
                qb.like({ IsActive: Data.bStatus });
            }
            if (Data.JoiningDate && Data.JoiningDate != "" && Data.JoiningDate != undefined && Data.JoiningDate != "null") {
                qb.order_by('JoiningDate', (Data.JoiningDate == 1) ? 'asc' : 'desc')
            }
            if (Data.Id && Data.Id != "" && Data.Id != undefined) {
                qb.where({ Id: Data.Id });
            }
            qb.get('user_master', (err, totalRecord) => {
                if (err)
                    return res.json("Uh oh! Couldn't get results: " + err.msg);
                    res.set('Content-Type', 'text/plain');
                res.json({ response: response, totalRecord: totalRecord.length });
            })
        });
    }

    UserDisable(req, res, next) {
        if (req.params.id) {
            qb.update('user_master', { IsActive: (req.params.status == 0) ? "1" : "0" }, { Id: req.params.id }, (err, resupd) => {
                if (err) return console.error(qb.last_query());
                res.json(resupd);
            });
        }
    }

    MakeAdmin(req, res, next) {
        if (req.params.id) {
            qb.update('user_master', { isNetAdmin: (req.params.status == 0) ? "1" : "0" }, { Id: req.params.id }, (err, resupd) => {
                if (err) return console.error(qb.last_query());
                res.json(resupd);
            });
        }
    }

    Login(req, res, next) {
        const Data = JSON.parse(req.body.Data);
        var tmpPwd = Data['EmailPassword'];
        Data['EmailPassword'] = md5(tmpPwd);
       

        qb.select('*')
        .where(Data)
        .get('user_master', (err, response) => {
            if (err) {return console.error(qb.last_query() + err);}
            res.json({ response, status: (response.length != 0) ? 200 : 400 });
        });
    }

    ProductDetail(req, res, next) {
        qb.select('*,p.bStatus as productStatus');
        qb.from('product_assign  pa');
        if (req.params.id) {
            qb.where({ 'iEmployeeId': req.params.id });
            qb.join('product p', 'p.iProductId=pa.iProductId', 'left');
           // qb.order_by(['tm.dtCreateAt', 'tm.tiCrateTime'], 'asc')
        }

        qb.get((err, response) => {
            if (err)
                return console.log(qb.last_query() + err.msg);
            res.json(response);
        });
    }

    netAdminList(req, res, next){
        qb.select('*');
        qb.from('user_master');
        qb.where({ 'isNetAdmin':"1" });
        qb.get((err, net_Admin) => {
            if (err)
                return console.log(qb.last_query() + err.msg);
            res.json(net_Admin);    
        });
    }
}

var routes = new UserManagement();
router.use(cors())
router.use('/login', routes.Login);
router.use('/Sync', routes.Sync);
router.use('/user-list', routes.UserList);
router.use('/user-list/:limit/:skip/:userName', routes.UserList);
router.use('/user-list/:limit/:skip', routes.UserList);
router.use('/user-disable/:id/:status', routes.UserDisable);
router.use('/make-admin/:id/:status', routes.MakeAdmin);
router.use('/product-detail/:id', routes.ProductDetail);
router.use('/net-admin-list', routes.netAdminList);

module.exports = router;