import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ScrollText, Calendar, Trophy, MapPin, Users, Image as ImageIcon, ChevronRight } from "lucide-react";
import { MobileLayout, TeamCrest } from "@/components/mobile-layout";
import { teams, fixtures, results, topScorers, topWicketTakers, venues, umpires, galleryPrompts, teamById } from "@/lib/gpl-data";

export const Route = createFileRoute("/tournament")({
  head: () => ({ meta: [
    { title: "Tournament — Galaxy Premier League" },
    { name: "description", content: "Fixtures, points table, leaderboards, venues and gallery." },
  ]}),
  component: TournamentPage,
});

const tabs = ["Overview", "Fixtures", "Table", "Leaders", "More"] as const;

function TournamentPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");
  return (
    <MobileLayout title="Tournament">
      <div className="-mx-4 mt-1 flex gap-2 overflow-x-auto px-4 pb-3 no-scrollbar sticky top-[68px] z-20 backdrop-blur-xl"
        style={{ background: "linear-gradient(180deg, oklch(0.16 0.03 260 / 0.85), oklch(0.16 0.03 260 / 0))" }}>
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${tab === t ? "gradient-royal text-white shadow-glow" : "glass text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="animate-fade-in space-y-5">
        {tab === "Overview" && <Overview />}
        {tab === "Fixtures" && <Fixtures />}
        {tab === "Table" && <PointsTable />}
        {tab === "Leaders" && <Leaders />}
        {tab === "More" && <More />}
      </div>
    </MobileLayout>
  );
}

