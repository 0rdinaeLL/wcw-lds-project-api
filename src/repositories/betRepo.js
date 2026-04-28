import prisma from '../config/db.js';

export async function create(data) {
  return await prisma.bet.create({
    data,
    include: {
      user: true,
      match: true
    }
  });
}

export async function getAll() {
  return await prisma.bet.findMany({
    include: {
      user: true,
      match: true
    }
  });
}

export async function findById(id) {
  return await prisma.bet.findUnique({
    where: { id },
    include: {
      user: true,
      match: true
    }
  });
}

export async function remove(id) {
  return await prisma.bet.delete({
    where: { id }
  });
}
