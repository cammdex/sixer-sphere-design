interface PlayerShowcaseProps {
  playerNumber?: string;
}
export function PlayerShowcase({
  playerNumber,
}: PlayerShowcaseProps) {
  return (
  <div className="flex items-start justify-start -ml-8 -mt-4">

    {playerNumber ? (

      <img
        src={`/player-cards/${playerNumber}.png`}
        alt={playerNumber}
        loading="lazy"
        className="
          w-full
          max-w-[600px]
          rounded-none
          object-contain
          select-none
          drop-shadow-[0_18px_30px_rgba(0,0,0,.18)]
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
          h-[240px]
          w-full
          items-center
          justify-center
          rounded-[24px]
          border-2
          border-dashed
          border-[#C79A35]
        "
      >
        <div className="text-center">

          <div className="text-lg font-bold text-[#8A6235]">
            Waiting for Live Player
          </div>

        </div>
      </div>

    )}

  </div>
);
}