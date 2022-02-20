const { Router } = require("express");

let route = Router();

route.get("/", checkAuthentication, (req, res) => {
    res.send('Welcome Home');
})

function checkAuthentication(req, res, next) {

    let token = req.session.token;
    token ? next() : res.redirect('/register');

}

module.exports = route;