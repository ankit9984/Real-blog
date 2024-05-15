import express from 'express';
import { commentOnPost, createPost, deleteCommentOnPost, deletePost, getAllPost, updatePost } from '../controllers/post.controllers.js';
import verifyToken from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', verifyToken, getAllPost);
router.post('/', verifyToken, createPost);
router.post('/update/:postId', verifyToken, updatePost);
router.delete('/delete/:postId', verifyToken, deletePost);

router.post('/comment/:postId', verifyToken, commentOnPost);
router.delete('/comment/:postId/:commentId', verifyToken, deleteCommentOnPost);

export default router;