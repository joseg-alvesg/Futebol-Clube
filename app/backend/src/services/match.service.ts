import MatchModel from '../models/Matchs.model';
import { ServiceMessage, ServiceResponse } from '../utils/serviceResponse';
import { MatchBasic, MatchGetAllInterface } from '../Interfaces/matches.interface';

export default class MatchService {
  constructor(private matchModel: MatchModel = new MatchModel()) {}

  public async getAll(
    progress?: string,
  ): Promise<ServiceResponse<MatchGetAllInterface[]>> {
    const matches = progress
      ? await this.matchModel.getAllInProgress(progress)
      : await this.matchModel.getAll();
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async finishMatch(
    id: number,
  ): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchModel.finishMatch(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateGoals(
    id: number,
    goals: MatchGetAllInterface,
  ): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchModel.updateGoals(id, goals);
    return { status: 'SUCCESSFUL', data: { message: 'Goals updated' } };
  }

  public async createNewMatch(match: MatchGetAllInterface): Promise<ServiceResponse<MatchBasic>> {
    const newMatch = await this.matchModel.createNewMatch(match);
    return { status: 'CREATED', data: newMatch };
  }
}
