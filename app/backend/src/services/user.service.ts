import * as bcrypt from 'bcryptjs';
import { LoginInputs } from '../types/login';
import UserModel from '../models/user.model';
import { ServiceResponse } from '../utils/serviceResponse';
import Token from '../utils/token';

type tokenModel = { token: string };

export default class UserService {
  constructor(private userModel: UserModel = new UserModel()) {}

  public async loginEmail({
    email,
    password,
  }: LoginInputs): Promise<ServiceResponse<tokenModel>> {
    const user = await this.userModel.loginEmail(email);
    if (!user) {
      return {
        status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' },
      };
    }
    const isPasswordMatching = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatching) {
      return {
        status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' },
      };
    }
    const token = Token.sign({ email });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
