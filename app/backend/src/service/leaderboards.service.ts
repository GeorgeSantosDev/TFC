import { ITeam, IMatches, ILeaderBoard } from '../interfaces';
import Team from '../database/models/team.model';
import Matches from '../database/models/matches.model';
import LeaderBoardCalc from '../utils/LeaderBoardFunctions';
import compareFn from '../utils/CompareFunction';

export default class LeaderBoardService {
  constructor(
    private _teamModel = Team,
    private _matchesModel = Matches,
    private _calc = LeaderBoardCalc,
  ) {
    this._teamModel = _teamModel;
    this._matchesModel = _matchesModel;
    this._calc = _calc;
  }

  private async getFinishedMatches(): Promise<IMatches[]> {
    const response = await this._matchesModel.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: {
        inProgress: false,
      } });

    return response as unknown as IMatches[];
  }

  private async getAllTeams(): Promise<ITeam[]> {
    const response = await this._teamModel.findAll();

    return response;
  }

  private async generateData(arr1: ITeam[], arr2: IMatches[], type: ('home' | 'away') | null)
    : Promise<ILeaderBoard[]> {
    const promise = arr1.map(async ({ id, teamName }) => {
      const calculator = new this._calc(id, type, arr2);
      return {
        name: teamName,
        totalPoints: await calculator.totalPoints(),
        totalGames: await calculator.totalGames(),
        totalVictories: await calculator.totalVictores(),
        totalDraws: await calculator.totalDraws(),
        totalLosses: await calculator.totalLosses(),
        goalsFavor: calculator.totalGoalsFavor(),
        goalsOwn: calculator.totalGoalsOwn(),
        goalsBalance: calculator.balance(),
        efficiency: await calculator.efficiency(),
      };
    });
    return (await Promise.all(promise)).sort(compareFn);
  }

  public async getHomeClassification() {
    const allTeams = await this.getAllTeams();
    const allMatches = await this.getFinishedMatches();
    const allTeamsData = await this.generateData(allTeams, allMatches, 'home');

    return allTeamsData;
  }

  public async getAwayClassification() {
    const allTeams = await this.getAllTeams();
    const allMatches = await this.getFinishedMatches();
    const allTeamsData = await this.generateData(allTeams, allMatches, 'away');

    return allTeamsData;
  }

  public async getGeneralClassification() {
    const allTeams = await this.getAllTeams();
    const allMatches = await this.getFinishedMatches();
    const allTeamsData = await this.generateData(allTeams, allMatches, null);

    return allTeamsData;
  }
}
