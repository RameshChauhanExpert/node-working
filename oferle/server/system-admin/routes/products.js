var express = require('express');
var router = express.Router();
const db = require("../config/db.json");
const qb = require('node-querybuilder').QueryBuilder(db, 'mysql', 'single');
var empty = require('is-empty');
var datetime = require('node-datetime');

const fileUpload = require('express-fileupload');
router.use(fileUpload());

var product_type;
var user_master;
var software;
const today = new Date();
class Products {


  test(req, res, next) {

   
   
  res.render("/Product");



  }

  productEditList(req, res, next) {

    qb.select("p.*, si.iSoftwareId,si.iSoftwareInventoryId, si.vKey, pa.iEmployeeId");
    if (req.params.id) {
      qb.where("p.iProductId", req.params.id);
    }

    //qb.from("product p");
    qb.join("software_inventry si", "si.iHardwareId=p.iProductId", 'left');
    qb.join("software s", "s.iSoftwareId=si.iSoftwareId", "left")
    qb.join("product_assign pa", "pa.iProductId=p.iProductId", "left")
    qb.join("user_master um", "um.Id=pa.iEmployeeId", "left")
    qb.get("product p", (err, response) => {
      // console.log(qb.last_query());

      if (err) return console.error("Uh oh! Couldn't get results: " + err.msg);

      res.json({ resoponse: response });
    }
    );
  }

  ProductList(req, res, next) {

    if (req.body.Data != undefined) {
      var Data = JSON.parse(req.body.Data);
    }
    // console.log(req.params);
    qb.select('product.*,pa.iEmployeeId,um.Name as assignEmployee');
    qb.order_by('product.iProductId', 'desc')
    if (req.params.id) {
  qb.where({ iProductTypeId: req.params.id });
    }
    if (Data != undefined) {
      // console.log(Data);
      if (Data.product_name && Data.product_name != "" && Data.product_name != undefined) {
        qb.like({ vName: Data.product_name });
      }
      if (Data.iProductId && Data.iProductId != "" && Data.iProductId != undefined) {
        qb.like({ "product.iProductId": Data.iProductId });
      }
      if (Data.bStatus && Data.bStatus != undefined && Data.bStatus != "" && Data.bStatus != "null") {
        qb.like({ "product.bStatus": Data.bStatus });
      }
      qb.limit(Data.limit, Data.skip);
      qb.join("product_assign pa", "pa.iProductId=product.iProductId", "Left");
      qb.join("user_master um", "um.Id=pa.iEmployeeId", "Left");
    }
    qb.get('product', (err, response) => {
     
      if (err) return res.json("Uh oh! Couldn't get results: " + err.msg);

      if (Data != undefined) {
        if (Data.product_name && Data.product_name != "" && Data.product_name != undefined) {
          qb.like({ vName: Data.product_name });
        }
        if (Data.bStatus && Data.bStatus != undefined && Data.bStatus != "" && Data.bStatus != "null") {
          qb.like({ bStatus: Data.bStatus });
        }
        if (Data.iProductId && Data.iProductId != "" && Data.iProductId != undefined) {
          qb.like({ "product.iProductId": Data.iProductId });
        }
      }
      qb.get('product', (err, response1) => {
        res.json({ resoponse: response, totalRecord: response1.length });
      })
    }
    );
   
  }

  product_assets(req, res, next) {


    qb.get('product_type', (err, response) => {
      if (err) return res.json("Uh oh! Couldn't get results: " + err.msg);
      product_type = response;
    })

    qb.where({ IsActive: 1 })
    qb.get('user_master', (err, response) => {
      if (err) return res.json("Uh oh! Couldn't get results: " + err.msg);
      user_master = response;
    })
    qb.get('software', (err, response) => {
      if (err) return res.json("Uh oh! Couldn't get results: " + err.msg);
      software = response;
    })
    res.json({ product_type: product_type, user_master: user_master, software: software })
  }


  FileUpload(req, res, next) {
    //console.log(req.files);
    var past = new Date();
    var pastDateTime = datetime.create(past);

    if (req.files.vBarcode && req.files.vBarcode != null) {
      var tmpname = pastDateTime._created + "_" + req.files.vBarcode.name;
      req.files.vBarcode.mv('uploads/' + tmpname, function (err) {
        if (err)
          return res.status(500).send(err);
        res.json({ name: tmpname });
      });
    }

    if (req.files.vBillImage && req.files.vBillImage != null) {
      // console.log("Enter");
      var tmpname = pastDateTime._created + "_" + req.files.vBillImage.name;
      req.files.vBillImage.mv('uploads/' + tmpname, function (err) {
        if (err)
          return res.status(500).send(err);
        res.json({ name: tmpname });
      });
    }

  }

