import express from 'express';
import { getUser, loginUser, logoutUser, registerUser } from '../controllers/auth.controllers.js';
import verifyToken from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser)
router.get('/', verifyToken, getUser)

export default router;