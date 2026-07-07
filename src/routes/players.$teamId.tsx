import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, Crown, Wallet, Gavel, TrendingUp, Plus } from "lucide-react";
import { MobileLayout, TeamCrest, Avatar } from "@/components/mobile-layout";
import { teamById, players, formatINR, teamSpent, teams, type Player } from "@/lib/gpl-data";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/players/$teamId")({
  head: ({ params }) => ({
    meta: [
      { title: `${teamById(params.teamId)?.name ?? "Team"} — Sanchi UBL 2026` },
      { name: "description", content: "Team roster, live auction purse, next highest bid and player list." },
    ],
  }),
  component: TeamDetailPage,
});

function TeamDetailPage() {
  const { teamId } = useParams({ from: "/players/$teamId" });
  const team = teamById(teamId);

  const roster = useMemo(() => players.filter((p) => p.teamId === teamId), [teamId]);
  const initialSpent = useMemo(() => teamSpent(teamId), [teamId]);
  const initialNext = team?.nextBid.amount ?? 0;

  // Live auction state
  const [spent, setSpent] = useState(initialSpent);
  const [nextBid, setNextBid] = useState(initialNext);
  const [lastBidder, setLastBidder] = useState<string>(team?.nextBid.bidderOwner ?? "");
  const [bidTarget, setBidTarget] = useState<string>(team?.nextBid.playerName ?? "");
  const [pulse, setPulse] = useState(false);
  const [selected, setSelected] = useState<Player | null>(null);

  useEffect(() => {
    setSpent(initialSpent);
    setNextBid(initialNext);
    setLastBidder(team?.nextBid.bidderOwner ?? "");
    setBidTarget(team?.nextBid.playerName ?? "");
  }, [teamId, initialSpent, initialNext, team]);

  if (!team) {
    return (
      <MobileLayout title="Team not found">
        <div className="mt-10 text-center text-sm text-muted-foreground">This team doesn't exist.</div>
      </MobileLayout>
    );
  }

  const purse = team.purse;
  const remaining = Math.max(0, purse - spent);
  const pct = Math.min(100, Math.round((spent / purse) * 100));

  const placeBid = () => {
    const increment = 100000; // ₹1L increment
    const newBid = nextBid + increment;
    if (spent + newBid > purse) {
      toast.error("Purse exceeded", { description: `${team.short} cannot afford this bid.` });
      return;
    }
    setNextBid(newBid);
    setLastBidder(team.owner);
    setPulse(true);
    setTimeout(() => setPulse(false), 600);
    toast.success(`${team.short} bid ${formatINR(newBid)}`, { description: `for ${bidTarget}` });
  };

  const sealBid = () => {
    if (spent + nextBid > purse) {
      toast.error("Purse exceeded");
      return;
    }
    setSpent((s) => s + nextBid);
    toast.success("SOLD!", { description: `${bidTarget} → ${team.short} for ${formatINR(nextBid)}` });
    // reset for next player
    const nextPlayer = ["Aditya Nair", "Ronit Shah", "Kabir Patel", "Neel Rao", "Yug Kapoor"][Math.floor(Math.random() * 5)];
    setBidTarget(nextPlayer);
    setNextBid(500000);
    setLastBidder("—");
  };

  return (
    <MobileLayout title={team.short + " · Auction"} showFab={false}>
      {/* Back link */}
      <Link to="/players" className="mt-2 inline-flex items-center gap-1 text-[12px] font-medium text-muted-foreground hover:text-gold">
        <ChevronLeft className="h-3.5 w-3.5" /> All teams
      </Link>

      {/* Team header */}
      <section className="relative mt-3 overflow-hidden rounded-3xl glass p-5">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-40 blur-3xl"
          style={{ background: `radial-gradient(circle, ${team.color}, transparent 70%)` }} />
        <div className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full opacity-30 blur-3xl"
          style={{ background: `radial-gradient(circle, ${team.color2}, transparent 70%)` }} />
        <div className="relative flex items-center gap-4">
          <TeamCrest short={team.short} color={team.color} color2={team.color2} size={72} />
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-xl font-extrabold leading-tight">{team.name}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
              <span className="text-gold">C</span> {team.captain}
              <span className="text-white/20">•</span>
              <Crown className="h-3 w-3 text-gold" /> {team.owner}
            </div>
            <div className="mt-2 inline-flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground">
              <span><b className="text-white">{team.wins}</b>W</span>
              <span><b className="text-white">{team.losses}</b>L</span>
              <span className="text-gold"><b>{team.points}</b> Pts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Auction cards */}
      <section className="mt-4 grid grid-cols-1 gap-3">
        {/* Total purse */}
        <article className="relative overflow-hidden rounded-2xl glass-gold p-4">
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-50 blur-3xl"
            style={{ background: "radial-gradient(circle, oklch(0.82 0.14 85 / 0.7), transparent 70%)" }} />
          <div className="relative flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1 rounded-full bg-gold/15 border border-gold/30 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-gold">
                <Wallet className="h-3 w-3" /> Total Purse
              </div>
              <div className="mt-2 font-display text-2xl font-extrabold text-gold tabular-nums">{formatINR(remaining)}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Remaining of {formatINR(purse)}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Spent</div>
              <div className="font-display text-lg font-bold tabular-nums">{formatINR(spent)}</div>
            </div>
          </div>
        </article>

        {/* Next highest bid */}
        <article className={`relative overflow-hidden rounded-2xl glass p-4 transition-all ${pulse ? "shadow-glow-gold ring-1 ring-gold/40" : ""}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1 rounded-full bg-primary/15 border border-primary/30 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-primary">
                <Gavel className="h-3 w-3" /> Next Highest Bid
              </div>
              <div className={`mt-2 font-display text-2xl font-extrabold tabular-nums transition-transform ${pulse ? "scale-110 text-gold" : ""}`}>
                {formatINR(nextBid)}
              </div>
              <div className="text-[11px] text-muted-foreground">
                for <span className="font-semibold text-foreground">{bidTarget}</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-gold">
                <TrendingUp className="h-3 w-3" />
                <span>By {lastBidder}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <button
                onClick={placeBid}
                className="flex items-center gap-1 rounded-xl gradient-royal px-3 py-2 text-[11px] font-semibold text-white shadow-glow active:scale-95"
              >
                <Plus className="h-3 w-3" /> +₹1L
              </button>
              <button
                onClick={sealBid}
                className="rounded-xl gradient-gold px-3 py-2 text-[11px] font-semibold text-gold-foreground shadow-glow-gold active:scale-95"
              >
                SOLD
              </button>
            </div>
          </div>
        </article>

        {/* Usage bar */}
        <article className="relative overflow-hidden rounded-2xl glass p-4">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-bold uppercase tracking-widest text-gold">Purse Usage</div>
            <div className="font-display text-sm font-bold tabular-nums">{pct}<span className="text-muted-foreground">%</span></div>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/8 border border-border">
            <div
              className="relative h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${team.color}, ${team.color2})` }}
            >
              <div className="absolute inset-0 opacity-40" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.35), transparent)" }} />
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
            <span>{formatINR(spent)} used</span>
            <span>{formatINR(remaining)} free</span>
          </div>
        </article>
      </section>

      {/* Roster */}
      <section className="mt-6">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-base font-bold">Squad <span className="text-muted-foreground text-[12px] font-medium">({roster.length})</span></h2>
          <Link to="/players" className="text-[11px] font-medium text-gold">Full catalog ›</Link>
        </div>

        {roster.length === 0 ? (
          <div className="mt-4 rounded-2xl glass p-6 text-center text-sm text-muted-foreground">
            No players signed yet. Bidding is live.
          </div>
        ) : (
          <div className="mt-3 grid grid-cols-2 gap-3">
            {roster.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                className="group relative overflow-hidden rounded-2xl glass p-3 text-left transition-transform active:scale-[0.98]"
              >
                <div className="flex items-start justify-between">
                  <Avatar initials={p.initials} color={team.color} color2={team.color2} size={44} />
                  <span className="rounded-full bg-gold/15 border border-gold/30 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gold">
                    {p.role === "Wicket Keeper" ? "WK" : p.role.slice(0, 3).toUpperCase()}
                  </span>
                </div>
                <h3 className="mt-2 truncate font-display text-sm font-bold">{p.name}</h3>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.age}y · {p.batting.split("-")[0]}</div>
                <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
                  <div>
                    <div className="text-[9px] uppercase text-muted-foreground">Sold</div>
                    <div className="font-display text-[12px] font-bold text-gold">{p.soldPrice ? formatINR(p.soldPrice) : "—"}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] uppercase text-muted-foreground">Mat</div>
                    <div className="font-display text-[12px] font-bold tabular-nums">{p.stats.matches}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Other teams strip */}
      <section className="mt-6">
        <h3 className="font-display text-[13px] font-bold">Jump to team</h3>
        <div className="-mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-1 no-scrollbar">
          {teams.filter((t) => t.id !== teamId).map((t) => (
            <Link
              key={t.id}
              to="/players/$teamId"
              params={{ teamId: t.id }}
              className="shrink-0 flex items-center gap-1.5 rounded-full pl-1 pr-3 py-1 glass text-[11px] font-semibold text-muted-foreground hover:text-gold"
            >
              <TeamCrest short={t.short} color={t.color} color2={t.color2} size={22} />
              {t.short}
            </Link>
          ))}
        </div>
      </section>

      <PlayerSheet player={selected} team={team} onClose={() => setSelected(null)} />
    </MobileLayout>
  );
}

