import type { LucideIcon } from "lucide-react";
import {
  Radio,
  Gavel,
  Sparkles,
} from "lucide-react";
import { useAuctionEvents } from "@/lib/auction-store";

export type HighlightBadge = "LIVE" | "SOLD" | "RECORD" | "MATCH" | "RESULT";

export interface EventFeedEntry {
  id: string;
  icon?: string | LucideIcon;
  title: string;
  description?: string;
  timestamp: string;
  badge?: HighlightBadge;
}

const BADGE_STYLES: Record<HighlightBadge, string> = {
  LIVE: "bg-red-500/15 text-red-400 border-red-500/30",
  SOLD:
"bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  RECORD: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  MATCH: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  RESULT: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

function EntryIcon({ icon }: { icon?: string | LucideIcon }) {
  if (!icon) {
    return <Radio className="h-4 w-4 text-gold" />;
  }
  if (typeof icon === "string") {
    return <span className="text-base leading-none">{icon}</span>;
  }
  const Icon = icon;
  return <Icon className="h-4 w-4 text-gold" />;
}

function FeedRow({ item, isLast }: { item: EventFeedEntry; isLast: boolean }) {
  return (
    <div className="relative flex gap-3">
      <div className="flex flex-col items-center">
        <div
className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
style={{
background:"linear-gradient(180deg,#d8bc8a,#b48a52)",
boxShadow:"0 8px 18px rgba(70,48,20,.18)"
}}
>
          <EntryIcon icon={item.icon} />
        </div>
        {!isLast &&<div
className="mt-2 w-px flex-1"
style={{
background:
"linear-gradient(to bottom,#b68c52,rgba(182,140,82,.15))"
}}
/>}
      </div>

      <div className="min-w-0 flex-1 pb-5">
        <div className="flex items-center gap-2">
          <span
className="text-[10px] font-semibold uppercase tracking-[0.18em]"
style={{
color:"#8d6b47"
}}
>{item.timestamp}</span>
          {item.badge && (
            <span className={`rounded-full border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest ${BADGE_STYLES[item.badge]}`}>
              {item.badge}
            </span>
          )}
        </div>
       <p
className="mt-1 text-base font-bold leading-snug"
style={{
color:"#4c3624"
}}
>{item.title}</p>
        {item.description && (
         <p
className="mt-2 text-sm leading-7"
style={{
color:"#65523e"
}}
>{item.description}</p>
        )}
      </div>
    </div>
  );
}

export function EventFeed() {
  const events = useAuctionEvents();
  const items: EventFeedEntry[] = events.map((e) => ({
  id: e.id,
  title: e.message,
  description: undefined,
  timestamp: e.timestamp
  ? e.timestamp.toDate().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  : "--:--",
  
  badge: e.badge,
  icon:
    e.badge === "LIVE"
      ? Radio
      : e.badge === "SOLD"
      ? Gavel
      : Sparkles,
}));
  if (events.length === 0) return null;

  return (
    <section>
      <div className="mb-4">
  <div
    className="text-[11px] font-bold uppercase tracking-[0.24em]"
    style={{
      color:"#9a6f3c"
    }}
  >
    Live Updates
  </div>

  <h2
    className="mt-2 font-display text-2xl font-extrabold"
    style={{
      color:"#4c3624"
    }}
  >
    Auction Activity
  </h2>

  <div className="mt-3 flex items-center gap-3">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-700/40 to-transparent"/>
    <span className="text-xs text-yellow-700">✦</span>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-700/40 to-transparent"/>
  </div>
</div>
      <div
  className="rounded-[34px] p-6"
  style={{
    background:
      "linear-gradient(180deg,#fffaf2,#f7eedf)",

    border:
      "1px solid rgba(173,133,73,.25)",

    boxShadow:
      "0 14px 34px rgba(70,48,20,.10)",

    backgroundImage:`
      radial-gradient(circle at top right, rgba(212,176,111,.10), transparent 40%),
      url("/patterns/bohra-pattern.png")
    `,

    backgroundBlendMode:"overlay"
  }}
>
        {items.map((item, i) => (
  <FeedRow
    key={item.id}
    item={item}
    isLast={i === items.length - 1}
  />
))}
      </div>
    </section>
  );
}
