import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (err instanceof Error) {
    res.status(400).json({ msg: err.message });
  }

  res.status(500).json({
    status: "error",
    message: "Internal Server Error"
  });
}
