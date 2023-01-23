import { ITeam } from '../interfaces';
import Team from '../database/models/team.model';

export default class TeamService {
  static async getAll(): Promise<ITeam[]> {
    const response = await Team.findAll();

    return response;
  }

  static async getById(id: number): Promise<ITeam | null> {
    const response = await Team.findByPk(id);

    return response;
  }
}
