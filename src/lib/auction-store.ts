import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  serverTimestamp,
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
  updatedAt?: unknown;
};

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

export async function pushPlayerLive(playerId: string, startingBid: number) {
  await setDoc(doc(db, AUCTION_DOC), {
    playerId,
    currentBid: startingBid,
    biddingTeamId: null,
    status: "live",
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

export async function markSold(playerId: string, teamId: string, price: number) {
  await updateDoc(doc(db, "players", playerId), {
    teamId,
    soldPrice: price,
    status: "sold",
  });
  await updateDoc(doc(db, AUCTION_DOC), {
    status: "sold",
    updatedAt: serverTimestamp(),
  });
}

export async function markUnsold(playerId: string) {
  await updateDoc(doc(db, "players", playerId), {
    status: "unsold",
  });
  await updateDoc(doc(db, AUCTION_DOC), {
    status: "unsold",
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