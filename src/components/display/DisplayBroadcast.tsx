import { AnimatedNumber } from "./AnimatedNumber";

interface DisplayBroadcastProps {
  playerNumber: string;
  playerName: string;

  currentBid: number;
  increment: number;

  teamName: string;

  teamLogo?: string;
  leaving?: boolean;
  teamGlow?: boolean;
  unsold?: boolean;
}

export function DisplayBroadcast({
  playerNumber,
  playerName,
  currentBid,
  increment,
  teamName,
  teamLogo,
  leaving = false,
  teamGlow = false,
  unsold = false,
}: DisplayBroadcastProps) {
  const animationClass = leaving
    ? "animate-player-leaving"
    : unsold
      ? "animate-player-unsold"
      : "animate-player-enter";

  return (
    <section
      key={playerNumber}
      className={`
        ${animationClass}
        flex
        h-full
        items-center
        justify-between
        rounded-2xl
        border
        border-primary/10
        bg-card/90
        px-8
        py-5
        shadow-lg
      `}
    >
      {/* LEFT — PLAYER CARD */}

      <div className="w-[700px] shrink-0">
        <img
          src={`/player-cards/${playerNumber}.png`}
          onError={(e) => {
            e.currentTarget.src = "/player-cards/placeholder.png";
          }}
          alt={playerName}
          className="w-full h-auto object-contain"
          draggable={false}
        />
      </div>

      {/* RIGHT — AUCTION INFO */}

      <div className="w-[520px] text-right">
        <div className="text-2xl font-semibold uppercase tracking-[0.18em] text-foreground/80">
  Current Bid
</div>

        <div className="mt-4 inline-flex rounded-2xl border border-primary/10 bg-gradient-to-b from-white/70 to-background px-6 py-4 shadow-sm">
  <div className="text-4xl font-bold">
    <AnimatedNumber value={currentBid} />
  </div>
</div>

        <div className="mt-6 inline-flex rounded-full bg-green-100 px-6 py-3 text-2xl font-bold text-green-700">
          ▲ +₹{new Intl.NumberFormat("en-IN").format(increment)}
        </div>

        <div className="mt-8 border-t border-primary/10 pt-6">
          <div className="text-2xl font-semibold uppercase tracking-[0.18em] text-foreground/80">
  Leading Team
</div>

          <div className="mt-4 flex items-center justify-end gap-4">
            {teamLogo ? (
              <img
                id="winning-team-logo"
                src={teamLogo}
                alt={teamName}
                className={`
                  h-24
                  w-24
                  object-contain
                  transition-all
                  duration-500
                  ${
                    teamGlow
                      ? "scale-125 drop-shadow-[0_0_25px_rgba(255,210,0,.9)]"
                      : "scale-100"
                  }
                `}
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-primary/10" />
            )}

            <div className="text-5xl font-bold">
              {teamName}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}