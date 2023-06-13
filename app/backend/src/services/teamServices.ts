import TeamModelClass from '../models/team.model';
import { ServiceResponse, ServiceResponseError } from '../utils/serviceResponse';
import { Team } from '../Interfaces/team.interface';

export default class TeamService {
  constructor(private teamModel: TeamModelClass = new TeamModelClass()) {}

  public async findAll(): Promise<ServiceResponse<Team[]>> {
    const teams = await this.teamModel.findAll();
    const response = teams.map(({ dataValues }) => ({
      id: dataValues.id,
      teamName: dataValues.teamName,
    }));
    return { status: 'SUCCESSFUL', data: response };
  }

  public async findByPk(id: number): Promise<ServiceResponse<Team | ServiceResponseError>> {
    const team = await this.teamModel.findByPk(id);
    if (!team) {
      return { status: 'NOT_FOUND', data: { message: 'Team not found' } };
    }
    return { status: 'SUCCESSFUL', data: team };
  }
}
