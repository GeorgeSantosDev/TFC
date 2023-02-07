import { NextFunction, Request, Response } from 'express';
import { MatchesService } from '../service';

const service = new MatchesService();

export default class MacthesController {
  constructor(private _service = service) { this._service = _service; }

  public async getAllMatches(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    try {
      const { inProgress } = req.query;
      const status = inProgress === 'true';
      const progress = ['true', 'false'];

      if (!inProgress || !progress.includes(inProgress as string)) {
        const response = await this._service.getAll();
        return res.status(200).json(response);
      }

      const response = await this._service.getByProgress(status);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async createMatch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = req.body;
      const response = await this._service.create({
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

  public async updateProgress(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const [response] = await this._service.updateProgress(Number(id));

      if (response === 1) res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }

  public async updateGoals(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;

      const [response] = await this._service.updateGoals(Number(id), homeTeamGoals, awayTeamGoals);

      if (response === 1) res.status(200).json({ message: 'Scoreboard was updated!' });
    } catch (error) {
      next(error);
    }
  }
}
