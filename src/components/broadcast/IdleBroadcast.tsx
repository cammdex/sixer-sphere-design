import { BroadcastEngine } from "./BroadcastEngine";
import { BroadcastOverlay } from "./BroadcastOverlay";

export function IdleBroadcast() {
  return (
    <section className="w-full overflow-hidden">
      <BroadcastEngine />

      <div className="mt-2 sm:mt-4 lg:mt-5">
        <BroadcastOverlay
          ticker="WELCOME TO THE OFFICIAL UBL PLAYER AUCTION • FRANCHISE SHOWCASE • PLAYER SHOWCASE • AUCTION BEGINS SOON"
        />
      </div>
    </section>
  );
}