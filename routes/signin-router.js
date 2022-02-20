const route = require('express').Router();
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
route.get('/', (req, res, next) => {
        let token = req.session.token;
        console.log("Show me Token First", token, "and ", process.env.JWT_SECRET_TOKEN);

        res.render('signin')
    })
    .post('/', (req, res, next) => {

        let token = req.session.token;
        console.log("Show me Token First", token, "and ", process.env.JWT_SECRET_TOKEN);
        let t = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        console.log('T', t);
        res.redirect('/')

    })
module.exports = route;