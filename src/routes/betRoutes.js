import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import { requireAdmin } from '../middlewares/role.js';
import {
  createBetHandler,
  getAllBetsHandler,
  getBetByIdHandler,
  deleteBetHandler
} from '../controllers/betController.js';

const router = express.Router();

// Users place bets
router.post('/', authenticate, createBetHandler);

// Admin sees all bets
router.get('/', authenticate, requireAdmin, getAllBetsHandler);

// Users can see their own bet
router.get('/:id', authenticate, getBetByIdHandler);

// Users can delete their own bet
router.delete('/:id', authenticate, deleteBetHandler);

export default router;
