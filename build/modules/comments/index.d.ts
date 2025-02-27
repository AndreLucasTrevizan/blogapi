import { Request, Response } from 'express';
export declare const createComment: (req: Request, res: Response) => Promise<void>;
export declare const listComments: (req: Request, res: Response) => Promise<void>;
