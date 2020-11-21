// require our modules and set up our setting variables
const express = require('express');
const port = 3005;
const methodOverride = require('method-override');
const morgan = require('morgan');


const indexRouter = require('./routes/index');
const picksRouter = require('./routes/picks');

// create the express app
const app = express();

// configure server settings app.set()
app.set('view engine', 'ejs');

// mount our middleware app.use()
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// own custom middleware
app.use(function(req, res, next) {
    console.log('Hello Guest Picker!');
    req.time = new Date().toLocaleTimeString();
    next();
});

// mount our routes app.use()
// define another call to app.use() mounting a router for the homepage
app.use('/', indexRouter);
app.use('/picks', picksRouter);

// tell the app to listen on designated port
app.listen(port, function() {
    console.log(`Express is listening on port:${port}`)
});



