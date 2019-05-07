var express = require('express');
var router = express.Router();
const db = require("./db.json");
const qb = require('node-querybuilder').QueryBuilder(db, 'mysql', 'single');

class ProductType {
    constructor() {
        const db = require("./db.json");
        const qb = require('node-querybuilder').QueryBuilder(db, 'mysql', 'single');
    }

    ProductTypeList(req, res, next) {
        if (req.body.Data != undefined) {
            var Data = JSON.parse(req.body.Data);
        }

        qb.select('*');
        qb.order_by('iProductTypeId', 'desc')
        if (req.params.id) {
            qb.where({ iProductTypeId: req.params.id });
        }
        if (Data != undefined) {
            if (Data.categoryName && Data.categoryName != "" && Data.categoryName != undefined) {
                qb.like({ vTitle: Data.categoryName });
            }
            if (Data.bStatus && Data.bStatus != "" && Data.bStatus != undefined) {
                qb.like({ bStatus: Data.bStatus });
            }
            if (Data.iProductTypeId && Data.iProductTypeId != "" && Data.iProductTypeId != undefined) {
                qb.like({ iProductTypeId: Data.iProductTypeId });
            }
            
            qb.limit(Data.limit, Data.skip);
        }
        qb.get('product_type', (err, response) => {
            if (err)
                return res.json("Error:"+qb.last_query() + err.msg);

            if (Data != undefined) {
                if (Data.categoryName && Data.categoryName != "" && Data.categoryName != undefined) {
                    qb.like({ vTitle: Data.categoryName });
                }
                if (Data.bStatus && Data.bStatus != "" && Data.bStatus != undefined) {
                    qb.like({ bStatus: Data.bStatus });
                }
                if (Data.iProductTypeId && Data.iProductTypeId != "" && Data.iProductTypeId != undefined) {
                    qb.like({ iProductTypeId: Data.iProductTypeId });
                }
            }

            qb.get('product_type', (err, totalRecord) => {
                res.json({ response: response, totalRecord: totalRecord.length });
            })
        });
    }

    ProductTypeAdd(req, res, next) {
        const Data = JSON.parse(req.body.Data);
        var today = new Date();

        Data['dtCreateAt'] = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();

        qb.insert('product_type', Data, (err, response) => {
            if (err)
                return console.log("Uh oh! Couldn't get results: " + err.msg);
            res.json({ response });
        });
    }

    ProductTypeUpdate(req, res, next) {
        const Data = JSON.parse(req.body.Data);
        var today = new Date();

        Data['dtCreateAt'] = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();

        qb.update('product_type', Data, { iProductTypeId: Data.iProductTypeId }, (err, response) => {
            if (err)
                return console.log(qb.last_query()+err.msg);
            res.json({ response });
        });
    }

    ProductTypeDisable(req, res, next) {
        if (req.params.id) {
            qb.update('product_type', { bStatus: (req.params.status == 0) ? "1" : "0" }, { iProductTypeId: req.params.id }, (err, resupd) => {
                if (err) return console.error(qb.last_query());
                res.json(resupd);
            });
        }
    }
}

var routes = new ProductType();
router.get('/Product-type-list/:id', routes.ProductTypeList);
router.use('/Product-type-list', routes.ProductTypeList);
router.get('/Product-type-list/:id', routes.ProductTypeList);
router.get('/Product-type-list/:limit/:skip', routes.ProductTypeList);
router.get('/Product-type-list/:limit/:skip/:categoryName', routes.ProductTypeList);
router.use('/Product-type-add', routes.ProductTypeAdd);
router.use('/Product-type-update', routes.ProductTypeUpdate);
router.use('/product-type-disable/:id/:status', routes.ProductTypeDisable);
module.exports = router;