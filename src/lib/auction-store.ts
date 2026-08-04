import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  getDoc,
  query,
  orderBy,
  Timestamp,
  limit,
} from "firebase/firestore";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import type { Player, Team } from "@/lib/gpl-data";


export type Sale = {
  id: string;
  playerId: string;
  teamId: string;
  price: number;
  soldAt?: unknown;
};
export function useRecentSales() {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "sales"),
      orderBy("soldAt", "desc"),
      limit(10)
    );

    return onSnapshot(q, (snap) => {
      setSales(
        snap.docs.map(
          (d) =>
            ({
              id: d.id,
              ...d.data(),
            } as Sale)
        )
      );
    });
  }, []);

  return sales;
}

export type LivePlayer = Player & {
  imageUrl?: string;
  status: "available" | "unsold" | "sold" | "pending";
};

export type LiveTeam = Team;

export type AuctionState = {
  playerId: string | null;
  previousBid: number | null;
currentBid: number | null;
  biddingTeamId: string | null;

  status:
  | "idle"
  | "transition"
  | "live"
  | "goingOnce"
  | "goingTwice"
  | "sold"
  | "unsold";

  round: 1 | 2;

  eventMessage?: string;

  updatedAt?: unknown;
};

export type LastSale = {
  playerId: string;
  teamId: string;
  price: number;

  previousTeam: {
    purse: number;
    playersBought: number;
    remainingSlots: number;
    maxBid: number;
  };
};

const AUCTION_DOC = "meta/auctionState";
const LAST_SALE_DOC = "meta/lastSale";
const EVENTS_COLLECTION = "events";
const PLAYERS_COLLECTION = "players";
const TEAMS_COLLECTION = "teams";


export function useLivePlayers() {
  const [players, setPlayers] = useState<LivePlayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "players"), (snap) => {



  setPlayers(
  snap.docs.map(
    (d) =>
      ({
        ...d.data(),
        id: d.id,
      } as LivePlayer)
  )
);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { players, loading };
}

export function useLiveTeams() {
  const [teams, setTeams] = useState<LiveTeam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "teams"), (snap) => {
      setTeams(snap.docs.map((d) => ({ id: d.id, ...d.data() } as LiveTeam)));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { teams, loading };
}

export type AuctionEvent = {
  id: string;
  message: string;
  badge?: "LIVE" | "SOLD" | "MATCH" | "RESULT";
  timestamp?: Timestamp;
};

export function useAuctionEvents() {
  const [events, setEvents] = useState<AuctionEvent[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, EVENTS_COLLECTION),
      orderBy("timestamp", "desc"),
      limit(20)
    );

    return onSnapshot(q, (snap) => {
      setEvents(
        snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<AuctionEvent, "id">),
        }))
      );
    });
  }, []);

  return events;
}

export function useAuctionState() {
  const [state, setState] = useState<AuctionState>({
  playerId: null,
  previousBid: null,
  currentBid: null,
  biddingTeamId: null,
  status: "idle",
  round: 1,
  eventMessage: "",
});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, AUCTION_DOC), (snap) => {
      if (snap.exists()) setState(snap.data() as AuctionState);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { state, loading };
}

async function addEvent(
  message: string,
  badge?: "LIVE" | "SOLD" | "MATCH" | "RESULT"
) {
  await setDoc(doc(collection(db, EVENTS_COLLECTION)), {
    message,
    badge: badge ?? null,
    timestamp: serverTimestamp(),
  });
}

export async function startLiveTransition(
  playerId: string,
  startingBid: number
) {
  if (startingBid <= 0) {
    throw new Error("Starting bid must be greater than zero.");
  }

  await setDoc(doc(db, AUCTION_DOC), {
    playerId,
    previousBid: null,
    currentBid: startingBid,
    biddingTeamId: null,

    // NEW STATE
    status: "transition",

    round: 1,
    eventMessage: "",
    updatedAt: serverTimestamp(),
  });
}

export async function pushPlayerLive(
  playerId: string,
  startingBid: number
) {
  if (startingBid <= 0) {
  throw new Error("Starting bid must be greater than zero.");
}
  await setDoc(doc(db, AUCTION_DOC), {
    playerId,

    previousBid: null,
    currentBid: startingBid,

    biddingTeamId: null,
    status: "live",
    round: 1,
    eventMessage: "",
    updatedAt: serverTimestamp(),
  });
  const playerSnap = await getDoc(doc(db, PLAYERS_COLLECTION, playerId));

const player = playerSnap.data();

await addEvent(
  `${player?.playerNumber ?? ""} ${player?.name ?? "Player"} enters the auction`,
  "LIVE"
);


}

