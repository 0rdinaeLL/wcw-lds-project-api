import prisma from '../config/db.js';

export async function create(data) {
  return await prisma.player.create({
    data: {
      name: data.name,
      position: data.position,
      number: data.number,
      teamId: data.teamId
    }
  });
}

export async function getAll() {
  return await prisma.player.findMany({
    orderBy: { name: 'asc' },
    include: {
      team: true
    }
  });
}

export async function findById(id) {
  return await prisma.player.findUnique({
    where: { id },
    include: {
      team: true
    }
  });
}

export async function findByNameInsensitive(name) {
  return await prisma.player.findFirst({
    where: {
      name: {
        equals: name,
        mode: 'insensitive'
      }
    },
    include: {
      team: true
    }
  });
}

export async function findByNamePartial(name) {
  return await prisma.player.findMany({
    where: {
      name: {
        contains: name,
        mode: 'insensitive'
      }
    },
    include: {
      team: true
    }
  });
}

export async function findByTeam(name) {
  const team = await prisma.team.findFirst({
    where: {
      name: {
        equals: name,
        mode: 'insensitive'
        }
      }
    });
  if (!team) return null;
   return await prisma.player.findMany({
    where: { teamId: team.id },
    orderBy: { number: 'asc' },
    include: {
      team: true
    }
  });
}

export async function update(id, data) {
  return await prisma.player.update({
    where: { id },
    data: {
      name: data.name,
      position: data.position,
      number: data.number,
      teamId: data.teamId
    }
  });
}

export async function remove(id) {
  try {
    const deletedPlayer = await prisma.player.delete({
      where: { id }
    });
    return deletedPlayer;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
