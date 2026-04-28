import {
  getAll,
  findById,
  create,
  update,
  remove
} from '../repositories/matchRepo.js';


import { processMatchResult } from '../modules/matchResult.js';
import prisma from '../config/db.js';

async function resolveTeamByName(name) {
  return await prisma.team.findFirst({
    where: {
      name: {
        equals: name,
        mode: 'insensitive'
      }
    }
  });
}

export async function getAllMatches() {
  return getAll();
}

export async function getMatchById(id) {
  const match = await findById(id);
  if (match) return match;

  const error = new Error(`Match ${id} not found`);
  error.status = 404;
  throw error;
}

export async function createMatch(data) {
  // Resolve teams by name
  const team1 = await resolveTeamByName(data.team1Name);
  const team2 = await resolveTeamByName(data.team2Name);

  if (!team1 || !team2) {
    const error = new Error(`One or both teams not found`);
    error.status = 400;
    throw error;
  }

  if (team1.id === team2.id) {
    const error = new Error(`A match cannot have the same team twice`);
    error.status = 400;
    throw error;
  }

  return create({
    ...data,
    team1Id: team1.id,
    team2Id: team2.id,
    team1Name: team1.name,
    team2Name: team2.name
  });
}

export async function updateMatch(id, data) {
 const oldMatch = await findById(id);
  if (!oldMatch) {
    const error = new Error(`Match ${id} not found`);
    error.status = 404;
    throw error;
  }

  // Resolve teams by name
  const team1 = await resolveTeamByName(data.team1Name);
  const team2 = await resolveTeamByName(data.team2Name);

  if (!team1 || !team2) {
    const error = new Error(`One or both teams not found`);
    error.status = 400;
    throw error;
  }

  if (team1.id === team2.id) {
    const error = new Error(`A match cannot have the same team twice`);
    error.status = 400;
    throw error;
  }

  const updatedMatch = await update(id, {
    ...data,
    team1Id: team1.id,
    team2Id: team2.id,
    team1Name: team1.name,
    team2Name: team2.name
  });

  // Run match result engine
  await processMatchResult(oldMatch, updatedMatch);

  return updatedMatch;
}

export async function deleteMatch(id) {
 const match = await findById(id);

  if (!match) {
    const error = new Error(`Match ${id} not found`);
    error.status = 404;
    throw error;
  }
  // Prevent deletion if goals exist
  if (match.goals && match.goals.length > 0) {
    const error = new Error(`Cannot delete match ${id} because it has recorded goals`);
    error.status = 400;
    throw error;
  }
  // Prevent deletion if bets exist
  if (match.bets && match.bets.length > 0) {
    const error = new Error(`Cannot delete match ${id} because it has associated bets`);
    error.status = 400;
    throw error;
  }
  const deleted = await remove(id);

  if (!deleted) {
    const error = new Error(`Match ${id} not found`);
    error.status = 404;
    throw error;
  }

  return deleted;
}
