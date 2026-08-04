import {BroadcastScene} from "./BroadcastScene"
import { BroadcastTransition } from "./BroadcastTransition";

import { useBroadcastQueue } from "./hooks/useBroadcastQueue";

import { IntroScene } from "./scenes/IntroScene";
import { TeamScene } from "./scenes/TeamScene";
import { PlayerScene } from "./scenes/PlayerScene";
import { AuctionSoonScene } from "./scenes/AuctionSoonScene";
import { AuctionStartScene } from "./scenes/AuctionStartScene";

export function BroadcastSlideshow() {
  const { currentScene, currentIndex } = useBroadcastQueue();

  return (
    <BroadcastScene>
      <BroadcastTransition
        sceneKey={`${currentScene.type}-${currentIndex}`}
      >
        {currentScene.type === "intro" && (
          <IntroScene />
        )}

        {currentScene.type === "team" && (
          <TeamScene teamId={currentScene.teamId} />
        )}

        {currentScene.type === "player" && (
  <PlayerScene
    teamId={currentScene.teamId}
    leadership={currentScene.leadership}
  />
)}

        {currentScene.type === "auctionSoon" && (
          <AuctionSoonScene />
        )}

        {currentScene.type === "auctionStart" && (
          <AuctionStartScene />
        )}
      </BroadcastTransition>
    </BroadcastScene>
  );
}