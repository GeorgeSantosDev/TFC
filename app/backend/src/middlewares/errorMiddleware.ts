import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/HttpException';

export default class ErrorMiddleware {
  static err(err: HttpException, _req: Request, res: Response, _next: NextFunction) {
    console.log('err', err);
    const { status, message } = err as HttpException;
    res.status(status || 500).json({ message });
  }
}
