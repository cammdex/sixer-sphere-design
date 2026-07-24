import { useEffect, useRef, useState } from "react";

interface DisplayFlyCardProps {
  show: boolean;
  playerName: string;
  playerNumber: string;
  playerImage?: string;
}

export function DisplayFlyCard({
  show,
  playerName,
  playerNumber,
  playerImage,
}: DisplayFlyCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [style, setStyle] = useState<React.CSSProperties>({
    opacity: 0,
  });

  useEffect(() => {
    if (!show) {
      setStyle({ opacity: 0 });
      return;
    }

    const logo = document.getElementById("winning-team-logo");

    if (!logo || !ref.current) return;

    const rect = logo.getBoundingClientRect();

    requestAnimationFrame(() => {
      setStyle({
        opacity: 1,
        transform: `translate(${rect.left - window.innerWidth / 2 + 40}px,
                               ${rect.top - window.innerHeight / 2 + 40}px)
                    scale(.22)
                    rotate(-8deg)`,
      });
    });

  }, [show]);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-1/2 top-1/2 z-[100] -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out"
      style={style}
    >
      <div className="flex items-center gap-5 rounded-2xl border border-primary/20 bg-card px-6 py-5 shadow-2xl">

        <div className="h-20 w-20 overflow-hidden rounded-full bg-muted">

          {playerImage ? (
            <img
              src={playerImage}
              className="h-full w-full object-cover"
            />
          ) : null}

        </div>

        <div>

          <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Player
          </div>

          <div className="text-3xl font-black">
            {playerNumber}
          </div>

          <div className="text-2xl font-bold">
            {playerName}
          </div>

        </div>

      </div>
    </div>
  );
}