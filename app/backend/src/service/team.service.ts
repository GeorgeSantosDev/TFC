import { ITeam } from '../interfaces';
import Team from '../database/models/team.model';

export default class TeamService {
  constructor(private _model = Team) { this._model = _model; }
  public async getAll(): Promise<ITeam[]> {
    const response = await this._model.findAll();

    return response;
  }

  public async getById(id: number): Promise<ITeam | null> {
    const response = await this._model.findByPk(id);

    return response;
  }
}
