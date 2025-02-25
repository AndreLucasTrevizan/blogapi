import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth';
import { createComment } from '.';

const router = Router();

router
  .route('/comments')
  .post(authMiddleware, createComment);

export { router as CommentsRouter }
