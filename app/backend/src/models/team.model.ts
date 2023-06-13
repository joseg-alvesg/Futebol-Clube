import { TeamModelInterface } from '../Interfaces/team.interface';
import TeamModel from '../database/models/TeamModel';

export default class TeamModelClass implements TeamModelInterface {
  private model = TeamModel;

  public async findAll(): Promise<TeamModel[]> {
    return this.model.findAll();
  }

  public async findByPk(id: number): Promise<TeamModel | null> {
    return this.model.findByPk(id);
  }
}
