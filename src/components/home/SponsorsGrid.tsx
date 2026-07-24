import type { GridSponsor } from "@/types/home";
import { gridSponsors } from "@/lib/home-dummy-data";

export type SponsorTier = "Platinum" | "Gold" | "Silver" | "Associate";

const TIER_ORDER: SponsorTier[] = ["Platinum", "Gold", "Silver", "Associate"];

const TIER_STYLES: Record<
  SponsorTier,
  {
    cols: string;
    logoSize: string;
    card: string;
    accent: string;
  }
> = {
  Platinum: {
  cols: "grid-cols-2",
  logoSize: "h-14 w-14",
  card: "p-4",
  accent: "#7A7A7A",
},

Gold: {
  cols: "grid-cols-3",
  logoSize: "h-12 w-12",
  card: "p-3",
  accent: "#C79A35",
},

Silver: {
  cols: "grid-cols-3 sm:grid-cols-4",
  logoSize: "h-10 w-10",
  card: "p-2.5",
  accent: "#A8AEB8",
},

Associate: {
  cols: "grid-cols-4 sm:grid-cols-5",
  logoSize: "h-8 w-8",
  card: "p-2",
  accent: "#B56E3A",
},
};

function initialsOf(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

function SponsorLogoCard({ sponsor, logoSize, cardPadding }: { sponsor: GridSponsor; logoSize: string; cardPadding: string }) {
  const initials = initialsOf(sponsor.name);
  return (
    <div
  className={`group flex flex-col items-center gap-3 rounded-3xl ${cardPadding} text-center transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.04] hover:shadow-2xl`}
  style={{
    background: "#fffdf8",
    border: "1px solid rgba(190,150,90,.18)",
    boxShadow: "0 10px 22px rgba(90,60,25,.10)",
    transition: "all .3s ease",
  }}
>
      {sponsor.logoUrl ? (
        <img src={sponsor.logoUrl} alt={sponsor.name} className={`${logoSize} rounded-2xl object-cover transition-transform duration-300 group-hover:scale-115`}/>
      ) : (
        <div
        
  className={`${logoSize} grid place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-115`}
  style={{
    background: "linear-gradient(180deg,#d8bc8a,#b48a52)",
    color: "#4d3622",
    fontWeight: 800,
    boxShadow: "0 8px 18px rgba(60,40,18,.20)",
  }}
>
          {initials}
        </div>
      )}
      <span
  className="line-clamp-2 text-xs font-bold leading-snug"
  style={{
    color: "#65523e",
  }}
>
        {sponsor.name}
      </span>
    </div>
  );
}

function TierSection({ tier, sponsors }: { tier: SponsorTier; sponsors: GridSponsor[] }) {
  if (sponsors.length === 0) return null;
  const style = TIER_STYLES[tier];

  return (
    <div className="space-y-5">
      <div className="mb-4 flex items-center gap-3">
  <div
    className="rounded-full px-5 py-1.5 text-[11px] font-black uppercase tracking-[0.24em]"
    style={{
  background: `${style.accent}18`,
  border: `1px solid ${style.accent}66`,
  color: style.accent,
}}
  >
    {tier}
  </div>

  <div
    className="h-px flex-1"
    style={{
      background:
        "linear-gradient(to right, rgba(181,131,53,.35), transparent)",
    }}
  />
</div>
      <div className={`grid ${style.cols} gap-4`}>
        {sponsors.map((s) => (
          <SponsorLogoCard key={s.id} sponsor={s} logoSize={style.logoSize} cardPadding={style.card} />
        ))}
      </div>
    </div>
  );
}

export interface SponsorsGridProps {
  sponsorsByTier: Partial<Record<SponsorTier, GridSponsor[]>>;
}

export function SponsorsGrid({ sponsorsByTier }: SponsorsGridProps) {
  return (
    <section
className="space-y-10 rounded-[34px] p-8"
  style={{
    background: "linear-gradient(180deg,#fffaf2,#f7eedf)",
    border: "1px solid rgba(173,133,73,.25)",
    boxShadow: "0 14px 34px rgba(70,48,20,.10)",
    backgroundImage: `
      radial-gradient(circle at top right, rgba(212,176,111,.12), transparent 38%),
      url("/patterns/bohra-pattern.png")
    `,
    backgroundBlendMode: "overlay",
  }}
>
      <div>
  <div
    className="text-[11px] font-bold uppercase tracking-[0.24em]"
    style={{
      color: "#9a6f3c",
    }}
  >
    Tournament Partners
  </div>

  <h2
  className="mt-2 font-display text-4xl md:text-5xl font-black tracking-tight"
    style={{
      color: "#4c3624",
    }}
  >
    Official Sponsors
  </h2>

  <div className="mt-3 flex items-center gap-3">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-700/40 to-transparent" />
    <span className="text-xs text-yellow-700">✦</span>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-700/40 to-transparent" />
  </div>
</div>
      {TIER_ORDER.map((tier) => (
        <TierSection key={tier} tier={tier} sponsors={sponsorsByTier[tier] ?? []} />
      ))}
    </section>
  );
}

export const placeholderSponsorsByTier: Record<SponsorTier, GridSponsor[]> = {
  Platinum: gridSponsors.slice(0, 1),
  Gold: gridSponsors.slice(1, 3),
  Silver: gridSponsors.slice(3, 6),
  Associate: gridSponsors.slice(6, 8),
};