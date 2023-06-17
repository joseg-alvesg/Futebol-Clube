import MatchModel from '../models/match.model';
import { ServiceMessage, ServiceResponse } from '../utils/serviceResponse';
import { MatchBasic, MatchGetAllInterface } from '../Interfaces/matches.interface';
import { SUCCESSFUL } from '../utils/constats';
import TeamModelClass from '../models/team.model';

export default class MatchService {
  constructor(
    private matchModel: MatchModel = new MatchModel(),
    private teamModel: TeamModelClass = new TeamModelClass(),
  ) {}

  public async getAll(
    progress?: string,
  ): Promise<ServiceResponse<MatchGetAllInterface[]>> {
    const matches = progress
      ? await this.matchModel.getAllInProgress(progress)
      : await this.matchModel.getAll();
    return { status: SUCCESSFUL, data: matches };
  }

  public async finishMatch(
    id: number,
  ): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchModel.finishMatch(id);
    return { status: SUCCESSFUL, data: { message: 'Finished' } };
  }

  public async updateGoals(
    id: number,
    goals: MatchGetAllInterface,
  ): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchModel.updateGoals(id, goals);
    return { status: SUCCESSFUL, data: { message: 'Goals updated' } };
  }

  public async createNewMatch(match: MatchGetAllInterface): Promise<ServiceResponse<MatchBasic>> {
    if (match.homeTeamId === match.awayTeamId) {
      return {
        status: 'UNPROCESSABLE_ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }

    const homeTeam = await this.teamModel.findByPk(match.homeTeamId);
    const awayTeam = await this.teamModel.findByPk(match.awayTeamId);

    if (!homeTeam || !awayTeam) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' },
      };
    }

    const newMatch = await this.matchModel.createNewMatch(match);
    return { status: 'CREATED', data: newMatch };
  }
}
