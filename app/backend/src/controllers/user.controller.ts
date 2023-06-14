import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  constructor(private userService: UserService = new UserService()) {}

  public login = async (req: Request, res: Response) => {
    const { email } = req.body;
    const response = await this.userService.loginEmail(email);
    return res.status(200).json(response);
  };
}
