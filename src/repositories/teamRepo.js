import prisma from '../config/db.js';

export async function create(data) {
  return await prisma.team.create({
    data: {
      name: data.name,
      confederation: data.confederation,
      group: data.group ?? null
    }
  });
}

export async function getAll() {
  return await prisma.team.findMany({
    orderBy: { name: 'asc' }
  });
}

export async function findById(id) {
  return await prisma.team.findUnique({
    where: { id }
  });
}

export async function update(id, data) {
  return await prisma.team.update({
    where: { id },
    data: {
      name: data.name,
      confederation: data.confederation,
      group: data.group ?? null
    }
  });
}

export async function remove(id) {
  try {
    const deletedTeam = await prisma.team.delete({
      where: { id }
    });
    return deletedTeam;
  } catch (error) {
    // Prisma throws P2025 when the record does not exist
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function findByNameInsensitive(name) {
  return await prisma.team.findFirst({
    where: {
      name: {
        equals: name,
        mode: 'insensitive'
      }
    },
    include: {
    players: true
    }
  });
}

export async function removeByName(name) {
 try {
    const deletedTeam = await prisma.team.delete({
      where: { name }
    });
    return deletedTeam;
  } catch (error) {
    // Prisma throws P2025 when the record does not exist
    if (error.code === 'P2025') return null;
    throw error;
  }
}
