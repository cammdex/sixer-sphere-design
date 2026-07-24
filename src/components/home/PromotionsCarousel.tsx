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
    <article
className="relative snap-center shrink-0 w-[82%] overflow-hidden rounded-[34px]"
style={{
background:"linear-gradient(180deg,#fffaf2,#f7eedf)",
border:"1px solid rgba(173,133,73,.25)",
boxShadow:"0 14px 34px rgba(70,48,20,.10)"
}}
>
      <div className="relative h-40 w-full">
        {imageUrl ? (
          <img src={imageUrl} alt={businessName} className="h-full w-full object-cover" />
        ) : (
          <div
  className="grid h-full w-full place-items-center"
  style={{
    background: "linear-gradient(180deg,#d8bc8a,#b48a52)",
  }}
>
  <span
    className="font-display"
    style={{
      color: "#4a3422",
      fontSize: "34px",
      fontWeight: 800,
    }}
  >
    {initials}
  </span>
</div>
        )}
        {sponsored && (
          <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
          style={{
background:"#f4e5bf",
color:"#8b632e",
border:"1px solid rgba(181,131,53,.35)"
}}
>
            <Sparkles
  className="h-3 w-3"
  style={{
    color:"#8b632e",
    fill:"#8b632e"
  }}
/>
            Featured
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="p-3.5">
        <h3 className="truncate font-display text-xl font-extrabold leading-tight"
        style={{
color:"#4c3624"
}}
>{businessName}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-7 text-muted-foreground"
        style={{
color:"#65523e"
}}
>{description}</p>

        <div className="my-3 flex items-center gap-2">
  <div className="h-px flex-1 bg-yellow-700/20" />
  <span className="text-[9px] text-yellow-700">✦</span>
  <div className="h-px flex-1 bg-yellow-700/20" />
</div>

<div className="mt-3 flex items-center gap-2">
          <div className="flex flex-1 items-center gap-1.5 rounded-2xl px-2.5 py-2 text-[11px] text-muted-foreground"
          style={{
background:"#fbf5ea",
border:"1px solid rgba(190,150,90,.18)"
}}
>
            <Phone className="h-3 w-3 shrink-0" />
            <span className="truncate">{phone}</span>
          </div>
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
           className="flex shrink-0 items-center gap-1.5 rounded-2xl px-4 py-2.5 text-[12px] font-semibold transition-transform active:scale-[0.97]"
style={{
  background:"linear-gradient(180deg,#c59a5d,#a97b40)",
  color:"white",
  boxShadow:"0 8px 20px rgba(120,82,30,.25)"
}}
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
      <div className="mb-7">
  <div
    className="text-[11px] font-bold uppercase tracking-[0.24em]"
    style={{
      color:"#9a6f3c"
    }}
  >
    Business Showcase
  </div>

  <h2
    className="mt-2 font-display text-2xl font-extrabold"
    style={{
      color:"#4c3624"
    }}
  >
    Featured Promotions
  </h2>

  <div className="mt-3 flex items-center gap-3">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-700/40 to-transparent"/>
    <span className="text-xs text-yellow-700">✦</span>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-700/40 to-transparent"/>
  </div>
</div>
      <div className="-mx-4 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 no-scrollbar">
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