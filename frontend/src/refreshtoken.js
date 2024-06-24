import axios from 'axios';

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;

  try {
    const response = await axios.post('https://user-project-ie89.onrender.com/api/auth/refresh-token', { token: refreshToken });
    const { accessToken } = response.data;

    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Error refreshing token', error);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return null;
  }
};
