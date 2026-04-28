import prisma from '../config/db.js';

//import { PrismaClient } from "@prisma/client";
//const prisma = new PrismaClient();

export async function create(data) {
  return await prisma.match.create({
    data: {
      team1Id: data.team1Id,
      team2Id: data.team2Id,
      team1Name: data.team1Name,
      team2Name: data.team2Name,
      matchDate: data.matchDate,
      round: data.round,
      team1Goals: data.team1Goals ?? null,
      team2Goals: data.team2Goals ?? null
    },
    include: {
      goals: true,
      bets: true
    }
  });
}

export async function getAll() {
  return await prisma.match.findMany({
    orderBy: { matchDate: 'asc' },
    include: {
      goals: true,
      bets: true
    }
  });
}

export async function findById(id) {
  return await prisma.match.findUnique({
    where: { id },
    include: {
      goals: true,
      bets: true
    }
  });
}

export async function update(id, data) {
  return await prisma.match.update({
    where: { id },
    data: {
      team1Id: data.team1Id,
      team2Id: data.team2Id,
      team1Name: data.team1Name,
      team2Name: data.team2Name,
      matchDate: data.matchDate,
      round: data.round,
      team1Goals: data.team1Goals ?? null,
      team2Goals: data.team2Goals ?? null
    },
    include: {
      goals: true,
      bets: true
    }
  });
}

export async function remove(id) {
  try {
    const deletedMatch = await prisma.match.delete({
      where: { id }
    });
    return deletedMatch;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
