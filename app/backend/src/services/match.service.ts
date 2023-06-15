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
}
