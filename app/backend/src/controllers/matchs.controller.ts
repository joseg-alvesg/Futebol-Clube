import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/match.service';

export default class MatchController {
  constructor(private matchService: MatchService = new MatchService()) {}

  public getAll = async (req: Request, res: Response) => {
    const progress = req.query.inProgress;
    const matches = await this.matchService.getAll(progress);
    const { status, data } = matches;
    return res.status(mapStatusHTTP(status)).json(data);
  };
}
