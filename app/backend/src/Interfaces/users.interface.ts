import { Identify } from '../types/identify';

export interface User extends Identify {
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface userModel {
  loginEmail: (email: string) => Promise<User | null>;
}
