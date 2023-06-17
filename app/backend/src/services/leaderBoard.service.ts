import { LeaderBoardInterface } from '../Interfaces/leaderBoard.interface';
import { ServiceResponse } from '../utils/serviceResponse';
import LeaderBoardModel from '../models/leaderBoar.model';

export default class LeaderBoardService {
  private leaderBoardModel = new LeaderBoardModel();

  public async getLeaderBoard(): Promise<ServiceResponse<LeaderBoardInterface[]>> {
    const leaderBoard = await this.leaderBoardModel.getLeaderBoard();
    return { status: 'SUCCESSFUL', data: leaderBoard };
  }
}
