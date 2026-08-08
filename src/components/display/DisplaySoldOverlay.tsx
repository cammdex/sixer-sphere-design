import { useEffect, useState } from "react";

interface DisplaySoldOverlayProps {
  status: "sold" | "unsold" | null;
}

export function DisplaySoldOverlay({
  status,
}: DisplaySoldOverlayProps) {
  const [displayedStatus, setDisplayedStatus] = useState<
    "sold" | "unsold" | null
  >(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (status !== "sold" && status !== "unsold") {
      return;
    }

    // Immediately lock in the result.
    setDisplayedStatus(status);
    setVisible(false);

    // Start the stamp animation.
    const animationFrame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setVisible(true);
      });
    });

    // Keep the stamp visible for 4 seconds.
    const hideTimer = window.setTimeout(() => {
      setVisible(false);

      // Allow the fade-out to finish before removing it.
      window.setTimeout(() => {
        setDisplayedStatus(null);
      }, 250);
    }, 4000);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(hideTimer);
    };
  }, [status]);

  if (!displayedStatus) {
    return null;
  }

  const stamp =
    displayedStatus === "sold"
      ? "/graphics/soldstamp.png"
      : "/graphics/unsoldstamp.png";

  return (
    <div className="pointer-events-none absolute inset-0 z-[100]">
      {/* Dark backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(40, 24, 12, 0.30)",
          opacity: visible ? 1 : 0,
          transition: "opacity 180ms ease-out",
        }}
      />

      {/* Stamp */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          key={displayedStatus}
          src={stamp}
          alt={displayedStatus === "sold" ? "SOLD" : "UNSOLD"}
          draggable={false}
          className="select-none"
          style={{
            width: "min(42vw, 520px)",
            maxWidth: "70%",
            height: "auto",

            opacity: visible ? 1 : 0,

            transform: visible
              ? "scale(1) rotate(-6deg)"
              : "scale(1.7) rotate(-18deg)",

            transition:
              "opacity 180ms ease-out, transform 420ms cubic-bezier(.17,.67,.25,1.25)",

            filter:
              "drop-shadow(0 14px 22px rgba(0,0,0,.30))",
          }}
        />
      </div>
    </div>
  );
}