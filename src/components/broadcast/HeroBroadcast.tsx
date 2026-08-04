import { useAuctionState } from "@/lib/auction-store";

import { IdleBroadcast } from "./IdleBroadcast";
import { LiveBroadcast } from "./LiveBroadcast";
import { LiveTransition } from "./LiveTransition";
import { AudioManager } from "./audio/AudioManager";

export function HeroBroadcast() {
  const { state: auction } = useAuctionState();

  return (
    <>
      <AudioManager />

      {auction.status === "idle" && (
        <IdleBroadcast />
      )}

      {auction.status === "transition" && (
        <LiveTransition />
      )}

      {(auction.status === "live" ||
        auction.status === "goingOnce" ||
        auction.status === "goingTwice" ||
        auction.status === "sold" ||
        auction.status === "unsold") && (
        <LiveBroadcast />
      )}
    </>
  );
}