import { NextFunction, Request, Response } from 'express';
import { LeaderBoardService } from '../service';

export default class LeaderBoardController {
  static async homeClassification(req: Request, res: Response, next: NextFunction):
  Promise<void> {
    try {
      const response = await LeaderBoardService.getHomeClassification();

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async awayClassification(req: Request, res: Response, next: NextFunction):
  Promise<void> {
    try {
      const response = await LeaderBoardService.getAwayClassification();

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async generalClassification(req: Request, res: Response, next: NextFunction):
  Promise<void> {
    try {
      const response = await LeaderBoardService.getGeneralClassification();

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
