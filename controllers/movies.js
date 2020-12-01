var Movie = require('../models/movie');
var Performer = require('../models/performer');

module.exports = {
  index,
  show,
  new: newMovie,
  create,
  delete: deleteMovie
};

function index(req, res) {
  Movie.find({}, function(err, movies) {
    res.render('movies/index', { title: 'All Picks', movies, user: req.user });
  });
}

function show(req, res) {
  Movie.findById(req.params.id)
  .populate('cast').exec(function(err, movie) {
    // Performer.find({}).where('_id').nin(movie.cast)
    Performer.find({_id: {$nin: movie.cast}})
    .exec(function(err, performers) {
      console.log(performers);
      res.render('movies/show', {
        title: 'Pick Details', movie, performers, user: req.user
      });
    });
  });
}

function deleteMovie(req, res) {
  Movie.findByIdAndRemove(req.params.id, function(err, movie) {
    res.redirect('/');
  });
}

function newMovie(req, res) {
  res.render('movies/new', { title: 'Add New Pick', user: req.user });
}

function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  var movie = new Movie(req.body);
  movie.save(function(err) {
    if (err) return res.redirect('/movies/new');
    // res.redirect('/movies');
    res.redirect(`/movies/${movie._id}`);
  });
}

//heroku