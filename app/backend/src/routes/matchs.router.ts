import { Router } from 'express';
import MatchController from '../controllers/matchs.controller';

const matchRouter = Router();

const matchController = new MatchController();

matchRouter.get('/', matchController.getAll);

export default matchRouter;
