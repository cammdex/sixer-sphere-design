interface AuctionProgressProps {
  sold: number;
  total: number;
}

export function AuctionProgress({
  sold,
  total,
}: AuctionProgressProps) {
  const percentage =
    total === 0
      ? 0
      : Math.min((sold / total) * 100, 100);

  const remaining = Math.max(total - sold, 0);

  return (
    <section
      className="overflow-hidden rounded-[24px]"
      style={{
        background: "#f7efdd",
        border: "2px solid #8a6139",
        boxShadow:
          "inset 0 0 0 2px rgba(206,168,101,.35), 0 12px 28px rgba(0,0,0,.08)",
      }}
    >
      <div className="px-8 py-7">

        {/* Header */}

        <div className="flex items-end justify-between">

          <div>

            <p
              className="text-[11px] font-semibold uppercase tracking-[0.35em]"
              style={{
                color: "#8d6a42",
              }}
            >
              AUCTION PROGRESS
            </p>

            <h2
              className="mt-3 font-display text-5xl font-black"
              style={{
                color: "#4b3120",
              }}
            >
              {sold}
              <span
                style={{
                  color: "#b48b52",
                }}
              >
                {" "}
                / {total}
              </span>
            </h2>

            <p
              className="mt-1 text-sm"
              style={{
                color: "#8d6a42",
              }}
            >
              Players Auctioned
            </p>

          </div>

          <div className="text-right">

            <div
              className="font-display text-4xl font-black"
              style={{
                color: "#c29042",
              }}
            >
              {Math.round(percentage)}%
            </div>

            <p
              className="mt-1 text-xs uppercase tracking-[0.25em]"
              style={{
                color: "#9a7650",
              }}
            >
              Completed
            </p>

          </div>

        </div>

        {/* Progress */}

        <div className="mt-8">

          <div
            className="h-[10px] overflow-hidden rounded-full"
            style={{
              background: "rgba(90,60,35,.12)",
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${percentage}%`,
                background:
                  "linear-gradient(90deg,#b8863b,#ddb56b,#b8863b)",
                boxShadow:
                  "0 0 14px rgba(197,152,76,.45)",
              }}
            />
          </div>

        </div>

        {/* Divider */}

        <div
          className="my-8 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(120,80,45,.25), transparent)",
          }}
        />

        {/* Stats */}

        <div className="grid grid-cols-3 gap-6 text-center">

          <div>

            <p
              className="text-[11px] uppercase tracking-[0.3em]"
              style={{
                color: "#8d6a42",
              }}
            >
              SOLD
            </p>

            <h3
              className="mt-2 font-display text-3xl font-black"
              style={{
                color: "#4b3120",
              }}
            >
              {sold}
            </h3>

          </div>

          <div>

            <p
              className="text-[11px] uppercase tracking-[0.3em]"
              style={{
                color: "#8d6a42",
              }}
            >
              UNSOLD
            </p>

            <h3
              className="mt-2 font-display text-3xl font-black"
              style={{
                color: "#4b3120",
              }}
            >
              0
            </h3>

          </div>

          <div>

            <p
              className="text-[11px] uppercase tracking-[0.3em]"
              style={{
                color: "#8d6a42",
              }}
            >
              REMAINING
            </p>

            <h3
              className="mt-2 font-display text-3xl font-black"
              style={{
                color: "#4b3120",
              }}
            >
              {remaining}
            </h3>

          </div>

        </div>

      </div>
    </section>
  );
}