import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth';
import { createPost, listPosts } from '.';

const router = Router();

router
  .route('/posts')
  .get(authMiddleware, listPosts)
  .post(authMiddleware, createPost);

export { router as PostRouter }
