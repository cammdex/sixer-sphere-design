import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Phone, Globe, MapPin, Star, Search } from "lucide-react";
import { MobileLayout } from "@/components/mobile-layout";
import { sponsors, sponsorCategories } from "@/lib/gpl-data";
import { toast } from "sonner";

export const Route = createFileRoute("/sponsors")({
  head: () => ({ meta: [
    { title: "Sponsors — Galaxy Premier League" },
    { name: "description", content: "Local businesses powering the tournament." },
  ]}),
  component: SponsorsPage,
});

function SponsorsPage() {
  const [cat, setCat] = useState<(typeof sponsorCategories)[number]>("All");
  const [q, setQ] = useState("");

  const featured = sponsors.find((s) => s.featured)!;

  const filtered = useMemo(() => {
    return sponsors.filter((s) => {
      if (cat !== "All" && s.category !== cat) return false;
      if (q && !s.name.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [cat, q]);

  return (
    <MobileLayout title="Sponsors">
      {/* Featured */}
      <article className="relative mt-2 overflow-hidden rounded-3xl glass-gold p-5">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-50 blur-3xl"
          style={{ background: `radial-gradient(circle, ${featured.color}, transparent 70%)` }} />
        <div className="relative">
          <div className="inline-flex items-center gap-1 rounded-full bg-gold/15 border border-gold/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-gold">
            <Star className="h-3 w-3 fill-current" /> Featured sponsor
          </div>
          <div className="mt-3 flex items-center gap-3">
            <SponsorLogo color={featured.color} color2={featured.color2} initials={featured.initials} size={56} />
            <div>
              <h2 className="font-display text-lg font-bold">{featured.name}</h2>
              <div className="text-[11px] uppercase tracking-widest text-gold">{featured.category}</div>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{featured.tagline}</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <ActionBtn icon={<Phone className="h-3.5 w-3.5" />} label="Call" onClick={() => toast(featured.phone)} />
            <ActionBtn icon={<Globe className="h-3.5 w-3.5" />} label="Website" onClick={() => toast(featured.web)} />
            <ActionBtn icon={<MapPin className="h-3.5 w-3.5" />} label="Map" onClick={() => toast("Opening Google Maps…")} />
          </div>
        </div>
      </article>

      {/* Search */}
      <div className="mt-5 relative">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search sponsors"
          className="w-full rounded-2xl bg-card/60 py-3 pl-10 pr-4 text-sm placeholder:text-muted-foreground border border-border focus:border-primary outline-none transition-colors"
        />
      </div>

      {/* Categories */}
      <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 no-scrollbar">
        {sponsorCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all ${cat === c ? "gradient-gold text-gold-foreground shadow-glow-gold" : "glass text-muted-foreground"}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="mt-4 space-y-3">
        {filtered.map((s) => (
          <article key={s.id} className="relative overflow-hidden rounded-2xl glass p-4">
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-30 blur-2xl"
              style={{ background: `radial-gradient(circle, ${s.color}, transparent 70%)` }} />
            <div className="relative flex items-start gap-3">
              <SponsorLogo color={s.color} color2={s.color2} initials={s.initials} size={48} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-display text-sm font-bold">{s.name}</h3>
                  <span className="rounded-full bg-primary/15 border border-primary/30 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">{s.category}</span>
                </div>
                <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-2">{s.tagline}</p>
              </div>
            </div>
            <div className="relative mt-3 grid grid-cols-3 gap-2">
              <ActionBtn small icon={<Phone className="h-3 w-3" />} label="Call" onClick={() => toast(s.phone)} />
              <ActionBtn small icon={<Globe className="h-3 w-3" />} label="Web" onClick={() => toast(s.web)} />
              <ActionBtn small icon={<MapPin className="h-3 w-3" />} label="Map" onClick={() => toast("Opening Google Maps…")} />
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="py-10 text-center text-sm text-muted-foreground">No sponsors in this category.</div>
        )}
      </div>

      <button
        onClick={() => toast.success("Sponsor application received", { description: "Our team will be in touch within 48h." })}
        className="mt-5 w-full rounded-2xl gradient-royal py-3 text-sm font-semibold text-white shadow-glow"
      >
        Become a sponsor
      </button>
    </MobileLayout>
  );
}

function SponsorLogo({ color, color2, initials, size }: { color: string; color2: string; initials: string; size: number }) {
  return (
    <div
      className="grid place-items-center rounded-2xl font-display font-extrabold text-white"
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

function ActionBtn({ icon, label, onClick, small }: { icon: React.ReactNode; label: string; onClick: () => void; small?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-1.5 rounded-xl bg-card/60 border border-border font-semibold text-foreground transition-colors hover:border-gold/40 hover:text-gold ${small ? "py-1.5 text-[10px]" : "py-2 text-xs"}`}
    >
      {icon}{label}
    </button>
  );
}
