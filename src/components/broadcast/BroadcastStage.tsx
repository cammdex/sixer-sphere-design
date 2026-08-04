import { ReactNode } from "react";

interface BroadcastStageProps {
  children: ReactNode;
}

export function BroadcastStage({
  children,
}: BroadcastStageProps) {
  return (
    <section
      className="
        relative
        mx-auto
        h-[620px]
        w-full
        overflow-hidden
        rounded-[32px]
        border
        border-[#C79A35]/20
        shadow-2xl
      "
      style={{
        backgroundImage:
          "url('/images/live-player-card/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Tint */}

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(22,15,10,.18), rgba(22,15,10,.18))",
        }}
      />

      {/* Gold Ambient Glow */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[720px]
          w-[720px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#C79A35]
          opacity-15
          blur-[150px]
          animate-pulse
        "
      />

      {/* Vignette */}

      <div
        className="absolute inset-0"
        style={{
          boxShadow:
            "inset 0 0 180px rgba(0,0,0,.35)",
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