import express from 'express';
import verifyToken from '../middleware/auth.middleware.js';
import { followUser, unfollowUser} from '../controllers/user.controllers.js';

const router = express.Router();

router.post('/follow/:followId', verifyToken, followUser);
router.post('/unfollow/:followId', verifyToken, unfollowUser);

export default router;