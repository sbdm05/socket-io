const express = require('express');
const router = express.Router();

const {
  getTodos,
  createTodo,
  getSingleTodo,
  editTodo,
  deleteTodo,
} = require('../controllers/todos.js');

router.get('/', getTodos);
router.post('/', createTodo);
router.get('/:id', getSingleTodo);
router.patch('/:id', editTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
