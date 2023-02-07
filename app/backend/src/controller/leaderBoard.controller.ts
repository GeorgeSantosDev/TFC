import { NextFunction, Request, Response } from 'express';
import { LeaderBoardService } from '../service';

const service = new LeaderBoardService();

export default class LeaderBoardController {
  constructor(private _service = service) { this._service = _service; }

  public async homeClassification(_req: Request, res: Response, next: NextFunction):
  Promise<void> {
    try {
      const response = await this._service.getHomeClassification();

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async awayClassification(_req: Request, res: Response, next: NextFunction):
  Promise<void> {
    try {
      const response = await this._service.getAwayClassification();

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async generalClassification(_req: Request, res: Response, next: NextFunction):
  Promise<void> {
    try {
      const response = await this._service.getGeneralClassification();

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
