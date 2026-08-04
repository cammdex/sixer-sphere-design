import { useAuctionState, useLivePlayers, useLiveTeams } from "@/lib/auction-store";

export function LiveAuctionCenter() {
  const { state } = useAuctionState();
  const { players } = useLivePlayers();
  const { teams } = useLiveTeams();

  const currentPlayer = players.find(
    (p) => p.id === state.playerId
  );

  const currentTeam = teams.find(
    (t) => t.id === state.biddingTeamId
  );

  const statusLabel = {
    idle: "NEXT PLAYER",
    live: "LIVE",
    goingOnce: "GOING ONCE",
    goingTwice: "GOING TWICE",
    sold: "SOLD",
    unsold: "UNSOLD",
  }[state.status];
    
  const statusStyles = {
  idle: "border-zinc-500/30 bg-zinc-500/10 text-zinc-300",
  live: "border-red-500/30 bg-red-500/10 text-red-400",
  goingOnce: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  goingTwice: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  sold: "border-green-500/30 bg-green-500/10 text-green-400",
  unsold: "border-zinc-500/30 bg-zinc-500/10 text-zinc-300",
}[state.status];

const statusDot = {
  idle: "bg-zinc-400",
  live: "bg-red-500",
  goingOnce: "bg-amber-400",
  goingTwice: "bg-amber-400",
  sold: "bg-green-500",
  unsold: "bg-zinc-400",
}[state.status];

  return (
  <section className="mt-5 overflow-hidden rounded-[32px] border border-amber-400/30 bg-gradient-to-b from-[#191919] to-[#101010] shadow-2xl">
    {/* Header */}
    <div className="border-b border-amber-400/20 px-8 py-5 text-center">
  <div className={`inline-flex items-center gap-2 rounded-full px-5 py-2 ${statusStyles}`}>
  <div className={`h-2.5 w-2.5 rounded-full animate-pulse ${statusDot}`} />

  <span className="text-sm font-semibold tracking-[0.3em]">
      {state.status === "live"
  ? "LIVE AUCTION"
  : state.status === "sold"
  ? "SOLD"
  : state.status === "unsold"
  ? "UNSOLD"
  : statusLabel}
    </span>
  </div>
</div>

    {/* Player */}
    {/* Player Card */}

<div className="flex justify-center px-8 pt-8">

  {currentPlayer?.playerNumber ? (

    <img
      src={`/player-cards/${currentPlayer.playerNumber}.png`}
      alt={currentPlayer.name}
      className="
        w-full
        max-w-[950px]
        object-contain
        select-none
        drop-shadow-[0_20px_35px_rgba(0,0,0,.22)]
        transition-all
        duration-700
      "
    />

  ) : (

    <div className="py-24 text-center text-zinc-400">

      Waiting for Player...

    </div>

  )}

</div>

   {/* Bid */}
<div className="mt-10 border-y border-amber-400/10 py-12 text-center">

  <p className="text-xs uppercase tracking-[0.45em] text-zinc-500">
    Current Highest Bid
  </p>

  <h2 className="mt-4 text-8xl lg:text-9xl font-black tracking-tight text-amber-300">
    ₹{(state.currentBid ?? 0).toLocaleString("en-IN")}
  </h2>

</div>

    {/* Team */}
    {/* Team */}
<div className="py-10 text-center">

  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/5">

  {currentTeam?.logo ? (
    <img
      src={currentTeam.logo}
      alt={currentTeam.name}
      className="h-20 w-20 object-contain"
    />
  ) : (
    <span className="text-3xl">🏏</span>
  )}

</div>

  <h3 className="mt-5 text-3xl font-bold text-white">
    {currentTeam?.displayName ??
      currentTeam?.name ??
      "Awaiting bids"}
  </h3>

  <div className="mx-auto mt-8 max-w-sm space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5">

    <div className="flex justify-between">
      <span className="text-zinc-400">Base Price</span>
      <span className="font-bold text-white">
        ₹{(currentPlayer?.basePrice ?? 0).toLocaleString("en-IN")}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-zinc-400">Current Highest Bid</span>
      <span className="font-bold text-amber-300">
        ₹{(state.currentBid ?? 0).toLocaleString("en-IN")}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-zinc-400"> Bid Increase</span>
      <span className="font-bold text-green-400">
        +₹{Math.max(
          (state.currentBid ?? 0) - (currentPlayer?.basePrice ?? 0),
          0
        ).toLocaleString("en-IN")}
      </span>
    </div>

  </div>

</div>

    {/* Footer */}

</section>

);
}
