export function AuctionSoonScene() {
  return (
    <div
      className="
        flex
        h-full
        w-full
        flex-col
        items-center
        justify-center
        text-center
      "
    >
      {/* Header */}

      <div className="mb-12 flex flex-col items-center">
        <div className="mb-2 h-px w-52 bg-gradient-to-r from-transparent via-[#C79A35] to-transparent" />

        <p
          className="
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.55em]
            text-[#C79A35]
          "
        >
          OFFICIAL LIVE AUCTION
        </p>

        <h2
          className="
            mt-2
            text-xl
            font-bold
            uppercase
            tracking-[0.35em]
            text-[#3B2817]
          "
        >
          AUCTION BEGINS SOON
        </h2>

        <div className="mt-2 h-px w-52 bg-gradient-to-r from-transparent via-[#C79A35] to-transparent" />
      </div>

      {/* Gavel */}

      <img
        src="/logos/gavel.png"
        alt="Auction Gavel"
        className="
  h-68
  w-68
  object-contain
  drop-shadow-[0_28px_48px_rgba(0,0,0,.28)]
"
      />

      {/* Message */}

      <p
        className="
          mt-8
          text-3xl
          font-bold
          text-[#3B2817]
        "
      >
        Owners are taking their seats
      </p>

      <p
        className="
          mt-3
          text-lg
          text-[#7A5532]
        "
      >
        Final preparations are underway before bidding begins.
      </p>
    </div>
  );
}