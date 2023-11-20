import { Request, Response } from 'express';

export interface IAuthUser {
  user?: {
    id?: string;
    nickname?: string;
    email?: string;
    isAuth?: number;
    isAdmin?: number;
    point?: number;
  };
}

export interface IContext {
  req: Request & IAuthUser;
  res: Response;
}
