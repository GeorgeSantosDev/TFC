import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/HttpException';
import { IToken } from '../interfaces';

export default class Token {
  private _secret: jwt.Secret = process.env.JWT_SECRET || 'suaSenhaSecreta';
  private _jwtConfig: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: '1h',
  };

  create(userEmail: string, role: string): string {
    const token = jwt.sign({ data: { email: userEmail, role } }, this._secret, this._jwtConfig);

    return token;
  }

  validate(req: Request, _res: Response, next: NextFunction): void {
    const token = req.header('Authorization');

    if (!token) {
      throw new HttpException(401, 'Token not found');
    }

    const verify = jwt.verify(token, this._secret);

    if (!verify) {
      throw new HttpException(401, 'Expired or invalid token');
    }

    try {
      const decodedToken = jwt.decode(token) as unknown as IToken;
      req.body.role = decodedToken.data.role;

      next();
    } catch (error) {
      next(error);
    }
  }
}
