// require our modules and set up our setting variables
const express = require('express');
const port = 3009;
const methodOverride = require('method-override');
const session = require('express-session');
const morgan = require('morgan');

// We'll need to load the env vars
require('dotenv').config();

// require our routes
const indexRouter = require('./routes/index');
const picksRouter = require('./routes/picks');


// create the express app
const app = express();

// connect to the MongoDB with mongoose
require('./config/database');

// configure server settings app.set()
app.set('view engine', 'ejs');

// mount our middleware app.use()
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

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



