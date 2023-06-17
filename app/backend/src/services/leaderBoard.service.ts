import { LeaderBoardInterface } from '../Interfaces/leaderBoard.interface';
import { ServiceResponse } from '../utils/serviceResponse';
import LeaderBoardModel from '../models/leaderBoar.model';

export default class LeaderBoardService {
  private leaderBoardModel = new LeaderBoardModel();

  public async getLeaderBoard(): Promise<ServiceResponse<LeaderBoardInterface[]>> {
    try {
      console.log('leaderBoard.service.ts');
      const leaderBoard = await this.leaderBoardModel.getLeaderBoard();

      console.log(leaderBoard);
      return { status: 'SUCCESSFUL', data: leaderBoard };
    } catch (error) {
      console.error('erro');
      return { status: 'UNPROCESSABLE_ENTITY', data: { message: 'message' } };
    }
  }
}
