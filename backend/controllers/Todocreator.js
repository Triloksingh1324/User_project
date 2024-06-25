import Todo from "../models/Todomodel.js";
import User from "../models/Usermodel.js";
export const Todos = async (req, res) => {
  const { title } = req.body;

  try {
    const newTodo = new Todo({
      title,
      userId: req.user._id,
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id });
    if (!todos || todos.length === 0) {
      return res.status(404).json({ msg: "No todos found for this user" });
    }
    res.json(todos);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    let todo = await Todo.findOne({ _id: id, userId: req.user._id });
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }
    todo.title = title;
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findOne({ _id: id, userId: req.user._id });
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ msg: "Todo deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

export const getTodosByUserName = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const todos = await Todo.find({ userId: user._id });
    if (!todos || todos.length === 0) {
      return res.status(404).json({ msg: "No todos found for this user" });
    }

    res.json(todos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
};
