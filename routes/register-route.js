//Libraries Imports
const route = require('express').Router();
const registerController = require('../controllers/registerController');
let validator = require('validator').default;
let jwt = require('jsonwebtoken');
const { token } = require("morgan");
let { randomBytes } = require('crypto');
let dotenv = require('dotenv');
let bcrypt = require('bcrypt');
let { connection } = require('../config/app_config');
let SALT = 10;
//CREATE ACCOUNT QUERY
const CREATE_ACCOUNT_QUERY = 'INSERT INTO user_accounts (username,email,password) VALUES (?,?,?)';

dotenv.config({ debug: true });
///////////////////////////////////////////////////////////////////
//Routing
function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    console.log("Header: ", bearerHeader);
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}

function authenticationCheck(req, res, next) {
    let token = req.session.token;
    token ? res.redirect('/') : next();
}

route.get('/', (req, res) => {
    console.log("Token: ", req.session.token)
    res.render('signup');
})

.post('/',

    (req, res) => {
        let body = req.body;
        let isAccountCreated = false;
        if (body.username && body.email && body.password && body.confirm_password) {
            let isValidEmail = validator.isEmail(body.email)
            console.log("Email Valid ", isValidEmail);
            let isValidUsername = validator.isLength(body.username, { min: 5 });
            let isValidPassword = validator.isLength(body.username, { min: 8 });
            let isValidConfirmPassword = validator.isLength(body.username, { min: 8 });
            if (!isValidUsername) {
                res.locals.invalid = 'Username invalid';
                res.render('signup', { invalid: 'Username invalid' });
            } else if (!isValidEmail) {
                res.json({ invalid: "Email invalid" });
            } else if (!isValidPassword) {
                res.json({ invalid: "Password must be 8 characters " });
            } else if (!isValidConfirmPassword) {
                res.json({ invalid: "Confirm Password must be 8 characters " });
            } else {

                jwt.sign(body.username, process.env.JWT_SECRET_TOKEN, (error, token) => {

                    console.log('====', token, '====', error, '===== ');
                    bcrypt.hash(body.password, SALT).then((hashPassword) => {
                        console.log("Hash Pass", hashPassword);
                        connection.execute(CREATE_ACCOUNT_QUERY, [body.username, body.email, hashPassword], )
                        res.redirect("/signin");
                    }).catch((error) => {
                        console.log("Error while Hasing", error);
                        res.json({ error: error });
                    })
                });

            }
        }

    }
    /*registerController.registerUser*/
);


module.exports = route;