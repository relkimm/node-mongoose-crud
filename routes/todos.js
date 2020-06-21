const router = require('express').Router();
const todosController = require('../controllers/todosController');

router.get('/', todosController.findAll);

router.get('/:todoid', todosController.findOne);

router.post('/', todosController.create);

router.put('/:todoid', todosController.update);

router.delete('/:todoid', todosController.delete);

module.exports = router;