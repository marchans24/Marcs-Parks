var router = require('express').Router();
var moviesCtrl = require('../controllers/movies');

router.get('/', moviesCtrl.index);
router.get('/new', moviesCtrl.new);
router.get('/:id', moviesCtrl.show);
router.post('/', moviesCtrl.create);

router.delete('/:id', moviesCtrl.delete);

module.exports = router;