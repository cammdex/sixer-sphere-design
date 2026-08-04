import {
  useAuctionState,
} from "@/lib/auction-store";

import { HeroBroadcast } from "@/components/broadcast/HeroBroadcast";

export function HeroSection() {
  const { state: auction } = useAuctionState();

  return (
    <section className="mx-auto mt-6 w-full max-w-7xl px-4">
      <HeroBroadcast />

      {auction.eventMessage && (
        <div
          className="mt-6 rounded-2xl border px-4 py-3 text-center"
          style={{
            borderColor: "rgba(201,158,89,.25)",
            background: "rgba(201,158,89,.08)",
          }}
        >
          <p
            className="font-semibold"
            style={{
              color: "#f5deb2",
            }}
          >
            {auction.eventMessage}
          </p>
        </div>
      )}
    </section>
  );
}