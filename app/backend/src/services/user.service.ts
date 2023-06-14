import { User } from '../Interfaces/users.interface';
import UserModel from '../models/user.model';
import { ServiceResponse } from '../utils/serviceResponse';

export default class UserService {
  constructor(private userModel: UserModel = new UserModel()) {}

  public async loginEmail(email: string): Promise<ServiceResponse<User>> {
    const user = await this.userModel.loginEmail(email);
    if (!user) return { status: 'NOT_FOUND', data: { message: 'User not found' } };
    return { status: 'SUCCESSFUL', data: user };
  }
}
