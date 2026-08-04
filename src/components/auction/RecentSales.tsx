import { PremiumCard } from "@/components/ui/PremiumCard";
import {
  useRecentSales,
  useLivePlayers,
  useLiveTeams,
} from "@/lib/auction-store";
import { formatINR } from "@/lib/gpl-data";

export function RecentSales() {
  const sales = useRecentSales();
  const { players } = useLivePlayers();
  const { teams } = useLiveTeams();

  if (sales.length === 0) {
    return (
      <PremiumCard>
        <h2 className="px-6 pt-6 pb-4 text-xl font-bold">
          Recent Sales
        </h2>

        <div className="px-6 pb-6 py-8 text-center text-muted-foreground">
          No players sold yet.
        </div>
      </PremiumCard>
    );
  }

  return (
    <PremiumCard>
      <h2 className="px-6 pt-6 pb-4 text-xl font-bold">
        Recent Sales
      </h2>

      <div className="space-y-3 px-6 pb-6">
        {sales.map((sale) => {
          const player = players.find(
            (p) => p.id === sale.playerId
          );

          const team = teams.find(
            (t) => t.id === sale.teamId
          );

          return (
            <div
              key={sale.id}
              className="flex items-center justify-between rounded-xl border border-border p-3"
            >
              <div>
                <div className="font-semibold">
                  {player?.playerNumber} • {player?.name ?? sale.playerId}
                </div>

                <div className="text-sm text-muted-foreground">
                  {team?.name ?? sale.teamId}
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-gold">
                  {formatINR(sale.price)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PremiumCard>
  );
}