import { players, teams } from "@/lib/gpl-data";

import { BroadcastFrame } from "../layout/BroadcastFrame";

interface PlayerSceneProps {
  teamId: string;
  leadership: "captain" | "viceCaptain";
}

export function PlayerScene({
  teamId,
  leadership,
}: PlayerSceneProps) {
  const team = teams.find((t) => t.id === teamId);

  if (!team) return null;

  const playerName =
    leadership === "captain"
      ? team.captain
      : team.viceCaptain;

  const player = players.find(
    (p) =>
      p.name.trim().toLowerCase() ===
      playerName?.trim().toLowerCase()
  );

  if (!player) return null;

  return (
    <BroadcastFrame
      header={
        <div
          className="
            flex
            w-full
            flex-col
            items-center
            justify-center
          "
        >
          <div
            className="
              mb-2
              h-px
              w-48
              bg-gradient-to-r
              from-transparent
              via-[#C79A35]
              to-transparent
            "
          />

          <p
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.55em]
              text-[#C79A35]
            "
          >
            OFFICIAL UBL BROADCAST
          </p>

          <h2
            className="
              mt-2
              text-xl
              font-bold
              uppercase
              tracking-[0.35em]
              text-[#4A321F]
            "
          >
            PLAYER SHOWCASE
          </h2>

          <div
            className="
              mt-2
              h-px
              w-48
              bg-gradient-to-r
              from-transparent
              via-[#C79A35]
              to-transparent
            "
          />
        </div>
      }
      hero={
        <div
          className="
            flex
            h-full
            w-full
            items-center
            justify-center
            gap-20
            px-10
          "
        >
          {/* LEFT : PLAYER CARD */}

          <div
            className="
              flex
              w-1/2
              justify-center
            "
          >
            <img
              src={`/player-cards/${player.playerNumber}.png`}
              alt={player.name}
              className="
  w-[98%]
  max-w-[580px]
  object-contain
  drop-shadow-[0_32px_56px_rgba(0,0,0,.30)]
  select-none
  pointer-events-none
"
              draggable={false}
            />
          </div>

          {/* RIGHT : PLAYER INFO */}

          <div
            className="
              flex
              w-1/2
              flex-col
              justify-center
              items-start
            "
          >
            <p
              className="
                text-lg
                font-semibold
                uppercase
                tracking-[0.45em]
                text-[#8B6A3F]
              "
            >
              {leadership === "captain"
                ? "TEAM CAPTAIN"
                : "VICE CAPTAIN"}
            </p>

            <div
              className="
                mt-4
                h-px
                w-72
                bg-gradient-to-r
                from-[#C79A35]
                to-transparent
              "
            />

            <h1
              className="
                mt-6
                text-6xl
                font-black
                leading-tight
                text-[#3B2817]
              "
            >
              {player.name}
            </h1>
          </div>
        </div>
      }
    />
  );
}