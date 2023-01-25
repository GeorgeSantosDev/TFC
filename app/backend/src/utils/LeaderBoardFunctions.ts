import { IMatches } from '../interfaces';

export default class LeaderBoardCalc {
  private _teamId: number;
  private _typeOfGame: ('home' | 'away') | null;
  private _allMatches: IMatches[];

  constructor(teamId: number, typeOfGame: ('home' | 'away') | null, matches: IMatches[]) {
    this._teamId = teamId;
    this._typeOfGame = typeOfGame;
    this._allMatches = matches;
  }

  private validateTypeOfGame(match: IMatches): boolean {
    return this._typeOfGame === 'home' ? match.homeTeamId === this._teamId
      : match.awayTeamId === this._teamId;
  }

  public async totalGames(): Promise<number> {
    if (!this._typeOfGame) {
      return this._allMatches.reduce((acc, match) => {
        if (match.homeTeamId === this._teamId || match.awayTeamId === this._teamId) {
          return acc + 1;
        }
        return acc;
      }, 0);
    }

    return this._allMatches.reduce((acc, match) => {
      if (this.validateTypeOfGame(match as unknown as IMatches)) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  private validateVictory(match: IMatches): boolean {
    return (match.homeTeamId === this._teamId && match.homeTeamGoals > match.awayTeamGoals)
      || (match.awayTeamId === this._teamId && match.awayTeamGoals > match.homeTeamGoals);
  }

  private validateVictoryByTypeOfGame(match: IMatches): boolean {
    return this._typeOfGame === 'home'
      ? (match.homeTeamId === this._teamId && match.homeTeamGoals > match.awayTeamGoals)
      : (match.awayTeamId === this._teamId && match.awayTeamGoals > match.homeTeamGoals);
  }

  public async totalVictores(): Promise<number> {
    if (!this._typeOfGame) {
      return this._allMatches.reduce((acc, match) => {
        if (this.validateVictory(match as unknown as IMatches)) {
          return acc + 1;
        }
        return acc;
      }, 0);
    }

    return this._allMatches.reduce((acc, match) => {
      if (this.validateVictoryByTypeOfGame(match as unknown as IMatches)) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  private validateLosses(match: IMatches): boolean {
    return (match.homeTeamId === this._teamId && match.homeTeamGoals < match.awayTeamGoals)
      || (match.awayTeamId === this._teamId && match.awayTeamGoals < match.homeTeamGoals);
  }

  private validateLossesByTypeOfGame(match: IMatches): boolean {
    return this._typeOfGame === 'home'
      ? (match.homeTeamId === this._teamId && match.homeTeamGoals < match.awayTeamGoals)
      : (match.awayTeamId === this._teamId && match.awayTeamGoals < match.homeTeamGoals);
  }

  public async totalLosses(): Promise<number> {
    if (!this._typeOfGame) {
      return this._allMatches.reduce((acc, match) => {
        if (this.validateLosses(match as unknown as IMatches)) {
          return acc + 1;
        }
        return acc;
      }, 0);
    }

    return this._allMatches.reduce((acc, match) => {
      if (this.validateLossesByTypeOfGame(match as unknown as IMatches)) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  private validateDraw(match: IMatches): boolean {
    return (match.homeTeamId === this._teamId && match.homeTeamGoals === match.awayTeamGoals)
      || (match.awayTeamId === this._teamId && match.awayTeamGoals === match.homeTeamGoals);
  }

  private validateDrawByTypeOfGame(match: IMatches): boolean {
    return this._typeOfGame === 'home'
      ? (match.homeTeamId === this._teamId && match.homeTeamGoals === match.awayTeamGoals)
      : (match.awayTeamId === this._teamId && match.awayTeamGoals === match.homeTeamGoals);
  }

  public async totalDraws(): Promise<number> {
    if (!this._typeOfGame) {
      return this._allMatches.reduce((acc, match) => {
        if (this.validateDraw(match as unknown as IMatches)) {
          return acc + 1;
        }
        return acc;
      }, 0);
    }

    return this._allMatches.reduce((acc, match) => {
      if (this.validateDrawByTypeOfGame(match as unknown as IMatches)) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  public async totalPoints(): Promise<number> {
    const victories = await this.totalVictores();
    const draws = await this.totalDraws();

    return (victories * 3) + draws;
  }

  private validateGoals(match: IMatches): number {
    return match.awayTeamId === this._teamId ? match.awayTeamGoals : match.homeTeamGoals;
  }

  private validateGoalsByTypeOfGame(match: IMatches): number {
    return this._typeOfGame === 'home' ? match.homeTeamGoals : match.awayTeamGoals;
  }

  public totalGoalsFavor(): number {
    if (!this._typeOfGame) {
      return this._allMatches.reduce((acc, match) => {
        if (match.awayTeamId === this._teamId || match.homeTeamId === this._teamId) {
          const goals = this.validateGoals(match);
          return acc + goals;
        }
        return acc;
      }, 0);
    }

    return this._allMatches.reduce((acc, match) => {
      if (this.validateTypeOfGame(match)) {
        const goals = this.validateGoalsByTypeOfGame(match);
        return acc + goals;
      }
      return acc;
    }, 0);
  }

  private validateGoalsOwn(match: IMatches): number {
    return match.awayTeamId === this._teamId ? match.homeTeamGoals : match.awayTeamGoals;
  }

  private validateGoalsOwnByTypeOfGame(match: IMatches): number {
    return this._typeOfGame === 'home' ? match.awayTeamGoals : match.homeTeamGoals;
  }

  public totalGoalsOwn(): number {
    if (!this._typeOfGame) {
      return this._allMatches.reduce((acc, match) => {
        if (match.awayTeamId === this._teamId || match.homeTeamId === this._teamId) {
          const goals = this.validateGoalsOwn(match);
          return acc + goals;
        }
        return acc;
      }, 0);
    }

    return this._allMatches.reduce((acc, match) => {
      if (this.validateTypeOfGame(match)) {
        const goals = this.validateGoalsOwnByTypeOfGame(match);
        return acc + goals;
      }
      return acc;
    }, 0);
  }

  public balance(): number {
    const goalsFavor = this.totalGoalsFavor();
    const goalsOwn = this.totalGoalsOwn();

    return goalsFavor - goalsOwn;
  }

  public async efficiency(): Promise<number> {
    const points = await this.totalPoints();
    const games = await this.totalGames();

    const effc = ((points / (games * 3))) * 100;

    return Number(effc.toFixed(2));
  }
}
