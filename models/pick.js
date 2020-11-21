module.exports = {
    getAll,
    getOne,
    create,
    deleteOne,
    updateOne
};

const picks = [
    {text: 'Florida -3', win: true},
    {text: 'Tennessee -6', win: true},
    {text: 'Nebraska +21', win: true},
];

function getOne(id) {
    return picks[id];
};

function getAll() {
    return picks;
};

function create(pick) {
    picks.push(pick);
};

function deleteOne(id) {
    picks.splice(id, 1);
};

function updateOne(pick, id) {
    picks.splice(id, 1, pick);
};

