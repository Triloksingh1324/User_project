import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import { refreshAccessToken } from '../refreshtoken';

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const verifyToken = async () => {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        setIsAuthenticated(false);
        return;
      }

      try {
        await axios.get('https://user-project-ie89.onrender.com/api/auth/verify-token', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setIsAuthenticated(true);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      }
    };

    verifyToken();
  }, [location]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
