const { Router } = require("express");

var route = Router();

route.get("/", (req, res) => {
    res.send("Welcome");
})

module.exports = route;