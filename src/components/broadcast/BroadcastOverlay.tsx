import { BroadcastTicker } from "./BroadcastTicker";

interface BroadcastOverlayProps {
  ticker?: string;
}

export function BroadcastOverlay({
  ticker,
}: BroadcastOverlayProps) {
  return (
    <>
      {/* Bottom Overlay */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-52
          pointer-events-none
        "
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,.18), transparent)",
        }}
      />

      {ticker && (
        <BroadcastTicker text={ticker} />
      )}
    </>
  );
}