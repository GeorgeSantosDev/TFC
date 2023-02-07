import { Request, Response, NextFunction } from 'express';
import { ILogin } from '../interfaces';
import HttpException from '../utils/HttpException';
import { LoginService } from '../service';
import Crypt from '../utils/Bcrypt';

const service = new LoginService();

export default class LoginValidation {
  constructor(private _service = service) { this._service = _service; }

  static fieldsValidation(req: ILogin): void {
    const { email, password } = req;

    if (!email || !password) {
      throw new HttpException(400, 'All fields must be filled');
    }
  }

  public async credentialValidation(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email, password } = req.body as ILogin;

      LoginValidation.fieldsValidation({ email, password });

      const response = await this._service.getUser(email);

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
