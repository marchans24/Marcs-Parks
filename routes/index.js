var express = require('express');
var router = express.Router();
var passport = require('passport');

// login route - when the user clicks "login with google"
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// this route is for when google finishes validating user credentials
// they will use this route to bring the user back to us
router.get('/oauth2callback', passport.authenticate('google', {
  successRedirect: '/movies',
  failureRedirect: '/'
}));

// logout route
router.get('/logout', function(req, res) {
  req.logOut(); // destroy the session and cookie
  res.redirect('/');
});

router.get('/', function(req, res, next) {
  res.redirect('/movies');
});

module.exports = router;
