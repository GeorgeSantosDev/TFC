import { NextFunction, Request, Response } from 'express';
import { ILoginTokenBody } from '../interfaces';
import Token from '../auth/JWT';

const token = new Token();

export default class LoginController {
  constructor(private _token = token) { this._token = _token; }

  public login(req: Request, res: Response, next: NextFunction): void {
    try {
      const { email, role } = req.body as ILoginTokenBody;
      res.status(200).json({ token: this._token.create(email, role) });
    } catch (error) {
      next(error);
    }
  }

  public validateRole(req: Request, res: Response, next: NextFunction): void {
    this._token.validate(req, res, next);

    try {
      const { role } = req.body as ILoginTokenBody;
      res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  }
}
