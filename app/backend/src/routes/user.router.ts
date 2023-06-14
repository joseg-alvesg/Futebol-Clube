import { Router } from 'express';
import validateLogin from '../middlewares/user.validation';
import UserController from '../controllers/user.controller';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  validateLogin,
  userController.login,
);

export default router;