  ProductAdd(req, res, next) {

    const Data = JSON.parse(req.body.Data);
    var today = new Date();
    // console.log(today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate());
    var Product = {
      vName: Data.vName,
      vProductBrand: Data.vProductBrand,
      vCompanyModelNumber: Data.vCompanyModelNumber,
      vBarcode: Data.vBarcode.name,
      vProductType: Data.vProductType,
      tDescription: Data.tDescription,
      vRemark: Data.vRemark,
      vMacAddress: Data.vMacAddress,
      vOem: Data.vOem,
      bStatus: Data.bStatus,
      iCreateBy: Data.iCreateBy,
      fPrice: Data.vNfPriceame,
      fWarranty: Data.fWarranty,
      iCreateBy: Data.iCreateBy,
      vBillImage: Data.vBillImage.name,
      dPurchaseDate: Data.dPurchaseDate,
      dtCreateAt: today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    }
    qb.insert('product', Product, (err, response) => {
      if (err) return console.log(qb.last_query() + err.msg);

      if (Data.iSoftwareId != "" && Data.iSoftwareId != undefined && Data.iSoftwareId != null) {


        for (var i = 0; i < Data.iSoftwareId.length; i++) {
          var software_inventry = {
            iSoftwareId: Data.iSoftwareId[i],
            vKey: Data.vKey[i],
            iHardwareId: response.insertId,
            dtCreateAt: today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate(),
            iCreateBy: Data.iCreateBy
          }

          qb.insert('software_inventry', software_inventry, (err, response) => {
            if (err) return console.log(qb.last_query() + err.msg);
            //console.log(response.insertId)
          }
          );
        }



      }

      if (Data.iEmployeeId != "" && Data.iEmployeeId != undefined && Data.iEmployeeId != null) {

        console.log("dfikghjidkfhjgidzfikghdikfgikdfglkhdflkgdfzlkh")
        var user = {
          iEmployeeId: Data.iEmployeeId,
          iProductId: response.insertId,
          bStatus: 0,
          dtCrateAt: today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate(),
          iCreateBy: Data.iCreateBy
        }

        qb.insert('product_assign', user, (err, response) => {
          if (err) return console.log(qb.last_query() + err.msg);
          //console.log("Data"+response.insertId)
          console.log(Data.vProductType)
          var sql = "UPDATE product_type set iQuantity=iQuantity-1 WHERE iProductTypeId=" + Data.vProductType;
          //console.log(query)
          var query = qb.query(sql, function (err, result) {
            // console.log(qb.last_query())
            console.log("Record Updated!!"); console.log(result);
          });




        }
        );
      }


    }
    );

  }

