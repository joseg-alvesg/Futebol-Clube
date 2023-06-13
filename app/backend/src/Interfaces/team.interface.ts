import { Identify } from '../types/identify';

export interface Team extends Identify {
  teamName: string;
}

export interface TeamModelInterface {
  findAll: () => Promise<Team[]>;
  findByPk: (id: Team['id']) => Promise<Team | null>;
}
