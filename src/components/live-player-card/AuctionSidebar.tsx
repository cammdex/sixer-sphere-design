import { formatINR } from "@/lib/gpl-data";

interface AuctionSidebarProps {
  currentBid?: number;
  basePrice: number;
  teamName?: string;
  teamLogo?: string;
}

export function AuctionSidebar({
  currentBid,
  basePrice,
  teamName,
  teamLogo,
}: AuctionSidebarProps) {
  return (
    <div className="flex h-full flex-col justify-center">

      {/* LIVE BADGE */}

      <div className="mb-5 flex items-center gap-3">

        <div className="h-3 w-3 rounded-full bg-red-600 animate-pulse" />

        <span
          className="text-[11px] font-bold uppercase"
          style={{
            letterSpacing: ".35em",
            color: "#7a5030",
          }}
        >
          LIVE BIDDING
        </span>

      </div>

      {/* CURRENT BID */}

      <div>

        <div
          className="text-[11px] uppercase"
          style={{
            letterSpacing: ".35em",
            color: "#8c6238",
          }}
        >
          CURRENT BID
        </div>

        <div
          className="mt-2 font-display text-[72px] font-black leading-none"
          style={{
            color: "#3b2415",
          }}
        >
          {formatINR(currentBid ?? basePrice)}
        </div>

      </div>

      {/* Divider */}

      <div
        className="my-5 h-px"
        style={{
          background:
            "linear-gradient(to right,#a9783b40,transparent)",
        }}
      />

      {/* LEADING TEAM */}

      <div>

        <div
          className="text-[11px] uppercase"
          style={{
            letterSpacing: ".35em",
            color: "#8c6238",
          }}
        >
          LEADING TEAM
        </div>

        <div className="mt-5 flex items-center gap-4">

          {teamLogo ? (

            <img
              src={teamLogo}
              alt={teamName}
              className="
                h-16
                w-16
                rounded-full
                bg-white
                object-contain
                p-2
                shadow-lg
              "
            />

          ) : (

            <div
              className="
                h-16
                w-16
                rounded-full
                border
              "
              style={{
                borderColor: "#b8874b",
              }}
            />

          )}

          <div>

            <div
              className="font-display text-3xl font-bold"
              style={{
                color: "#3b2415",
              }}
            >
              {teamName ?? "Awaiting Bid"}
            </div>

            <div
              className="mt-1 text-xs uppercase"
              style={{
                letterSpacing: ".30em",
                color: "#9d7344",
              }}
            >
              Highest Bidder
            </div>

          </div>

        </div>

      </div>

      {/* Divider */}

      <div
        className="my-5 h-px"
        style={{
          background:
            "linear-gradient(to right,#a9783b40,transparent)",
        }}
      />

      {/* BASE PRICE */}

      <div>

        <div
          className="text-[11px] uppercase"
          style={{
            letterSpacing: ".35em",
            color: "#8c6238",
          }}
        >
          BASE PRICE
        </div>

        <div
          className="mt-2 font-display text-4xl font-black"
          style={{
            color: "#65411f",
          }}
        >
          {formatINR(basePrice)}
        </div>

      </div>

    </div>
  );
}