import { BroadcastStage } from "./BroadcastStage";
import { BroadcastOverlay } from "./BroadcastOverlay";

import { LivePlayerCard } from "@/components/live-player-card/LivePlayerCard";

import {
  useAuctionState,
  useLivePlayers,
  useLiveTeams,
} from "@/lib/auction-store";

export function LiveBroadcast() {
  const { state: auction } = useAuctionState();

  const { players } = useLivePlayers();
  const { teams } = useLiveTeams();

  const player = players.find(
    (p) => p.id === auction.playerId
  );

  const team = teams.find(
    (t) => t.id === auction.biddingTeamId
  );

  if (!player) return null;

  return (
    <BroadcastStage>
      <BroadcastOverlay
  ticker="UDAIPUR BOHRA LEAGUE • OFFICIAL PLAYER AUCTION • LIVE BROADCAST"
/>

      <LivePlayerCard
        player={player}
        currentBid={auction.currentBid ?? undefined}
        status={auction.status as
  | "live"
  | "goingOnce"
  | "goingTwice"
  | "sold"
  | "unsold"}
        teamName={team?.displayName}
        teamLogo={team?.logo}
      />
    </BroadcastStage>
  );
}