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
      className="rounded-2xl p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
      style={{
        background: "#fffdf8",
        border: "1px solid rgba(190,150,90,.18)",
        boxShadow: "0 8px 18px rgba(90,60,25,.08)",
      }}
    >
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl"
        style={{
          background,
        }}
      >
        <Icon
          size={22}
          style={{
            color,
          }}
        />
      </div>

      <div
        className="mt-4 text-2xl font-black leading-tight"
        style={{
          color: "#4d3622",
        }}
      >
        {value}
      </div>

      <div
        className="mt-1 text-xs font-semibold uppercase tracking-[0.15em]"
        style={{
          color: "#75614b",
        }}
      >
        {label}
      </div>
    </div>
  );
}