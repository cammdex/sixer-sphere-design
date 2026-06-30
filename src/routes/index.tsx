import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Calendar, MapPin, Ticket, Radio, ChevronRight, TrendingUp, Users, Crown, ShieldCheck } from "lucide-react";
import { MobileLayout } from "@/components/mobile-layout";
import { tournament, announcements, updates } from "@/lib/gpl-data";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Galaxy Premier League — Home" },
      { name: "description", content: "Live countdown to the player auction, fixtures, stats and announcements." },
    ],
  }),
  component: HomePage,
});

function useCountdown(target: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const diff = Math.max(0, new Date(target).getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

function HomePage() {
  const c = useCountdown(tournament.auctionDate);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setIdx((v) => (v + 1) % updates.length), 4000);
    return () => clearInterval(i);
  }, []);

  return (
    <MobileLayout>
      {/* Hero */}
      <section className="relative mt-2 overflow-hidden rounded-3xl p-5 glass-gold">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, oklch(0.82 0.14 85 / 0.7), transparent 70%)" }} />
        <div className="absolute -bottom-12 -left-6 h-40 w-40 rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, oklch(0.55 0.22 260 / 0.7), transparent 70%)" }} />
        <div className="relative">
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
        </div>
      </section>

      {/* Auction details */}
      <section className="mt-5">
        <SectionHeader title="Auction Details" />
        <div className="mt-3 grid grid-cols-2 gap-3">
          <DetailCard icon={<Calendar className="h-4 w-4" />} label="Date" value="Sat · Jul 12" sub="2026" />
          <DetailCard icon={<Ticket className="h-4 w-4" />} label="Time" value="6:30 PM" sub="IST · Doors 6:00" />
          <DetailCard icon={<MapPin className="h-4 w-4" />} label="Venue" value="Crown Hall" sub="Sector 17" />
          <DetailCard icon={<ShieldCheck className="h-4 w-4" />} label="Entry" value="Pass only" sub="Owners + Press" />
        </div>
      </section>

      {/* Announcements banner */}
      <section className="mt-5">
        <SectionHeader title="Announcements" />
        <div className="-mx-4 mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 no-scrollbar">
          {announcements.map((a) => (
            <article
              key={a.id}
              className={`snap-center shrink-0 w-[78%] rounded-2xl p-4 ${a.tone === "gold" ? "glass-gold" : "glass"}`}
            >
              <div className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${a.tone === "gold" ? "bg-gold/15 text-gold" : "bg-primary/20 text-primary"}`}>
                {a.tag}
              </div>
              <h3 className="mt-2 font-display text-base font-bold leading-tight">{a.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{a.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Quick stats */}
      <section className="mt-5">
        <SectionHeader title="By the numbers" />
        <div className="mt-3 grid grid-cols-3 gap-3">
          <StatCard icon={<ShieldCheck className="h-4 w-4" />} value={tournament.stats.teams} label="Teams" />
          <StatCard icon={<Users className="h-4 w-4" />} value={tournament.stats.players} label="Players" />
          <StatCard icon={<Crown className="h-4 w-4" />} value={tournament.stats.owners} label="Owners" />
        </div>
      </section>

      {/* Recent updates carousel */}
      <section className="mt-5">
        <SectionHeader title="Recent updates" action="See all" />
        <div className="mt-3 overflow-hidden rounded-2xl glass">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${idx * 100}%)` }}
          >
            {updates.map((u) => (
              <div key={u.id} className="w-full shrink-0 p-4">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl gradient-royal">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-widest text-gold">{u.time}</div>
                    <p className="mt-0.5 text-sm font-medium leading-snug">{u.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-1.5 pb-3">
            {updates.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Update ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-gold" : "w-1.5 bg-white/20"}`}
              />
            ))}
          </div>
        </div>
      </section>
    </MobileLayout>
  );
}

function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-end justify-between">
      <h2 className="font-display text-base font-bold">{title}</h2>
      {action && (
        <button className="flex items-center gap-0.5 text-[11px] font-medium text-gold">
          {action} <ChevronRight className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

function DetailCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl glass p-3.5">
      <div className="flex items-center gap-2 text-gold">{icon}<span className="text-[10px] font-semibold uppercase tracking-widest">{label}</span></div>
      <div className="mt-2 font-display text-lg font-bold leading-tight">{value}</div>
      <div className="text-[11px] text-muted-foreground">{sub}</div>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl glass p-3 text-center">
      <div className="mx-auto grid h-9 w-9 place-items-center rounded-xl gradient-royal">{icon}</div>
      <div className="mt-2 font-display text-2xl font-extrabold text-gold tabular-nums">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}
