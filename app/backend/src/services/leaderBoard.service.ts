import { LeaderBoardInterface } from '../Interfaces/leaderBoard.interface';
import { ServiceResponse } from '../utils/serviceResponse';
import LeaderBoardModel from '../models/leaderBoard.model';

export default class LeaderBoardService {
  private leaderBoardModel = new LeaderBoardModel();

  public async getHomeTeamLeaderBoard(): Promise<ServiceResponse<LeaderBoardInterface[]>> {
    const leaderBoard = await this.leaderBoardModel.getHomeTeamLeaderBoard();
    return { status: 'SUCCESSFUL', data: leaderBoard };
  }

  public async getAwayTeamLeaderBoard(): Promise<ServiceResponse<LeaderBoardInterface[]>> {
    const leaderBoard = await this.leaderBoardModel.getAwayTeamLeaderBoard();
    return { status: 'SUCCESSFUL', data: leaderBoard };
  }

  public async getLeaderBoard(): Promise<ServiceResponse<LeaderBoardInterface[]>> {
    const leaderBoard = await this.leaderBoardModel.getLeaderBoard();
    return { status: 'SUCCESSFUL', data: leaderBoard };
  }
}
