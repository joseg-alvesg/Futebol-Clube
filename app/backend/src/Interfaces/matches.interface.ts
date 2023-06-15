import { Identify } from '../types/identify';

export interface MatchBasic extends Identify {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface MatchGetAllInterface extends MatchBasic {
  homeTeam?: {
    teamName: string;
  },
  awayTeam?: {
    teamName: string;
  }
}

export default interface MatchModelInterface {
  getAll(): Promise<MatchGetAllInterface[]>;
}
