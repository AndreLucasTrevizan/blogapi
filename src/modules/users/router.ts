import { Router } from 'express';
import { createUser } from '.';

const router = Router();

router
  .route('/users')
  .post(createUser);

export { router as UserRouter }
