import { ReactNode } from "react";
import { motion } from "framer-motion";

interface BroadcastSceneProps {
  children: ReactNode;
}

function Corner({
  className,
}: {
  className: string;
}) {
  return (
    <div
      className={`absolute h-10 w-10 pointer-events-none z-30 ${className}`}
    >
      <div
        className="absolute inset-0 rounded-sm"
        style={{
          borderColor: "#C79A35",
          borderStyle: "solid",
        }}
      />
    </div>
  );
}

export function BroadcastScene({
  children,
}: BroadcastSceneProps) {
  return (
    <section
      className="
        relative
        mx-auto
        h-[620px]
        w-full
        overflow-hidden
        rounded-[34px]
        isolate
        border-[10px]
        border-[#4A2F1B]
        shadow-[0_18px_60px_rgba(0,0,0,.35)]
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
          inset-[8px]
          rounded-[24px]
          border
          border-[#C79A35]/70
          pointer-events-none
          z-20
        "
      />

      {/* Corner Plates */}

      <div
        className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-[#D7B061] z-30"
      />

      <div
        className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-[#D7B061] z-30"
      />

      <div
        className="absolute left-4 bottom-4 h-8 w-8 border-l-2 border-b-2 border-[#D7B061] z-30"
      />

      <div
        className="absolute right-4 bottom-4 h-8 w-8 border-r-2 border-b-2 border-[#D7B061] z-30"
      />

      {/* Inner Shadow */}

      <div
        className="absolute inset-[10px] rounded-[22px] pointer-events-none z-20"
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
          h-[760px]
          w-[760px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#C79A35]
          opacity-8
          blur-[170px]
          animate-pulse
        "
      />

      {/* Soft Vignette */}

      <div
        className="absolute inset-0"
        style={{
          boxShadow: "inset 0 0 120px rgba(0,0,0,.12)",
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
          filter: "blur(28px)",
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
          px-10
        "
      >
        {children}
      </div>
    </section>
  );
}