function PlayerSheet({ player, team, onClose }: { player: Player | null; team: ReturnType<typeof teamById>; onClose: () => void }) {
  return (
    <Dialog open={!!player} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md gap-0 border-border bg-transparent p-0 shadow-none">
        <div className="relative overflow-hidden rounded-3xl glass p-5">
          <DialogTitle className="sr-only">{player?.name}</DialogTitle>
          {player && team && (
            <>
              <div className="flex items-center gap-3">
                <Avatar initials={player.initials} color={team.color} color2={team.color2} size={64} />
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-bold">{player.name}</h3>
                  <div className="text-[11px] uppercase tracking-widest text-gold">{player.role}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{team.name} · {player.age} yrs</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2 rounded-2xl bg-card/60 p-3 text-center">
                {[
                  { l: "Mat", v: player.stats.matches },
                  { l: "Runs", v: player.stats.runs },
                  { l: "Wkts", v: player.stats.wickets },
                  { l: "SR", v: player.stats.sr },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="font-display text-base font-bold tabular-nums">{s.v}</div>
                    <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-card/60 p-3">
                  <div className="text-[9px] uppercase tracking-widest text-muted-foreground">Base</div>
                  <div className="mt-1 font-display text-sm font-bold text-gold">{formatINR(player.basePrice)}</div>
                </div>
                <div className="rounded-xl bg-card/60 p-3">
                  <div className="text-[9px] uppercase tracking-widest text-muted-foreground">Sold for</div>
                  <div className="mt-1 font-display text-sm font-bold text-gold">{player.soldPrice ? formatINR(player.soldPrice) : "—"}</div>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
