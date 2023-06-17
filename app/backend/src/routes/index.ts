import { Router } from 'express';
import matchRouter from './matchs.router';
import teamRouter from './team.router';
import userRouter from './user.router';
import leaderBoardRouter from './leaderBoard.router';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderBoardRouter);

export default router;
