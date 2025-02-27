import { NextFunction, Request, Response } from "express";
export declare const errorMiddleware: (err: Error, req: Request, res: Response, next: NextFunction) => void;
