import { DisplayHeader } from "./DisplayHeader";
import { DisplayBroadcast } from "./DisplayBroadcast";
import { DisplayStatusBar } from "./DisplayStatusBar";
import { DisplaySoldOverlay } from "./DisplaySoldOverlay";
import { useEffect, useState } from "react";
import { DisplayHero } from "./DisplayHero";

import {
  useAuctionState,
  useLivePlayers,
  useLiveTeams,
  clearLiveAuction,
} from "@/lib/auction-store";

export function DisplayScreen() {
  const { state } = useAuctionState();
  const { players } = useLivePlayers();
  const { teams } = useLiveTeams();
const [shake, setShake] = useState(false);
const [playerLeaving, setPlayerLeaving] = useState(false);
const [teamGlow, setTeamGlow] = useState(false);
const [unsoldLeaving, setUnsoldLeaving] = useState(false);


useEffect(() => {

  if (state.status === "sold") {
    setUnsoldLeaving(false);

    setShake(true);

    const shakeTimer = setTimeout(() => {
      setShake(false);
    }, 300);

    const leaveTimer = setTimeout(async () => {
    setPlayerLeaving(true);
    setTeamGlow(true);

    setTimeout(() => {
        setTeamGlow(false);
    }, 700);

    setTimeout(async () => {
        await clearLiveAuction();
    }, 1500);

}, 3000);

    return () => {
      clearTimeout(shakeTimer);
      clearTimeout(leaveTimer);
    };

  } else if (state.status === "unsold") {
    setPlayerLeaving(false);
setTeamGlow(false);

    const timer = setTimeout(() => {
      setUnsoldLeaving(true);
    }, 2000);

    return () => clearTimeout(timer);

  } else {

    setShake(false);
    setPlayerLeaving(false);
    setTeamGlow(false);
    setUnsoldLeaving(false);

  }

}, [state.status]);

  const currentPlayer = players.find(
    (player) => player.id === state.playerId
  );
  const hasLivePlayer =
  !!currentPlayer &&
  state.status !== "idle" &&
  state.status !== "transition";

  const currentTeam = teams.find(
    (team) => team.id === state.biddingTeamId
  );

  return (
    <main
  className={`h-screen overflow-hidden bg-background p-4 ${
    shake ? "display-shake" : ""
  }`}
>
      <div className="mx-auto flex h-full max-w-screen-2xl flex-col gap-4">

        
        <DisplayHeader
          tournamentName="UDAIPUR BOHRA LEAGUE"
          season="Season 2 • 2026"
        />

        <div
  className={
    hasLivePlayer
      ? "flex-1"
      : "flex flex-1 items-center justify-center"
  }
>
  {hasLivePlayer ? (
    <DisplayBroadcast
      leaving={playerLeaving}
      teamGlow={teamGlow}
      unsold={unsoldLeaving}
      playerNumber={currentPlayer!.playerNumber ?? "--"}
playerName={currentPlayer!.name ?? ""}
      currentBid={state.currentBid ?? 0}
      increment={
        state.previousBid == null
          ? 0
          : state.currentBid! - state.previousBid
      }
      teamName={currentTeam?.name ?? currentTeam?.displayName ?? ""}
      teamLogo={currentTeam?.logo}
    />
  ) : (
    <DisplayHero />
  )}
</div>

        {hasLivePlayer && (
  <DisplayStatusBar status={state.status} />
)}
      </div>


      {hasLivePlayer && (
  <DisplaySoldOverlay
    status={
      state.status === "sold"
        ? "sold"
        : state.status === "unsold"
        ? "unsold"
        : null
    }
  />
)}
  
    </main>
  );
}