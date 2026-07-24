import { formatINR } from "@/lib/gpl-data";
import type { LiveTeam } from "@/lib/auction-store";

interface TeamPurseCardProps {
  team: LiveTeam;
  active?: boolean;
}

export function TeamPurseCard({
  team,
  active = false,
}: TeamPurseCardProps) {
  return (
    <div
      className={`min-w-[180px] rounded-3xl p-4 transition-all duration-300 ${
        active
          ? "border-2 border-gold shadow-xl scale-[1.02]"
          : "border border-border"
      } glass`}
    >
      <h3 className="font-bold truncate">
        {team.name}
      </h3>

      <div className="mt-3">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">
          Purse
        </div>

        <div className="font-display text-2xl font-black text-gold">
          {formatINR(team.purse)}
        </div>
      </div>

      <div className="mt-3 flex justify-between text-sm">
        <span>Slots</span>

        <span className="font-semibold">
          {team.remainingSlots}
        </span>
      </div>
    </div>
  );
}