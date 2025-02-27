import { Request, Response, NextFunction } from 'express';
export interface Payload {
    id: number;
}
export declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => void;
