import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/Usermodel.js'

dotenv.config();

export const isAdmin = async (req, res, next) =>{
  const accessToken = req.headers.authorization?.split(' ')[1];

  try {
    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const username = decodedToken.username;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    if(!user.isAdmin){
        return res.status(403).json({ msg: 'Not authorized as an admin' });
    }
    else{
        next();
    }

}
catch(err){
    console.log(err);
}
}
