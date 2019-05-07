var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var productsRouter = require('./routes/products');
var product_assign_Router = require('./routes/product_assign');
var UserManagement = require('./routes/UserManagement');
var ProductType = require('./routes/ProductType');
var Ticket = require('./routes/Ticket');
var Software = require('./routes/SoftwareManagement');
var Dashboard = require('./routes/Dashboard');
var bodyParser = require('body-parser');
var multer  =require('multer');  
var app = express();
var cors = require('cors');
var expressValidator = require('express-validator');
const db = require('./config/db.json');
const qb = require('node-querybuilder').QueryBuilder(db, 'mysql');


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
//app.engine('jsx', require('express-react-views').createEngine());

//app.use(express.static(path.join(__dirname, 'build')));


app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/UserManagement', UserManagement);
app.use('/product_assign', product_assign_Router);
app.use('/product-type', ProductType);
app.use('/ticket', Ticket);
app.use('/software', Software);
app.use('/Dashboard', Dashboard);



// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });



// app.use(express.static(path.join(__dirname, 'build')));
// app.get('/*', function (req, res) {
// console.log("Path name :>",__dirname)
//   res.sendFile(path.join(__dirname, '/build/', 'index.html'));
// });

app.get('/', function(req, res){
	console.log("Demo")
   res.send("Hello world!");
});

app.listen(4085);