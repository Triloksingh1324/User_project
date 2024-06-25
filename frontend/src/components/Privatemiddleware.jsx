import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import axios from '../middleware/axiosInstance';
import { refreshAccessToken } from '../refreshtoken';
import {BallTriangle} from 'react-loader-spinner';

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

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), 10000)
      );

      const verificationPromise = axios.get('/api/auth/verify-token');

      try {
        await Promise.race([verificationPromise, timeoutPromise]);
        setIsAuthenticated(true);
      } catch (error) {
        if (error.message === 'timeout') {
          setIsAuthenticated(false);
        } else if (error.response && error.response.status === 403) {
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
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <BallTriangle height={100} width={100} radius="5" color="green" ariaLabel="loading" />
  </div>
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
