import { teams } from "@/lib/gpl-data";

import { BroadcastFrame } from "../layout/BroadcastFrame";

interface TeamSceneProps {
  teamId: string;
}

export function TeamScene({
  teamId,
}: TeamSceneProps) {
  const team = teams.find((t) => t.id === teamId);

  if (!team) return null;

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
            FRANCHISE SHOWCASE
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
            flex-col
            items-center
            justify-center
            text-center
          "
        >
          {/* Team Name */}

          <h1
            className="
              text-8xl
              font-black
              tracking-[-0.04em]
              text-[#3B2817]
              drop-shadow-[0_2px_2px_rgba(255,255,255,.18)]
            "
          >
            {team.name}
          </h1>

          {/* Team Logo */}

          <img
            src={team.logo}
            alt={team.name}
            className="
              mt-8
              h-60
              w-60
              object-contain
              drop-shadow-[0_18px_30px_rgba(0,0,0,.22)]
            "
          />

          {/* Owners */}

          <p
            className="
              mt-8
              text-xs
              font-semibold
              uppercase
              tracking-[0.45em]
              text-[#8C6239]
            "
          >
            OWNERS
          </p>

          <p
            className="
              mt-3
              text-2xl
              font-semibold
              text-[#5A4330]
            "
          >
            {team.owners.join(" • ")}
          </p>
        </div>
      }
    />
  );
}