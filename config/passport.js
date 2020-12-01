const passport = require('passport');
const Pick = require('../models/pick');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
}, function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    // a user has logged in to Google
    Pick.findOne({ 'googleId': profile.id }, function(err, pick) {
        if(err) return cb(err);
        if(pick) {
            return cb(null, pick) // user will be added to session (logged in to our app)
        } else {
            const newPick = new Pick({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id
            });

            newPick.save(function(err) {
                if(err) return cb(err);
                return cb(null, pick);
            });
        }
    });
}));


passport.serializeUser(function(pick, done) {
    done(null, pick.id);
});


passport.deserializeUser(function(id, done) {
    Pick.findById(id, function(err, pick) {
        done(err, pick)
    });
});