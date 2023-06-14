import { Router } from 'express';
import validateLogin from '../middlewares/user.validation';
import UserController from '../controllers/user.controller';
import tokenValidation from '../middlewares/token.validation';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  validateLogin,
  userController.login,
);

router.get(
  '/role',
  tokenValidation,
  userController.getRole,
);

export default router;
