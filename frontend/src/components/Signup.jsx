import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const onSignup = async () => {
    try {
      await axios.post(
        "https://user-project-ie89.onrender.com/api/auth/signup/",
        user
      );
      navigate("/login");
    } catch (error) {
      console.log("Signup failed", error.message);
    }
  };
  return (
    <>
      <div className="bg-slate-300 h-screen flex justify-center items-center ">
        <div className="bg-white flex flex-col py-5 px-4 rounded-lg">
          <div className="text-center font-bold px-20 py-3">
            Create the account
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              USERNAME:
            </label>
            <input
              type="text"
              id="username"
              value={user.userName}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Username"
              required
            />
          </div>
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
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="your@email.com"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
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
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            
              
              <div
                className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Sign in
              </div>
          
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={onSignup}
          >
            Create Account
          </button>
        </div>
      </div>
    </>
  );
}
