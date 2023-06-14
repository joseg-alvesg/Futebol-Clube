import { Identify } from '../types/identify';

export interface User extends Identify {
  userName: string;
  role: string;
  email: string;
  password: string;
}
