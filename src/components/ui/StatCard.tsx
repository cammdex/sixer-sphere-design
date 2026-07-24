import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  color: string;
  background: string;
}

export function StatCard({
  icon: Icon,
  value,
  label,
  color,
  background,
}: StatCardProps) {
  return (
    <div
      className="rounded-3xl p-6 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl"
      style={{
        background: "#fffdf8",
        border: "1px solid rgba(190,150,90,.18)",
        boxShadow: "0 10px 22px rgba(90,60,25,.10)",
      }}
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg"
        style={{
          background,
        }}
      >
        <Icon
          size={28}
          style={{
            color,
          }}
        />
      </div>

      <div
        className="mt-6 text-4xl font-black tracking-tight"
        style={{
          color: "#4d3622",
        }}
      >
        {value}
      </div>

      <div
        className="mt-3 text-sm font-semibold uppercase tracking-[0.18em]"
        style={{
          color: "#75614b",
        }}
      >
        {label}
      </div>
    </div>
  );
}