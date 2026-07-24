import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
}

export function AnimatedNumber({
  value,
  duration = 500,
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(value);
  const [animate, setAnimate] = useState(false);

  const previous = useRef(value);

  useEffect(() => {
    const start = previous.current;
    const end = value;

    if (start === end) return;

    setAnimate(true);

    let frame: number;
    const startTime = performance.now();

    const tick = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);

      const current = Math.round(start + (end - start) * eased);

      setDisplay(current);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        previous.current = end;

        setTimeout(() => setAnimate(false), 120);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return (
    <span
      className={`
        inline-block
        transition-all
        duration-200
        ${
          animate
            ? "scale-110 text-primary drop-shadow-[0_0_14px_rgba(255,180,0,0.5)]"
            : "scale-100"
        }
      `}
    >
      ₹{new Intl.NumberFormat("en-IN").format(display)}
    </span>
  );
}