import {
  useAuctionState,
} from "@/lib/auction-store";

import { HeroBroadcast } from "@/components/broadcast/HeroBroadcast";

export function DisplayHero() {
  const { state: auction } = useAuctionState();

  return (
    <section className="mx-auto mt-4 flex h-[calc(100vh-140px)] w-full max-w-[1700px] items-center justify-center px-6">
      <div className="w-full h-full">
  <HeroBroadcast />
</div>

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