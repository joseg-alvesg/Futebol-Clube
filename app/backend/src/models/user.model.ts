import UserModelInit from '../database/models/UserModelInit';
import { userModel } from '../Interfaces/users.interface';

export default class UserModel implements userModel {
  private model = UserModelInit;

  public async loginEmail(email: string): Promise<UserModelInit | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    return user;
  }
}
