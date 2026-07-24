import { Avatar } from "@/components/mobile-layout";
import { formatINR } from "@/lib/gpl-data";

interface LivePlayerCardProps {
  player: {
    imageUrl?: string;
    initials: string;
    playerNumber?: string;
    name: string;
    role: string;
    basePrice: number;
  };

  currentBid?: number;
  status?: "live" | "goingOnce" | "goingTwice" | "sold";
  teamName?: string;
teamLogo?: string;
}
export function LivePlayerCard({
  player,
  currentBid,
  status = "live",
  teamName,
teamLogo,
}: LivePlayerCardProps) {
const statusLabel = {
  live: "Live Now",
  goingOnce: "Going Once",
  goingTwice: "Going Twice",
  sold: "Player Sold",
}[status];

const statusConfig = {
  live: {
    dot: "bg-red-500",
    text: "text-red-600",
    border: "border-red-500/30",
    bg: "bg-red-500/10",
  },
  goingOnce: {
    dot: "bg-amber-500",
    text: "text-amber-600",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
  },
  goingTwice: {
    dot: "bg-orange-500",
    text: "text-orange-600",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
  },
  sold: {
    dot: "bg-emerald-500",
    text: "text-emerald-600",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
  },
}[status];

  return (
    <>
      <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 ${statusConfig.border} ${statusConfig.bg} ${statusConfig.text}`}>
        <span
  className={`h-2 w-2 rounded-full ${
    status === "live" ? "pulse-ring" : ""
  } ${statusConfig.dot}`}
/>
        {statusLabel}
      </div>

      <div className="mt-3 flex items-center gap-3">
        {player.imageUrl ? (
          <img
  loading="lazy"
            src={player.imageUrl}
            alt={`${player.name} profile`}
            className="h-28 w-28 rounded-3xl object-cover shadow-glow"
          />
        ) : (
          <Avatar
            initials={player.initials}
            color="#3b82f6"
            color2="#1e3a8a"
            size={104}
          />
        )}

        <div className="min-w-0">
          <div className="inline-flex rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
            {player.playerNumber ?? "P--"}
          </div>

          <h1 className="mt-2 font-display text-xl font-extrabold leading-tight" break-words>
            {player.name}
          </h1>

          <div className="mt-1 text-xs uppercase tracking-widest text-gold">
            {player.role}
          </div>
        </div>
      </div>

<div className="mt-5 rounded-2xl glass p-4">
  <div className="text-center">
    <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
      BASE PRICE
    </div>

    <div className="mt-2 font-display text-3xl font-extrabold text-gold">
      {formatINR(player.basePrice)}
    </div>
  </div>
</div>

{currentBid != null && (
  <div className="mt-4 rounded-2xl border border-gold/25 bg-gold/5 p-4 text-center">
    <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
      CURRENT BID
    </div>

    <div className="mt-2 font-display text-4xl font-black text-gold">
      {formatINR(currentBid)}
    </div>

    {teamName && (
  <div className="mt-4 flex items-center justify-center gap-3">
    {teamLogo && (
      <img
  loading="lazy"
        src={teamLogo}
        alt={`${teamName} logo`}
        className="h-10 w-10 rounded-full border border-gold/20 bg-white object-contain p-1"
      />
    )}

    <div className="text-left">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">
        Leading Team
      </div>

      <div className="font-semibold text-foreground">
        {teamName}
      </div>
    </div>
  </div>
)}
  </div>
)}
    </>
  );
}