import { Phone, Sparkles } from "lucide-react";
import { promotions as basePromotions } from "@/lib/home-dummy-data";

export interface PromotionCardData {
  id: string;
  imageUrl?: string;
  businessName: string;
  description: string;
  phone: string;
  sponsored?: boolean;
}

function PromotionCard({ imageUrl, businessName, description, phone, sponsored }: PromotionCardData) {
  const initials = businessName.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  return (
    <article className="relative snap-center shrink-0 w-[80%] overflow-hidden rounded-2xl glass">
      <div className="relative h-28 w-full">
        {imageUrl ? (
          <img src={imageUrl} alt={businessName} className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-primary/40 to-primary/10">
            <span className="font-display text-2xl font-bold text-white/80">{initials}</span>
          </div>
        )}
        {sponsored && (
          <div className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-gold/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-gold-foreground shadow-glow-gold">
            <Sparkles className="h-2.5 w-2.5" />
            Sponsored
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="p-3.5">
        <h3 className="truncate font-display text-sm font-bold leading-tight">{businessName}</h3>
        <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-muted-foreground">{description}</p>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex flex-1 items-center gap-1.5 rounded-xl bg-card/60 px-2.5 py-2 text-[11px] text-muted-foreground">
            <Phone className="h-3 w-3 shrink-0" />
            <span className="truncate">{phone}</span>
          </div>
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="flex shrink-0 items-center gap-1.5 rounded-xl gradient-royal px-3.5 py-2 text-[11px] font-semibold text-white shadow-glow transition-transform active:scale-[0.97]"
          >
            <Phone className="h-3 w-3" />
            Call Now
          </a>
        </div>
      </div>
    </article>
  );
}

export interface PromotionsCarouselProps {
  promotions: PromotionCardData[];
}

export function PromotionsCarousel({ promotions }: PromotionsCarouselProps) {
  if (promotions.length === 0) return null;

  return (
    <section>
      <h2 className="font-display text-base font-bold">Promotions</h2>
      <div className="-mx-4 mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 no-scrollbar">
        {promotions.map((p) => (
          <PromotionCard key={p.id} {...p} />
        ))}
      </div>
    </section>
  );
}

const phoneAndSponsoredById: Record<string, { phone: string; sponsored?: boolean }> = {
  "promo-1": { phone: "+91 98XXX 11223", sponsored: true },
  "promo-2": { phone: "+91 98XXX 44556", sponsored: false },
  "promo-3": { phone: "+91 98XXX 77889", sponsored: false },
};

export const placeholderPromotions: PromotionCardData[] = basePromotions.map((p) => ({
  id: p.id,
  imageUrl: p.imageUrl,
  businessName: p.title,
  description: p.subtitle ?? "",
  phone: phoneAndSponsoredById[p.id]?.phone ?? "+91 98XXX 00000",
  sponsored: phoneAndSponsoredById[p.id]?.sponsored,
}));