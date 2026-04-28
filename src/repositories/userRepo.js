import prisma from '../config/db.js';

export function findAllUsers() {
  return prisma.user.findMany({
    select: { id: true, email: true, role: true, createdAt: true }
  });
}

export function findUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, role: true, createdAt: true }
  });
}

export function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email }
  });
}

export function createUser(data) {
  return prisma.user.create({ data });
}

export function updateUser(id, data) {
  return prisma.user.update({
    where: { id },
    data
  });
}

export function deleteUser(id) {
  return prisma.user.delete({
    where: { id }
  });
}
