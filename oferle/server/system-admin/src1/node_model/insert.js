var mysql = require('mysql');

var db= require('./db');

db.con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var sql = "INSERT INTO product (vProductName) VALUES ('Company Inc')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  
});