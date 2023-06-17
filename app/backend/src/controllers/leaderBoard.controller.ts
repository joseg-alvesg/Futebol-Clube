import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoard.service';

export default class LeaderBoardController {
  constructor(private leaderBoardService: LeaderBoardService = new LeaderBoardService()) {}

  public async getLeaderBoard(_req: Request, res: Response): Promise<Response> {
    const { data } = await this.leaderBoardService.getLeaderBoard();
    return res.status(200).json(data);
  }
}
