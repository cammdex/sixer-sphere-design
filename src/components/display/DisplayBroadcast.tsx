import { AnimatedNumber } from "./AnimatedNumber";

interface DisplayBroadcastProps {
  playerNumber: string;
  playerName: string;
  role: string;

  basePrice: number;
  age?: number;
  style?: string;

  currentBid: number;
  increment: number;

  teamName: string;

  playerImage?: string;
teamLogo?: string;
leaving?: boolean;
teamGlow?: boolean;
unsold?: boolean;
}

export function DisplayBroadcast({
  playerNumber,
  playerName,
  role,
  basePrice,
  age,
  style,
  currentBid,
  increment,
  teamName,
 playerImage,
teamLogo,
leaving = false,
teamGlow = false,
unsold = false,
}: DisplayBroadcastProps) {
  return (
    <section
  key={playerNumber}
  className="
    animate-player-enter
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
"
>

      {/* LEFT */}
<div
  className={`
    flex
    items-center
    gap-8
    transition-all
    duration-700
    ${
      unsold
  ? "opacity-0 scale-50 rotate-6 blur-md grayscale"
  : leaving
  ? "opacity-0 translate-x-32 translate-y-4 scale-75"
  : "opacity-100 translate-x-0 translate-y-0 scale-100"
    }
  `}
>

        <div className="h-36 w-36 overflow-hidden rounded-full border border-primary/15 bg-muted">

          {playerImage ? (
            <img
              src={playerImage}
              alt={playerName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              PHOTO
            </div>
          )}

        </div>

        <div>

          <div className="text-lg font-semibold uppercase tracking-[0.18em] text-foreground/80">
            PLAYER
          </div>

          <div className="mt-1 text-5xl font-black text-primary">
            {playerNumber}
          </div>

          <div className="mt-1 text-[58px] font-extrabold leading-tight text-foreground">
            {playerName}
          </div>

          <div className="mt-2 text-2xl font-medium uppercase tracking-[0.25em] text-muted-foreground">
            {role}
          </div>

          {/* Future Details */}

          <div className="mt-5 flex gap-8 text-sm text-muted-foreground">

            <div>
              <div className="uppercase tracking-widest">
                Base Price
              </div>
              <div className="mt-1 font-semibold text-foreground">
                ₹{new Intl.NumberFormat("en-IN").format(basePrice)}
              </div>
            </div>

            <div>
              <div className="uppercase tracking-widest">
                Age
              </div>
              <div className="mt-1 font-semibold text-foreground">
                {age ?? "--"}
              </div>
            </div>

            <div>
              <div className="uppercase tracking-widest">
                Style
              </div>
              <div className="mt-1 font-semibold text-foreground">
                {style ?? "--"}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div className="w-[420px] text-right">

        <div className="text-lg font-semibold uppercase tracking-[0.18em] text-foreground/80">
          Current Bid
        </div>

        <div className="mt-3 inline-flex rounded-xl border border-primary/10 bg-gradient-to-b from-white/70 to-background px-4 py-3 shadow-sm">

  <span className="text-5xl font-extrabold leading-none text-foreground">
  <AnimatedNumber value={currentBid} />
</span>

</div>

        <div className="mt-5 inline-flex rounded-full bg-green-100 px-4 py-2 text-lg font-bold text-green-700">
          ▲ +₹{new Intl.NumberFormat("en-IN").format(increment)}
        </div>

        <div className="mt-8 border-t border-primary/10 pt-6">

          <div className="text-lg font-semibold uppercase tracking-[0.18em] text-foreground/80">
            Leading Team
          </div>

          <div className="mt-4 flex items-center justify-end gap-4">

            {teamLogo ? (
              <img
  id="winning-team-logo"
  src={teamLogo}
  alt={teamName}
  className={`
    h-16
    w-16
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
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/10">
                Logo
              </div>
            )}

            <div className="text-4xl font-bold">
              {teamName}
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}