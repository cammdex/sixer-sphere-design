import { tournament } from "@/lib/gpl-data";
import {
  Users,
  Trophy,
  CalendarDays,
  MapPin,
  Wallet,
  Radio,
} from "lucide-react";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatCard } from "@/components/ui/StatCard";

const stats = [
  {
    icon: Trophy,
    title: "Teams",
    value: tournament.stats.teams.toString(),
    color: "#C79A35",
    bg: "#F8EFD8",
  },
  {
    icon: Users,
    title: "Players",
    value: tournament.stats.players.toString(),
    color: "#4E7BAA",
    bg: "#EAF3FB",
  },
  {
    icon: Wallet,
    title: "Auction Purse",
    value: tournament.auctionPurse,
    color: "#3F8B57",
    bg: "#EAF8EF",
  },
  {
    icon: CalendarDays,
    title: "Auction Date",
    value: new Date(tournament.auctionDate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    color: "#B76A35",
    bg: "#FDF0E6",
  },
  {
    icon: MapPin,
    title: "Venue",
    value: tournament.auctionVenue,
    color: "#8855AA",
    bg: "#F4EDFA",
  },
  {
    icon: Radio,
    title: "Status",
    value: `🟢 ${tournament.auctionStatus}`,
    color: "#C54848",
    bg: "#FCEDED",
  },
];

export function TournamentOverview() {
  return (
    <PremiumCard
  className="space-y-8 p-8"
  decorative
>
        <SectionHeader
  eyebrow="Tournament Overview"
  title={`${tournament.shortName} ${tournament.season}`}
/> 

<div className="grid grid-cols-2 gap-5">
  {stats.map((item) => (
    <StatCard
      key={item.title}
      icon={item.icon}
      value={item.value}
      label={item.title}
      color={item.color}
      background={item.bg}
    />
  ))}
</div>
    </PremiumCard>
  );
}