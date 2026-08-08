interface AuctionFrameProps {
  children: React.ReactNode;
}

export function AuctionFrame({
  children,
}: AuctionFrameProps) {
  return (
    <section className="w-full">
      <div
        className="
          w-full
          max-w-[1250px]
          overflow-hidden
          rounded-[16px]
          sm:rounded-[20px]
          lg:rounded-[22px]
        "
        style={{
          background: "#f8f0dd",
          border: "2px solid #7d5632",
          boxShadow: `
            inset 0 0 0 2px rgba(203,165,94,.45),
            0 12px 28px rgba(0,0,0,.10)
          `,
        }}
      >
        <div
          className="
            m-[5px]
            p-[8px]
            rounded-[10px]
            sm:m-[7px]
            sm:p-[14px]
            lg:m-[10px]
            lg:p-[24px]
          "
          style={{
            backgroundImage:
              "url('/images/live-player-card/background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}