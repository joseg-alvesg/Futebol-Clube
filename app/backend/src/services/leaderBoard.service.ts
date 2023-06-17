import LeaderBoardModel from '../models/leaderBoar.model';

export default class LeaderBoardService {
  constructor(private leaderBoardModel: LeaderBoardModel = new LeaderBoardModel()) {}

  public async getLeaderBoard() {
    console.log('leaderBoard.service.ts');
    const leaderBoard = await this.leaderBoardModel.getLeaderBoard();
    console.log(leaderBoard);
    return leaderBoard;
  }
}
