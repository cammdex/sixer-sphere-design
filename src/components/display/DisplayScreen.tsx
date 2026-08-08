import { useEffect, useState } from "react";

import { DisplayHeader } from "./DisplayHeader";
import { DisplayBroadcast } from "./DisplayBroadcast";
import { DisplaySoldOverlay } from "./DisplaySoldOverlay";
import { DisplayHero } from "./DisplayHero";

import {
  useAuctionState,
  useLivePlayers,
  useLiveTeams,
  clearLiveAuction,
} from "@/lib/auction-store";

type ResultStatus = "sold" | "unsold" | null;

export function DisplayScreen() {
  const { state } = useAuctionState();
  const { players } = useLivePlayers();
  const { teams } = useLiveTeams();

  const [shake, setShake] = useState(false);
  const [playerLeaving, setPlayerLeaving] = useState(false);
  const [teamGlow, setTeamGlow] = useState(false);
  const [unsoldLeaving, setUnsoldLeaving] = useState(false);

  /*
   * Local copy of the player currently being displayed.
   * This prevents the card from disappearing when Firebase
   * clears playerId.
   */
  const [displayPlayer, setDisplayPlayer] =
    useState<typeof players[number] | null>(null);

  /*
   * Local copy of the team.
   */
  const [displayTeam, setDisplayTeam] =
    useState<typeof teams[number] | null>(null);

  /*
   * Keeps SOLD / UNSOLD independent from Firebase.
   */
  const [resultStatus, setResultStatus] =
    useState<ResultStatus>(null);

  /*
   * --------------------------------------------------
   * CAPTURE LIVE PLAYER
   * --------------------------------------------------
   */
  useEffect(() => {
    if (!state.playerId) {
      return;
    }

    const player = players.find(
      (p) => p.id === state.playerId
    );

    if (!player) {
      return;
    }

    setDisplayPlayer(player);

    if (state.biddingTeamId) {
      const team = teams.find(
        (t) => t.id === state.biddingTeamId
      );

      if (team) {
        setDisplayTeam(team);
      }
    }
  }, [
    state.playerId,
    state.biddingTeamId,
    players,
    teams,
  ]);

  /*
   * --------------------------------------------------
   * SOLD
   * --------------------------------------------------
   */
  useEffect(() => {
    if (state.status !== "sold") {
      return;
    }

    console.log("DISPLAY: SOLD");

    setResultStatus("sold");
    setPlayerLeaving(false);
    setUnsoldLeaving(false);
    setShake(true);

    const shakeTimer = window.setTimeout(() => {
      setShake(false);
    }, 300);

    /*
     * Keep the player and SOLD stamp visible for 3 seconds.
     */
    const leaveTimer = window.setTimeout(() => {
      console.log("DISPLAY: Starting SOLD exit");

      setPlayerLeaving(true);
      setTeamGlow(true);

      /*
       * Team glow.
       */
      const glowTimer = window.setTimeout(() => {
        setTeamGlow(false);
      }, 700);

      /*
       * Player exit animation is 1.5 seconds.
       *
       * AFTER the animation finishes:
       * - remove the local player
       * - remove the local team
       * - remove SOLD stamp
       * - clear Firebase
       */
      const removeTimer = window.setTimeout(async () => {
        console.log("DISPLAY: Removing SOLD player");

        setDisplayPlayer(null);
        setDisplayTeam(null);
        setPlayerLeaving(false);
        setTeamGlow(false);
        setResultStatus(null);

        await clearLiveAuction();
      }, 1500);

      /*
       * Store timers on the effect cleanup.
       */
      return () => {
        window.clearTimeout(glowTimer);
        window.clearTimeout(removeTimer);
      };
    }, 3000);

    return () => {
      window.clearTimeout(shakeTimer);
      window.clearTimeout(leaveTimer);
    };
  }, [state.status]);

  /*
   * --------------------------------------------------
   * UNSOLD
   * --------------------------------------------------
   */
  useEffect(() => {
    if (state.status !== "unsold") {
      return;
    }

    console.log("DISPLAY: UNSOLD");

    setResultStatus("unsold");
    setPlayerLeaving(false);
    setTeamGlow(false);

    /*
     * Keep the player and UNSOLD stamp visible for 2 seconds.
     */
    const leaveTimer = window.setTimeout(() => {
      console.log("DISPLAY: Starting UNSOLD exit");

      setUnsoldLeaving(true);

      /*
       * playerUnsold CSS animation = 1.2 seconds.
       */
      const removeTimer = window.setTimeout(async () => {
        console.log("DISPLAY: Removing UNSOLD player");

        setDisplayPlayer(null);
        setDisplayTeam(null);
        setUnsoldLeaving(false);
        setResultStatus(null);

        await clearLiveAuction();
      }, 1200);

      return () => {
        window.clearTimeout(removeTimer);
      };
    }, 2000);

    return () => {
      window.clearTimeout(leaveTimer);
    };
  }, [state.status]);

  /*
   * --------------------------------------------------
   * NORMAL LIVE STATES
   * --------------------------------------------------
   */
  useEffect(() => {
    if (
      state.status === "live" ||
      state.status === "goingOnce" ||
      state.status === "goingTwice"
    ) {
      setPlayerLeaving(false);
      setUnsoldLeaving(false);
      setTeamGlow(false);
      setShake(false);
      setResultStatus(null);
    }
  }, [state.status]);

  /*
   * --------------------------------------------------
   * DISPLAY LOGIC
   * --------------------------------------------------
   *
   * displayPlayer is intentionally used instead of
   * state.playerId so Firebase can be cleared only
   * after the visual animation is complete.
   */
  const shouldShowPlayer =
    !!displayPlayer &&
    (
      state.status !== "idle" ||
      resultStatus !== null ||
      playerLeaving ||
      unsoldLeaving
    );

  return (
    <main
      className={`relative h-screen overflow-hidden bg-background p-4 ${
        shake ? "display-shake" : ""
      }`}
    >
      <div className="relative flex h-full flex-col overflow-hidden">

        <DisplayHeader
          tournamentName="UDAIPUR BOHRA LEAGUE"
          season="Season 2 • 2026"
        />

        <div className="relative flex-1 overflow-hidden">

          {shouldShowPlayer && displayPlayer ? (
            <DisplayBroadcast
              leaving={playerLeaving}
              teamGlow={teamGlow}
              unsold={unsoldLeaving}

              playerNumber={
                displayPlayer.playerNumber ?? "--"
              }

              playerName={
                displayPlayer.name ?? ""
              }

              currentBid={
                state.currentBid ?? 0
              }

              increment={
                state.previousBid == null
                  ? 0
                  : (state.currentBid ?? 0) -
                    (state.previousBid ?? 0)
              }

              teamName={
                displayTeam?.name ??
                displayTeam?.displayName ??
                ""
              }

              teamLogo={displayTeam?.logo}
            />
          ) : (
            <DisplayHero />
          )}

          <DisplaySoldOverlay
            status={resultStatus}
          />

        </div>
      </div>
    </main>
  );
}