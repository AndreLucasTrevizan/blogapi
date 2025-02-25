import {
  Request,
  Response,
  NextFunction
} from 'express';
import { verify } from 'jsonwebtoken';

export interface Payload {
  id: number;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const has_token = req.headers['authorization'];

  if (!has_token) {
    res.status(403).json({ msg: "Não autenticado" });
    return;
  }

  const token = has_token.split(' ')[1];

  verify(token, String(process.env.API_SECRET), (err, decoded) => {
    if (err) {
      res.status(401).json({ msg: "Token inválido" });
      return;
    }

    req.user = decoded as Payload;

    next();
  });
}
