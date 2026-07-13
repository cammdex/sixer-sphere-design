import { TeamCrest } from "@/components/mobile-layout";
import { formatINR } from "@/lib/gpl-data";
import { useLiveTeams } from "@/lib/auction-store";

export function LiveTeams() {
  const { teams } = useLiveTeams();

  return (
    <section className="mt-5">
      <h2 className="mb-3 font-display text-lg font-bold">
        Live Team Purse
      </h2>

      <div className="space-y-3">
        {teams.map((team) => {
          const pursePercent =
            ((team.purse ?? 0) / (team.initialPurse ?? 1)) * 100;

          return (
            <div
              key={team.id}
              className="rounded-2xl glass p-4"
            >
              <div className="flex items-center gap-3">
                <TeamCrest
                  short={team.short}
                  color={team.color}
                  color2={team.color2}
                  size={46}
                />

                <div className="flex-1">
                  <h3 className="font-semibold">
                    {team.name}
                  </h3>

                  <p className="text-xl font-bold text-gold">
                    {formatINR(team.purse ?? 0)}
                  </p>
                </div>
              </div>

              {/* Purse Bar */}

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-card">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
                  style={{
                    width: `${Math.max(0, Math.min(100, pursePercent))}%`,
}}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Players
                  </p>

                  <p className="text-lg font-bold">
                    {team.playersBought}/{team.squadLimit}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Maximum Bid
                  </p>

                  <p className="text-lg font-bold text-gold">
                    {formatINR(Number(team.maxBid ?? 0))}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}