  ProductUpdate(req, res, next) {

    const Data = JSON.parse(req.body.Data);
    var today = new Date();
    //console.log(req.body.Data)
    var Product = {
      vName: Data.vName,
      vProductBrand: Data.vProductBrand,
      vCompanyModelNumber: Data.vCompanyModelNumber,
      vBarcode: Data.vBarcode.name,
      vProductType: Data.vProductType,
      tDescription: Data.tDescription,
      vRemark: Data.vRemark,
      vMacAddress: Data.vMacAddress,
      vOem: Data.vOem,
      bStatus: Data.bStatus,
      iCreateBy: Data.iCreateBy,
      fPrice: Data.vNfPriceame,
      fWarranty: Data.fWarranty,
      iCreateBy: Data.iCreateBy,

      vBillImage: Data.vBillImage.name,
      dPurchaseDate: Data.dPurchaseDate,
      dtUpdateAt: today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    }

    qb.update('product', Product, { iProductId: Data.iProductId }, (err, response) => {
      if (err)
        return console.log("qb.last_query() " + err.msg);

      qb.where({ iHardwareId: Data.iProductId })
      qb.get("software_inventry", (err, response) => {
        if (response.length > 0) {

          qb.delete('software_inventry', { iHardwareId: Data.iProductId }, (err, res) => {
            if (err) { console.log(err) }
            //
            if (Data.iSoftwareId && Data.iSoftwareId != null && Data.iSoftwareId != undefined && Data.iSoftwareId != "") {

              var Software = Object.values(Data.iSoftwareId);
              var vKey = Object.values(Data.vKey);
              //         console.log(Software);

              if (Software.length > 0) {

                for (var i = 0; i < Software.length; i++) {
                  //console.log("zxd")
                  //      console.log("Second time");
                  var software_inventry = {
                    iSoftwareId: Software[i],
                    vKey: vKey[i],
                    iHardwareId: Data.iProductId,
                    dtCreateAt: today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate(),
                    iCreateBy: Data.iCreateBy
                  }
                  //       console.log(software_inventry)
                  qb.insert('software_inventry', software_inventry, (err, response) => {
                    //            console.log("Second" + qb.last_query())
                    // if (err) return console.log(err.msg);
                    // console.log("Second" + response.insertId)
                  }
                  );

                }
              }
            }

            //


          })

        }
        else {
          //        console.log("First tym");
          if (Data.iSoftwareId != undefined && Data.iSoftwareId && Data.iSoftwareId != null) {
            var Software = Object.values(Data.iSoftwareId);
            if (Software && software.length > 0) {
              var vKey = Object.values(Data.vKey);

              for (var i = 0; i < Software.length; i++) {
                //console.log("zxd")
                var software_inventry = {
                  iSoftwareId: Software[i],
                  vKey: vKey[i],
                  iHardwareId: Data.iProductId,
                  dtCreateAt: today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate(),
                  iCreateBy: Data.iCreateBy
                }

                qb.insert('software_inventry', software_inventry, (err, response) => {
                  if (err) return console.log(qb.last_query() + err.msg);
                  //console.log(response.insertId)
                }
                );
              }

            }
          }

        }

      })



      var assign = { iEmployeeId: Data.iEmployeeId }
      qb.update('product_assign', assign, { iProductId: Data.iProductId }, (err, response) => {

        if (err)
          return console.log("qb.last_query() " + err.msg);

        console.log(response);
        if (response.affectedRows > 0) {
          console.log("dsfjvuj")
          if (Data.oldProducttypeId != Data.vProductType) {
            var sql = "UPDATE product_type set iQuantity =iQuantity-1 WHERE iProductTypeId=" + Data.vProductType;
            //console.log(query)
            var query = qb.query(sql, function (err, result) {
              // console.log(qb.last_query())
              console.log("Record Updated!!"); console.log(result);
            });
            console.log("New Data" + Data.vProductType + "Old data  " + Data.oldProducttypeId)
            var sql = "UPDATE product_type set iQuantity =iQuantity+1 WHERE iProductTypeId=" + Data.oldProducttypeId;
            console.log(sql)
            var query = qb.query(sql, function (err, result) {
              console.log(sql)
              console.log("Record Updated!!"); console.log(result);
            });



          }
        }
        else {
          console.log("Insert")
          var user = {
            iEmployeeId: Data.iEmployeeId,
            iProductId: Data.iProductId,
            bStatus: 0,
            dtCrateAt: today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate(),
            iCreateBy: Data.iCreateBy
          }
          qb.insert('product_assign', user, (err, response) => {
            // console.log(qb.last_query());
            if (err) return console.log(qb.last_query() + err.msg);
            //console.log("Data"+response.insertId)
            //console.log(Data.vProductType)
            var sql = "UPDATE product_type set iQuantity=iQuantity-1 WHERE iProductTypeId=" + Data.vProductType;
            //console.log(query)
            var query = qb.query(sql, function (err, result) {
              // console.log(qb.last_query())
              // console.log("Record Updated!!"); console.log(result);
            });
          });

        }
      })


    });


  }

  ProductDisable(req, res, next) { if (req.params.id) { qb.update('product', { bStatus: (req.params.status == 0) ? "1" : "0" }, { iProductId: req.params.id }, (err, resupd) => { if (err) return console.error(qb.last_query()); res.json(resupd); }); } }
}

var routes = new Products();
router.use("/test", routes.test)
router.use("/product-update", routes.ProductUpdate);
router.use("/file-upload", routes.FileUpload);
router.use('/product-edit-list/:id', routes.productEditList);
router.use('/product_assets', routes.product_assets);
router.use('/ProductList', routes.ProductList);
router.get('/ProductList/:limit/:skip/:product_name', routes.ProductList);
router.get('/ProductList/:limit/:skip/', routes.ProductList);
router.get('/ProductList/:id', routes.ProductList);
router.use('/ProductAdd', routes.ProductAdd);
router.use('/products-disable/:id/:status', routes.ProductDisable);
module.exports = router;
