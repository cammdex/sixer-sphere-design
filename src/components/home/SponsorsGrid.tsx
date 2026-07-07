import type { GridSponsor } from "@/types/home";
import { gridSponsors } from "@/lib/home-dummy-data";

export type SponsorTier = "Platinum" | "Gold" | "Silver" | "Associate";

const TIER_ORDER: SponsorTier[] = ["Platinum", "Gold", "Silver", "Associate"];

const TIER_STYLES: Record<SponsorTier, { cols: string; logoSize: string; card: string }> = {
  Platinum: { cols: "grid-cols-2", logoSize: "h-14 w-14", card: "p-4" },
  Gold: { cols: "grid-cols-3", logoSize: "h-12 w-12", card: "p-3" },
  Silver: { cols: "grid-cols-3 sm:grid-cols-4", logoSize: "h-10 w-10", card: "p-2.5" },
  Associate: { cols: "grid-cols-4 sm:grid-cols-5", logoSize: "h-8 w-8", card: "p-2" },
};

function initialsOf(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

function SponsorLogoCard({ sponsor, logoSize, cardPadding }: { sponsor: GridSponsor; logoSize: string; cardPadding: string }) {
  const initials = initialsOf(sponsor.name);
  return (
    <div className={`flex flex-col items-center gap-1.5 rounded-2xl glass ${cardPadding} text-center`}>
      {sponsor.logoUrl ? (
        <img src={sponsor.logoUrl} alt={sponsor.name} className={`${logoSize} rounded-lg object-cover`} />
      ) : (
        <div
          className={`${logoSize} grid place-items-center rounded-lg bg-gradient-to-br from-primary to-primary/40 text-[10px] font-bold text-white`}
        >
          {initials}
        </div>
      )}
      <span className="line-clamp-2 text-[10px] font-medium leading-tight text-muted-foreground">
        {sponsor.name}
      </span>
    </div>
  );
}

function TierSection({ tier, sponsors }: { tier: SponsorTier; sponsors: GridSponsor[] }) {
  if (sponsors.length === 0) return null;
  const style = TIER_STYLES[tier];

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <span className="text-[9px] font-bold uppercase tracking-widest text-gold">{tier}</span>
        <div className="h-px flex-1 bg-border" />
      </div>
      <div className={`grid ${style.cols} gap-2.5`}>
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
    <section className="space-y-4">
      <h2 className="font-display text-base font-bold">Sponsors</h2>
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