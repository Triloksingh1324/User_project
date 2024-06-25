import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/Usermodel.js';

dotenv.config();

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  try {
    if (!token) {
      return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          const refreshToken = req.headers['x-refresh-token'];
          if (!refreshToken) return res.sendStatus(403);

          try {
            const user = await User.findOne({ refreshToken });
            if (!user) return res.sendStatus(403);

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
              if (err) return res.sendStatus(403);

              const newAccessToken = jwt.sign(
                { id: user._id, username: user.username, email: user.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
              );

              res.setHeader('x-access-token', newAccessToken);
              req.user = user; 
              next();
            });
          } catch (error) {
            console.error(error.message);
            res.sendStatus(500);
          }
        } else {
          return res.sendStatus(403);
        }
      } else {
        try {
          const user = await User.findOne({ _id: decoded.id });
          if (!user) return res.status(404).json({ msg: 'User not found' });

          req.user = user;
          next();
        } catch (error) {
          console.error(error.message);
          res.status(500).json({ msg: 'Server Error' });
        }
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};
