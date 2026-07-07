import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Radio, ChevronRight, Crown, Sparkles, Star, Phone, Globe, ArrowRight, Zap, TrendingUp } from "lucide-react";
import { MobileLayout, TeamCrest, Avatar } from "@/components/mobile-layout";
import {
  tournament, teams, eventFeed, promotions,
  leadSponsor, poweredBy, coPoweredBy, sponsors, type BrandCard,
} from "@/lib/gpl-data";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sanchi UBL 2026 — Home" },
      { name: "description", content: "Sanchi United Bat League 2026 — sponsors, teams, promotions and live auction feed." },
      { property: "og:title", content: "Sanchi UBL 2026" },
      { property: "og:description", content: "The premium local cricket tournament — Season 4, 2026." },
    ],
  }),
  component: HomePage,
});

function useCountdown(target: string) {
  const targetMs = new Date(target).getTime();
  const [now, setNow] = useState(() => targetMs);
  useEffect(() => {
    setNow(Date.now());
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const diff = Math.max(0, targetMs - now);
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
}

function HomePage() {
  const c = useCountdown(tournament.auctionDate);

  return (
    <MobileLayout>
      {/* Hero + Countdown */}
      <section className="relative mt-2 overflow-hidden rounded-3xl p-5 glass-gold">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, oklch(0.82 0.14 85 / 0.7), transparent 70%)" }} />
        <div className="absolute -bottom-12 -left-6 h-40 w-40 rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, oklch(0.55 0.22 260 / 0.7), transparent 70%)" }} />
        <div className="relative">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold pulse-ring" />
            Auction goes live in
          </div>
          <h1 className="mt-3 font-display text-2xl font-extrabold leading-tight">
            <span className="text-gold">Sanchi</span> UBL <span className="text-primary">2026</span>
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
            Watch Auction Live
          </button>
        </div>
      </section>

      {/* 1. Lead sponsor */}
      <BrandTile brand={leadSponsor} tone="lead" icon={<Crown className="h-3 w-3" />} />

      {/* 2. Powered by */}
      <BrandTile brand={poweredBy} tone="royal" icon={<Zap className="h-3 w-3" />} />

      {/* 3. Co-powered by */}
      <BrandTile brand={coPoweredBy} tone="crimson" icon={<Sparkles className="h-3 w-3" />} />

      {/* 4. Sponsors info */}
      <section className="mt-6">
        <SectionHeader title="Our Sponsors" action="See all" to="/sponsors" />
        <div className="-mx-4 mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 no-scrollbar">
          {sponsors.map((s) => (
            <Link
              key={s.id}
              to="/sponsors"
              className="snap-start shrink-0 w-[42%] rounded-2xl glass p-3 transition-transform active:scale-[0.98]"
            >
              <BrandBadge color={s.color} color2={s.color2} initials={s.initials} size={44} />
              <div className="mt-2.5 truncate font-display text-[13px] font-bold">{s.name}</div>
              <div className="text-[10px] uppercase tracking-widest text-gold">{s.category}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Team owners */}
      <section className="mt-6">
        <SectionHeader title="Team Owners" action="View teams" to="/players" />
        <div className="mt-3 grid grid-cols-2 gap-3">
          {teams.map((t) => (
            <Link
              key={t.id}
              to="/players/$teamId"
              params={{ teamId: t.id }}
              className="relative overflow-hidden rounded-2xl glass p-3 transition-transform active:scale-[0.98]"
            >
              <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full opacity-40 blur-2xl"
                style={{ background: `radial-gradient(circle, ${t.color}, transparent 70%)` }} />
              <div className="relative flex items-center gap-2.5">
                <Avatar initials={t.owner.split(" ").map(n=>n[0]).join("")} color={t.color} color2={t.color2} size={38} />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-display text-[12px] font-bold">{t.owner}</div>
                  <div className="truncate text-[10px] text-muted-foreground">{t.name}</div>
                </div>
              </div>
              <div className="relative mt-2 flex items-center justify-between border-t border-border pt-2">
                <TeamCrest short={t.short} color={t.color} color2={t.color2} size={22} />
                <ChevronRight className="h-3.5 w-3.5 text-gold" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Promotions */}
      <section className="mt-6">
        <SectionHeader title="Promotions" />
        <div className="mt-3 space-y-3">
          {promotions.map((p) => (
            <article key={p.id} className="relative overflow-hidden rounded-2xl glass p-4">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-30 blur-2xl"
                style={{ background: `radial-gradient(circle, ${p.color}, transparent 70%)` }} />
              <div className="relative flex items-start gap-3">
                <BrandBadge color={p.color} color2={p.color2} initials={p.initials} size={44} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-gold/15 border border-gold/30 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-gold">Promo</span>
                    <span className="truncate text-[11px] text-muted-foreground">{p.brand}</span>
                  </div>
                  <h3 className="mt-1 font-display text-sm font-bold leading-tight">{p.title}</h3>
                  <p className="mt-1 text-[12px] text-muted-foreground">{p.body}</p>
                  <button
                    onClick={() => toast.success(p.brand, { description: p.title })}
                    className="mt-2.5 inline-flex items-center gap-1 rounded-full gradient-gold px-3 py-1 text-[11px] font-semibold text-gold-foreground"
                  >
                    {p.cta} <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. Event feed */}
      <section className="mt-6">
        <SectionHeader title="Event Feed" action="Live" />
        <div className="mt-3 relative">
          <div className="absolute left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-gold/50 via-primary/40 to-transparent" />
          <ul className="space-y-3">
            {eventFeed.map((e) => (
              <li key={e.id} className="relative flex items-start gap-3">
                <div className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full ${e.tone === "gold" ? "gradient-gold" : "gradient-royal"} shadow-glow`}>
                  <TrendingUp className={`h-3.5 w-3.5 ${e.tone === "gold" ? "text-gold-foreground" : "text-white"}`} strokeWidth={2.6} />
                </div>
                <div className="min-w-0 flex-1 rounded-2xl glass p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest ${e.tone === "gold" ? "bg-gold/15 text-gold" : "bg-primary/20 text-primary"}`}>{e.kind}</span>
                    <span className="text-[10px] text-muted-foreground">{e.time}</span>
                  </div>
                  <p className="mt-1 text-[13px] font-medium leading-snug">{e.title}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </MobileLayout>
  );
}

function BrandTile({ brand, tone, icon }: { brand: BrandCard; tone: "lead" | "royal" | "crimson"; icon: React.ReactNode }) {
  const toneClass =
    tone === "lead" ? "glass-gold" : "glass";
  const ringColor = tone === "lead" ? brand.color : tone === "royal" ? "#3b82f6" : "#ef4444";
  return (
    <section className="mt-4">
      <div className={`relative overflow-hidden rounded-3xl ${toneClass} p-4`}>
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-40 blur-3xl"
          style={{ background: `radial-gradient(circle, ${ringColor}, transparent 70%)` }} />
        <div className="relative">
          <div className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${tone === "lead" ? "bg-gold/20 text-gold border border-gold/30" : "bg-primary/20 text-primary border border-primary/30"}`}>
            {icon}{brand.category}
          </div>
          <div className="mt-3 flex items-center gap-3">
            <BrandBadge color={brand.color} color2={brand.color2} initials={brand.initials} size={56} />
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-display text-lg font-extrabold leading-tight">{brand.name}</h3>
              <p className="mt-0.5 text-[12px] text-muted-foreground line-clamp-2">{brand.tagline}</p>
            </div>
            {tone === "lead" && <Star className="h-4 w-4 fill-gold text-gold" />}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              onClick={() => toast(brand.phone ?? "—")}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-card/60 border border-border py-2 text-[11px] font-semibold hover:border-gold/40 hover:text-gold transition-colors"
            >
              <Phone className="h-3 w-3" />Call
            </button>
            <button
              onClick={() => toast(brand.web ?? "—")}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-card/60 border border-border py-2 text-[11px] font-semibold hover:border-gold/40 hover:text-gold transition-colors"
            >
              <Globe className="h-3 w-3" />Website
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandBadge({ color, color2, initials, size }: { color: string; color2: string; initials: string; size: number }) {
  return (
    <div
      className="grid shrink-0 place-items-center rounded-2xl font-display font-extrabold text-white"
      style={{
        width: size, height: size, fontSize: size * 0.36,
        background: `linear-gradient(135deg, ${color}, ${color2})`,
        boxShadow: `0 8px 22px -6px ${color}80, inset 0 1px 0 rgba(255,255,255,0.18)`,
      }}
    >
      {initials}
    </div>
  );
}

function SectionHeader({ title, action, to }: { title: string; action?: string; to?: string }) {
  return (
    <div className="flex items-end justify-between">
      <h2 className="font-display text-base font-bold">{title}</h2>
      {action && (
        to ? (
          <Link to={to} className="flex items-center gap-0.5 text-[11px] font-medium text-gold">
            {action} <ChevronRight className="h-3 w-3" />
          </Link>
        ) : (
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold pulse-ring" />{action}
          </span>
        )
      )}
    </div>
  );
}
