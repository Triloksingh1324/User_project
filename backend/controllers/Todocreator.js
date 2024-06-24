import Todo from "../models/Todomodel.js";
import User from "../models/Usermodel.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const Todos = async (req, res) => {
  const { title } = req.body;
  const accessToken = req.headers.authorization?.split(' ')[1];

  try {
    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const username = decodedToken.username;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const newTodo = new Todo({
      title,
      username: user.username 
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Something went wrong" });
  }
};
export const getTodos = async (req, res) => {
    const accessToken = req.headers.authorization?.split(' ')[1];
  
    try {
      const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const username = decodedToken.username; 
  
      const user = await User.findOne({ username }); 
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      const todos = await Todo.find({ username: user.username });
      if (!todos || todos.length === 0) {
        return res.status(404).json({ msg: 'No todos found for this user' });
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
    const accessToken = req.headers.authorization?.split(' ')[1];
  
    try {
      const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const username = decodedToken.username; 
  
      const user = await User.findOne({ username }); 
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  

      let todo = await Todo.findOne({ _id: id, username: user.username });
  
      if (!todo) {
        return res.status(404).json({ msg: 'Todo not found' });
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
    const {id} = req.params;
  
    try {

      const accessToken = req.headers.authorization?.split(' ')[1];
      const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const username = decodedToken.username;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      const todo = await Todo.findOne({ _id: id, username: user.username });
      if (!todo) {
        return res.status(404).json({ msg: 'TODO not found' });
      }
      await Todo.findByIdAndDelete(id);
      res.status(200).json({ msg: 'TODO deleted successfully' });
    } catch (error) {
      console.error(error.message);
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ msg: 'Invalid access token' });
      }
      res.status(500).json({ msg: 'Server Error' });
    }
  };
  export const getTodobyUsername = async (req, res) => {
    
     const {username} =req.params;
     const user =await User.findOne({username});
     if(!user) return res.status(404).json({ msg: 'User not found' });
     const todos=await Todo.find({username:user.username});
     if(!todos) return res.status(404).json({ msg: 'Todo not found' });

     res.status(200).json(todos);

  }