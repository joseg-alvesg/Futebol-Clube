import { Router } from 'express';
import matchRouter from './matchs.router';
import teamRouter from './team.router';
import userRouter from './user.router';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);
router.use('/matches', matchRouter);

export default router;
