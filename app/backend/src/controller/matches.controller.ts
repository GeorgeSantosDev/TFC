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

  static async createMatch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = req.body;
      const response = await MatchesService.create({
        homeTeamId,
        homeTeamGoals,
        awayTeamGoals,
        awayTeamId,
      });

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateProgress(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const [response] = await MatchesService.updateProgress(Number(id));

      if (response === 1) res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }

  static async updateGoals(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;

      const [response] = await MatchesService.updateGoals(Number(id), homeTeamGoals, awayTeamGoals);

      if (response === 1) res.status(200).json({ message: 'Scoreboard was updated!' });
    } catch (error) {
      next(error);
    }
  }
}
