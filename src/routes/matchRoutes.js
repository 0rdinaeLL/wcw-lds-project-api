import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import { requireAdmin } from '../middlewares/role.js';
import {
  createMatchHandler,
  getAllMatchesHandler,
  getMatchByIdHandler,
  updateMatchHandler,
  deleteMatchHandler
} from '../controllers/matchController.js';

const router = express.Router();

router.post('/', authenticate, requireAdmin, createMatchHandler);
router.get('/', getAllMatchesHandler);
router.get('/:id', getMatchByIdHandler);
router.put('/:id', authenticate, requireAdmin, updateMatchHandler);
router.delete('/:id', authenticate, requireAdmin, deleteMatchHandler);

export default router;
