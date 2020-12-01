var Pick = require('../models/pick');
var Performer = require('../models/performer');

module.exports = {
  index,
  show,
  new: newPick,
  create,
  delete: deletePick
};

function index(req, res) {
  Pick.find({}, function(err, picks) {
    res.render('picks/index', { title: 'All Picks', picks, user: req.user });
  });
}

function show(req, res) {
  Pick.findById(req.params.id)
  .populate('cast').exec(function(err, pick) {
    // Performer.find({}).where('_id').nin(movie.cast)
    Performer.find({_id: {$nin: pick.cast}})
    .exec(function(err, performers) {
      console.log(performers);
      res.render('picks/show', {
        title: 'Pick Details', pick, performers, user: req.user
      });
    });
  });
}

function deletePick(req, res) {
  Pick.findByIdAndRemove(req.params.id, function(err, pick) {
    res.redirect('/');
  });
}

function newPick(req, res) {
  res.render('picks/new', { title: 'Add New Pick', user: req.user });
}

function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  var pick = new Pick(req.body);
  pick.save(function(err) {
    if (err) return res.redirect('/picks/new');
    // res.redirect('/movies');
    res.redirect(`/picks/${pick._id}`);
  });
}
