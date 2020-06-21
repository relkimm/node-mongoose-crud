const Todo = require('../models/Todo');

exports.create = function (req, res) {
    Todo.create(req.body)
        .then(todo => res.status(200).json({ success: true, todo }))
        .catch(err => res.status(500).json({ success: false, err }));
}

exports.findAll = function (req, res) {
    Todo.findAll()
        .then(todos => {
            if (!todos.length) return res.status(404).json({ success: false, err: 'todo not found' });

            res.status(200).json({ success: true, todos });
        })
        .catch(err => res.status(500).json({ success: false, err }));
};

exports.findOne = function (req, res) {
    Todo.findOneById(req.params.todoid)
        .populate('writer')
        .then(todo => {
            if (!todo) return res.status(404).json({ success: false, err: 'todo not found' });

            res.status(200).json({ success: true, todo });
        })
        .catch(err => res.status(500).json({ success: false, err }));
};

exports.update = function (req, res) {
    Todo.updateById(req.params.todoid, req.body)
        .then(todo => res.status(200).json({ success: true, todo }))
        .catch(err => res.status(500).json({ success: false, err }));
};

exports.delete = function (req, res) {
    Todo.deleteById(req.params.todoid)
        .then(() => res.status(200).json({ success: true }))
        .catch(err => res.status(500).json({ success: false, err }));
};