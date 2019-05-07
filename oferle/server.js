var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require('body-parser');
 
var app = express();
var cors = require('cors');



app.use(express.static(path.join(__dirname, 'src')));


app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
console.log("Path name :>",__dirname)
  res.sendFile(path.join(__dirname, '/build/', 'index.html'));
});

app.listen(4085);1