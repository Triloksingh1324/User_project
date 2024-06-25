import Todo from "../models/Todomodel.js";

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

export const getTodosByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const todos = await Todo.find({ userId });
    if (!todos || todos.length === 0) {
      return res.status(404).json({ msg: "No todos found for this user" });
    }
    res.json(todos);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Something went wrong" });
  }
};
