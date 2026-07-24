import { useEffect, useState } from "react";

export function DisplaySoldOverlay({
  status,
}: DisplaySoldOverlayProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!status) {
      setVisible(false);
      return;
    }

    requestAnimationFrame(() => {
      setVisible(true);
    });
  }, [status]);

  if (!status) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">

      {/* Dark backdrop */}
   <div
  className={`
    absolute
    inset-0
    transition-opacity
    duration-300
    ${visible ? "opacity-100" : "opacity-0"}
  `}
  style={{
    background: `
      radial-gradient(
        circle at center,
        rgba(255,255,255,0.05) 0%,
        rgba(0,0,0,0.18) 35%,
        rgba(0,0,0,0.45) 100%
      )
    `,
  }}
/>

      {/* SOLD Stamp */}
      <div className="absolute inset-0 flex items-center justify-center">

        <img
  src={
    status === "sold"
      ? "/graphics/soldstamp.png"
      : "/graphics/unsoldstamp.png"
  }
  alt={status}
  className="sold-stamp-image"
/>

      </div>

    </div>
  );
}