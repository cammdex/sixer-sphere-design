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
  writeBatch,
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
  undoLastSale,
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

async function resetTournament() {
  try {
    const batch = writeBatch(db);

    // Reset every player
    const playerSnap = await getDocs(collection(db, "players"));

    playerSnap.forEach((playerDoc) => {
      batch.update(playerDoc.ref, {
        status: "available",
        soldPrice: null,
        teamId: null,
      });
    });

    // Reset every team
    for (const team of defaultTeams) {
      batch.set(doc(db, "teams", team.id), team);
    }

    // Reset auction state
    batch.set(doc(db, "meta", "auctionState"), {
      playerId: null,
      currentBid: null,
      biddingTeamId: null,
      status: "idle",
      round: 1,
      eventMessage: "",
    });

    await batch.commit();

    toast.success("Tournament reset successfully!");
  } catch (err) {
    console.error(err);
    toast.error("Reset failed");
  }
}

  const { players } = useLivePlayers();
  const { teams } = useLiveTeams();
  const { state } = useAuctionState();

  const [q, setQ] = useState("");
  const [bidInput, setBidInput] = useState("");
  const [teamInput, setTeamInput] = useState("");
  const selectedTeam = teams.find((t) => t.id === teamInput);

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

        <div className="grid grid-cols-4 gap-3">
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
          <button
  onClick={() => {
  const confirmed = window.confirm(
    "⚠️ This will reset the ENTIRE tournament.\n\nAll sold players, team purses, player assignments, maximum bids and the live auction will be restored to their starting values.\n\nThis action cannot be undone.\n\nAre you sure?"
  );

  if (confirmed) {
    resetTournament();
  }
}}
>
  Reset Tournament
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
              <div className="mt-3 space-y-3">

  <div>
    <label className="mb-1 block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
      Current Bid
    </label>

    <input
      type="number"
      placeholder="Current bid (₹)"
      value={bidInput}
      onChange={(e) => setBidInput(e.target.value)}
      className="w-full rounded-xl bg-card/60 py-3 px-3 text-sm border border-border outline-none"
    />
  </div>

  <div className="grid grid-cols-4 gap-2">
  {[20000, 50000, 100000, 200000].map((inc) => (
    <button
      key={inc}
      type="button"
      onClick={() => {
        if (!teamInput) {
          toast.error("Select a leading team first");
          return;
        }

        const nextBid = Number(bidInput || 0) + inc;

        setBidInput(String(nextBid));

        updateLiveBid(nextBid, teamInput);
      }}
      className="rounded-xl glass py-2 text-xs font-semibold"
    >
      +{formatINR(inc)}
    </button>
  ))}
</div>

  <div>
  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
    Leading Team
  </label>

  <div className="grid grid-cols-4 gap-2">

    {teams.map((team) => (
      <button
  key={team.id}
  type="button"
  onClick={() => {
    setTeamInput(team.id);

    const bid = Number(bidInput || 0);

    if (bid > 0) {
      updateLiveBid(bid, team.id);
    }
  }}
        className={`rounded-xl p-2 transition-all ${
          teamInput === team.id
            ? "border-2 border-gold bg-gold/10"
            : "border border-border glass"
        }`}
      >
        <div className="flex flex-col items-center gap-1">

          <TeamCrest
            short={team.short}
            color={team.color}
            color2={team.color2}
            size={38}
          />

          <span className="text-[8px] font-medium leading-tight text-center">
            {team.displayName}
          </span>

        </div>
      </button>
    ))}

  </div>
</div>

</div>
              <button
  onClick={() => {
  toast.success("Live auction already updated");
}}
  className="mt-2 w-full rounded-xl gradient-royal py-3 text-sm font-semibold text-white"
>
  Update Live Auction
</button>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
  onClick={async () => {
    const price = Number(bidInput);

    if (!price) {
      return toast.error("Invalid bid");
    }

    if (!teamInput) {
      return toast.error("Select the winning team");
    }

   const sold = await markSold(
  currentPlayer.id,
  teamInput,
  price
);

if (!sold) {
  return;
}

toast.success(
  `${currentPlayer.name} sold to ${
    teams.find((t) => t.id === teamInput)?.short
  }`
);

setBidInput("");
setTeamInput("");
  }}
                  className="flex items-center justify-center gap-1.5 rounded-xl gradient-royal py-2.5 text-xs font-semibold text-white"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" /> Mark Sold
                </button>
                <button
  onClick={async () => {
    await markUnsold(currentPlayer.id);

    toast.success(`${currentPlayer.name} marked unsold`);

    setBidInput("");
    setTeamInput("");
  }}
                  className="flex items-center justify-center gap-1.5 rounded-xl glass py-2.5 text-xs font-semibold"
                >
                  <XCircle className="h-3.5 w-3.5" /> Mark Unsold
                </button>
              </div>
              <div className="mt-2 space-y-2">

  <button
    onClick={async () => {
      if (!confirm("Are you sure you want to undo the last sale?")) return;

      try {
    await undoLastSale();
    toast.success("Last sale has been undone");
} catch (err) {
    toast.error("No sale available to undo");
}
    }}
    className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-2.5 text-sm font-semibold text-white"
  >
    <RotateCcw className="h-4 w-4" />
    Undo Last Sale
  </button>

  <button
    onClick={async () => {
      if (!confirm("Are you sure you want to reset the live auction?")) return;

      await clearLiveAuction();

toast.success("Auction reset");
    }}
    className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-card/60 py-2 text-[11px] text-muted-foreground"
  >
    <RotateCcw className="h-3 w-3" />
    Reset to Countdown
  </button>

</div>
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

  setTeamInput("");

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