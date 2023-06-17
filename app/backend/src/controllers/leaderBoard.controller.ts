import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoard.service';

export default class LeaderBoardController {
  constructor(private leaderBoardService: LeaderBoardService = new LeaderBoardService()) {}

  public async getLeaderBoard(req: Request, res: Response): Promise<Response> {
    console.log('leaderBoard.controller.ts');
    const leaderBoard = await this.leaderBoardService.getLeaderBoard();
    console.log(leaderBoard);
    return res.status(200).json(leaderBoard);
  }
}
