import { NextFunction, Request, Response } from 'express';
import { ILogin } from '../interfaces';
import Token from '../auth/JWT';

const token = new Token();

export default class LoginController {
  static login(req: Request, res: Response, next: NextFunction): void {
    try {
      const { email } = req.body as ILogin;
      res.status(200).json({ token: token.create(email) });
    } catch (error) {
      next(error);
    }
  }
}