export async function updateLiveBid(
  currentBid: number,
  biddingTeamId: string | null
) {
  try {
    if (!biddingTeamId) return;

    const teamSnap = await getDoc(doc(db, TEAMS_COLLECTION, biddingTeamId));

    if (!teamSnap.exists()) return;

    const team = teamSnap.data() as LiveTeam;

    if (currentBid > (team.maxBid ?? Infinity)) {
      throw new Error("Bid exceeds team's maximum bid.");
    }

    const auctionRef = doc(db, AUCTION_DOC);
    const auctionSnap = await getDoc(auctionRef);

    if (!auctionSnap.exists()) return;

    const auction = auctionSnap.data() as AuctionState;

    if (currentBid <= (auction.currentBid ?? 0)) {
      throw new Error("New bid must be higher than the current bid.");
    }

    await updateDoc(auctionRef, {
      previousBid: auction.currentBid,
      currentBid,
      biddingTeamId,
      updatedAt: serverTimestamp(),
    });

    await addEvent(
      `${team.name} bid ₹${currentBid.toLocaleString("en-IN")}`
    );
  } catch (err) {
    toast.error(
      err instanceof Error ? err.message : "Failed to update bid."
    );
    throw err;
  }
}

export async function changeLeadingTeam(
  biddingTeamId: string
) {
  const auctionRef = doc(db, AUCTION_DOC);

  const auctionSnap = await getDoc(auctionRef);

  if (!auctionSnap.exists()) return;

  const auction = auctionSnap.data() as AuctionState;

  if (!auction.playerId) return;

  await updateDoc(auctionRef, {
    biddingTeamId,
    updatedAt: serverTimestamp(),
  });
}

function getBidIncrement(currentBid: number) {
  if (currentBid < 2000000) {
    return 200000;
  }

  if (currentBid < 3500000) {
    return 300000;
  }

  return 500000;
}

export async function placeBid(teamId: string) {
  const auctionRef = doc(db, AUCTION_DOC);

  const auctionSnap = await getDoc(auctionRef);

  if (!auctionSnap.exists()) return;

  const auction = auctionSnap.data() as AuctionState;

  if (!auction.playerId) return;

  const teamSnap = await getDoc(
    doc(db, TEAMS_COLLECTION, teamId)
  );

  if (!teamSnap.exists()) return;

  const team = teamSnap.data() as LiveTeam;

  if (teamId === auction.biddingTeamId) {
    return;
  }

  let nextBid = auction.currentBid ?? 0;

  const firstBid = auction.biddingTeamId === null;

  if (!firstBid) {
    nextBid += getBidIncrement(nextBid);
  }

  if (nextBid > (team.maxBid ?? Infinity)) {
    toast.error("Bid exceeds team's maximum bid.");
    return;
  }

  await updateDoc(auctionRef, {
    previousBid: auction.currentBid,
    currentBid: nextBid,
    biddingTeamId: teamId,

    status:
      auction.status === "goingOnce" ||
      auction.status === "goingTwice"
        ? "live"
        : auction.status,

    updatedAt: serverTimestamp(),
  });

  await addEvent(
    `${team.name} bid ₹${nextBid.toLocaleString("en-IN")}`
  );
}

