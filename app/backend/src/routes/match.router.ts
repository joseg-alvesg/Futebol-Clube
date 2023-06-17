import { Router } from 'express';
import tokenValidation from '../middlewares/token.validation';
import MatchController from '../controllers/match.controller';

const matchRouter = Router();

const matchController = new MatchController();

matchRouter.get('/', matchController.getAll);
matchRouter.patch('/:id', tokenValidation, matchController.updateGoals);
matchRouter.patch('/:id/finish', tokenValidation, matchController.finishMatch);
matchRouter.post('/', tokenValidation, matchController.createNewMatch);

export default matchRouter;
