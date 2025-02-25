import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth';
import { createComment, listComments } from '.';

const router = Router();

router
  .route('/comments')
  .post(authMiddleware, createComment);

router
  .route('/comments/:postId')
  .get(authMiddleware, listComments);

export { router as CommentsRouter }
