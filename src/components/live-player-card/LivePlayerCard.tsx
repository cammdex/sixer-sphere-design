import {
  STATUS_COLORS,
  STATUS_LABELS,
  LivePlayerCardProps,
} from "./types";

import { AuctionFrame } from "./AuctionFrame";
import { BroadcastHeader } from "./BroadcastHeader";
import { PlayerShowcase } from "./PlayerShowcase";
import { Divider } from "./Divider";
import { AuctionSidebar } from "./AuctionSidebar";
import { BroadcastFooter } from "./BroadcastFooter";

export function LivePlayerCard({
  player,
  currentBid,
  status = "live",
  teamName,
  teamLogo,
}: LivePlayerCardProps) {

  const statusLabel = STATUS_LABELS[status];
  const statusColor = STATUS_COLORS[status];

  return (
    <AuctionFrame>

      <BroadcastHeader
        statusColor={statusColor}
      />

      <div className="px-10 py-8">

        <div className="grid items-start gap-10 lg:grid-cols-[2.25fr_0.9fr]">

          <PlayerShowcase
  playerNumber={player.playerNumber}
/>
          <AuctionSidebar
            currentBid={currentBid}
            basePrice={player.basePrice}
            teamName={teamName}
            teamLogo={teamLogo}
          />

        </div>


      </div>

    </AuctionFrame>
  );
}