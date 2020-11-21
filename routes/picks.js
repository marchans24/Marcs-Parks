// require our modules
const express = require('express');

// create a router object
const router = express.Router();

// require the controller module
const picksCtrl = require('../controllers/picks');

// give me all the things on a page
router.get('/', picksCtrl.index);

// give me a view that 
router.get('/new', picksCtrl.new);
router.get('/:id', picksCtrl.show);
router.post('/', picksCtrl.create);
router.delete('/:id', picksCtrl.delete);
router.get('/:id/edit', picksCtrl.edit);
router.put('/:id', picksCtrl.update);

// export the router object
module.exports = router;