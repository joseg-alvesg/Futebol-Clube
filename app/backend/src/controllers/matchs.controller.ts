import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/match.service';

export default class MatchController {
  constructor(private matchService: MatchService = new MatchService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const matches = await this.matchService.getAll();
    const { status, data } = matches;
    return res.status(mapStatusHTTP(status)).json(data);
  };
}
