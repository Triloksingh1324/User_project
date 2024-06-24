/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import connect from './dbconfig.js';
import router from './routes/authentication.js';

const app = express();

connect();

app.use(express.json());
app.use(cors());
app.use('/api/auth', router);
app.use('/api/todo',router);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
