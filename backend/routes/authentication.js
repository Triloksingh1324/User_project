import express from 'express';
import { signup, login, refreshToken, verifyToken } from '../controllers/authcontroller.js';
import { Todos, getTodos, updateTodo, deleteTodo, getTodobyUsername} from '../controllers/Todocreator.js';
import { authenticateToken } from '../middleware/authenticate_token.js';
import {isAdmin} from '../middleware/isAdmin.js';
import { Admin } from '../controllers/authcontroller.js';
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/refresh-token", refreshToken);
router.get("/verify-token", verifyToken);
router.post("/admin",Admin)
router.post('/todos', authenticateToken, Todos);
router.get('/todos', authenticateToken, getTodos);
router.put('/todos/:id', authenticateToken, updateTodo);
router.delete('/todos/:id', authenticateToken, deleteTodo);
router.get('/todos/:username', isAdmin, getTodobyUsername);

export default router;
