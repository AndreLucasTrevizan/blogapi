import { Router } from 'express';
import { createUser, userSignIn } from '.';

const router = Router();

router
  .route('/users')
  .post(createUser);

router
  .route('/sign_in')
  .post(userSignIn);

export { router as UserRouter }
