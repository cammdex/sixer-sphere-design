import { useAuctionState, useLivePlayers } from "@/lib/auction-store";

export function LiveBroadcast() {
  const { state: auction } = useAuctionState();
  const { players } = useLivePlayers();

  const player = players.find(
    (p) => p.id === auction.playerId
  );

  if (!player) return null;

  return (
    <div className="mt-2 flex w-full justify-center sm:mt-4 lg:mt-5">
      <div className="w-full max-w-[600px] overflow-hidden rounded-[16px]">
        <img
          src={`/player-cards/${player.playerNumber}.png`}
          alt=""
          className="block h-auto w-full object-contain"
          draggable={false}
        />
      </div>
    </div>
  );
}