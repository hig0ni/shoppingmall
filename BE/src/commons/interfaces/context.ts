import { Request, Response } from 'express';

export interface IAuthUser {
  user?: {
    id?: string;
    nickname?: string;
    email?: string;
    isAuth?: number;
    isAdmin?: number;
  };
}

export interface IContext {
  req: Request & IAuthUser;
  res: Response;
}
