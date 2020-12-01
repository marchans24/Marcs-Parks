var Performer = require('../models/performer');
var Pick = require('../models/pick');

module.exports = {
  new: newPerformer,
  create,
  addToCast
};

function addToCast(req, res) {
  Pick.findById(req.params.id, function (err, pick) {
    pick.cast.push(req.body.performerId);
    pick.save(function (err) {
      res.redirect(`/picks/${pick._id}`);
    });
  });
}

function create(req, res) {
  var s = req.body.born;
  req.body.born = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
  Performer.create(req.body, function (err, performer) {
    res.redirect('/performers/new');
  });
}

function newPerformer(req, res) {
  Performer.find({}, function (err, performers) {
    res.render('performers/new', {
      title: 'Add Shark',
      performers,
      user: req.user
    });
  })
}