export async function markSold(
  playerId: string,
  teamId: string,
  price: number
): Promise<boolean> {

  const auctionSnap = await getDoc(doc(db, AUCTION_DOC));

  if (!auctionSnap.exists()) return false;

  const auction = auctionSnap.data() as AuctionState;

 if (
  auction.playerId !== playerId ||
  auction.status !== "goingTwice"
) {
  toast.error("Player cannot be sold right now.");
  return false;
} 

  // Update team
  const teamRef = doc(db, TEAMS_COLLECTION, teamId);
  const snap = await getDoc(teamRef);

  if (snap.exists()) {
    const team = snap.data() as LiveTeam;
if (price > (team.maxBid ?? Infinity)) {
  toast.error("Bid exceeds this team's maximum bid.");
  return false;
}
    if ((team.playersBought ?? 0) >= (team.squadLimit ?? 13)) {
  toast.error("This team already has a full squad.");
  return false;
}


    await setDoc(doc(db, LAST_SALE_DOC), {
  playerId,
  teamId,
  price,

  previousTeam: {
    purse: team.purse ?? 0,
    playersBought: team.playersBought ?? 0,
    remainingSlots: team.remainingSlots ?? 0,
    maxBid: team.maxBid ?? 0,
  },
});

   const TOTAL_SQUAD_SIZE = 13;

const purse = Math.max((team.purse ?? 0) - price, 0);

const currentBought = team.playersBought ?? 0;

if (currentBought >= TOTAL_SQUAD_SIZE) {
  throw new Error("Squad is already full.");
}

const playersBought = currentBought + 1;

const remainingSlots =
  TOTAL_SQUAD_SIZE - playersBought;

const maxBid = Math.max(
  purse - Math.max(remainingSlots - 1, 0) * 200000,
  0
);

    await updateDoc(teamRef, {
      purse,
      playersBought,
      remainingSlots,
      maxBid,
    });

    await updateDoc(doc(db, PLAYERS_COLLECTION, playerId), {
    teamId,
    soldPrice: price,
    status: "sold",
  });
  const saleRef = doc(collection(db, "sales"));

await setDoc(saleRef, {
  playerId,
  teamId,
  price,
  soldAt: serverTimestamp(),
});
  }

  await updateDoc(doc(db, AUCTION_DOC), {
    status: "sold",
    eventMessage: "Player Sold",
    updatedAt: serverTimestamp(),
});

const playerSnap = await getDoc(doc(db, PLAYERS_COLLECTION, playerId));
const teamSnap = await getDoc(doc(db, TEAMS_COLLECTION, teamId));

const player = playerSnap.data();
const team = teamSnap.data();

await addEvent(
  `${player?.playerNumber ?? ""} ${player?.name} sold to ${
    team?.name
  } for ₹${price.toLocaleString("en-IN")}`,
  "SOLD"
);

  return true;
}

export async function markUnsold(playerId: string) {
  console.log("markUnsold start");

  await updateDoc(doc(db, PLAYERS_COLLECTION, playerId), {
    status: "unsold",
  });

  console.log("player updated");

  await updateDoc(doc(db, AUCTION_DOC), {
    status: "unsold",
    eventMessage: "Player Unsold",
    updatedAt: serverTimestamp(),
  });

  console.log("auction updated");

  const playerSnap = await getDoc(doc(db, PLAYERS_COLLECTION, playerId));

  console.log("player fetched");

  const player = playerSnap.data();

  await addEvent(
    `${player?.playerNumber ?? ""} ${player?.name ?? "Player"} remained unsold`
  );

  console.log("event added");
}

export async function clearLiveAuction() {
  await updateDoc(doc(db, AUCTION_DOC), {
    playerId: null,
    previousBid: null,
currentBid: null,
    biddingTeamId: null,
    status: "idle",
    eventMessage: "",
    updatedAt: serverTimestamp(),
  });
}

export async function setGoingOnce() {
  await updateDoc(doc(db, AUCTION_DOC), {
    status: "goingOnce",
    eventMessage: "Going Once",
    updatedAt: serverTimestamp(),
  });

  await addEvent("Going Once", "LIVE");
}

export async function setGoingTwice() {
  await updateDoc(doc(db, AUCTION_DOC), {
    status: "goingTwice",
    eventMessage: "Going Twice",
    updatedAt: serverTimestamp(),
  });

  await addEvent("Going Twice", "LIVE");
}

export async function undoLastSale() {
  const lastSaleRef = doc(db, LAST_SALE_DOC);
  const lastSaleSnap = await getDoc(lastSaleRef);

  if (!lastSaleSnap.exists()) {
    return;
  }

  const lastSale = lastSaleSnap.data() as LastSale;

  // Restore player
  await updateDoc(
  doc(db, PLAYERS_COLLECTION, lastSale.playerId),
  {
    teamId: null,
    soldPrice: null,
    status: "available",
  }
);
  // Restore team
  await updateDoc(doc(db, TEAMS_COLLECTION, lastSale.teamId), {
    purse: lastSale.previousTeam.purse,
    playersBought: lastSale.previousTeam.playersBought,
    remainingSlots: lastSale.previousTeam.remainingSlots,
    maxBid: lastSale.previousTeam.maxBid,
  });

  // Restore live auction
  await updateDoc(doc(db, AUCTION_DOC), {
    playerId: lastSale.playerId,
    biddingTeamId: null,
    previousBid: null,
currentBid: lastSale.price,
    status: "live",
    eventMessage: "Sale Undone",
    updatedAt: serverTimestamp(),
  });

  // Clear saved sale
await deleteDoc(lastSaleRef);

await addEvent("Last sale has been undone");
}