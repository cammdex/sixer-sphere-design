export interface LivePlayerCardProps {
  player: {
    imageUrl?: string;
    initials: string;
    playerNumber?: string;
    name: string;
    role: string;
    basePrice: number;
  };

  currentBid?: number;

  status?:
    | "idle"
    | "live"
    | "goingOnce"
    | "goingTwice"
    | "sold"
    | "unsold";

  teamName?: string;
  teamLogo?: string;
}

export const STATUS_LABELS = {
  idle: "WAITING",
  live: "LIVE NOW",
  goingOnce: "GOING ONCE",
  goingTwice: "GOING TWICE",
  sold: "SOLD",
  unsold: "UNSOLD",
} as const;

export const STATUS_COLORS = {
  idle: "#9CA3AF",
  live: "#DC2626",
  goingOnce: "#D97706",
  goingTwice: "#EA580C",
  sold: "#16A34A",
  unsold: "#64748B",
} as const;