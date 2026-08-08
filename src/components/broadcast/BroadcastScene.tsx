import { ReactNode } from "react";
import { motion } from "framer-motion";

interface BroadcastSceneProps {
  children: ReactNode;
}

export function BroadcastScene({
  children,
}: BroadcastSceneProps) {
  return (
    <section
      className="
        relative
        mx-auto
        h-[390px]
        w-full
        overflow-hidden
        rounded-[18px]
        isolate
        border-[5px]
        border-[#4A2F1B]
        shadow-[0_12px_35px_rgba(0,0,0,.28)]

        sm:h-[520px]
        sm:rounded-[26px]
        sm:border-[7px]

        lg:h-[820px]
        lg:rounded-[34px]
        lg:border-[10px]
        lg:shadow-[0_18px_60px_rgba(0,0,0,.35)]
      "
      style={{
        backgroundImage:
          "url('/images/live-player-card/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Brass Inner Frame */}
      <div
        className="
          absolute
          inset-[5px]
          rounded-[14px]
          border
          border-[#C79A35]/70
          pointer-events-none
          z-20

          sm:inset-[7px]
          sm:rounded-[19px]

          lg:inset-[8px]
          lg:rounded-[24px]
        "
      />

      {/* Corner Plates */}
      <div className="absolute left-2 top-2 h-5 w-5 border-l-2 border-t-2 border-[#D7B061] z-30 sm:left-3 sm:top-3 sm:h-6 sm:w-6 lg:left-4 lg:top-4 lg:h-8 lg:w-8" />

      <div className="absolute right-2 top-2 h-5 w-5 border-r-2 border-t-2 border-[#D7B061] z-30 sm:right-3 sm:top-3 sm:h-6 sm:w-6 lg:right-4 lg:top-4 lg:h-8 lg:w-8" />

      <div className="absolute left-2 bottom-2 h-5 w-5 border-l-2 border-b-2 border-[#D7B061] z-30 sm:left-3 sm:bottom-3 sm:h-6 sm:w-6 lg:left-4 lg:bottom-4 lg:h-8 lg:w-8" />

      <div className="absolute right-2 bottom-2 h-5 w-5 border-r-2 border-b-2 border-[#D7B061] z-30 sm:right-3 sm:bottom-3 sm:h-6 sm:w-6 lg:right-4 lg:bottom-4 lg:h-8 lg:w-8" />

      {/* Inner Shadow */}
      <div
        className="
          absolute
          inset-[6px]
          rounded-[14px]
          pointer-events-none
          z-20
          sm:inset-[8px]
          sm:rounded-[20px]
          lg:inset-[10px]
          lg:rounded-[22px]
        "
        style={{
          boxShadow: "inset 0 0 32px rgba(0,0,0,.10)",
        }}
      />

      {/* Light Tint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(255,248,235,.05), rgba(255,248,235,.05))",
        }}
      />

      {/* Ambient Glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[360px]
          w-[360px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#C79A35]
          opacity-8
          blur-[100px]
          animate-pulse

          sm:h-[500px]
          sm:w-[500px]
          sm:blur-[130px]

          lg:h-[760px]
          lg:w-[760px]
          lg:blur-[170px]
        "
      />

      {/* Soft Vignette */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: "inset 0 0 80px rgba(0,0,0,.12)",
        }}
      />

      {/* Gold Sweep */}
      <motion.div
        className="
          absolute
          inset-y-0
          -left-1/2
          w-[34%]
          pointer-events-none
        "
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,235,180,.28), transparent)",
          filter: "blur(20px)",
          transform: "skewX(-18deg)",
          mixBlendMode: "screen",
        }}
        initial={{
          x: "-140%",
          opacity: 0,
        }}
        animate={{
          x: "340%",
          opacity: [0, 0.7, 0],
        }}
        transition={{
          duration: 0.9,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div
        className="
          relative
          z-10
          flex
          h-full
          w-full
          items-center
          justify-center
          px-3

          sm:px-6
          lg:px-10
        "
      >
        {children}
      </div>
    </section>
  );
}