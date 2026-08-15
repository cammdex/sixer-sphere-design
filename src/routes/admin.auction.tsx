import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, Radio, CheckCircle2, XCircle, RotateCcw, ChevronDown, ChevronRight} from "lucide-react";
import { MobileLayout, TeamCrest, Avatar } from "@/components/mobile-layout";

import { formatINR, teams as defaultTeams } from "@/lib/gpl-data";
import { players as defaultPlayers } from "@/lib/data/players";

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
  startLiveTransition,
  pushPlayerLive,
  placeBid,
  updateLiveBid,
  rewindBid,
  markSold,
  markUnsold,
  clearLiveAuction,
  undoLastSale,
  setGoingOnce,
  setGoingTwice,
} from "@/lib/auction-store";


import { toast } from "sonner";

export const Route = createFileRoute("/admin/auction")({
  component: AdminAuctionPage,
});

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "changeme";

function AdminAuctionPage() {
  const [unlocked, setUnlocked] = useState(false);
const [pw, setPw] = useState("");

useEffect(() => {
  setUnlocked(sessionStorage.getItem("auctionAdmin") === "true");
}, []);

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
            onKeyDown={(e) => {
  if (e.key === "Enter") {
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem("auctionAdmin", "true");
      setUnlocked(true);
    } else {
      toast.error("Wrong password");
    }
  }
}}
            placeholder="Password"
            className="w-full rounded-2xl bg-card/60 py-3 px-4 text-sm border border-border focus:border-primary outline-none"
          />
          <button
              onClick={() => {
  if (pw === ADMIN_PASSWORD) {
    sessionStorage.setItem("auctionAdmin", "true");
    setUnlocked(true);
  } else {
    toast.error("Wrong password");
  }
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
    for (const player of defaultPlayers) {
      await setDoc(
        doc(db, "players", player.playerNumber ?? player.id),
        player,
        { merge: true }
      );
    }

    toast.success("Final auction player data synced successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to sync final player data");
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

// Clear all auction events
const eventsSnap = await getDocs(collection(db, "events"));
await Promise.all(
  eventsSnap.docs.map((eventDoc) => deleteDoc(eventDoc.ref))
);

// Clear sales history
const salesSnap = await getDocs(collection(db, "sales"));
await Promise.all(
  salesSnap.docs.map((saleDoc) => deleteDoc(saleDoc.ref))
);

// Remove last sale cache
await deleteDoc(doc(db, "meta", "lastSale"));

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
const [teamInput, setTeamInput] = useState("");

const [jumpBidInput, setJumpBidInput] = useState("");
const [updatingJumpBid, setUpdatingJumpBid] = useState(false);

const [showUtilities, setShowUtilities] = useState(false);
  const [pendingPlayer, setPendingPlayer] = useState<any>(null);
const [showPushDialog, setShowPushDialog] = useState(false);
const [auctionRound, setAuctionRound] = useState<1 | 2 | 3>(1);

  const availablePlayers = useMemo(
  () =>
    [...players]
      .filter((p) => p.status === "available")
      .sort((a, b) => {
        const numA = Number((a.playerNumber ?? "").replace("P", ""));
        const numB = Number((b.playerNumber ?? "").replace("P", ""));
        return numA - numB;
      })
      .filter(
        (p) =>
          p.playerNumber?.toLowerCase().includes(q.toLowerCase()) ||
          p.name.toLowerCase().includes(q.toLowerCase())
      ),
  [players, q]
);

const unsoldPlayers = useMemo(
  () =>
    [...players]
      .filter((p) => p.status === "unsold")
      .sort((a, b) => {
        const numA = Number((a.playerNumber ?? "").replace("P", ""));
        const numB = Number((b.playerNumber ?? "").replace("P", ""));
        return numA - numB;
      })
      .filter(
        (p) =>
          p.playerNumber?.toLowerCase().includes(q.toLowerCase()) ||
          p.name.toLowerCase().includes(q.toLowerCase())
      ),
  [players, q]
);

const extrasPlayers = useMemo(
  () =>
    [...players]
      .filter((p) => p.status === "extras")
      .sort((a, b) => {
        const numA = Number((a.playerNumber ?? "").replace("P", ""));
        const numB = Number((b.playerNumber ?? "").replace("P", ""));
        return numA - numB;
      })
      .filter(
        (p) =>
          p.playerNumber?.toLowerCase().includes(q.toLowerCase()) ||
          p.name.toLowerCase().includes(q.toLowerCase())
      ),
  [players, q]
);

  const currentPlayer = players.find((p) => p.id === state.playerId);
  useEffect(() => {
  function handleEscape(e: KeyboardEvent) {
    if (e.key === "Escape") {
      setPendingPlayer(null);
      setShowPushDialog(false);
    }
  }

  if (showPushDialog) {
    window.addEventListener("keydown", handleEscape);
  }

  return () => {
    window.removeEventListener("keydown", handleEscape);
  };
}, [showPushDialog]);


  return (
    <MobileLayout title="Admin · Auction" showFab={false}>
      <div className="mt-4 space-y-5">

       <div className="rounded-2xl glass overflow-hidden">

  <button
    onClick={() => setShowUtilities(!showUtilities)}
    className="flex w-full items-center justify-between px-4 py-3 text-left"
  >
    <div>
      <div className="text-sm font-semibold">
        Tournament Utilities
      </div>
      <div className="text-xs text-muted-foreground">
        Import • Reset • Maintenance
      </div>
    </div>

    {showUtilities ? (
      <ChevronDown className="h-5 w-5" />
    ) : (
      <ChevronRight className="h-5 w-5" />
    )}
  </button>

  {showUtilities && (
    <div className="grid grid-cols-2 gap-3 border-t border-border p-4">

<button
  onClick={async (e) => {
  const btn = e.currentTarget;
  btn.disabled = true;
  try {
    await importTeams();
  } finally {
    btn.disabled = false;
  }
}}
  className="rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white"
>
  Import Teams
</button>

<button
  onClick={async (e) => {
  const btn = e.currentTarget;
  btn.disabled = true;
  try {
    await importPlayers();
  } finally {
    btn.disabled = false;
  }
}}
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
  className="rounded-xl bg-amber-600 py-3 text-sm font-semibold text-white"
>
  Reset Tournament
</button>


    </div>
  )}

</div>

        <section className="rounded-2xl border-2 border-gold glass p-4 shadow-lg">
          <div
  className={`flex items-center gap-2 ${
    state.status === "live"
      ? "text-green-500"
      : state.status === "goingOnce"
      ? "text-amber-500"
      : state.status === "goingTwice"
      ? "text-orange-500"
      : state.status === "sold"
      ? "text-emerald-600"
      : state.status === "unsold"
      ? "text-red-500"
      : "text-muted-foreground"
  }`}
>
            <Radio className="h-4 w-4" />
          <span className="text-[11px] font-bold uppercase tracking-widest">
  {{
    idle: "Nothing Live",
    transition: "LIVE TRANSITION",
    live: "LIVE",
    goingOnce: "GOING ONCE",
    goingTwice: "GOING TWICE",
    sold: "SOLD",
    unsold: "UNSOLD",
  }[state.status] ?? "Unknown"}
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

  <div className="rounded-xl bg-card/60 border border-border px-4 py-3">
    <div className="text-2xl font-bold">
      {state.currentBid ? formatINR(state.currentBid) : "—"}
    </div>
  </div>
  <div className="rounded-xl border border-border bg-card/60 p-4 space-y-3">

  <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
    Update Current Bid (Lakhs)
  </label>

  <div className="flex gap-2">

    <input
      type="number"
      placeholder="e.g. 42"
      value={jumpBidInput}
      onChange={(e) => setJumpBidInput(e.target.value)}
      className="flex-1 rounded-xl border border-border bg-background px-3 py-2 outline-none"
    />

    <button
      disabled={updatingJumpBid}
      onClick={async () => {
        if (!teamInput) {
          toast.error("Select the current leading team first.");
          return;
        }

        const lakhs = parseFloat(jumpBidInput.trim());

        if (!Number.isFinite(lakhs) || lakhs <= 0) {
          toast.error("Enter a valid amount.");
          return;
        }

        const amount = lakhs * 100000;

        if (state.currentBid && amount <= state.currentBid) {
          toast.error("Amount must be higher than current bid.");
          return;
        }

        setUpdatingJumpBid(true);

        try {
          await updateLiveBid(amount, teamInput);
          setTeamInput(teamInput);

          setJumpBidInput("");

          toast.success(
  `Bid updated to ${formatINR(amount)}`
);
        } finally {
          setUpdatingJumpBid(false);
        }
      }}
      className="rounded-xl bg-blue-600 px-4 text-white font-semibold"
    >
      Update
    </button>

  </div>

</div>
</div>
<button
  onClick={async () => {
    try {
      const result = await rewindBid();

      if (!result) {
        toast.error("Already at base price.");
        return;
      }

      setTeamInput(result.biddingTeamId ?? "");

      toast.success("Returned to previous bid.");
    } catch {
      toast.error("Failed to rewind bid.");
    }
  }}
  className="w-full rounded-xl bg-red-600 py-3 text-sm font-semibold text-white"
>
  ← Rewind Last Bid
</button>

<div className="rounded-2xl border border-amber-300/30 bg-amber-50/40 px-4 py-4 text-center">
  <p className="text-[11px] uppercase tracking-[0.25em] text-amber-700">
    Bidding
  </p>

  <h3 className="mt-2 text-xl font-bold text-amber-900">
    Click a Team to Place a Bid
  </h3>

  <p className="mt-2 text-sm text-amber-800/80">
    • First click keeps the bid at the player's base price.
    <br />
    • Every new team automatically raises the bid.
  </p>
</div>

  <div>
  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
    Leading Team
  </label>

  <div className="grid grid-cols-2 gap-3">

    {teams.map((team) => (
      <button
  key={team.id}
  type="button"
  onClick={async () => {
  setTeamInput(team.id);

  try {
    await placeBid(team.id);
  } catch {
    toast.error("Failed to place bid.");
  }
}}
        className={`rounded-xl p-2 transition-all ${
          teamInput === team.id
            ? "border-2 border-gold bg-gold/10"
            : "border border-border glass"
        }`}
      >
        <div className="text-center">
  <span className="text-sm font-semibold">
    {team.displayName}
  </span>
</div>
      </button>
    ))}

  </div>
</div>

</div>
              

              <div className="mt-3 grid grid-cols-3 gap-2">
                <button
  disabled={
  state.status !== "goingTwice" ||
  !currentPlayer
}
  onClick={async () => {
    const price = state.currentBid;

if (!price) {
  return toast.error("No current bid");
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

setTeamInput("");
setQ("");
  }}
                  className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold text-white transition-all ${
  state.status !== "goingTwice" ||
  !teamInput ||
  !state.currentBid
    ? "bg-muted cursor-not-allowed opacity-50"
    : "gradient-royal"
}`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" /> Mark Sold
                </button>
                <button
  disabled={state.status !== "goingTwice"}
  onClick={async () => {
    console.log("Before markUnsold", state);

    await markUnsold(currentPlayer.id);

    console.log("After markUnsold");

    toast.success(`${currentPlayer.name} marked unsold`);

    setTeamInput("");
    setQ("");
  }}
  className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold ${
    state.status === "goingTwice"
      ? "glass"
      : "bg-muted opacity-50 cursor-not-allowed"
  }`}
>
  <XCircle className="h-3.5 w-3.5" />
  Mark Unsold
</button>


<button
  onClick={async () => {
  if (!confirm("Remove the current player from the live auction?")) return;

  await clearLiveAuction();

  setTeamInput("");
  setQ("");

  toast.success("Current player removed.");
}}

  className="flex items-center justify-center gap-1.5 rounded-xl bg-red-500 py-2.5 text-xs font-semibold text-white"
>
  Cancel Player
</button>

<div className="mt-3 grid grid-cols-2 gap-2">
  <button
  disabled={state.status !== "live"}
  onClick={async () => {
    await setGoingOnce();
    toast.success("Going Once");
  }}
  className={`rounded-xl py-2.5 text-xs font-semibold text-white ${
    state.status === "live"
      ? "bg-amber-500"
      : "bg-muted opacity-50 cursor-not-allowed"
  }`}
>
  Going Once
</button>

 <button
  disabled={state.status !== "goingOnce"}
  onClick={async () => {
    await setGoingTwice();
    toast.success("Going Twice");
  }}
  className={`rounded-xl py-2.5 text-xs font-semibold text-white ${
    state.status === "goingOnce"
      ? "bg-orange-500"
      : "bg-muted opacity-50 cursor-not-allowed"
  }`}
>
  Going Twice
</button>

</div>

              </div>
              <div className="mt-2 space-y-2">

  

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
        {!currentPlayer && (
        <section>

          <div className="mb-3 flex gap-2">
  <button
    type="button"
    onClick={() => setAuctionRound(1)}
    className={`flex-1 rounded-xl py-3 text-xs font-semibold ${
      auctionRound === 1
        ? "gradient-royal text-white"
        : "glass text-muted-foreground"
    }`}
  >
    Round 1
  </button>

  <button
    type="button"
    onClick={() => setAuctionRound(2)}
    className={`flex-1 rounded-xl py-3 text-xs font-semibold ${
      auctionRound === 2
        ? "gradient-royal text-white"
        : "glass text-muted-foreground"
    }`}
  >
    Round 2 — Unsold
  </button>

<button
  type="button"
  onClick={() => setAuctionRound(3)}
  className={`flex-1 rounded-xl py-3 text-xs font-semibold ${
    auctionRound === 3
      ? "gradient-royal text-white"
      : "glass text-muted-foreground"
  }`}
>
  Round 3 — Extras
</button>

</div>

          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
            disabled={showPushDialog}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={
  auctionRound === 2
    ? "Search Unsold Player (P1, P2...)"
    : auctionRound === 3
      ? "Search Extra Player (P1, P2...)"
      : "Search Player Number (P1, P2...)"
}
              className="w-full rounded-2xl bg-card/60 py-4 pl-10 pr-4 text-base border border-border outline-none"
            />
          </div>
          <div
  className={`mt-3 space-y-2 max-h-[50vh] overflow-y-auto ${
    showPushDialog ? "pointer-events-none opacity-40" : ""
  }`}
>
            {(
  auctionRound === 1
    ? availablePlayers
    : auctionRound === 2
      ? unsoldPlayers
      : extrasPlayers
).map((p) => (
              <button
                key={p.id}

                onClick={() => {
  setPendingPlayer(p);
  setShowPushDialog(true);
}}

                className="flex w-full items-center gap-3 rounded-xl glass p-4 text-left"
              >
                <Avatar 
                initials={p.initials} 
                color="#3b82f6" 
                color2="#1e3a8a" 
                size={46} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-base font-semibold">
  {p.playerNumber} • {p.name}
</div>
                  <div className="text-[10px] text-muted-foreground">{p.role} · Base {formatINR(p.basePrice)}</div>
                </div>
              </button>
            ))}
          </div>
          
        </section>
        )}
      </div>
      {showPushDialog && pendingPlayer && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
    <div className="w-full max-w-sm rounded-2xl bg-card p-6">

      <h2 className="text-lg font-bold">
  {
  auctionRound === 1
    ? "Push Player Live?"
    : `Push Player Live — Round ${auctionRound}?`
}
</h2>

      <p className="mt-2 text-sm text-muted-foreground">
        {pendingPlayer.playerNumber} • {pendingPlayer.name}
      </p>

      <div className="mt-6 flex gap-3">

  <button
    onClick={() => {
      setPendingPlayer(null);
      setShowPushDialog(false);
    }}
    className="flex-1 rounded-xl border border-border bg-card/60 py-3 font-semibold"
  >
    Cancel
  </button>

  <button
    autoFocus
    onClick={async () => {
      try {
        // Start the broadcast transition
await startLiveTransition(
  pendingPlayer.id,
  pendingPlayer.basePrice,
  auctionRound
);

// Wait for the broadcast sting
await new Promise((resolve) =>
  setTimeout(resolve, 1800)
);

// Now actually push the player live
await pushPlayerLive(
  pendingPlayer.id,
  pendingPlayer.basePrice,
  auctionRound
);

setTeamInput("");

toast.success(
  `${pendingPlayer.name} is now live for Round ${auctionRound}`
);

        setPendingPlayer(null);
        setShowPushDialog(false);
      } catch (err) {
        toast.error(
          err instanceof Error
            ? err.message
            : "Failed to push player live."
        );
      }
    }}
    className="flex-1 rounded-xl gradient-royal py-3 text-white font-semibold"
  >
    Push Live
  </button>

</div>

    </div>
  </div>
)}
    </MobileLayout>
  );
}