interface AuctionFrameProps {
  children: React.ReactNode;
}

export function AuctionFrame({
  children,
}: AuctionFrameProps) {
  return (
    <section className="flex justify-center w-full">

      <div
        className="w-full max-w-[1250px] overflow-hidden rounded-[22px]"
        style={{
          background: "#f8f0dd",

          border: "2px solid #7d5632",

          boxShadow: `
            inset 0 0 0 2px rgba(203,165,94,.45),
            0 18px 40px rgba(0,0,0,.12)
          `,
        }}
      >

        <div
          style={{
            margin: "10px",
            padding: "24px",

            backgroundImage:
              "url('/images/live-player-card/background.jpg')",

            backgroundSize: "cover",
            backgroundPosition: "center",

            borderRadius: "10px",
          }}
        >
          {children}
        </div>

      </div>

    </section>
  );
}