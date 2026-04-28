import prisma from '../config/db.js';

export async function create(data) {
  return await prisma.goal.create({
    data: {
      matchId: data.matchId,
      playerId: data.playerId,
      minute: data.minute
    },
    include: {
      match: true,
      player: true
    }
  });
}

export async function getAll() {
  return await prisma.goal.findMany({
    orderBy: { minute: 'asc' },
    include: {
      match: true,
      player: true
    }
  });
}

export async function findById(id) {
  return await prisma.goal.findUnique({
    where: { id },
    include: {
      match: true,
      player: true
    }
  });
}

export async function findGoalsByPlayerName(name) {
  // 1. Find player by name (case-insensitive)
  const player = await prisma.player.findFirst({
    where: {
      name: {
        equals: name,
        mode: 'insensitive'
      }
    }
  });

  if (!player) return null;

  // 2. Get all goals for that player
  return await prisma.goal.findMany({
    where: { playerId: player.id },
    orderBy: { minute: 'asc' },
    include: {
      match: true,
      player: true
    }
  });
}

export async function update(id, data) {
  return await prisma.goal.update({
    where: { id },
    data: {
      matchId: data.matchId,
      playerId: data.playerId,
      minute: data.minute
    },
    include: {
      match: true,
      player: true
    }
  });
}

export async function remove(id) {
  return await prisma.goal.delete({
    where: { id }
  });
}
