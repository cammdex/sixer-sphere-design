import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Player, Team } from "@/lib/gpl-data";

export type LivePlayer = Player & {
  imageUrl?: string;
  status: "available" | "unsold" | "sold" | "pending";
};

export type LiveTeam = Team;

export type AuctionState = {
  playerId: string | null;

  currentBid: number | null;

  biddingTeamId: string | null;

  status: "idle" | "live" | "sold" | "unsold";

  round: 1 | 2;

  eventMessage?: string;

  updatedAt?: unknown;
}

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

export function useLivePlayers() {
  const [players, setPlayers] = useState<LivePlayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "players"), (snap) => {

  console.log(
    snap.docs.map(doc => ({
      firestoreId: doc.id,
      playerNumber: doc.data().playerNumber
    }))
  );

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

export function useAuctionState() {
  const [state, setState] = useState<AuctionState>({
  playerId: null,
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

export async function pushPlayerLive(
  playerId: string,
  startingBid: number
) {
  await setDoc(doc(db, AUCTION_DOC), {
    playerId,
    currentBid: startingBid,
    biddingTeamId: null,
    status: "live",
    round: 1,
    eventMessage: "",
    updatedAt: serverTimestamp(),
  });
}

export async function updateLiveBid(currentBid: number, biddingTeamId: string | null) {
  await updateDoc(doc(db, AUCTION_DOC), {
    currentBid,
    biddingTeamId,
    updatedAt: serverTimestamp(),
  });
}

export async function markSold(
  playerId: string,
  teamId: string,
  price: number
): Promise<boolean> {

  // Update team
  const teamRef = doc(db, "teams", teamId);
  const snap = await getDoc(teamRef);

  if (snap.exists()) {
    const team = snap.data() as LiveTeam;

    if ((team.playersBought ?? 0) >= (team.squadLimit ?? 13)) {
  alert("This team already has a full squad.");
  return false;
}
await updateDoc(doc(db, "players", playerId), {
    teamId,
    soldPrice: price,
    status: "sold",
  });

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

   const STARTING_PLAYERS = 3;
const TOTAL_SQUAD_SIZE = 13;

const purse = (team.purse ?? 0) - price;

// If Firestore still has 0, initialize correctly
const currentBought =
  (team.playersBought ?? STARTING_PLAYERS);

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
  }

  // Update live auction
  await updateDoc(doc(db, AUCTION_DOC), {
    status: "sold",
    biddingTeamId: teamId,
    currentBid: price,
    eventMessage: "Player Sold",
    updatedAt: serverTimestamp(),
  });
  return true;
}

export async function markUnsold(playerId: string) {
  await updateDoc(doc(db, "players", playerId), {
    status: "unsold",
  });
  await updateDoc(doc(db, AUCTION_DOC), {
  status: "unsold",
  eventMessage: "Player Unsold",
  updatedAt: serverTimestamp(),
});
}

export async function clearLiveAuction() {
  await setDoc(doc(db, AUCTION_DOC), {
    playerId: null,
    currentBid: null,
    biddingTeamId: null,
    status: "idle",
    updatedAt: serverTimestamp(),
  });
}

export async function undoLastSale() {
  const lastSaleRef = doc(db, LAST_SALE_DOC);
  const lastSaleSnap = await getDoc(lastSaleRef);

  if (!lastSaleSnap.exists()) {
    return;
  }

  const lastSale = lastSaleSnap.data() as LastSale;

  // Restore player
  await updateDoc(doc(db, "players", lastSale.playerId), {
    teamId: null,
    soldPrice: null,
    status: "available",
  });

  // Restore team
  await updateDoc(doc(db, "teams", lastSale.teamId), {
    purse: lastSale.previousTeam.purse,
    playersBought: lastSale.previousTeam.playersBought,
    remainingSlots: lastSale.previousTeam.remainingSlots,
    maxBid: lastSale.previousTeam.maxBid,
  });

  // Restore live auction
  await updateDoc(doc(db, AUCTION_DOC), {
    playerId: lastSale.playerId,
    biddingTeamId: null,
    currentBid: lastSale.price,
    status: "live",
    eventMessage: "Sale Undone",
    updatedAt: serverTimestamp(),
  });

  // Clear saved sale
  await setDoc(lastSaleRef, {});
}