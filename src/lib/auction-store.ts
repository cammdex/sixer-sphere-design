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
  status: "unsold" | "sold" | "pending";
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

const AUCTION_DOC = "meta/auctionState";

export function useLivePlayers() {
  const [players, setPlayers] = useState<LivePlayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "players"), (snap) => {
      setPlayers(snap.docs.map((d) => ({ id: d.id, ...d.data() } as LivePlayer)));
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
) {
  // Update player
  await updateDoc(doc(db, "players", playerId), {
    teamId,
    soldPrice: price,
    status: "sold",
  });

  // Update team
  const teamRef = doc(db, "teams", teamId);
  const snap = await getDoc(teamRef);

  if (snap.exists()) {
    const team = snap.data();

    const purse = (team.purse ?? 0) - price;
    const playersBought = (team.playersBought ?? 0) + 1;
    const remainingSlots = (team.remainingSlots ?? 0) - 1;

    const maxBid =
      purse - Math.max(remainingSlots - 1, 0) * 200000;

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