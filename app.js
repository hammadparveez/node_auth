const { app } = require('./config/app_config');
const createError = require('http-errors');
const registerRouter = require('./routes/register-route');
const homeRouter = require('./routes/home-router');
const signInRouter = require('./routes/signin-router');


//Application Routes
app.use('/signup', registerRouter);
app.use('/signIn', signInRouter);
app.use('/', homeRouter);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {

//     next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     // res.locals.message = err.message;
//     // res.locals.error = req.app.get('env') === 'development' ? err : {};
//     //
//     // // render the error page
//     // res.status(err.status || 500);
//     //res.s('error');
//     console.log("Error ", err);
// });

module.exports = app;