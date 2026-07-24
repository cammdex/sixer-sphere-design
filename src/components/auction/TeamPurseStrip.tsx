import { useAuctionState, useLiveTeams } from "@/lib/auction-store";
import { TeamPurseCard } from "./TeamPurseCard";

export function TeamPurseStrip() {
  const { teams } = useLiveTeams();
  const { state } = useAuctionState();

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {teams.map((team) => (
        <TeamPurseCard
          key={team.id}
          team={team}
          active={team.id === state.biddingTeamId}
        />
      ))}
    </div>
  );
}