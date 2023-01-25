import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/HttpException';
import { TeamService } from '../service';
import { IPostBodyMatch } from '../interfaces/IMatches';

export default class MatchesValidations {
  static async validateTeams(req: Request, _res: Response, next: NextFunction): Promise<void> {
    try {
      const { homeTeamId, awayTeamId } = req.body as IPostBodyMatch;

      if (homeTeamId === awayTeamId) {
        throw new HttpException(422, 'It is not possible to create a match with two equal teams');
      }

      const allTeams = await TeamService.getAll();

      const bothTeamsExist = allTeams
        .filter((team) => team.id === homeTeamId || team.id === awayTeamId);

      if (bothTeamsExist.length !== 2) {
        throw new HttpException(404, 'There is no team with such id!');
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}
