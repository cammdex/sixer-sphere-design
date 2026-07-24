import { useEffect, useState } from "react";
import { Radio } from "lucide-react";
import { tournament } from "@/lib/gpl-data";
import { useAuctionState, useLivePlayers, useLiveTeams } from "@/lib/auction-store";
import { toast } from "sonner";
import { CountdownTimer } from "@/components/home/CountdownTimer";
import { LivePlayerCard } from "@/components/home/LivePlayerCard";

function useCountdown(target: string) {
  const targetMs = new Date(target).getTime();
  const [now, setNow] = useState(() => targetMs);
  useEffect(() => {
    setNow(Date.now());
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const diff = Math.max(0, targetMs - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

export function HeroSection() {
  const c = useCountdown(tournament.auctionDate);
  const { state: auction } = useAuctionState();
  const { players } = useLivePlayers();

  const isAuctionActive =
  auction.status === "live" ||
  auction.status === "goingOnce" ||
  auction.status === "goingTwice" ||
  auction.status === "sold" ||
  auction.status === "unsold";
  const currentPlayer = players.find((p) => p.id === auction.playerId);
  const { teams } = useLiveTeams();

  const currentTeam = teams.find((t) => t.id === auction.biddingTeamId);

  return (
    <section className="relative mt-2 overflow-hidden rounded-[36px] p-8 md:p-10 glass-gold transition-all duration-500">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, oklch(0.82 0.14 85 / 0.7), transparent 70%)" }} />
      <div className="absolute -bottom-12 -left-6 h-40 w-40 rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, oklch(0.55 0.22 260 / 0.7), transparent 70%)" }} />
      <div className="relative">
        {isAuctionActive && currentPlayer ? (
           <>
  <div
    className={`mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-[0.22em] ${
      auction.status === "live"
        ? "bg-red-500/15 text-red-400 border border-red-500/40"
        : auction.status === "goingOnce"
        ? "bg-amber-500/15 text-amber-400 border border-amber-500/40"
        : auction.status === "goingTwice"
        ? "bg-orange-500/15 text-orange-400 border border-orange-500/40"
        : auction.status === "sold"
  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/40"
  : auction.status === "unsold"
  ? "bg-red-500/15 text-red-400 border border-red-500/40"
  : "bg-muted"
    }`}
  >
    <span className="h-2 w-2 rounded-full bg-current animate-pulse" />

    {{
  live: "LIVE BIDDING",
  goingOnce: "GOING ONCE",
  goingTwice: "GOING TWICE",
  sold: "SOLD",
  unsold: "UNSOLD",
}[auction.status]}
  </div>

  <LivePlayerCard
player={currentPlayer}
currentBid={auction.currentBid ?? undefined}
status={auction.status}
teamName={currentTeam?.displayName}
teamLogo={currentTeam?.logo}
/>

  {auction.eventMessage && (
  <div className="mt-4 text-center">
    <p className="text-lg font-semibold text-gold">
      {auction.eventMessage}
    </p>
  </div>
)}
</>
        ) : (
          <>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold pulse-ring" />
              Auction Countdown
            </div>
            <div className="mt-5 max-w-3xl">
  <div className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-gold">
  ✦ {tournament.shortName} OFFICIAL AUCTION
</div>

  <h1 className="mt-3 font-display text-5xl md:text-6xl font-black leading-none tracking-tight">
  {tournament.name}
</h1>

  <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground/90">
    {tournament.tagline || "The official player auction for Season 2."}
  </p>
</div>

<div className="my-8 flex items-center justify-center gap-4 opacity-90">
  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
  <div className="text-gold text-xs">✦</div>
  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
</div>

            <CountdownTimer
  days={c.d}
  hours={c.h}
  minutes={c.m}
  seconds={c.s}
/>
    

            <button
              onClick={() => {
  if (isAuctionActive) {
    toast.success("Entering Live Auction...");
  } else {
    toast("Auction hasn't started yet.");
  }
}}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl py-3 font-semibold transition-all duration-300 active:scale-95"
style={{
  background:
    "linear-gradient(180deg,#6f4d33,#4b3323)",
  border:
    "1px solid rgba(201,166,108,.35)",
  boxShadow:
    "0 8px 18px rgba(60,35,15,.25)"
}}
            >
              <Radio className="h-4 w-4" />
              {isAuctionActive ? "Enter Live Auction" : "Auction Starts Soon"}
            </button>
          </>
        )}
      </div>

      <div className="mt-5 flex justify-center opacity-70">
  <div className="flex items-center gap-3">
    <div className="h-px w-14 bg-gold/40" />
    <span className="text-gold text-xs">❖</span>
    <div className="h-px w-14 bg-gold/40" />
  </div>
</div>
    </section>
  );
}