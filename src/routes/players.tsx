import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X, Crown, Phone, ChevronRight } from "lucide-react";
import { MobileLayout, TeamCrest, Avatar } from "@/components/mobile-layout";
import { formatINR } from "@/lib/gpl-data";
import { useLivePlayers, useLiveTeams, type LivePlayer, type LiveTeam } from "@/lib/auction-store";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import TeamDetails from "@/components/team-details";

export const Route = createFileRoute("/players")({
  head: () => ({ meta: [
    { title: "Players — Galaxy Premier League" },
    { name: "description", content: "Teams, owners and the full player catalog with stats." },
  ]}),
  component: PlayersPage,
});

const sectionTabs = ["Teams", "Owners", "Players"] as const;
const roleFilters = ["All", "Batsman", "Bowler", "All-Rounder", "Wicket Keeper"] as const;

function PlayersPage() {
  const [tab, setTab] = useState<(typeof sectionTabs)[number]>("Teams");
  const { teams, loading: teamsLoading } = useLiveTeams();
  const { players, loading: playersLoading } = useLivePlayers();
  const [selectedTeam, setSelectedTeam] = useState<LiveTeam | null>(null);
  const [activePlayer, setActivePlayer] = useState<LivePlayer | null>(null);

  return (
    <MobileLayout title="Squads & Players">
      <div className="sticky top-[68px] z-20 -mx-4 px-4 pt-2 pb-3 backdrop-blur-xl"
        style={{ background: "linear-gradient(180deg, oklch(0.16 0.03 260 / 0.85), oklch(0.16 0.03 260 / 0))" }}>
        <div className="glass rounded-2xl p-1 grid grid-cols-3 gap-1">
          {sectionTabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative rounded-xl py-2 text-xs font-semibold transition-all ${tab === t ? "gradient-royal text-white shadow-glow" : "text-muted-foreground"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="animate-fade-in pb-4">
        {(teamsLoading || playersLoading) && (
          <div className="mt-10 text-center text-sm text-muted-foreground">Loading live data…</div>
        )}
        {!teamsLoading && !playersLoading && (
          <>
            {tab === "Teams" && (
  <>
    <TeamsGrid
      teams={teams}
      players={players}
      selectedTeam={selectedTeam}
      onSelectTeam={setSelectedTeam}
    />

    <TeamDetails
      open={!!selectedTeam}
      team={selectedTeam}
      players={players}
      onClose={() => setSelectedTeam(null)}
      onPlayerClick={(player) => {
  console.log("Clicked:", player);
  setActivePlayer(player);
}}
    />
    <PlayerSheet
  player={activePlayer}
  team={teams.find((t) => t.id === activePlayer?.teamId)}
  onClose={() => setActivePlayer(null)}
/>

  </>
)}

{tab === "Owners" && <OwnersList teams={teams} />}

{tab === "Players" && (
  <PlayersCatalog
    players={players}
    teams={teams}
  />
)}
          </>
        )}
      </div>
    </MobileLayout>
  );
}

function TeamsGrid({
  teams,
  players,
  selectedTeam,
  onSelectTeam,
}: {
  teams: LiveTeam[];
  players: LivePlayer[];
  selectedTeam: LiveTeam | null;
  onSelectTeam: (team: LiveTeam) => void;
}) {
  
  return (
    <>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {teams.map((t) => {
          const squadCount = players.filter((p) => p.teamId === t.id).length;

          return (
            <button
              key={t.id}
              onClick={() => onSelectTeam(t)}
              className="relative overflow-hidden rounded-2xl glass p-4 text-left"
            >
              <div
                className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-40 blur-2xl"
                style={{
                  background: `radial-gradient(circle, ${t.color}, transparent 70%)`,
                }}
              />

              <div className="relative">
                <TeamCrest
                  short={t.short}
                  color={t.color}
                  color2={t.color2}
                  size={44}
                />

                <h3 className="mt-3 font-display text-sm font-bold leading-tight">
                  {t.name}
                </h3>

                <div className="mt-2 space-y-1 text-[11px]">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="text-gold">C</span>
                    {t.captain}
                  </div>

                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Crown className="h-3 w-3 text-gold" />
                    {t.owners.join(" & ")}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-border pt-2">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {squadCount} players
                  </span>

                  <span className="font-display text-lg font-bold text-gold tabular-nums">
                    {t.points}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

    </>
  );
}
function OwnersList({ teams }: { teams: LiveTeam[] }) {
  const owners = teams.map((t) => ({
    id: t.id,
    name: t.owners.join(" & "),
    team: t.name,
    initials: t.owners
  .join(" ")
  .split(" ")
  .map((n: string) => n[0])
  .join(""),
    color: t.color,
    color2: t.color2,
  }));

  return (
    <div className="mt-3 space-y-3">
      {owners.map((o) => (
        <article key={o.id} className="flex items-center gap-3 rounded-2xl glass p-3.5">
          <Avatar initials={o.initials} color={o.color} color2={o.color2} size={52} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-display text-sm font-bold">{o.name}</h3>
              <span className="rounded-full bg-gold/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gold">Owner</span>
            </div>
            <div className="mt-0.5 truncate text-[11px] text-muted-foreground">{o.team}</div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </article>
      ))}
    </div>
  );
}

function PlayersCatalog({ players, teams }: { players: LivePlayer[]; teams: LiveTeam[] }) {
  const [q, setQ] = useState("");
  const [role, setRole] = useState<(typeof roleFilters)[number]>("All");
  const [teamFilter, setTeamFilter] = useState<string>("All");
  const [active, setActive] = useState<LivePlayer | null>(null);

  const teamById = (id?: string) => teams.find((t) => t.id === id);

  const filtered = useMemo(() => {
    return players.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
      if (role !== "All" && p.role !== role) return false;
      if (teamFilter !== "All" && p.teamId !== teamFilter) return false;
      return true;
    });
  }, [players, q, role, teamFilter]);

  return (
    <div className="mt-3">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search players"
          className="w-full rounded-2xl bg-card/60 py-3 pl-10 pr-10 text-sm placeholder:text-muted-foreground border border-border focus:border-primary outline-none transition-colors"
        />
        {q && (
          <button onClick={() => setQ("")} aria-label="Clear" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 no-scrollbar">
        {roleFilters.map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all ${role === r ? "gradient-gold text-gold-foreground shadow-glow-gold" : "glass text-muted-foreground"}`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="-mx-4 mt-2 flex gap-2 overflow-x-auto px-4 no-scrollbar">
        <button
          onClick={() => setTeamFilter("All")}
          className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all ${teamFilter === "All" ? "gradient-royal text-white" : "glass text-muted-foreground"}`}
        >All teams</button>
        {teams.map((t) => (
          <button
            key={t.id}
            onClick={() => setTeamFilter(t.id)}
            className={`shrink-0 flex items-center gap-1.5 rounded-full pl-1 pr-3 py-1 text-[11px] font-semibold transition-all ${teamFilter === t.id ? "gradient-royal text-white" : "glass text-muted-foreground"}`}
          >
            <TeamCrest short={t.short} color={t.color} color2={t.color2} size={20} />
            {t.short}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {filtered.map((p) => {
          const team = teamById(p.teamId);
          return (
            <button
              key={p.id}
              onClick={() => setActive(p)}
              className="group relative overflow-hidden rounded-2xl glass p-3 text-left transition-transform active:scale-[0.98]"
            >
              <div className="flex items-start justify-between">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.name} className="h-11 w-11 rounded-xl object-cover" />
                ) : (
                  <Avatar initials={p.initials} color={team?.color ?? "#3b82f6"} color2={team?.color2 ?? "#1e3a8a"} size={44} />
                )}
                {team ? (
                  <TeamCrest short={team.short} color={team.color} color2={team.color2} size={22} />
                ) : (
                  <span className="rounded-full bg-gold/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gold">Unsold</span>
                )}
              </div>
              <h3 className="mt-2 truncate font-display text-sm font-bold">{p.name}</h3>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.role} · {p.age}y</div>
              <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
                <div>
                  <div className="text-[9px] uppercase text-muted-foreground">Base</div>
                  <div className="font-display text-[12px] font-bold text-gold">{formatINR(p.basePrice)}</div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] uppercase text-muted-foreground">SR</div>
                  <div className="font-display text-[12px] font-bold tabular-nums">{p.stats.sr}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 text-center text-sm text-muted-foreground">No players match these filters.</div>
      )}

      <PlayerSheet player={active} team={teamById(active?.teamId)} onClose={() => setActive(null)} />
    </div>
  );
}

function PlayerSheet({ player, team, onClose }: { player: LivePlayer | null; team?: LiveTeam; onClose: () => void }) {
  return (
    <Dialog
  open={!!player}
  onOpenChange={(o) => !o && onClose()}
>
      <DialogContent className="max-w-md gap-0 border-border bg-transparent p-0 shadow-none [&>button]:hidden">
        <div className="relative overflow-hidden rounded-3xl glass p-5">
          <DialogTitle className="sr-only">{player?.name}</DialogTitle>
          {player && (
            <>
              <div className="absolute inset-x-0 top-0 h-40 opacity-30 blur-3xl"
                style={{ background: `linear-gradient(180deg, ${team?.color ?? "#3b82f6"}, transparent)` }} />
              <div className="relative flex items-center gap-3">
                {player.imageUrl ? (
                  <img src={player.imageUrl} alt={player.name} className="h-16 w-16 rounded-2xl object-cover" />
                ) : (
                  <Avatar initials={player.initials} color={team?.color ?? "#3b82f6"} color2={team?.color2 ?? "#1e3a8a"} size={64} />
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-bold">{player.name}</h3>
                  <div className="text-[11px] uppercase tracking-widest text-gold">{player.role}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {team ? team.name : "Unsold"} · {player.age} yrs
                  </div>
                </div>
                <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full glass" aria-label="Close">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Mini label="Batting" value={player.batting} />
                <Mini label="Bowling" value={player.bowling} />
                <Mini label="Base" value={formatINR(player.basePrice)} tone="gold" />
                <Mini label="Sold for" value={player.soldPrice ? formatINR(player.soldPrice) : "—"} tone="gold" />
              </div>

              <div className="mt-4 rounded-2xl bg-card/60 p-4">
                <div className="text-[10px] font-bold uppercase tracking-widest text-gold">Career Stats</div>
                <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                  {[
                    { l: "Mat", v: player.stats.matches },
                    { l: "Runs", v: player.stats.runs },
                    { l: "Wkts", v: player.stats.wickets },
                    { l: "Avg", v: player.stats.avg },
                  ].map((s) => (
                    <div key={s.l}>
                      <div className="font-display text-base font-bold tabular-nums">{s.v}</div>
                      <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Mini({ label, value, tone }: { label: string; value: string; tone?: "gold" }) {
  return (
    <div className="rounded-xl bg-card/60 p-3">
      <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`mt-1 font-display text-sm font-bold ${tone === "gold" ? "text-gold" : ""}`}>{value}</div>
    </div>
  );
}