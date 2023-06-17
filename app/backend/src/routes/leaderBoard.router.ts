import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderBoard.controller';

const router = Router();
const leaderBoard = new LeaderBoardController();

router.get('/home', leaderBoard.getLeaderBoard.bind(leaderBoard));

export default router;
