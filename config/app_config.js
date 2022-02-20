let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
let bcrypt = require('bcrypt');
let session = require('express-session');
let helmet = require('helmet');
let app = express();
let sql = require('mysql2');
let dotenv = require('dotenv');


dotenv.config();
let connection = sql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE,
});

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
    connection,
};