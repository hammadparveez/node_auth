exports.index = (req, res) => {
    console.log("Register VIEW... GET")
    res.render('index')
}
exports.registerUser = (req, res) => {
    console.log("Registering... POST")

    res.redirect("/")
}