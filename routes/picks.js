var router = require('express').Router();
var picksCtrl = require('../controllers/picks');

router.get('/', picksCtrl.index);
router.get('/new', picksCtrl.new);
router.get('/:id', picksCtrl.show);
router.post('/', picksCtrl.create);
router.delete('/:id', picksCtrl.delete);


module.exports = router;