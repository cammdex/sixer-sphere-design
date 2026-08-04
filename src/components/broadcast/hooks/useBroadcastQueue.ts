import { useEffect, useState } from "react";

import { broadcastSlides } from "../broadcast-slides";
import { BROADCAST_TIMINGS } from "../utils/timings";

export function useBroadcastQueue() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentScene = broadcastSlides[currentIndex];

  useEffect(() => {
    let duration: number;

    switch (currentScene.type) {
      case "team":
        duration = BROADCAST_TIMINGS.TEAM;
        break;

      case "player":
        duration = BROADCAST_TIMINGS.PLAYER;
        break;

      case "auctionSoon":
        duration = BROADCAST_TIMINGS.AUCTION_SOON;
        break;

      case "auctionStart":
        duration = BROADCAST_TIMINGS.AUCTION_START;
        break;

      case "intro":
      default:
        duration = BROADCAST_TIMINGS.INTRO;
        break;
    }

    const timer = window.setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % broadcastSlides.length);
    }, duration);

    return () => window.clearTimeout(timer);
  }, [currentIndex, currentScene]);

  return {
    currentIndex,
    currentScene,
  };
}