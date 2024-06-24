import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-indigo-500 p-2 bg-white rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">TODO-s</span>
        </a>
        <nav className="flex flex-wrap items-center text-base justify-center">
          <button
            className="inline-flex items-center bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg mt-4 md:mt-0"
            onClick={onLogout}
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
