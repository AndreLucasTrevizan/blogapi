import {
  Request,
  Response,
  Router
} from 'express';

const router = Router();

router.get("/errors", (
  req: Request,
  res: Response
) => {
  throw new Error("Error test");
});

export default router;
