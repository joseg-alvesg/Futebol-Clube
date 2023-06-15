import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/match.service';

export default class MatchController {
  constructor(private matchService: MatchService = new MatchService()) {}

  public getAll = async (req: Request, res: Response) => {
    const progress = req.query.inProgress;
    const matches = await this.matchService.getAll(progress as string);
    const { status, data } = matches;
    return res.status(mapStatusHTTP(status)).json(data);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const match = await this.matchService.finishMatch(Number(id));
    const { status, data } = match;
    return res.status(mapStatusHTTP(status)).json(data);
  };

  public updateGoals = async (req: Request, res: Response) => {
    const { id } = req.params;
    const match = await this.matchService.updateGoals(Number(id), req.body);
    const { status, data } = match;
    return res.status(mapStatusHTTP(status)).json(data);
  };

  public createNewMatch = async (req: Request, res: Response) => {
    const match = await this.matchService.createNewMatch(req.body);
    const { status, data } = match;
    return res.status(mapStatusHTTP(status)).json(data);
  };
}
