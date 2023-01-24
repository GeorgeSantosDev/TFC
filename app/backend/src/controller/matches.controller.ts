import { NextFunction, Request, Response } from 'express';
import { MatchesService } from '../service';

export default class MacthesController {
  static async getAllMatches(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    try {
      const { inProgress } = req.query;
      const status = inProgress === 'true';
      const progress = ['true', 'false'];

      if (!inProgress || !progress.includes(inProgress as string)) {
        const response = await MatchesService.getAll();
        return res.status(200).json(response);
      }

      const response = await MatchesService.getByProgress(status);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
