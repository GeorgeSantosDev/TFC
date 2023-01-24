type Team = {
  teamName: string;
};

export interface IPostBodyMatch {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
}

export default interface IMatches extends IPostBodyMatch {
  id: number;
  inProgress: boolean;
  homeTeam: Team;
  awayTeam: Team;
}
