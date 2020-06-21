const router = require('express').Router();
const writerController = require('../controllers/writerController');

router.get('/', writerController.findAll);

router.get('/:username', writerController.findOne);

router.post('/', writerController.create);

router.put('/:username', writerController.update);

router.delete('/:username', writerController.delete);

module.exports = router;