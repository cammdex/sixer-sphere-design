export function IntroScene() {
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

      <div className="mb-6 md:mb-12 flex flex-col items-center px-4">
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
          OFFICIAL UBL BROADCAST
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
          WELCOME
        </h2>

        <div className="mt-2 h-px w-52 bg-gradient-to-r from-transparent via-[#C79A35] to-transparent" />
      </div>

      {/* Logo */}

      <img
        src="/logos/ubl-logo.png"
        alt="UBL"
        className="
  h-32
  w-32
  md:h-48
  md:w-48
  object-contain
  drop-shadow-[0_18px_30px_rgba(0,0,0,.22)]
"
      />

      {/* Title */}

      <h1
        className="
  mt-6
  text-3xl
  md:text-6xl
  font-black
  tracking-[-0.04em]
  text-[#3B2817]
  text-center
  px-4
"
      >
        UDAIPUR BOHRA LEAGUE
      </h1>

      <p
        className="
  mt-3
  text-base
  md:text-lg md:text-xl
  font-medium
  text-[#7A5532]
  text-center
  px-4
"
      >
        Season 2 • Official Player Auction
      </p>
    </div>
  );
}