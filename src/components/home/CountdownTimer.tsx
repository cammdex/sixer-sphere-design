interface CountdownTimerProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({
  days,
  hours,
  minutes,
  seconds,
}: CountdownTimerProps) {
  const units = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: seconds, label: "Seconds" },
  ];

  return (
    <div className="mt-4 grid grid-cols-4 gap-3">
     {units.map((unit) => (
  <div
    key={unit.label}
    aria-label={`${unit.value} ${unit.label}`}
    className="glass bohra-border relative overflow-hidden rounded-3xl px-2 py-4 text-center transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl"
  >
          <div className="font-display text-3xl font-black tracking-tight tabular-nums text-gold">
            {String(Math.max(0, unit.value)).padStart(2, "0")}
          </div>

          <div className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}