import { leaderBoardInterface } from '../Interfaces/leaderBoard.interface';
import TeamModel from '../database/models/TeamModel';
import MatchModelInit from '../database/models/MatchModelInit';

const query = `
    SELECT t.team_name AS name, SUM(CASE WHEN m.home_team_goals > m.away_team_goals 
THEN 3 WHEN m.home_team_goals = m.away_team_goals THEN 1 ELSE 0 END) AS totalPoints,
    COUNT(*) AS totalGames,
    SUM(CASE WHEN m.home_team_goals > m.away_team_goals THEN 1 ELSE 0 END) AS totalVictories,
    SUM(CASE WHEN m.home_team_goals = m.away_team_goals THEN 1 ELSE 0 END) AS totalDraws,
    SUM(CASE WHEN m.home_team_goals < m.away_team_goals THEN 1 ELSE 0 END) AS totalLosses,
    SUM(m.home_team_goals) AS goalsFavor, SUM(m.home_team_goals) AS goalsOwn,
    SUM(m.home_team_goals) - SUM(m.away_team_goals) AS goalsBalance,
    ROUND((SUM(CASE WHEN m.home_team_goals > m.away_team_goals THEN 3 
    WHEN m.home_team_goals = m.away_team_goals THEN 1 
    ELSE 0 END) / (COUNT(*) * 3)) * 100, 2) AS efficiency
    FROM TRYBE_FUTEBOL_CLUBE.matches AS m
    INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS t ON m.home_team_id = t.id
    WHERE in_progress = 0 GROUP BY team_name ORDER BY totalPoints DESC,
    totalVictories DESC, goalsBalance DESC, goalsFavor DESC;
  `;

// export interface leaderBoardInterface {
//   name: string
//   totalPoints: number; winner + 3 points, draw + 1 point, loser + 0 points
//   totalGames: number; total ids
//   totalVictories: number;  totalPoints / 3
//   totalDraws: number;  totalPoints - (totalVictories * 3)
//   totalLosses: number; totalGames - (totalVictories + totalDraws)
//   goalsFavor: number;  totalGoalsHome + totalGoalsAway
//   goalsOwn: number;  totalGoalsHome + totalGoalsAway
//   goalsBalance: number;  goalsFavor - goalsOwn
//   efficiency: number;  (totalPoints / (totalGames * 3)) * 100
// }
//

export default class LeaderBoardModel {
  private matchModel = MatchModelInit;
  private teamModel = TeamModel;

  public async getLeaderBoard(): Promise<leaderBoardInterface[]> {
    const results = await this.matchModel.sequelize?.query(query);
    return results as leaderBoardInterface[];
  }
}