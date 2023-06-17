import { LeaderBoardInterface } from '../Interfaces/leaderBoard.interface';
import MatchModelInit from '../database/models/MatchModelInit';
import { homeTeamLeaderBoardQuery, awayTeamLeaderBoardQuery } from '../utils/queryConstants';

export default class LeaderBoardModel {
  private matchModel = MatchModelInit;

  public async getLeaderBoard() {
    const leaderBoard = await this.matchModel.sequelize?.query(homeTeamLeaderBoardQuery, {
      type: 'SELECT',
    });
    return leaderBoard as unknown as LeaderBoardInterface[];
  }

  public async getAwayTeamLeaderBoard() {
    const leaderBoard = await this.matchModel.sequelize?.query(awayTeamLeaderBoardQuery, {
      type: 'SELECT',
    });
    return leaderBoard as unknown as LeaderBoardInterface[];
  }
}
