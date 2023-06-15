import MatchModel from '../models/Matchs.model';
import { ServiceResponse } from '../utils/serviceResponse';
import { MatchGetAllInterface } from '../Interfaces/matches.interface';

export default class MatchService {
  constructor(private matchModel: MatchModel = new MatchModel()) {}

  public async getAll(): Promise<ServiceResponse<MatchGetAllInterface[]>> {
    const matches = await this.matchModel.getAll();
    return { status: 'SUCCESSFUL', data: matches };
  }
}
