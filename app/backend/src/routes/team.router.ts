import { Router } from 'express';
import TeamController from '../controllers/team.contoller';

const teamController = new TeamController();

const router = Router();

router.get('/', teamController.findAll.bind(teamController));
router.get('/:id', teamController.findByPk.bind(teamController));

export default router;
