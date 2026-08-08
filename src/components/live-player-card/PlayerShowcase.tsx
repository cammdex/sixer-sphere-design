interface PlayerShowcaseProps {
  playerNumber?: string;
}

export function PlayerShowcase({
  playerNumber,
}: PlayerShowcaseProps) {
  return (
    <div className="flex w-full justify-center">
      {playerNumber ? (
        <img
          src={`/player-cards/${playerNumber}.png`}
          alt={playerNumber}
          loading="lazy"
          className="
            block
            h-auto
            w-[82vw]
            max-w-[430px]
            sm:w-[78vw]
            sm:max-w-[500px]
            lg:w-full
            lg:max-w-[600px]
            rounded-none
            object-contain
            select-none
            drop-shadow-[0_12px_24px_rgba(0,0,0,.16)]
            transition-all
            duration-700
            ease-out
            hover:scale-[1.01]
          "
        />
      ) : (
        <div
          className="
            flex
            h-[130px]
            w-full
            max-w-[430px]
            items-center
            justify-center
            rounded-[18px]
            border
            border-dashed
            border-[#C79A35]
            sm:h-[180px]
            lg:h-[240px]
          "
        >
          <div className="text-center">
            <div className="text-sm font-bold text-[#8A6235] sm:text-lg">
              Waiting for Live Player
            </div>
          </div>
        </div>
      )}
    </div>
  );
}