function Overview() {
  return (
    <>
      <article className="rounded-3xl glass-gold p-5">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 border border-gold/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
          <Trophy className="h-3 w-3" /> Season 4
        </div>
        <h2 className="mt-3 font-display text-xl font-bold leading-tight">8 teams. 28 matches. One galaxy of glory.</h2>
        <p className="mt-2 text-sm text-muted-foreground">A round-robin league followed by a 4-team playoff. Knockouts at Galaxy Ground under floodlights — the trophy is lifted Aug 24.</p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[
            { v: "Aug 24", l: "Final" },
            { v: "T20", l: "Format" },
            { v: "₹5 L", l: "Prize" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl bg-card/60 p-2.5">
              <div className="font-display text-sm font-bold text-gold">{s.v}</div>
              <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </article>

      <section>
        <h3 className="font-display text-sm font-bold">Rules & Regulations</h3>
        <ol className="mt-3 space-y-2 rounded-2xl glass p-4 text-xs text-muted-foreground list-decimal pl-5">
          <li>Standard ICC T20 rules apply with a 90-second over clock.</li>
          <li>Each team plays 7 league matches; top 4 advance to playoffs.</li>
          <li>Maximum 11 players + 4 reserves per match-day squad.</li>
          <li>Two overseas-equivalent (out-of-district) players per playing XI.</li>
          <li>DRS unavailable; on-field umpire decisions are final.</li>
        </ol>
      </section>

      <section>
        <h3 className="font-display text-sm font-bold">Recent Results</h3>
        <div className="mt-3 space-y-2">
          {results.map((r) => {
            const a = teamById(r.a)!; const b = teamById(r.b)!; const w = teamById(r.winner)!;
            return (
              <article key={r.id} className="rounded-2xl glass p-3">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
                  <span>{r.date}</span><span className="text-gold">Won by {r.margin}</span>
                </div>
                <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                  <Side team={a} score={r.scoreA} winner={r.winner === r.a} />
                  <div className="text-[10px] font-bold uppercase text-muted-foreground">vs</div>
                  <Side team={b} score={r.scoreB} winner={r.winner === r.b} right />
                </div>
                <div className="mt-2 text-[11px] text-center text-muted-foreground">{w.name} won</div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

function Side({ team, score, winner, right }: { team: ReturnType<typeof teamById>; score: string; winner: boolean; right?: boolean }) {
  if (!team) return null;
  return (
    <div className={`flex items-center gap-2 ${right ? "justify-end" : ""}`}>
      {right ? (
        <>
          <div className="text-right">
            <div className={`font-display text-xs font-bold ${winner ? "text-gold" : ""}`}>{team.short}</div>
            <div className="text-[11px] tabular-nums">{score}</div>
          </div>
          <TeamCrest short={team.short} color={team.color} color2={team.color2} size={36} />
        </>
      ) : (
        <>
          <TeamCrest short={team.short} color={team.color} color2={team.color2} size={36} />
          <div>
            <div className={`font-display text-xs font-bold ${winner ? "text-gold" : ""}`}>{team.short}</div>
            <div className="text-[11px] tabular-nums">{score}</div>
          </div>
        </>
      )}
    </div>
  );
}

function Fixtures() {
  return (
    <>
      <section>
        <h3 className="font-display text-sm font-bold flex items-center gap-2"><Calendar className="h-4 w-4 text-gold" /> Match Schedule</h3>
        <div className="mt-3 space-y-2">
          {fixtures.map((f) => {
            const a = teamById(f.a)!; const b = teamById(f.b)!;
            return (
              <article key={f.id} className="rounded-2xl glass p-3.5">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-gold">
                  <span>{f.date} · {f.time}</span><span className="text-muted-foreground">{f.venue}</span>
                </div>
                <div className="mt-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TeamCrest short={a.short} color={a.color} color2={a.color2} size={38} />
                    <div>
                      <div className="font-display text-xs font-bold">{a.short}</div>
                      <div className="text-[10px] text-muted-foreground truncate max-w-[80px]">{a.name}</div>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-muted-foreground">VS</div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="font-display text-xs font-bold">{b.short}</div>
                      <div className="text-[10px] text-muted-foreground truncate max-w-[80px]">{b.name}</div>
                    </div>
                    <TeamCrest short={b.short} color={b.color} color2={b.color2} size={38} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

function PointsTable() {
  const sorted = [...teams].sort((a, b) => b.points - a.points || b.nrr - a.nrr);
  return (
    <section>
      <h3 className="font-display text-sm font-bold">Points Table</h3>
      <div className="mt-3 overflow-hidden rounded-2xl glass">
        <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-3 px-3.5 py-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
          <span>Team</span><span>W</span><span>L</span><span>NRR</span><span className="text-gold">Pts</span>
        </div>
        {sorted.map((t, i) => (
          <div key={t.id} className={`grid grid-cols-[1fr_auto_auto_auto_auto] gap-3 items-center px-3.5 py-2.5 text-sm border-t border-border ${i < 4 ? "bg-primary/5" : ""}`}>
            <div className="flex items-center gap-2 min-w-0">
              <span className={`w-4 text-[10px] font-bold ${i < 4 ? "text-gold" : "text-muted-foreground"}`}>{i + 1}</span>
              <TeamCrest short={t.short} color={t.color} color2={t.color2} size={26} />
              <span className="truncate text-xs font-semibold">{t.name}</span>
            </div>
            <span className="tabular-nums text-xs">{t.wins}</span>
            <span className="tabular-nums text-xs">{t.losses}</span>
            <span className={`tabular-nums text-xs ${t.nrr >= 0 ? "text-emerald-400" : "text-rose-400"}`}>{t.nrr > 0 ? "+" : ""}{t.nrr.toFixed(2)}</span>
            <span className="font-display text-sm font-bold text-gold tabular-nums">{t.points}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-muted-foreground">Top 4 advance to playoffs</p>
    </section>
  );
}

function Leaders() {
  return (
    <>
      <section>
        <div className="flex items-center gap-2">
          <CapBadge tone="orange" />
          <h3 className="font-display text-sm font-bold">Orange Cap · Top Run Scorer</h3>
        </div>
        <div className="mt-3 space-y-2">
          {topScorers.map((p, i) => {
            const t = teamById(p.teamId)!;
            return (
              <article key={p.player} className="flex items-center gap-3 rounded-2xl glass p-3">
                <span className="w-5 text-center font-display text-sm font-bold text-gold">{i + 1}</span>
                <TeamCrest short={t.short} color={t.color} color2={t.color2} size={36} />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-display text-sm font-bold">{p.player}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{t.name} · SR {p.sr}</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-base font-bold text-gold tabular-nums">{p.runs}</div>
                  <div className="text-[9px] uppercase tracking-widest text-muted-foreground">Runs</div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2">
          <CapBadge tone="purple" />
          <h3 className="font-display text-sm font-bold">Purple Cap · Top Wicket Taker</h3>
        </div>
        <div className="mt-3 space-y-2">
          {topWicketTakers.map((p, i) => {
            const t = teamById(p.teamId)!;
            return (
              <article key={p.player} className="flex items-center gap-3 rounded-2xl glass p-3">
                <span className="w-5 text-center font-display text-sm font-bold text-gold">{i + 1}</span>
                <TeamCrest short={t.short} color={t.color} color2={t.color2} size={36} />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-display text-sm font-bold">{p.player}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{t.name} · Econ {p.econ}</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-base font-bold text-gold tabular-nums">{p.wickets}</div>
                  <div className="text-[9px] uppercase tracking-widest text-muted-foreground">Wkts</div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

function CapBadge({ tone }: { tone: "orange" | "purple" }) {
  const colors = tone === "orange" ? ["#f59e0b", "#b45309"] : ["#a855f7", "#6b21a8"];
  return (
    <div className="grid h-7 w-7 place-items-center rounded-full" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`, boxShadow: `0 4px 14px -4px ${colors[0]}80` }}>
      <Trophy className="h-3.5 w-3.5 text-white" />
    </div>
  );
}

function More() {
  return (
    <>
      <section>
        <h3 className="font-display text-sm font-bold flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> Venues</h3>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {venues.map((v) => (
            <article key={v.name} className="rounded-2xl glass p-3.5">
              <div className="grid h-10 w-10 place-items-center rounded-xl gradient-royal mb-2"><MapPin className="h-4 w-4 text-white" /></div>
              <div className="font-display text-sm font-bold">{v.name}</div>
              <div className="text-[11px] text-muted-foreground">{v.city}</div>
              <div className="mt-2 text-[10px] uppercase tracking-widest text-gold">Cap. {v.capacity}</div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-display text-sm font-bold flex items-center gap-2"><Users className="h-4 w-4 text-gold" /> Umpires Panel</h3>
        <div className="mt-3 rounded-2xl glass divide-y divide-border">
          {umpires.map((u) => (
            <div key={u} className="flex items-center justify-between px-4 py-3 text-sm">
              <span>{u}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-display text-sm font-bold flex items-center gap-2"><ScrollText className="h-4 w-4 text-gold" /> Match Calendar</h3>
        <div className="mt-3 rounded-2xl glass p-4">
          <div className="grid grid-cols-7 gap-1.5 text-center">
            {["S","M","T","W","T","F","S"].map((d, i) => (
              <div key={i} className="text-[9px] uppercase tracking-widest text-muted-foreground">{d}</div>
            ))}
            {Array.from({ length: 35 }).map((_, i) => {
              const day = i - 2;
              const has = [4, 5, 7, 11, 12, 14, 18, 21, 25].includes(day);
              const playoff = [25].includes(day);
              return (
                <div key={i} className={`aspect-square grid place-items-center rounded-md text-[10px] ${day < 1 || day > 31 ? "text-transparent" : "text-foreground"} ${has ? (playoff ? "gradient-gold text-gold-foreground font-bold" : "gradient-royal text-white") : "bg-card/40"}`}>
                  {day > 0 && day <= 31 ? day : ""}
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex justify-center gap-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full gradient-royal" /> Match</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full gradient-gold" /> Final</span>
          </div>
        </div>
      </section>

      <section>
        <h3 className="font-display text-sm font-bold flex items-center gap-2"><ImageIcon className="h-4 w-4 text-gold" /> Gallery</h3>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {galleryPrompts.map((g, i) => (
            <div key={g} className="relative aspect-square overflow-hidden rounded-xl glass">
              <div className="absolute inset-0" style={{
                background: `linear-gradient(135deg, hsl(${(i * 47) % 360} 70% 25%), hsl(${(i * 47 + 60) % 360} 60% 12%))`,
              }} />
              <div className="absolute inset-0 shimmer opacity-30" />
              <div className="absolute inset-x-1.5 bottom-1.5 text-[9px] font-semibold leading-tight text-white/90">{g}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
