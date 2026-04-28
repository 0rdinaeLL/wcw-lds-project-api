import {
  getAll,
  findById,
  create,
  remove
} from '../repositories/betRepo.js';

import prisma from '../config/db.js';

export async function getAllBets() {
  return getAll();
}

export async function getBetById(id) {
  const bet = await findById(id);
  if (bet) return bet;

  const error = new Error(`Bet ${id} not found`);
  error.status = 404;
  throw error;
}

export async function createBet(data, currentUser) {
  const userId = currentUser.id;
  const { matchId, predictedWinner, amount } = data;

  // Validate user
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    const error = new Error(`User ${userId} not found`);
    error.status = 400;
    throw error;
  }

  // Validate match
  const match = await prisma.match.findUnique({ where: { id: matchId } });
  if (!match) {
    const error = new Error(`Match ${matchId} not found`);
    error.status = 400;
    throw error;
  }

  // Validate predictedWinner
  if (![0, 1, 2].includes(predictedWinner)) {
    const error = new Error("predictedWinner must be 0, 1, or 2");
    error.status = 400;
    throw error;
  }

  return create({
    userId,
    matchId,
    predictedWinner,
    amount,
    status: "PENDING"
  });
}

export async function deleteBet(id) {
  const existing = await findById(id);
  if (!existing) {
    const error = new Error(`Bet ${id} not found`);
    error.status = 404;
    throw error;
  }

  return remove(id);
}

