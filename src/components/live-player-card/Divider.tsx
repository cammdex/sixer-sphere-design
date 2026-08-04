interface DividerProps {
  className?: string;
}

export function Divider({
  className = "",
}: DividerProps) {
  return (
    <div
      className={`flex items-center gap-5 ${className}`}
    >
      <div
        className="h-px flex-1"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(122,82,43,.45), transparent)",
        }}
      />

      <div
        className="h-[10px] w-[10px] rotate-45"
        style={{
          background: "#9b6d36",
          boxShadow: "0 0 0 2px rgba(183,138,74,.15)",
        }}
      />

      <div
        className="h-px flex-1"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(122,82,43,.45), transparent)",
        }}
      />
    </div>
  );
}