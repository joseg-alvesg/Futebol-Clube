import { Request, Response } from 'express';
import TeamService from '../services/teamServices';

export default class TeamController {
  constructor(private teamService: TeamService = new TeamService()) {}

  public async findAll(_req: Request, res: Response): Promise<Response> {
    const teams = await this.teamService.findAll();
    return res.status(200).json(teams.data);
  }

  public async findByPk(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const team = await this.teamService.findByPk(Number(id));
    return res.status(200).json(team.data);
  }
}
