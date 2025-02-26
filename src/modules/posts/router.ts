import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth';
import { createPost, getPostById, listPosts } from '.';

const router = Router();

router
  .route('/posts')
  .get(authMiddleware, listPosts)
  .post(authMiddleware, createPost);

router
  .route('/posts/:postId')
  .get(authMiddleware, getPostById);

export { router as PostRouter }
