import { CircleDot } from "lucide-react";

interface BroadcastHeaderProps {
  statusColor: string;
}

export function BroadcastHeader({
  statusColor,
}: BroadcastHeaderProps) {
  return (
    <header className="flex items-start justify-between px-8 pt-7">

      {/* LEFT */}

      <div className="flex items-start gap-4">

        <div
          className="mt-1 flex h-9 w-9 items-center justify-center rounded-full"
          style={{
            background: "rgba(220,38,38,.12)",
          }}
        >
          <CircleDot
            className="h-4 w-4 animate-pulse"
            style={{
              color: statusColor,
              fill: statusColor,
            }}
          />
        </div>

        <div>

          <div
            className="text-[12px] font-bold uppercase"
            style={{
              letterSpacing: ".42em",
              color: "#4a3019",
            }}
          >
            Live
          </div>

          <div
            className="mt-1 text-[30px] font-black leading-none"
            style={{
              color: "#2b1b0f",
              fontFamily: "var(--font-display)",
            }}
          >
            LIVE AUCTION
          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div className="text-right">

        <div
          className="text-[11px] uppercase"
          style={{
            letterSpacing: ".32em",
            color: "#7d5c37",
          }}
        >
          Official Broadcast
        </div>

        <div
          className="mt-2 text-lg font-bold"
          style={{
            color: "#3d2917",
          }}
        >
          UBL • Season II
        </div>

      </div>

    </header>
  );
}