import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/HttpException';
import { TeamService } from '../service';

const service = new TeamService();

export default class TeamController {
  constructor(private _service = service) { this._service = _service; }

  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this._service.getAll();

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const response = await this._service.getById(Number(id));

      if (!response) throw new HttpException(404, 'Team does not exist');

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
