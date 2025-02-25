import { Router } from 'express';
import { createUser, getUserDetails, userSignIn } from '.';
import { authMiddleware } from '../../middleware/auth';

const router = Router();

router
  .route('/users')
  .post(createUser);

router
  .route('/users/details')
  .get(authMiddleware, getUserDetails);

router
  .route('/sign_in')
  .post(userSignIn);

export { router as UserRouter }
