interface SponsorSceneProps {
  sponsorId: string;
}

export function SponsorScene({
  sponsorId,
}: SponsorSceneProps) {
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
      {/* Scene Label */}

      <p
        className="
          text-sm
          font-semibold
          uppercase
          tracking-[0.60em]
          text-[#C79A35]
        "
      >
        OFFICIAL PARTNER
      </p>

      {/* Sponsor Placeholder */}

      <div
        className="
          mt-12
          flex
          h-56
          w-56
          items-center
          justify-center
          rounded-full
          border
          border-[#C79A35]/30
          bg-white/5
        "
      >
        <span
          className="
            text-6xl
            font-black
            text-[#F5E7C2]
          "
        >
          {sponsorId}
        </span>
      </div>

      {/* Title */}

      <h1
        className="
          mt-10
          text-6xl
          font-black
          tracking-[-0.03em]
          text-[#F5E7C2]
        "
      >
        Sponsor Showcase
      </h1>

      {/* Subtitle */}

      <p
        className="
          mt-5
          max-w-3xl
          text-xl
          leading-8
          text-[#D8C7A4]
        "
      >
        Proudly supporting the UBL Player Auction.
      </p>
    </div>
  );
}