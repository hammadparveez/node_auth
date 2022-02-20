//Libraries Imports
const route = require('express').Router();
const registerController = require('../controllers/registerController');
let validator = require('validator').default;
let jwt = require('jsonwebtoken');
const { token } = require("morgan");
let { randomBytes } = require('crypto');
let dotenv = require('dotenv');

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

route.get('/', authenticationCheck, (req, res) => {
        console.log("Token: ", req.session.token)
        res.render('index');
    })
    .post('/',

        (req, res) => {
            let body = req.body;
            let isAccountCreated = false;
            if (body.username && body.email && body.password && body.confirm_password) {
                let isValidEmail = validator.isEmail(body.email)
                console.log("Email Valid ", isValidEmail);
                if (isValidEmail) {
                    jwt.sign(body.username, randomBytes(64), (error, token) => {
                        console.log('====', token, '====', error, '===== ');
                        req.session.token = token;
                        res.redirect("/");
                    });

                } else {
                    res.json({ error: 'Email incorrect' })
                }
            }

        }
        /*registerController.registerUser*/
    );


module.exports = route;