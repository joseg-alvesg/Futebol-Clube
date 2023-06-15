import MatchModel from '../models/Matchs.model';
import { ServiceResponse } from '../utils/serviceResponse';
import { MatchGetAllInterface } from '../Interfaces/matches.interface';

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

  public async finishMatch(id: number) {
    await this.matchModel.finishMatch(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateGoals(id: number, goals: MatchGetAllInterface) {
    await this.matchModel.updateGoals(id, goals);
    return { status: 'SUCCESSFUL', data: { message: 'Goals updated' } };
  }
}
