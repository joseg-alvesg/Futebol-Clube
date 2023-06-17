export interface LeaderBoardInterface {
  name?: string
  totalPoints?: number;
  totalGames?: number;
  totalVictories?: number;
  totalDraws?: number;
  totalLosses?: number;
  goalsFavor?: number;
  goalsOwn?: number;
  goalsBalance?: number;
  efficiency?: number;
}

export interface LeaderBoardModelInterface {
  getHomeTeamLeaderBoard(): Promise<LeaderBoardInterface[]>;
  getAwayTeamLeaderBoard(): Promise<LeaderBoardInterface[]>;
}
