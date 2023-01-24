import Matches from '../database/models/matches.model';
import Team from '../database/models/team.model';

export default class MatchesService {
  static async getAll(): Promise<Matches[]> {
    const response = await Matches.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return response;
  }

  static async getByProgress(bool: boolean): Promise<Matches[]> {
    const response = await Matches.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: {
        inProgress: bool,
      } });

    return response;
  }
}
