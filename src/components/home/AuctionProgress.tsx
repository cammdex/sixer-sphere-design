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

  return (
    <div className="glass rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Auction Progress
          </p>

          <h3 className="mt-2 font-display text-3xl font-black">
            {sold} / {total}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Players Auctioned
          </p>
        </div>

        <div className="text-right">
          <div className="font-display text-2xl font-black text-gold">
            {Math.round(percentage)}%
          </div>
        </div>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-black/10">
        <div
          className="h-full rounded-full bg-gold transition-all duration-700"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}