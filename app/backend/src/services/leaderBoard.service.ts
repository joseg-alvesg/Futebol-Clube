import LeaderBoardModel from '../models/leaderBoar.model';

export default class LeaderBoardService {
  constructor(private leaderModel: LeaderBoardModel = new LeaderBoardModel()) {}

  public async getLeaderBoard(): Promise<unknown> {
    const leaderBoard = await this.leaderModel.getLeaderBoard();
    return leaderBoard;
  }
}
