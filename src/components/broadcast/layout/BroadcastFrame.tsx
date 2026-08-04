import { ReactNode } from "react";

interface BroadcastFrameProps {
  header: ReactNode;
  hero: ReactNode;
}

export function BroadcastFrame({
  header,
  hero,
}: BroadcastFrameProps) {
  return (
    <div className="h-full w-full px-10 pt-6">
      <div
        className="grid h-full"
        style={{
          gridTemplateRows: "55px 505px 60px",
        }}
      >
        {/* Header */}

        <div className="flex items-center justify-center">
          {header}
        </div>

        {/* Hero */}

        <div className="flex items-center justify-center overflow-hidden">
          {hero}
        </div>

        {/* Reserved Ticker Space */}

        <div />
      </div>
    </div>
  );
}