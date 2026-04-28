import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import { requireAdmin } from '../middlewares/role.js';
import {
  createGoalHandler,
  getAllGoalsHandler,
  getGoalByIdHandler,
  getGoalsByPlayerNameHandler,
  updateGoalHandler,
  deleteGoalHandler
} from '../controllers/goalController.js';

const router = express.Router();

router.post('/', authenticate, requireAdmin, createGoalHandler);
router.get('/player/:name', getGoalsByPlayerNameHandler);
router.get('/', getAllGoalsHandler);
router.get('/:id', getGoalByIdHandler);
router.put('/:id', authenticate, requireAdmin, updateGoalHandler);
router.delete('/:id', authenticate, requireAdmin, deleteGoalHandler);

export default router;
