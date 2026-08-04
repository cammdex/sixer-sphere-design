import { CircleDot, Gavel } from "lucide-react";

interface BroadcastFooterProps {
  statusLabel: string;
  statusColor: string;
}

export function BroadcastFooter({
  statusLabel,
  statusColor,
}: BroadcastFooterProps) {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-5">

      {/* LEFT */}

      <div className="flex items-center gap-3">

        <CircleDot
          className="h-3 w-3 animate-pulse"
          style={{
            color: statusColor,
            fill: statusColor,
          }}
        />

        <div>

          <div
            className="text-sm font-bold uppercase"
            style={{
              letterSpacing: ".28em",
              color: "#432a17",
            }}
          >
            LIVE NOW
          </div>

          <div
            className="mt-1 text-xs uppercase"
            style={{
              letterSpacing: ".24em",
              color: "#8f673d",
            }}
          >
            Official Auction Feed
          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div
        className="flex items-center gap-3 rounded-full px-5 py-3"
        style={{
          border: "1px solid rgba(145,101,54,.35)",
          background: "transparent",
        }}
      >

        <Gavel
          size={18}
          style={{
            color: "#6a4523",
          }}
        />

        <span
          className="text-sm font-bold uppercase"
          style={{
            letterSpacing: ".30em",
            color: "#52341b",
          }}
        >
          {statusLabel}
        </span>

      </div>

    </footer>
  );
}