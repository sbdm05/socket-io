const Todo = require('../models/Todo');

const getTodos = async (req, res) => {
  const todos = await Todo.find({});
  res.json({ todos });
};
const createTodo = async (req, res) => {
  try {
    const task = await Todo.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }
};
const getSingleTodo = async (req, res) => {
  try {
    const { id: todoID } = req.params;
    const todo = await Todo.findOne({ _id: todoID });
    if (!todo) {
      return res.status(400).json({ success: true, msg: {} });
    }
    res.status(200).json({ todo });
  } catch (error) {
    // cast error
    res.status(400).json({ msg: error });
  }
};
const editTodo = async (req, res) => {
  try {
    const {id:todoID} = req.params;
    console.log(req.body, 'req.body')

    const todo = await Todo.findOneAndReplace({_id:todoID}, req.body)

    if (!todo) {
      return res.status(400).json({ success: true, msg: "pas de todo avec cette id" });
    }

    res.status(200).json({ id: todoID, todo : req.body});
  } catch (error) {
    res.status(500).json({ msgs: error });
  } 
};  


const deleteTodo = async (req, res) => {
  try {
    const { id: todoID } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: todoID });
    if (!todo) {
      return res.status(400).json({ success: true, msg: {} });
    }
    res.status(200).json({ supprime: todo });
  } catch (error) {
    // cast error
    res.status(400).json({ msg: error });
  }
};

module.exports = {
  getTodos,
  createTodo,
  getSingleTodo,
  editTodo,
  deleteTodo,
};
