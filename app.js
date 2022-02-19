var { app } = require('./config/app_config');
var createError = require('http-errors');
var registerRouter = require('./routes/register-route');
var homeRouter = require('./routes/home-router');




//Application Routes
app.use('/register', registerRouter);
app.use('/', homeRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;