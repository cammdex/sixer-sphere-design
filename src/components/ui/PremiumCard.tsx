import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  decorative?: boolean;
}

export function PremiumCard({
  children,
  className,
  hover = false,
  decorative = true,
}: PremiumCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[34px]",
        "border border-[#d8bc8a]/25",
        "bg-gradient-to-b from-[#fffaf2] to-[#f7eedf]",
        "shadow-[0_14px_34px_rgba(70,48,20,.10)]",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl",
        className
      )}
    >
      {decorative && (
        <>
          <div
            className="absolute inset-0 opacity-60 pointer-events-none"
            style={{
              backgroundImage:
                'url("/patterns/bohra-pattern.png")',
              backgroundBlendMode: "overlay",
            }}
          />

          <div
            className="absolute top-0 right-0 h-48 w-48 rounded-full blur-3xl opacity-20"
            style={{
              background: "#d4b06f",
            }}
          />
        </>
      )}

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}