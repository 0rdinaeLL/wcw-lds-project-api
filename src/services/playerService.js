import {
  getAll,
  findById,
  findByNameInsensitive,
  findByNamePartial,
  findByTeam,
  create,
  update,
  remove,
} from '../repositories/playerRepo.js';

export async function getAllPlayers() {
  return getAll();
}

export async function getPlayerById(id) {
  const player = await findById(id);
  if (player) return player;

  const error = new Error(`Player ${id} not found`);
  error.status = 404;
  throw error;
}

export async function findPlayerByName(name) {
  const player = await findByNameInsensitive(name);

  if (player) return player;

  const error = new Error(`Player '${name}' not found`);
  error.status = 404;
  throw error;
}

export async function createPlayer(playerData) {
  return create(playerData);
}

export async function searchPlayersByName(name) {
  const players = await findByNamePartial(name);

  if (players.length > 0) return players;

  const error = new Error(`No players found matching '${name}'`);
  error.status = 404;
  throw error;
}

export async function getPlayersByTeam(teamName) {
  const players = await findByTeam(teamName);

  if (!players) {
    const error = new Error(`Team '${teamName}' not found`);
    error.status = 404;
    throw error;
  }

  if (players.length === 0) {
    const error = new Error(`No players found for team '${teamName}'`);
    error.status = 404;
    throw error;
  }

  return players;
}

export async function updatePlayer(id, data) {
  const updated = await update(id, data);
  if (updated) return updated;

  const error = new Error(`Player ${id} not found`);
  error.status = 404;
  throw error;
}

export async function deletePlayer(id) {
  const deleted = await remove(id);

  if (!deleted) {
    const error = new Error(`Player ${id} not found`);
    error.status = 404;
    throw error;
  }

  return deleted;
}
