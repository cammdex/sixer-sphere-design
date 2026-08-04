import { BroadcastEngine } from "./BroadcastEngine";
import { BroadcastOverlay } from "./BroadcastOverlay";

export function IdleBroadcast() {
  return (
    <div className="relative">
      <BroadcastEngine />

      <BroadcastOverlay
  ticker="WELCOME TO THE OFFICIAL UBL PLAYER AUCTION • FRANCHISE SHOWCASE • PLAYER SHOWCASE • AUCTION BEGINS SOON"
/>
    </div>
  );
}