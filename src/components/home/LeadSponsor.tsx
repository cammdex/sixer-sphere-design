import { Star, ExternalLink } from "lucide-react";

export interface LeadSponsorProps {
  name: string;
  logo?: string;
  tagline: string;
  description?: string;
  website?: string;
  accentColor?: string; // hex color used for the glow/accent — defaults to gold
}

export function LeadSponsor({
  name,
  logo,
  tagline,
  description,
  website,
  accentColor = "#eab308",
}: LeadSponsorProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <section className="relative overflow-hidden rounded-3xl glass-gold p-5">
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-40 blur-3xl"
        style={{ background: `radial-gradient(circle, ${accentColor}, transparent 70%)` }}
      />

      <div className="relative">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
          <Star className="h-3 w-3 fill-gold text-gold" />
          Lead Sponsor
        </div>

        <div className="mt-4 flex items-center gap-4">
          {logo ? (
            <img
              src={logo}
              alt={name}
              className="h-16 w-16 shrink-0 rounded-2xl object-cover shadow-glow"
            />
          ) : (
            <div
              className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl font-display text-xl font-bold text-white shadow-glow"
              style={{ background: `linear-gradient(135deg, ${accentColor}, #1e293b)` }}
            >
              {initials}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="font-display text-lg font-bold leading-tight">{name}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{tagline}</p>
          </div>
        </div>

        {description && (
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{description}</p>
        )}

        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl gradient-royal px-4 py-3 text-sm font-semibold text-white shadow-glow transition-transform active:scale-[0.98]"
          >
            Visit Website
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </section>
  );
}

// ---------- Placeholder usage (dummy data, for preview/testing only) ----------
// Remove or replace once real sponsor data is wired in.

export const placeholderLeadSponsor: LeadSponsorProps = {
  name: "Sanchi",
  logo: "",
  tagline: "Smart appliances for modern homes.",
  description: "Sanchi Group is the official Lead Sponsor of Sanchi Udaipur Bohra League Season 2, powering the tournament's digital scoreboards and stadium lighting.",
  website: "#",
  accentColor: "#3b82f6",
};