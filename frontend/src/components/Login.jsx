import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const onLogin = async () => {
    try {
      const response = await axios.post('https://user-project-ie89.onrender.com/api/auth/login', user);
      const { accessToken, refreshToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      navigate('/');
    } catch (error) {
      console.log('Login failed', error.message);
    }
  };

  return (
    <>
      <div className="bg-slate-300 h-screen flex justify-center items-center">
        <div className="bg-white flex flex-col py-5 px-4 rounded-lg">
          <div className="text-center font-bold px-36 py-3">LOGIN</div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
            <div className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Forgot Password?
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
                checked
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <div className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer" onClick={()=>{navigate("/signup")}}>
              Create Account
            </div>
          </div>
          <button
            type="submit"
            onClick={onLogin}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
