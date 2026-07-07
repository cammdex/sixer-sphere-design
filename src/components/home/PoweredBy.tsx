import { ExternalLink } from "lucide-react";

export interface PoweredBySponsorProps {
  name: string;
  logo?: string;
  tagline?: string;
  website?: string;
  accentColor?: string;
}

function initialsOf(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

function PoweredByPrimaryCard({ name, logo, tagline, website, accentColor = "#3b82f6" }: PoweredBySponsorProps) {
  const initials = initialsOf(name);

  const card = (
    <div className="relative overflow-hidden rounded-2xl glass p-4">
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-40 blur-2xl"
        style={{ background: `radial-gradient(circle, ${accentColor}, transparent 70%)` }}
      />
      <div className="relative">
        <div className="text-[9px] font-semibold uppercase tracking-widest text-gold">Powered By</div>
        <div className="mt-2.5 flex items-center gap-3">
          {logo ? (
            <img src={logo} alt={name} className="h-12 w-12 shrink-0 rounded-xl object-cover shadow-glow" />
          ) : (
            <div
              className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-sm font-bold text-white shadow-glow"
              style={{ background: `linear-gradient(135deg, ${accentColor}, #1e293b)` }}
            >
              {initials}
            </div>
          )}
          <div className="min-w-0">
            <div className="truncate font-display text-base font-bold leading-tight">{name}</div>
            {tagline && <div className="truncate text-[11px] text-muted-foreground">{tagline}</div>}
          </div>
        </div>
        {website && (
          <div className="mt-2.5 flex items-center gap-1 text-[11px] font-medium text-gold">
            Visit website <ExternalLink className="h-3 w-3" />
          </div>
        )}
      </div>
    </div>
  );

  return website ? (
    <a href={website} target="_blank" rel="noopener noreferrer" className="block">
      {card}
    </a>
  ) : (
    card
  );
}

function CoPoweredByGridItem({ name, logo, accentColor = "#64748b", website }: PoweredBySponsorProps) {
  const initials = initialsOf(name);

  const item = (
    <div className="flex h-full flex-col items-center gap-2 rounded-2xl glass p-3 text-center">
      {logo ? (
        <img src={logo} alt={name} className="h-10 w-10 rounded-xl object-cover" />
      ) : (
        <div
          className="grid h-10 w-10 place-items-center rounded-xl text-xs font-bold text-white"
          style={{ background: `linear-gradient(135deg, ${accentColor}, #1e293b)` }}
        >
          {initials}
        </div>
      )}
      <div className="truncate text-[11px] font-semibold leading-tight">{name}</div>
    </div>
  );

  return website ? (
    <a href={website} target="_blank" rel="noopener noreferrer" className="block h-full">
      {item}
    </a>
  ) : (
    item
  );
}

export interface PoweredByProps {
  poweredBy: PoweredBySponsorProps;
  coPoweredBy: PoweredBySponsorProps[];
}

export function PoweredBy({ poweredBy, coPoweredBy }: PoweredByProps) {
  return (
    <section className="space-y-3">
      <PoweredByPrimaryCard {...poweredBy} />

      {coPoweredBy.length > 0 && (
        <div>
          <div className="mb-2 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
            Co-Powered By
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {coPoweredBy.map((sponsor) => (
              <CoPoweredByGridItem key={sponsor.name} {...sponsor} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export const placeholderPoweredBy: PoweredByProps = {
  poweredBy: {
    name: "Apex Sportswear",
    logo: "",
    tagline: "Official kit partner",
    website: "#",
    accentColor: "#f59e0b",
  },
  coPoweredBy: [
    { name: "Spice Route Cafe", logo: "", website: "#", accentColor: "#ef4444" },
    { name: "Turbo Motors", logo: "", website: "#", accentColor: "#0ea5e9" },
    { name: "GreenLeaf Organics", logo: "", website: "#", accentColor: "#10b981" },
  ],
};