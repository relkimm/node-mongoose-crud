const router = require('express').Router();
const Todo = require('../models/Todo');

router.get('/', (req, res) => {
    Todo.findAll()
        .then(todos => {
            if (!todos.length) return res.status(404).json({ success: false, err: 'todo not found' });

            res.status(200).json({ success: true, todos });
        })
        .catch(err => res.status(500).json({ success: false, err }));
});

router.get('/:todoid', (req, res) => {
    Todo.findOneById(req.params.todoid)
        .populate('writer')
        .then(todo => {
            if (!todo) return res.status(404).json({ success: false, err: 'todo not found' });

            res.status(200).json({ success: true, todo });
        })
        .catch(err => res.status(500).json({ success: false, err }));
})

router.post('/', (req, res) => {
    Todo.create(req.body)
        .then(todo => res.status(200).json({ success: true, todo }))
        .catch(err => res.status(500).json({ success: false, err }));
});

router.put('/:todoid', (req, res) => {
    Todo.updateById(req.params.todoid, req.body)
        .then(todo => res.status(200).json({ success: true, todo }))
        .catch(err => res.status(500).json({ success: false, err }));
});

router.delete('/:todoid', (req, res) => {
    Todo.deleteById(req.params.todoid)
        .then(() => res.status(200).json({ success: true }))
        .catch(err => res.status(500).json({ success: false, err }));
});

module.exports = router;