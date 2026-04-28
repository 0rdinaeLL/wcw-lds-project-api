import prisma from '../config/db.js';

// -----------------------------------------
// 1. Determine match outcome
// -----------------------------------------
export function getMatchOutcome(team1Goals, team2Goals) {
  if (team1Goals > team2Goals) return 1;   // team1 wins
  if (team1Goals < team2Goals) return 2;   // team2 wins
  return 0;                                // draw
}

// -----------------------------------------
// 2. Apply stats to a team
// -----------------------------------------
function applyStats(team, goalsFor, goalsAgainst) {
  team.matchesPlayed += 1;
  team.goalsFor += goalsFor;
  team.goalsAgainst += goalsAgainst;
  team.goalDiff = team.goalsFor - team.goalsAgainst;

  if (goalsFor > goalsAgainst) {
    team.wins += 1;
    team.points += 3;
  } else if (goalsFor < goalsAgainst) {
    team.losses += 1;
  } else {
    team.draws += 1;
    team.points += 1;
  }
}

// -----------------------------------------
// 3. Undo stats (if match was previously played)
// -----------------------------------------
function undoStats(team, goalsFor, goalsAgainst) {
  team.matchesPlayed -= 1;
  team.goalsFor -= goalsFor;
  team.goalsAgainst -= goalsAgainst;
  team.goalDiff = team.goalsFor - team.goalsAgainst;

  if (goalsFor > goalsAgainst) {
    team.wins -= 1;
    team.points -= 3;
  } else if (goalsFor < goalsAgainst) {
    team.losses -= 1;
  } else {
    team.draws -= 1;
    team.points -= 1;
  }
}

// -----------------------------------------
// 4. Evaluate bets
// -----------------------------------------
function evaluateBet(bet, outcome, team1Goals, team2Goals) {
  const predictedOutcome = bet.predictedWinner;

  const correctWinner = predictedOutcome === outcome;
  const correctScore =
    bet.predictedTeam1Goals === team1Goals &&
    bet.predictedTeam2Goals === team2Goals;

  if (correctWinner && correctScore) return "WON";
  if (correctWinner) return "WON";
  return "LOST";
}

// -----------------------------------------
// 5. Main engine
// -----------------------------------------
export async function processMatchResult(oldMatch, newMatch) {
  const goalsChanged =
    oldMatch.team1Goals !== newMatch.team1Goals ||
    oldMatch.team2Goals !== newMatch.team2Goals;

  if (!goalsChanged) return; // nothing to do

  const team1 = await prisma.team.findUnique({ where: { id: newMatch.team1Id } });
  const team2 = await prisma.team.findUnique({ where: { id: newMatch.team2Id } });

  // Undo previous stats if match was already played
  if (oldMatch.team1Goals !== null && oldMatch.team2Goals !== null) {
    undoStats(team1, oldMatch.team1Goals, oldMatch.team2Goals);
    undoStats(team2, oldMatch.team2Goals, oldMatch.team1Goals);
  }

  // Apply new stats if match is now played
  if (newMatch.team1Goals !== null && newMatch.team2Goals !== null) {
    applyStats(team1, newMatch.team1Goals, newMatch.team2Goals);
    applyStats(team2, newMatch.team2Goals, newMatch.team1Goals);
  }

  // Save updated team stats
  await prisma.team.update({
    where: { id: team1.id },
    data: team1
  });

  await prisma.team.update({
    where: { id: team2.id },
    data: team2
  });

  // Evaluate bets
  const bets = await prisma.bet.findMany({
    where: { matchId: newMatch.id }
  });

  const outcome = getMatchOutcome(newMatch.team1Goals, newMatch.team2Goals);

  for (const bet of bets) {
    const status = evaluateBet(
      bet,
      outcome,
      newMatch.team1Goals,
      newMatch.team2Goals
    );

    await prisma.bet.update({
      where: { id: bet.id },
      data: { status }
    });
  }
}
