import { Router } from 'express';
import tokenValidation from '../middlewares/token.validation';
import MatchController from '../controllers/matchs.controller';

const matchRouter = Router();

const matchController = new MatchController();

matchRouter.get('/', matchController.getAll);
matchRouter.patch('/:id/finish', tokenValidation, matchController.finishMatch);
matchRouter.patch('/:id', tokenValidation, matchController.updateGoals);

export default matchRouter;
