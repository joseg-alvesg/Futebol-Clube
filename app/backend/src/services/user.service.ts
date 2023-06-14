import * as bcrypt from 'bcryptjs';
import { LoginInputs, TokenModel } from '../types/login';
import UserModel from '../models/user.model';
import { ServiceResponse } from '../utils/serviceResponse';

import Token from '../utils/token';
import { UNAUTHORIZED, INVALID_EMAIL_OR_PASSWORD, SUCCESSFUL } from '../utils/constats';

export default class UserService {
  constructor(private userModel: UserModel = new UserModel()) {}

  public async loginEmail({
    email,
    password,
  }: LoginInputs): Promise<ServiceResponse<TokenModel>> {
    const user = await this.userModel.loginEmail(email);
    if (!user) {
      return {
        status: UNAUTHORIZED, data: { message: INVALID_EMAIL_OR_PASSWORD },
      };
    }
    const isPasswordMatching = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatching) {
      return {
        status: UNAUTHORIZED, data: { message: INVALID_EMAIL_OR_PASSWORD },
      };
    }
    const token = Token.sign({ email });
    return { status: SUCCESSFUL, data: { token } };
  }

  public async getRole(email: string): Promise<ServiceResponse<string>> {
    const role = await this.userModel.getRole(email);
    if (!role) {
      return {
        status: UNAUTHORIZED, data: { message: INVALID_EMAIL_OR_PASSWORD },
      };
    }
    return { status: SUCCESSFUL, data: role };
  }
}
