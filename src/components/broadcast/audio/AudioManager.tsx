import { useEffect } from "react";

import { useAuctionState } from "@/lib/auction-store";
import { useBroadcastAudio } from "./useBroadcastAudio";

export function AudioManager() {
  const { state: auction } = useAuctionState();

  const {
    startAmbience,
    stopAmbience,
  } = useBroadcastAudio();

  useEffect(() => {
    const isLive =
      auction.status === "live" ||
      auction.status === "goingOnce" ||
      auction.status === "goingTwice" ||
      auction.status === "sold" ||
      auction.status === "unsold";

    if (isLive) {
      stopAmbience();
      return;
    }

    startAmbience();

    return () => {
      stopAmbience();
    };
  }, [auction.status, startAmbience, stopAmbience]);

  return null;
}