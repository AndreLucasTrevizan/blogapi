import { Request, Response } from 'express';
export declare const createUser: (req: Request, res: Response) => Promise<void>;
export declare const userSignIn: (req: Request, res: Response) => Promise<void>;
export declare const getUserDetails: (req: Request, res: Response) => Promise<void>;
