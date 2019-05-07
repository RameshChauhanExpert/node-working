var express = require('express');
var router = express.Router();
var connection = require('./connection.js');

router.get('/', function(req, res, next) {
    connection.query('SELECT * FROM `product_assign` ', function (error, results, fields) {
      res.json(results)
          });
});
      




module.exports = router;