const router = require('express').Router();
const Writer = require('../models/Writer');

router.get('/', (req, res) => {
    Writer.findAll()
        .then(users => {
            if (!users.length) return res.status(404).json({ success: false, err: 'user not found' });

            res.status(200).json({ success: true, users });
        })
        .catch(err => res.status(500).json({ success: false, err }));
});

router.get('/:username', (req, res) => {
    Writer.findOneByUsername(req.params.username)
        .then(user => {
            if (!user) return res.status(400).json({ success: false, err: 'user not found' });

            res.status(200).json({ success: true, user });
        })
        .catch(err => res.json(500).json({ success: false, err }));
});

router.post('/', (req, res) => {
    Writer.create(req.body)
        .then(user => res.status(200).json({ success: true, userid: user._id }))
        .catch(err => res.status(500).json({ success: false, err }));
});

router.put('/:username', (req, res) => {
    Writer.updateByUsername(req.params.username)
        .then(user => res.status(200).json({ success: true, userid: user._id }))
        .catch(err => res.status(500).json({ success: false, err }));
})

router.delete('/:username', (req, res) => {
    Writer.deleteByUsername(req.params.username)
        .then(() => res.status(200).json({ success: true }))
        .catch(err => res.status(500).json({ success: false, err }));
})

module.exports = router;