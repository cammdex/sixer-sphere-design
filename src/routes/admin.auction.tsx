import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Radio, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { MobileLayout, TeamCrest, Avatar } from "@/components/mobile-layout";

import { formatINR, teams as defaultTeams } from "@/lib/gpl-data";

import { db } from "@/lib/firebase";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

import {
  useLivePlayers,
  useLiveTeams,
  useAuctionState,
  pushPlayerLive,
  updateLiveBid,
  markSold,
  markUnsold,
  clearLiveAuction,
} from "@/lib/auction-store";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/auction")({
  component: AdminAuctionPage,
});

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "changeme";

function AdminAuctionPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [pw, setPw] = useState("");

  if (!unlocked) {
    return (
      <MobileLayout title="Admin" showFab={false}>
        <div className="mt-20 flex flex-col items-center gap-4 px-2 text-center">
          <h2 className="font-display text-lg font-bold">Auction Control Panel</h2>
          <p className="text-sm text-muted-foreground">Enter the admin password to continue.</p>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && pw === ADMIN_PASSWORD && setUnlocked(true)}
            placeholder="Password"
            className="w-full rounded-2xl bg-card/60 py-3 px-4 text-sm border border-border focus:border-primary outline-none"
          />
          <button
            onClick={() => {
              if (pw === ADMIN_PASSWORD) setUnlocked(true);
              else toast.error("Wrong password");
            }}
            className="w-full rounded-2xl gradient-royal py-3 text-sm font-semibold text-white"
          >
            Unlock
          </button>
        </div>
      </MobileLayout>
    );
  }

  return <AuctionControls />;
}

function AuctionControls() {
  async function importTeams() {
  try {
    for (const team of defaultTeams) {
      await setDoc(doc(db, "teams", team.id), team, { merge: true });
    }

    toast.success("Teams imported successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to import teams");
  }
}

async function importPlayers() {
  try {
    const response = await fetch("/data/players.auction.ready.json");

    const players = await response.json();

    for (const player of players) {
      await setDoc(
        doc(db, "players", player.playerNumber),
        player,
        { merge: true }
      );
    }
  
    toast.success("Players imported successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to import players");
  }
}
  async function clearPlayers() {
  try {
    const snapshot = await getDocs(collection(db, "players"));

    for (const player of snapshot.docs) {
      await deleteDoc(player.ref);
    }

    toast.success("All players deleted");
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete players");
  }
}

  const { players } = useLivePlayers();
  const { teams } = useLiveTeams();
  const { state } = useAuctionState();

  const [q, setQ] = useState("");
  const [bidInput, setBidInput] = useState("");
  const [teamInput, setTeamInput] = useState("");

  const filtered = useMemo(
  () =>
    [...players]
      .sort((a, b) => {
        const numA = Number((a.playerNumber ??"").replace("P", ""));
        const numB = Number((b.playerNumber ??"").replace("P", ""));
        return numA - numB;
      })
      .filter(
        (p) =>
          (
            p.playerNumber?.toLowerCase().includes(q.toLowerCase()) ||
            p.name.toLowerCase().includes(q.toLowerCase())
          ) &&
          p.status !== "sold"
      ),
  [players, q]
);

  const currentPlayer = players.find((p) => p.id === state.playerId);

  return (
    <MobileLayout title="Admin · Auction" showFab={false}>
      <div className="mt-4 space-y-5">

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={importTeams}
            className="rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white"
          >
            Import Teams
          </button>
    
          <button
            onClick={importPlayers}
            className="rounded-xl bg-green-600 py-3 text-sm font-semibold text-white"
          >
            Import Players
        </button>
          <button
            onClick={clearPlayers}
            className="rounded-xl bg-red-600 py-3 text-sm font-semibold text-white"
>
            Clear Players
          </button>
      </div>

        <section className="rounded-2xl glass p-4">
          <div className="flex items-center gap-2 text-gold">
            <Radio className="h-4 w-4" />
            <span className="text-[11px] font-bold uppercase tracking-widest">
              {state.status === "live" ? "Live now" : "Nothing live"}
            </span>
          </div>

          {currentPlayer ? (
            <div className="mt-3">
              <div className="flex items-center gap-3">
                <Avatar initials={currentPlayer.initials} color="#3b82f6" color2="#1e3a8a" size={48} />
                <div>
                  <div className="font-display text-base font-bold">
  {currentPlayer.playerNumber} • {currentPlayer.name}
</div>
                  <div className="text-xs text-muted-foreground">{currentPlayer.role} · Base {formatINR(currentPlayer.basePrice)}</div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Current bid (₹)"
                  value={bidInput}
                  onChange={(e) => setBidInput(e.target.value)}
                  className="rounded-xl bg-card/60 py-2.5 px-3 text-sm border border-border outline-none"
                />
                <select
                  value={teamInput}
                  onChange={(e) => setTeamInput(e.target.value)}
                  className="rounded-xl bg-card/60 py-2.5 px-3 text-sm border border-border outline-none"
                >
                  <option value="">Bidding team…</option>
                  {teams.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => {
                  const bid = Number(bidInput);
                  if (!bid) return toast.error("Enter a bid amount");
                  updateLiveBid(bid, teamInput || null);
                  toast.success("Live bid updated");
                }}
                className="mt-2 w-full rounded-xl glass py-2.5 text-xs font-semibold"
              >
                Push bid update to home page
              </button>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    const price = Number(bidInput);
                    if (!price || !teamInput) return toast.error("Enter bid amount and team first");
                    markSold(currentPlayer.id, teamInput, price);
                    toast.success(`${currentPlayer.name} sold!`);
                    setBidInput(""); setTeamInput("");
                  }}
                  className="flex items-center justify-center gap-1.5 rounded-xl gradient-royal py-2.5 text-xs font-semibold text-white"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" /> Mark Sold
                </button>
                <button
                  onClick={() => {
                    markUnsold(currentPlayer.id);
                    toast("Marked unsold");
                    setBidInput(""); setTeamInput("");
                  }}
                  className="flex items-center justify-center gap-1.5 rounded-xl glass py-2.5 text-xs font-semibold"
                >
                  <XCircle className="h-3.5 w-3.5" /> Mark Unsold
                </button>
              </div>
              <button
                onClick={() => clearLiveAuction()}
                className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl bg-card/60 py-2 text-[11px] text-muted-foreground"
              >
                <RotateCcw className="h-3 w-3" /> Reset to countdown
              </button>
            </div>
          ) : (
            <p className="mt-2 text-xs text-muted-foreground">Select a player below to put them on the block.</p>
          )}
        </section>

        <section>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search Player Number (P1, P2...)"
              className="w-full rounded-2xl bg-card/60 py-3 pl-10 pr-4 text-sm border border-border outline-none"
            />
          </div>
          <div className="mt-3 space-y-2 max-h-[50vh] overflow-y-auto">
            {filtered.map((p) => (
              <button
                key={p.playerNumber}
                onClick={() => {
                  pushPlayerLive(p.id, p.basePrice);
                  setBidInput(String(p.basePrice));
                  toast.success(`${p.name} is now live`);
                }}
                className="flex w-full items-center gap-3 rounded-xl glass p-3 text-left"
              >
                <Avatar initials={p.initials} color="#3b82f6" color2="#1e3a8a" size={36} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">
  {p.playerNumber} • {p.name}
</div>
                  <div className="text-[10px] text-muted-foreground">{p.role} · Base {formatINR(p.basePrice)}</div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </MobileLayout>
  );
}