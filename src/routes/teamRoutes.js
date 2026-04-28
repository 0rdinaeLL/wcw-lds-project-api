import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import { requireAdmin } from '../middlewares/role.js';
import { 
  getAllTeamsHandler,
  getTeamByIdHandler,
  createTeamHandler,
  updateTeamHandler,
  deleteTeamHandler,
  deleteTeamByNameHandler
} from '../controllers/teamController.js';

const router = express.Router();

router.post('/', authenticate, requireAdmin, createTeamHandler);
router.get('/', getAllTeamsHandler);
router.get('/:id', getTeamByIdHandler);
router.put('/:id', authenticate, requireAdmin, updateTeamHandler);
router.delete('/name/:name', authenticate, requireAdmin, deleteTeamByNameHandler);
router.delete('/:id', authenticate, requireAdmin, deleteTeamHandler);


export default router;
