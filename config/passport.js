const passport = require('passport');
const User = require('../models/user');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
}, function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    // a user has logged in to Google
    User.findOne({ 'googleId': profile.id }, function(err, foundUser) {
        if(err) return cb(err);
        if(foundUser) {
            return cb(null, foundUser) // user will be added to session (logged in to our app)
        } else {
            const newUser = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id
            });

            newUser.save(function(err) {
                if(err) return cb(err);
                return cb(null, newUser);
            });
        }
    });
}));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});


passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user)
    });
});