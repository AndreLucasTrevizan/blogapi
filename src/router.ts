import {
  Request,
  Response,
  Router
} from 'express';
import { UserRouter } from './modules/users/router';
import { PostRouter } from './modules/posts/router';

const router = Router();

router.get("/errors", (
  req: Request,
  res: Response
) => {
  throw new Error("Error test");
});

router.use(UserRouter);
router.use(PostRouter);

export default router;
