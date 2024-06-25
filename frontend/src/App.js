
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './components/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './Navbar';
import PrivateRoute from './components/Privatemiddleware';
import AdminTodos from './components/Admin_Todo';

function App() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/',
      element: <PrivateRoute />,
      children: [
        {
          path: '/',
          element: (
            <>
              <Navbar />
              <Dashboard />
            </>
          ),
        },
       {
        path:"/admin-todos",
        element: (
          <>
            <AdminTodos/>
          </>)
       }
      ],
    },
  ]);

  return(<>
    <ToastContainer position="top-right" autoClose={5000} />
   <RouterProvider router={router} />
   </>
  );
}

export default App;
