import { Request, Response, NextFunction } from 'express';
import { ILogin } from '../interfaces';
import HttpException from '../utils/HttpException';
import { LoginService } from '../service';
import Crypt from '../utils/Bcrypt';

export default class LoginValidation {
  static fieldsValidation(req: Request, _res: Response, next: NextFunction): void {
    try {
      const { email, password } = req.body as ILogin;

      if (!email || !password) {
        throw new HttpException(400, 'All fields must be filled');
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  static async credentialValidation(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email, password } = req.body as ILogin;

      const response = await LoginService.getUser(email);

      if (!response || !Crypt.verify(password, response.password)) {
        throw new HttpException(401, 'Incorrect email or password');
      }

      const { role } = response;
      req.body.role = role;

      next();
    } catch (error) {
      next(error);
    }
  }
}
