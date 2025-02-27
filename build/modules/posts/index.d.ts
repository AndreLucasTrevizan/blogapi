import { Request, Response } from 'express';
export interface IPosts {
    id: number;
    title: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    user: {
        id: number;
        name: string;
    };
}
export declare const createPost: (req: Request, res: Response) => Promise<void>;
export declare const listPosts: (req: Request, res: Response) => Promise<void>;
