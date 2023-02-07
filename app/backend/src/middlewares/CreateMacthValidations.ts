import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/HttpException';
import { TeamService } from '../service';
import { IPostBodyMatch } from '../interfaces/IMatches';
import Token from '../auth/JWT';

const token = new Token();
const service = new TeamService();

export default class MatchesValidations {
  constructor(private _token = token) { this._token = _token; }

  public async validateTeams(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      this._token.validate(req, res, next);
      const { homeTeamId, awayTeamId } = req.body as IPostBodyMatch;

      if (homeTeamId === awayTeamId) {
        throw new HttpException(422, 'It is not possible to create a match with two equal teams');
      }

      const allTeams = await service.getAll();

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
