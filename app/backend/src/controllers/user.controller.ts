import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../services/user.service';

export default class UserController {
  constructor(private userService: UserService = new UserService()) {}

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const response = await this.userService.loginEmail({ email, password });
    return res.status(mapStatusHTTP(response.status)).json(response.data);
  };

  public getRole = async (req: Request, res: Response) => {
    const { email } = req.body.user;
    const response = await this.userService.getRole(email);
    if (response.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }
    return res.status(mapStatusHTTP(response.status)).json({ role: response.data });
  };
}
