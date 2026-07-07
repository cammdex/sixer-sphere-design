import { useEffect, useState } from "react";
import { Radio } from "lucide-react";
import { Avatar, TeamCrest } from "@/components/mobile-layout";
import { tournament, formatINR } from "@/lib/gpl-data";
import { useAuctionState, useLivePlayers, useLiveTeams } from "@/lib/auction-store";
import { toast } from "sonner";

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
  const { teams } = useLiveTeams();

  const isLive = auction.status === "live";
  const currentPlayer = players.find((p) => p.id === auction.playerId);
  const biddingTeam = teams.find((t) => t.id === auction.biddingTeamId);

  return (
    <section className="relative mt-2 overflow-hidden rounded-3xl p-5 glass-gold">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, oklch(0.82 0.14 85 / 0.7), transparent 70%)" }} />
      <div className="absolute -bottom-12 -left-6 h-40 w-40 rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, oklch(0.55 0.22 260 / 0.7), transparent 70%)" }} />
      <div className="relative">
        {isLive && currentPlayer ? (
          <>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 pulse-ring" />
              Live now
            </div>
            <div className="mt-3 flex items-center gap-3">
              {currentPlayer.imageUrl ? (
                <img
                  src={currentPlayer.imageUrl}
                  alt={currentPlayer.name}
                  className="h-20 w-20 rounded-2xl object-cover shadow-glow"
                />
              ) : (
                <Avatar initials={currentPlayer.initials} color="#3b82f6" color2="#1e3a8a" size={72} />
              )}
              <div className="min-w-0">
                <h1 className="font-display text-xl font-extrabold leading-tight">{currentPlayer.name}</h1>
                <div className="text-xs uppercase tracking-widest text-gold">{currentPlayer.role}</div>
                <div className="mt-1 text-xs text-muted-foreground">Base {formatINR(currentPlayer.basePrice)}</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="glass rounded-xl py-2.5 text-center">
                <div className="font-display text-xl font-bold tabular-nums text-gold">
                  {auction.currentBid ? formatINR(auction.currentBid) : "—"}
                </div>
                <div className="mt-0.5 text-[9px] uppercase tracking-widest text-muted-foreground">Current bid</div>
              </div>
              <div className="glass flex items-center justify-center gap-2 rounded-xl py-2.5 text-center">
                {biddingTeam ? (
                  <>
                    <TeamCrest short={biddingTeam.short} color={biddingTeam.color} color2={biddingTeam.color2} size={24} />
                    <span className="text-sm font-bold">{biddingTeam.short}</span>
                  </>
                ) : (
                  <span className="text-xs text-muted-foreground">Bidding open</span>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold pulse-ring" />
              Auction countdown
            </div>
            <h1 className="mt-3 font-display text-2xl font-extrabold leading-tight">
              <span className="text-gold">Galaxy</span> Premier League
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{tournament.tagline}</p>

            <div className="mt-4 grid grid-cols-4 gap-2">
              {[{ v: c.d, l: "Days" }, { v: c.h, l: "Hours" }, { v: c.m, l: "Mins" }, { v: c.s, l: "Secs" }].map((u) => (
                <div key={u.l} className="glass rounded-xl py-2.5 text-center">
                  <div className="font-display text-xl font-bold tabular-nums text-gold">{String(u.v).padStart(2, "0")}</div>
                  <div className="mt-0.5 text-[9px] uppercase tracking-widest text-muted-foreground">{u.l}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => toast.success("Going live soon", { description: "Stream opens 15 min before the auction." })}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl gradient-royal px-4 py-3 text-sm font-semibold text-white shadow-glow transition-transform active:scale-[0.98]"
            >
              <Radio className="h-4 w-4" />
              View Auction Live
            </button>
          </>
        )}
      </div>
    </section>
  );
}