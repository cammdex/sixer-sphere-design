import type { LucideIcon } from "lucide-react";
import { Radio, Gavel, Trophy, Swords, ClipboardCheck, Sparkles } from "lucide-react";
import { eventFeed as baseEventFeed } from "@/lib/home-dummy-data";

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
  SOLD: "bg-gold/15 text-gold border-gold/30",
  RECORD: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  MATCH: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  RESULT: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

function EntryIcon({ icon }: { icon?: string | LucideIcon }) {
  if (!icon) {
    return <Sparkles className="h-4 w-4 text-gold" />;
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
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl gradient-royal shadow-glow">
          <EntryIcon icon={item.icon} />
        </div>
        {!isLast && <div className="mt-1 w-px flex-1 bg-border" />}
      </div>

      <div className="min-w-0 flex-1 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{item.timestamp}</span>
          {item.badge && (
            <span className={`rounded-full border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest ${BADGE_STYLES[item.badge]}`}>
              {item.badge}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm font-semibold leading-snug">{item.title}</p>
        {item.description && (
          <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{item.description}</p>
        )}
      </div>
    </div>
  );
}

export interface EventFeedProps {
  items: EventFeedEntry[];
}

export function EventFeed({ items }: EventFeedProps) {
  if (items.length === 0) return null;

  return (
    <section>
      <h2 className="font-display text-base font-bold">Live Event Feed</h2>
      <div className="mt-3 rounded-2xl glass p-4">
        {items.map((item, i) => (
          <FeedRow key={item.id} item={item} isLast={i === items.length - 1} />
        ))}
      </div>
    </section>
  );
}

const iconAndBadgeById: Record<string, { icon?: string | LucideIcon; badge?: HighlightBadge; description?: string }> = {
  "ef-1": { icon: ClipboardCheck, description: "Ground crew completed re-turfing two weeks ahead of the opener." },
  "ef-2": { icon: Gavel, badge: "SOLD", description: "Owners can now review every player's base price before auction day." },
  "ef-3": { icon: Trophy, description: "Volta Electronics signs on as the tournament's official Lead Sponsor." },
  "ef-4": { icon: Swords, badge: "MATCH", description: "Season opener locked in — first ball at Galaxy Ground." },
  "ef-5": { icon: Radio, description: "Three ICC-panel umpires confirmed for all Season 4 fixtures." },
};

export const placeholderEventFeed: EventFeedEntry[] = baseEventFeed.map((e) => ({
  id: e.id,
  timestamp: e.timestamp,
  title: e.title,
  description: iconAndBadgeById[e.id]?.description,
  icon: iconAndBadgeById[e.id]?.icon,
  badge: iconAndBadgeById[e.id]?.badge,
}));