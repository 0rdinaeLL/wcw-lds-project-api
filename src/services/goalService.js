import {
  getAll,
  findGoalsByPlayerName,
  findById,
  create,
  update,
  remove
} from '../repositories/goalRepo.js';

import prisma from '../config/db.js';

export async function getAllGoals() {
  return getAll();
}

export async function getGoalById(id) {
  const goal = await findById(id);
  if (goal) return goal;

  const error = new Error(`Goal ${id} not found`);
  error.status = 404;
  throw error;
}

export async function getGoalsByPlayerName(name) {
  const goals = await findGoalsByPlayerName(name);

  if (!goals) {
    const error = new Error(`Player '${name}' not found`);
    error.status = 404;
    throw error;
  }

  if (goals.length === 0) {
    const error = new Error(`Player '${name}' has no goals`);
    error.status = 404;
    throw error;
  }

  return goals;
}

export async function createGoal(data) {
  // Validate match
  const match = await prisma.match.findUnique({
    where: { id: data.matchId }
  });

  if (!match) {
    const error = new Error(`Match ${data.matchId} not found`);
    error.status = 400;
    throw error;
  }

  // Validate player
  const player = await prisma.player.findUnique({
    where: { id: data.playerId }
  });

  if (!player) {
    const error = new Error(`Player ${data.playerId} not found`);
    error.status = 400;
    throw error;
  }

  return create(data);
}

export async function updateGoal(id, data) {
  const existing = await findById(id);
  if (!existing) {
    const error = new Error(`Goal ${id} not found`);
    error.status = 404;
    throw error;
  }

  // Validate match
  const match = await prisma.match.findUnique({
    where: { id: data.matchId }
  });

  if (!match) {
    const error = new Error(`Match ${data.matchId} not found`);
    error.status = 400;
    throw error;
  }

  // Validate player
  const player = await prisma.player.findUnique({
    where: { id: data.playerId }
  });

  if (!player) {
    const error = new Error(`Player ${data.playerId} not found`);
    error.status = 400;
    throw error;
  }

  return update(id, data);
}

export async function deleteGoal(id) {
  const existing = await findById(id);
  if (!existing) {
    const error = new Error(`Goal ${id} not found`);
    error.status = 404;
    throw error;
  }

  return remove(id);
}
