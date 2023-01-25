import { ITeam, IMatches, ILeaderBoard } from '../interfaces';
import Team from '../database/models/team.model';
import Matches from '../database/models/matches.model';
import LeaderBoardCalc from '../utils/LeaderBoardFunctions';
import compareFn from '../utils/CompareFunction';

export default class LeaderBoardService {
  static async getFinishedMatches(): Promise<IMatches[]> {
    const response = await Matches.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: {
        inProgress: false,
      } });

    return response as unknown as IMatches[];
  }

  static async getAllTeams(): Promise<ITeam[]> {
    const response = await Team.findAll();

    return response;
  }

  private static async generateData(arr1: ITeam[], arr2: IMatches[], type: ('home' | 'away') | null)
    : Promise<ILeaderBoard[]> {
    const promise = arr1.map(async ({ id, teamName }) => {
      const calculator = new LeaderBoardCalc(id, type, arr2);
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

  static async getHomeClassification() {
    const allTeams = await this.getAllTeams();
    const allMatches = await this.getFinishedMatches();
    const allTeamsData = await this.generateData(allTeams, allMatches, 'home');

    return allTeamsData;
  }

  static async getAwayClassification() {
    const allTeams = await this.getAllTeams();
    const allMatches = await this.getFinishedMatches();
    const allTeamsData = await this.generateData(allTeams, allMatches, 'away');

    return allTeamsData;
  }

  static async getGeneralClassification() {
    const allTeams = await this.getAllTeams();
    const allMatches = await this.getFinishedMatches();
    const allTeamsData = await this.generateData(allTeams, allMatches, null);

    return allTeamsData;
  }
}
