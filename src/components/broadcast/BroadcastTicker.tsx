interface BroadcastTickerProps {
  text: string;
}

export function BroadcastTicker({
  text,
}: BroadcastTickerProps) {
  return (
    <div
      className="
        absolute
        bottom-0
        left-0
        right-0
        overflow-hidden
        border-t
        border-[#C79A35]/20
        bg-[rgba(22,16,11,.88)]
        backdrop-blur-sm
      "
    >
      <div
        className="
          whitespace-nowrap
          py-3
          text-sm
          font-semibold
          uppercase
          tracking-[0.35em]
          text-[#E8C26D]
        "
      >
        <div
          className="inline-block"
          style={{
            animation: "ticker 28s linear infinite",
          }}
        >
          {Array(8)
            .fill(` ${text} • `)
            .join("")}
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}