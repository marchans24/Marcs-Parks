var Pick = require('../models/pick');

module.exports = {
  create
};

function create(req, res) {
  Pick.findById(req.params.id, function(err, pick) {
    pick.reviews.push(req.body);
    pick.save(function(err) {
      res.redirect(`/picks/${pick._id}`);
    });
  });
}