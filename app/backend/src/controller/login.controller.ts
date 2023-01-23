import { NextFunction, Request, Response } from 'express';
import { ILoginTokenBody } from '../interfaces';
import Token from '../auth/JWT';

const token = new Token();

export default class LoginController {
  static login(req: Request, res: Response, next: NextFunction): void {
    try {
      const { email, role } = req.body as ILoginTokenBody;
      res.status(200).json({ token: token.create(email, role) });
    } catch (error) {
      next(error);
    }
  }

  static validateRole(req: Request, res: Response, next: NextFunction): void {
    try {
      const { role } = req.body as ILoginTokenBody;
      res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  }
}
