import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth';
import { createPost } from '.';

const router = Router();

router
  .route('/posts')
  .post(authMiddleware, createPost);

export { router as PostRouter }
