import MatchModelInterface from '../Interfaces/matches.interface';
import MatchModelInit from '../database/models/MatchModelInit';
import TeamModel from '../database/models/TeamModel';

export default class MatchModel implements MatchModelInterface {
  private model = MatchModelInit;

  public async getAll() {
    const matches = await this.model.findAll({
      include: [
        {
          model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  public async getAllInProgress(progress: string) {
    const matches = await this.model.findAll({
      where: { inProgress: progress === 'true' },
      include: [
        {
          model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }
}
