import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth';
import { createPost, editPost, listPosts } from '.';

const router = Router();

router
  .route('/posts')
  .get(authMiddleware, listPosts)
  .post(authMiddleware, createPost);

router
  .route('/posts/edit')
  .put(authMiddleware, editPost);

export { router as PostRouter }
