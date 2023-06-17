export interface leaderBoardInterface {
  name: string
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export interface leaderBoardModelInterface {
  getLeaderBoard(): Promise<leaderBoardInterface[]>;
}
