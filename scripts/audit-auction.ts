import { players } from "../src/lib/data/players";
import { teams } from "../src/lib/gpl-data";

const money = (n: number) =>
  `₹${(n / 100000).toFixed(2)}L`;

let failed = false;

function fail(message: string) {
  failed = true;
  console.log(`✗ ${message}`);
}

console.log("\n========================================");
console.log("       UBL SEASON 2 AUCTION AUDIT");
console.log("========================================\n");

// --------------------------------------------------
// PLAYER STATUS COUNTS
// --------------------------------------------------

const statusCounts = players.reduce<Record<string, number>>(
  (acc, player) => {
    const status = player.status ?? "missing";
    acc[status] = (acc[status] ?? 0) + 1;
    return acc;
  },
  {}
);

const soldCount = statusCounts.sold ?? 0;
const unsoldCount = statusCounts.unsold ?? 0;
const availableCount = statusCounts.available ?? 0;
const liveCount = statusCounts.live ?? 0;
const extrasCount = statusCounts.extras ?? 0;
const missingCount = statusCounts.missing ?? 0;

console.log("PLAYER STATUS");
console.log(`  SOLD:      ${soldCount}`);
console.log(`  UNSOLD:    ${unsoldCount}`);
console.log(`  AVAILABLE: ${availableCount}`);
console.log(`  LIVE:      ${liveCount}`);
console.log(`  EXTRAS:    ${extrasCount}`);
console.log(`  MISSING:   ${missingCount}`);
console.log(`  TOTAL:     ${players.length}\n`);

// --------------------------------------------------
// EXPECTED PLAYER TOTALS
// --------------------------------------------------

if (players.length !== 151) {
  fail(`Expected 151 players, found ${players.length}.`);
}

if (soldCount !== 104) {
  fail(`Expected 104 sold players, found ${soldCount}.`);
}

if (unsoldCount !== 47) {
  fail(`Expected 47 unsold players, found ${unsoldCount}.`);
}

if (availableCount !== 0) {
  fail(`Expected 0 available players, found ${availableCount}.`);
}

if (liveCount !== 0) {
  fail(`Expected 0 live players, found ${liveCount}.`);
}

// --------------------------------------------------
// DUPLICATE PLAYER IDs
// --------------------------------------------------

const idCounts = new Map<string, number>();

for (const player of players) {
  idCounts.set(
    player.id,
    (idCounts.get(player.id) ?? 0) + 1
  );
}

const duplicateIds = [...idCounts.entries()]
  .filter(([, count]) => count > 1)
  .map(([id]) => id);

if (duplicateIds.length > 0) {
  fail(
    `Duplicate player IDs: ${duplicateIds.join(", ")}`
  );
}

// --------------------------------------------------
// PLAYER-LEVEL VALIDATION
// --------------------------------------------------

console.log("PLAYER RECORD VALIDATION");

for (const player of players) {
  // SOLD players
  if (player.status === "sold") {
    if (!player.teamId) {
      fail(
        `${player.playerNumber ?? player.id} ${player.name}: SOLD but has no teamId.`
      );
    }

    if (player.soldPrice == null) {
      fail(
        `${player.playerNumber ?? player.id} ${player.name}: SOLD but has no soldPrice.`
      );
    }

    if (
      player.soldPrice != null &&
      player.soldPrice <= 0
    ) {
      fail(
        `${player.playerNumber ?? player.id} ${player.name}: SOLD with invalid soldPrice ${player.soldPrice}.`
      );
    }
  }

  // UNSOLD players
  if (player.status === "unsold") {
    if (player.teamId) {
      fail(
        `${player.playerNumber ?? player.id} ${player.name}: UNSOLD but still has teamId ${player.teamId}.`
      );
    }

    if (player.soldPrice != null) {
      fail(
        `${player.playerNumber ?? player.id} ${player.name}: UNSOLD but still has soldPrice ${player.soldPrice}.`
      );
    }
  }
}

// --------------------------------------------------
// TEAM REFERENCES
// --------------------------------------------------

