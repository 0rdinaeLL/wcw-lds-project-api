import {
  getAll,
  findById,
  create,
  update,
  remove,
  removeByName,
  findByNameInsensitive,
} from '../repositories/teamRepo.js';

export async function getAllTeams(options) {
  return getAll(options);
}

export async function getTeamById(id) {
  const team = await findById(id);
  if (team) return team;
  else {
    const error = new Error(`Team ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function createTeam(teamData) {
  return create(teamData);
}

export async function updateTeam(id, updatedData) {
  const updatedTeam = await update(id, updatedData);
  if (updatedTeam) return updatedTeam;
  else {
    const error = new Error(`Team ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function deleteTeam(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Team ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function deleteTeamByName(name) {
    const team = await findByNameInsensitive(name);

  if (!team) {
    const error = new Error(`Team '${name}' not found`);
    error.status = 404;
    throw error;
  }

  // Prevent deletion if players exist
  if (team.players && team.players.length > 0) {
    const error = new Error(
      `Cannot delete team '${team.name}' because it still has registered players`
    );
    error.status = 400;
    throw error;
  }

  // Delete using the canonical name (case-insensitive match)
  const deleted = await removeByName(team.name);

  if (!deleted) {
    const error = new Error(`Team '${name}' not found`);
    error.status = 404;
    throw error;
  }

  return deleted;
}

