const { runInNewContext } = require('vm');
const Pick = require('../models/pick');

module.exports = {
    index,
    show,
    new: newPick,
    create,
    delete: deletePick,
    edit,
    update
};

function index(req, res) {
    res.render('picks/index', {
        picks: Pick.getAll(),
        time: req.time
    });
}

function show(req, res) {
    res.render('picks/show', {
        pick: Pick.getOne(req.params.id),
        pickId: req.params.id
    });
}

function newPick(req, res) {
    res.render('picks/new');
}

function create(req, res) {
    req.body.done = false;
    Pick.create(req.body);
    res.redirect('/picks');
}

function deletePick(req, res) {
    Pick.deleteOne(req.params.id);
    res.redirect('/picks');
}

function edit(req, res) {
    res.render('picks/edit', {
        pickId: req.params.id,
        pick: Pick.getOne(req.params.id)
    });
}

function update(req, res) {
    req.body.done = false,
    Pick.updateOne(req.body, req.params.id);
    res.redirect('/picks');
}