type AuctionStatus =
  | "idle"
  | "transition"
  | "live"
  | "goingOnce"
  | "goingTwice"
  | "sold"
  | "unsold";

interface DisplayStatusBarProps {
  status: AuctionStatus;
}

const STATUS_CONFIG = {
  idle: {
    label: "Waiting for Auction",
    icon: "⏳",
    bg: "bg-stone-200",
    text: "text-stone-700",
  },
  live: {
    label: "LIVE AUCTION",
    icon: "🔴",
    bg: "bg-red-100",
    text: "text-red-700",
    
    transition: {
  label: "PREPARING PLAYER",
  icon: "⏳",
  bg: "bg-blue-100",
  text: "text-blue-700",
},
  },
  goingOnce: {
    label: "GOING ONCE",
    icon: "🟡",
    bg: "bg-yellow-100",
    text: "text-yellow-700",
  },
  goingTwice: {
    label: "GOING TWICE",
    icon: "🟠",
    bg: "bg-orange-100",
    text: "text-orange-700",
  },
  sold: {
    label: "SOLD",
    icon: "🟢",
    bg: "bg-green-100",
    text: "text-green-700",
  },
  unsold: {
    label: "UNSOLD",
    icon: "⚫",
    bg: "bg-stone-300",
    text: "text-stone-700",
  },
};

export function DisplayStatusBar({
  status,
}: DisplayStatusBarProps) {
console.log("Display Status:", status);

  const config =
  STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] ??
  STATUS_CONFIG.idle;

  return (
    <footer
      className={`rounded-xl border border-yellow-800/20 px-6 py-3 shadow-lg ${config.bg}`}
    >
      <div
  className={`flex items-center justify-center gap-4 text-xl font-semibold uppercase tracking-[0.12em] ${config.text}`}
>
        <span
  className={status === "live" ? "animate-pulse" : ""}
>
  {config.icon}
</span>
        <span>{config.label}</span>
      </div>
    </footer>
  );
}