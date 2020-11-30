const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

// We'll need to load the env vars
require('dotenv').config();

// create the Express app
const app = express();

// connect to the MongoDB with mongoose
require('./config/database');
require('./config/passport');

// require our routes
var indexRouter = require('./routes/index');
var moviesRouter = require('./routes/movies');
var reviewsRouter = require('./routes/reviews');
var performersRouter = require('./routes/performers');

// view engine setup
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
// TODO Add session middleware here

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// TODO Add passport middleware here
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/movies', moviesRouter);
app.use('/', reviewsRouter);
app.use('/', performersRouter);



app.listen(port, () => {
  console.log(`Express listening on port:${port}`);
});



