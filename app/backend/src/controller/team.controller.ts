import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/HttpException';
import { TeamService } from '../service';

export default class TeamController {
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await TeamService.getAll();

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const response = await TeamService.getById(Number(id));

      if (!response) throw new HttpException(404, 'Team does not exist');

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
