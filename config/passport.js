const passport = require('passport');
const Movie = require('../models/movie');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
}, function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    // a student has logged in to Google
    Movie.findOne({ googleId: profile.id }, function(err, movie) {
        if(err) return cb(err);
        if(movie) {
            return cb(null, movie) // user will be added to session (logged in to our app)
        } else {
            const newMovie = new Movie({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id
            });

            newMovie.save(function(err) {
                if(err) return cb(err);
                return cb(null, movie);
            });
        }
    });
}));


passport.serializeUser(function(movie, done) {
    done(null, movie.id);
});


passport.deserializeUser(function(id, done) {
    Movie.findById(id, function(err, movie) {
        done(err, movie)
    });
});