const teamIds = new Set(
  teams.map((team) => team.id)
);

for (const player of players) {
  if (
    player.teamId &&
    !teamIds.has(player.teamId)
  ) {
    fail(
      `${player.playerNumber ?? player.id} ${player.name}: references unknown teamId "${player.teamId}".`
    );
  }
}

// --------------------------------------------------
// TEAM RECONCILIATION
// --------------------------------------------------

console.log("\nTEAM RECONCILIATION");

let totalSoldPrice = 0;
let totalRemainingPurse = 0;
let totalInitialPurse = 0;

for (const team of teams) {
  // Safely resolve optional Team properties
  const initialPurse = team.initialPurse ?? 0;
  const purse = team.purse ?? 0;
  const squadLimit = team.squadLimit ?? 0;
  const playersBought = team.playersBought ?? 0;
  const remainingSlots = team.remainingSlots ?? 0;

  // Find every SOLD player assigned to this team
  const roster = players.filter(
    (player) =>
      player.status === "sold" &&
      player.teamId === team.id
  );

  // Calculate actual spending from player records
  const spent = roster.reduce(
    (sum, player) =>
      sum + (player.soldPrice ?? 0),
    0
  );

  // Calculate what the team accounting says it spent
  const expectedSpent =
    initialPurse - purse;

  totalSoldPrice += spent;
  totalRemainingPurse += purse;
  totalInitialPurse += initialPurse;

  // Individual checks
  const countOk =
    roster.length === playersBought;

  const purseOk =
    spent === expectedSpent;

  const slotsOk =
    remainingSlots ===
    squadLimit - roster.length;

  console.log(
    `  ${team.short.padEnd(4)} ` +
    `${String(roster.length).padStart(2)}/` +
    `${String(squadLimit).padEnd(2)} players` +
    ` | spent ${money(spent).padStart(9)}` +
    ` | purse ${money(purse).padStart(9)}` +
    ` | ${
      countOk && purseOk && slotsOk
        ? "✓"
        : "✗"
    }`
  );

  // Player count mismatch
  if (!countOk) {
    fail(
      `${team.name}: team says playersBought=${playersBought}, ` +
      `but players.ts contains ${roster.length} sold players.`
    );
  }

  // Purse mismatch
  if (!purseOk) {
    fail(
      `${team.name}: player sales total ${money(spent)} ` +
      `but initialPurse - purse = ${money(expectedSpent)}.`
    );
  }

  // Remaining slots mismatch
  if (!slotsOk) {
    fail(
      `${team.name}: remainingSlots=${remainingSlots}, ` +
      `but calculated remaining slots=${squadLimit - roster.length}.`
    );
  }
}

// --------------------------------------------------
// GLOBAL TOTALS
// --------------------------------------------------

console.log("\nTOTALS");

console.log(
  `  Sold players:       ${soldCount}`
);

console.log(
  `  Unsold players:     ${unsoldCount}`
);

console.log(
  `  Total sold value:   ${money(totalSoldPrice)}`
);

console.log(
  `  Remaining purses:   ${money(totalRemainingPurse)}`
);

console.log(
  `  Initial team purse: ${money(totalInitialPurse)}`
);

// --------------------------------------------------
// GLOBAL MONEY RECONCILIATION
// --------------------------------------------------

const expectedTotalSpent =
  totalInitialPurse -
  totalRemainingPurse;

if (
  totalSoldPrice !== expectedTotalSpent
) {
  fail(
    `Global money mismatch: ` +
    `player sales=${money(totalSoldPrice)}, ` +
    `team accounting=${money(expectedTotalSpent)}.`
  );
}

// --------------------------------------------------
// FINAL RESULT
// --------------------------------------------------

console.log(
  "\n========================================"
);

if (failed) {
  console.log(
    "✗ AUDIT FAILED — DO NOT DEPLOY YET."
  );

  console.log(
    "========================================\n"
  );
} else {
  console.log(
    "✓ DATA CONSISTENT — SAFE TO ARCHIVE."
  );

  console.log(
    "========================================\n"
  );
}