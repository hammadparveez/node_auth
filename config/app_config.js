var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
let bcrypt = require('bcrypt');
let session = require('express-session');
let helmet = require('helmet');
const app = express();


// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');

//App level Routings
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(session({ secret: bcrypt.genSaltSync(10), saveUninitialized: true }));
app.use(express.static(path.join(__dirname, '../public')));

module.exports = {
    app,
    path,
    cookieParser,
    logger,
    bodyParser,
};