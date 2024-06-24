import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoTitle, setEditingTodoTitle] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('No access token found');
      return;
    }
    checkAdminStatus();
    fetchTodos();
  }, []);

  const checkAdminStatus = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('No access token found');
      return;
    }
    try {
      const response = await axios.post('https://user-project-ie89.onrender.com/api/auth/admin', {}, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(response.data);
      setIsAdmin(response.data.isAdmin);
    } catch (error) {
      console.error('Error checking admin status', error);
    }
  };
  
  const fetchTodos = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('No access token found');
      return;
    }

    try {
      const response = await axios.get('https://user-project-ie89.onrender.com/api/todo/todos', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos', error);
    }
  };

  const addTodo = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!newTodo.trim() || !accessToken) return;

    try {
      const response = await axios.post(
        'https://user-project-ie89.onrender.com/api/todo/todos',
        { title: newTodo },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo', error);
    }
  };

  const updateTodo = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!editingTodoTitle.trim() || !accessToken) return;

    try {
      const response = await axios.put(
        `https://user-project-ie89.onrender.com/api/todo/todos/${id}`,
        { title: editingTodoTitle },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
      setEditingTodoId(null);
      setEditingTodoTitle('');
    } catch (error) {
      console.error('Error updating todo', error);
    }
  };

  const deleteTodo = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;

    try {
      await axios.delete(`https://user-project-ie89.onrender.com/api/todo/todos/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo', error);
    }
  };

  const handleAdminButtonClick = () => {
    if (isAdmin) {
      navigate('/admin-todos');
    } else {
      alert('This feature is only available to admins.');
    }
  };

  const handleTodoClick = (id, title) => {
    setEditingTodoId(id);
    setEditingTodoTitle(title);
  };

  const handleInputChange = (e) => {
    setEditingTodoTitle(e.target.value);
  };

  const handleKeyPress = (id, e) => {
    if (e.key === 'Enter') {
      updateTodo(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <nav className="w-full bg-blue-500 p-4 flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">TODO List</h1>
        <div className="relative group">
          <button
            className={`text-white px-4 py-2 rounded ${isAdmin ? 'bg-blue-700 hover:bg-blue-800' : 'bg-gray-500 cursor-not-allowed'}`}
            onClick={handleAdminButtonClick}
            disabled={!isAdmin}
          >
            See Todos of All Users
          </button>
          {!isAdmin && (
            <div className="absolute bottom-full mb-2 w-48 p-2 bg-black text-white text-center text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Only for admins
            </div>
          )}
        </div>
      </nav>

      <textarea
        className="border p-2 w-full mb-2"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={addTodo}
      >
        Add Todo
      </button>
      <ul className="w-full">
        {todos.map(todo => (
          <li
            key={todo._id}
            className="bg-white p-2 my-2 shadow flex justify-between items-center"
          >
            {editingTodoId === todo._id ? (
              <input
                type="text"
                className="border p-2 flex-1"
                value={editingTodoTitle}
                onChange={handleInputChange}
                onKeyPress={(e) => handleKeyPress(todo._id, e)}
              />
            ) : (
              <span
                className="cursor-pointer flex-1"
                onClick={() => handleTodoClick(todo._id, todo.title)}
              >
                {todo.title}
              </span>
            )}
            <div className="flex space-x-2">
              {editingTodoId === todo._id && (
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => updateTodo(todo._id)}
                >
                  Update
                </button>
              )}
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => deleteTodo(todo._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
