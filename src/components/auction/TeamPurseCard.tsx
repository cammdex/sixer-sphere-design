import { formatINR } from "@/lib/gpl-data";
import type { LiveTeam } from "@/lib/auction-store";

interface TeamPurseCardProps {
  team: LiveTeam;
  active?: boolean;
}

const TOTAL_SQUAD = 13;

export function TeamPurseCard({
  team,
  active = false,
}: TeamPurseCardProps) {
  const playersBought = team.playersBought ?? 0;

  const progress =
    (playersBought / TOTAL_SQUAD) * 100;

  return (
    <div
      className="min-w-[165px] md:min-w-[210px] h-[220px] md:h-[260px] rounded-[18px] md:rounded-[20px] overflow-hidden transition-all duration-300 snap-start"
      style={{
        background: "#f7efdd",
        border: active
          ? "2px solid #c89d58"
          : "1px solid rgba(138,97,57,.45)",

        boxShadow: active
          ? "0 0 20px rgba(201,158,89,.25)"
          : "0 8px 20px rgba(0,0,0,.06)",
      }}
    >
      <div
        className="h-full p-3 md:p-4"
        style={{
          backgroundImage:
            "url('/images/live-player-card/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Logo */}

        <div className="flex justify-center">
          {team.logo ? (
            <img
              src={team.logo}
              alt={team.name}
              className="h-10 w-10 md:h-12 md:w-12 object-contain"
            />
          ) : (
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{
                background: "#d2b27a",
                color: "#fff",
                fontWeight: 700,
              }}
            >
              {team.name
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")}
            </div>
          )}
        </div>

        {/* Team Name */}

        <h2
  className="
    mt-2
    h-[44px]
    md:h-[56px]
    flex
    items-center
    justify-center
    text-center
    text-base
    md:text-xl
    font-black
    leading-tight
  "
  
  style={{
    color: "#4b3120",
  }}
>
  <span>{team.name}</span>
</h2>

        {/* Purse */}

        <div className="mt-4">

          <p
            className="text-[10px] uppercase tracking-[0.30em]"
            style={{
              color: "#8c6845",
            }}
          >
            Remaining Purse
          </p>

          <h3
            className="mt-1 font-display text-[22px] md:text-[30px] font-black"
            style={{
              color: "#c38c3c",
            }}
          >
            {formatINR(team.purse ?? 0)}
          </h3>

        </div>

        {/* Squad */}

        <div className="mt-3">

          <div className="mb-2 flex justify-between">

            <span
              className="text-[10px] uppercase tracking-[0.25em]"
              style={{
                color: "#8c6845",
              }}
            >
              Squad
            </span>

            <span
              className="font-semibold"
              style={{
                color: "#4b3120",
              }}
            >
              {playersBought}/{TOTAL_SQUAD}
            </span>

          </div>

          <div
            className="h-[5px] overflow-hidden rounded-full"
            style={{
              background: "rgba(80,60,40,.12)",
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg,#b8863b,#ddb56b)",
              }}
            />
          </div>

        </div>

        {/* Active */}

        {active && (
          <div
            className="mt-3 flex items-center justify-center gap-2 rounded-full py-1.5"
            style={{
              background:
                "rgba(220,38,38,.08)",
              border:
                "1px solid rgba(220,38,38,.15)",
            }}
          >
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />

            <span
              className="text-[10px] font-bold uppercase tracking-[0.22em]"
              style={{
                color: "#b32626",
              }}
            >
              LIVE
            </span>

          </div>
        )}

      </div>
    </div>
  );
}