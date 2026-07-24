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
    { 
      title: "Players — Udaipur Bohra League",
     },
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
        <div className="glass bohra-border rounded-2xl p-1 grid grid-cols-3 gap-1">
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
      <div className="mt-4 grid grid-cols-2 gap-4">
        {teams.map((t) => {
          const squadCount = players.filter((p) => p.teamId === t.id).length;

          return (
            <button
              key={t.id}
              onClick={() => onSelectTeam(t)}
              className="group relative overflow-hidden rounded-[30px] glass bohra-border p-5 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div
                className="absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-45 blur-3xl"
                style={{
                  background: `radial-gradient(circle, ${t.color}, transparent 70%)`,
                }}
              />

              <div className="relative">

              <div className="transition-transform duration-300 group-hover:scale-110">

                <TeamCrest
    
                short={t.short}
                color={t.color}
                color2={t.color2}
                size={58}
              />
              </div>

                <h3 className="mt-4 font-display text-lg font-black leading-tight tracking-tight">
                  {t.name}
                </h3>

                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="text-gold">C</span>
                    {t.captain}
                  </div>

                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Crown className="h-3 w-3 text-gold" />
                    {t.owners.join(" & ")}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#E8D9BF] pt-4">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {squadCount} players
                  </span>

                  <span className="font-display text-2xl font-black tracking-tight text-gold tabular-nums">
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
    <div className="mt-4 space-y-4">
      {owners.map((o) => (
        <article key={o.id} className="group flex items-center gap-4 rounded-[30px] glass bohra-border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="transition-transform duration-300 group-hover:scale-105">
          <Avatar initials={o.initials} color={o.color} color2={o.color2} size={60} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-display text-lg font-black tracking-tight">{o.name}</h3>
              <span className="rounded-full bg-gold/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-gold transition-all duration-300 group-hover:bg-gold/20">Owner</span>
            </div>
            <div className="mt-1 truncate text-sm text-muted-foreground">{o.team}</div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
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
        <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#C79A35] transition-colors duration-300" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by player name..."
          className="glass w-full rounded-full border border-white/25 bg-white/35 py-3.5 pl-14 pr-12 text-sm font-medium text-slate-800 shadow-xl backdrop-blur-xl outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#D5A44A]/40 focus:bg-white/45 focus:ring-4 focus:ring-[#D5A44A]/15"
        />
        {q && (
          <button onClick={() => setQ("")} aria-label="Clear" className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-slate-400 transition-all duration-300 hover:bg-white/60 hover:text-[#C79A35]">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 no-scrollbar">
        {roleFilters.map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${role === r ? "gradient-gold text-gold-foreground shadow-glow-gold" : "glass text-muted-foreground"}`}
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
            className={`shrink-0 flex items-center gap-2 rounded-full pl-1.5 pr-4 py-2 text-xs font-bold transition-all duration-300 ${teamFilter === t.id ? "gradient-royal text-white" : "glass text-muted-foreground"}`}
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
  aria-label={`View ${p.name}`}
  onClick={() => setActive(p)}
  className="group relative overflow-hidden rounded-[32px] p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
  style={{
    background: "linear-gradient(180deg,#fffdf9,#f7efe2)",
    border: "1px solid rgba(190,150,90,.20)",
    boxShadow: "0 12px 24px rgba(90,60,25,.10)",
  }}
>
  <div
  className="absolute -right-10 -top-10 h-32 w-32 rounded-full blur-[90px] opacity-40"
  style={{
    background: team?.color ?? "#C79A35",
  }}
/>

<div className="relative">
  <div className="flex items-start justify-between">
                {p.imageUrl ? (
                  <img
  loading="lazy"
  src={p.imageUrl}
  alt={`${p.name} profile`}
                  className="h-[72px] w-[72px] rounded-2xl object-cover shadow-lg transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <Avatar initials={p.initials} color={team?.color ?? "#3b82f6"} color2={team?.color2 ?? "#1e3a8a"} size={72} />
                )}
                {p.status === "sold" ? (
  <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-800">
    SOLD
  </span>
) : p.status === "unsold" ? (
  <span className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-red-700">
    UNSOLD
  </span>
) : (
  <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-amber-700">
    AVAILABLE
  </span>
)}
              </div>
              <h3 className="mt-4 line-clamp-2 font-display text-xl font-black leading-tight tracking-tight text-slate-900">{p.name}</h3>
              <div className="mt-2 text-xs font-bold uppercase tracking-[0.28em] text-[#B68B42]">{p.role} · {p.age}yrs</div>
              
              
              <div className="mt-6 grid grid-cols-[1fr_auto] gap-4 border-t border-[#E7D8BE] pt-5">

  <div className="grid grid-cols-2 gap-3">

    <div className="rounded-2xl bg-white/60 border border-[#E8D9BF] p-3">
      <div className="text-[9px] font-black uppercase tracking-[0.22em] text-gray-500">
        Base
      </div>

      <div className="mt-2 font-display text-xl font-black tracking-tight text-[#B68B42]">
        {formatINR(p.basePrice)}
      </div>
    </div>

    <div className="rounded-2xl bg-white/60 border border-[#E8D9BF] p-3">
      <div className="text-[9px] font-black uppercase tracking-[0.22em] text-gray-500">
        Sold
      </div>

      <div className="mt-2 font-display text-xl font-black tracking-tight text-[#3F8B57]">
        {p.soldPrice ? formatINR(p.soldPrice) : "—"}
      </div>
    </div>

  </div>

  {team && (
    <div className="flex items-center">
      <TeamCrest
        short={team.short}
        color={team.color}
        color2={team.color2}
        size={48}
      />
    </div>
  )}

</div>


</div>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 text-center text-sm text-muted-foreground">No players found. Try changing your filters.</div>
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
      <DialogContent className="max-w-xl gap-0 border-border bg-transparent p-0 shadow-none [&>button]:hidden">
        <div className="relative overflow-hidden rounded-[40px] glass bohra-border p-8 shadow-2xl">
          <DialogTitle className="sr-only">{player?.name}</DialogTitle>
          {player && (
            <>
              <div className="absolute inset-x-0 top-0 h-64 opacity-55 blur-[120px]"
                style={{ background: `linear-gradient(180deg, ${team?.color ?? "#3b82f6"}, transparent)` }} />
              <div className="relative flex items-center gap-3">
                {player.imageUrl ? (
                  <img
  loading="lazy"
  src={player.imageUrl}
  alt={`${player.name} profile`} className="h-[92px] w-[92px] rounded-[28px] object-cover shadow-2xl"/>
                ) : (
                  <Avatar initials={player.initials} color={team?.color ?? "#3b82f6"} color2={team?.color2 ?? "#1e3a8a"} size={92} />
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-3xl font-black tracking-tight leading-none">{player.name}</h3>
                  <div className="mt-3 inline-flex w-fit rounded-full bg-gold/15 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.22em] text-gold border border-gold/20">{player.role}</div>
                  <div className="mt-2 text-sm font-medium text-muted-foreground">
                     {team ? team.name : "Available"} · {player.age} yrs
                  </div>
                </div>
                <button onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full glass border border-white/20 transition-all duration-300 hover:rotate-90 hover:scale-110" aria-label="Close">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <Mini label="Batting" value={player.batting} />
                <Mini label="Bowling" value={player.bowling} />
                <Mini label="Base" value={formatINR(player.basePrice)} tone="gold" />
                <Mini label="Sold for" value={player.soldPrice ? formatINR(player.soldPrice) : "—"} tone="gold" />
              </div>

              <div className="mt-6 rounded-[28px] bg-card/60 p-5">
                <div className="text-[11px] font-black uppercase tracking-[0.22em] text-gold">Career Stats</div>
                <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                  {[
                    { l: "Mat", v: player.stats.matches },
                    { l: "Runs", v: player.stats.runs },
                    { l: "Wkts", v: player.stats.wickets },
                    { l: "Avg", v: player.stats.avg },
                  ].map((s) => (
                    <div key={s.l}>
                      <div className="font-display text-lg font-black tracking-tight tabular-nums">{s.v}</div>
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
    <div className="rounded-2xl bg-white/60 border border-white/30 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`mt-2 font-display text-lg font-black tracking-tight ${tone === "gold" ? "text-gold" : ""}`}>{value}</div>
    </div>
  );
}