//Libraries Imports
const route = require('express').Router();
const registerController = require('../controllers/registerController');

///////////////////////////////////////////////////////////////////
//Routing
route.get('/', registerController.index).post('/',

    (req, res) => {
        var body = req.body;
        var isAccountCreated = false;
        if (body.usrname && body.email && body.password && body.confirm_password) {

            isAccountCreated = true;

        } else {
            isAccountCreated = false;
        }
        res.render("index", { isCreated: isAccountCreated })
        console.log("Registering... POST", body)

    }
    /*registerController.registerUser*/
);


module.exports = route;