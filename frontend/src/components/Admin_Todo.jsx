import React, { useState } from 'react';
import axios from '../middleware/axiosInstance';

function AdminTodos() {
  const [username, setUsername] = useState('');
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');

  const fetchUserTodos = async () => {
    try {
      const response = await axios.get(`/api/todo/todos/${username}`);
      setTodos(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching user todos', error);
      setError('User not found or error fetching todos');
      setTodos([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4">Admin - Search User Todos</h1>
      <div className="w-full max-w-md mb-4">
        <input
          type="text"
          className="border p-2 w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"
          onClick={fetchUserTodos}
        >
          Search
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {todos.length === 0 ? (
    <div className="text-gray-500 text-lg mt-4">No todos found.</div>
  ) : (
    <ul className="w-full max-w-md">
      {todos.map(todo => (
        <li key={todo._id} className="bg-white p-2 my-2 shadow">
          {todo.title}
        </li>
      ))}
    </ul>
  )}
    </div>
  );
}

export default AdminTodos;
