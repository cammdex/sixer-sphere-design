interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="space-y-3">
      <div
        className="text-[11px] font-bold uppercase tracking-[0.24em]"
        style={{
          color: "#9a6f3c",
        }}
      >
        {eyebrow}
      </div>

      <h2
        className="font-display text-4xl font-black tracking-tight md:text-5xl"
        style={{
          color: "#4c3624",
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="max-w-xl text-sm"
          style={{
            color: "#75614b",
          }}
        >
          {subtitle}
        </p>
      )}

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-700/40 to-transparent" />

        <span className="text-xs text-yellow-700">
          ✦
        </span>

        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-700/40 to-transparent" />
      </div>
    </div>
  );
}