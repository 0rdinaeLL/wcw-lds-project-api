import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import { requireAdmin } from '../middlewares/role.js';
import {
  createPlayerHandler,
  getAllPlayersHandler,
  getPlayerByNameHandler,
  getPlayerByIdHandler,
  searchPlayersByNameHandler,
  getPlayersByTeamHandler,
  updatePlayerHandler,
  deletePlayerHandler
} from '../controllers/playerController.js';

const router = express.Router();

router.post('/', authenticate, requireAdmin, createPlayerHandler);
router.get('/', getAllPlayersHandler);
router.get('/name/:name', getPlayerByNameHandler);
router.get('/search/:name', searchPlayersByNameHandler);
router.get('/team-name/:teamName', getPlayersByTeamHandler);
router.get('/:id', getPlayerByIdHandler);
router.put('/:id', authenticate, requireAdmin, updatePlayerHandler);
router.delete('/:id', authenticate, requireAdmin, deletePlayerHandler);

export default router;
