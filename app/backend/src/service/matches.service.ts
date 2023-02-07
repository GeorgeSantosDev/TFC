import { IPostBodyMatch } from '../interfaces/IMatches';
import Matches from '../database/models/matches.model';
import Team from '../database/models/team.model';

export default class MatchesService {
  constructor(private _model = Matches) { this._model = _model; }

  public async getAll(): Promise<Matches[]> {
    const response = await this._model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return response;
  }

  public async getByProgress(bool: boolean): Promise<Matches[]> {
    const response = await this._model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: {
        inProgress: bool,
      } });

    return response;
  }

  public async create(matchData: IPostBodyMatch): Promise<Matches> {
    const response = await this._model.create({ ...matchData, inProgress: true });

    return response;
  }

  public async updateProgress(id: number): Promise<[affectedRows: number]> {
    const response = await this._model.update({ inProgress: false }, {
      where: { id },
    });

    return response;
  }

  public async updateGoals(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<[affectedRows: number]> {
    const response = await this._model.update({ homeTeamGoals, awayTeamGoals }, {
      where: { id },
    });

    return response;
  }
}
