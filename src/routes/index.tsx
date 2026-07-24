import { createFileRoute } from "@tanstack/react-router";
import { MobileLayout } from "@/components/mobile-layout";
import { LiveAuctionCenter } from "@/components/home/LiveAuctionCenter";

import { HeroSection } from "@/components/home/HeroSection";
import { TournamentOverview } from "@/components/home/TournamentOverview";
import { LeadSponsor, placeholderLeadSponsor } from "@/components/home/LeadSponsor";
import { PoweredBy, placeholderPoweredBy } from "@/components/home/PoweredBy";
import { OwnersScroll, placeholderOwners } from "@/components/home/OwnersScroll";
import { SponsorsGrid, placeholderSponsorsByTier } from "@/components/home/SponsorsGrid";
import { PromotionsCarousel, placeholderPromotions } from "@/components/home/PromotionsCarousel";
import { EventFeed, placeholderEventFeed } from "@/components/home/EventFeed";
import {LiveTeams} from "@/components/home/LiveTeams";
import { AuctionProgress } from "@/components/home/AuctionProgress";
import { useLivePlayers } from "@/lib/auction-store";
import { TeamPurseStrip } from "@/components/auction/TeamPurseStrip";
import { RecentSales } from "@/components/auction/RecentSales";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Udaipur Bohra League — Home" },
      { name: "description", content: "Live countdown to the player auction, fixtures, stats and announcements." },
    ],
  }),
  component: HomePage,
  
});

function HomePage() {
  const { players } = useLivePlayers();

  const soldPlayers = players.filter(
  (player) => player.status === "sold"
).length;

const totalPlayers = players.length;
  return (
    <MobileLayout>
      {/* 1. Dynamic Hero — unchanged, still reads live Firebase auction state */}
      <HeroSection />

<div className="mt-5">
  <LiveAuctionCenter />
</div>

<AuctionProgress
  sold={soldPlayers}
  total={totalPlayers}
/>

<div className="mt-5">
  <TeamPurseStrip />
</div>

<div className="mt-5">
  <RecentSales />
</div>


      <div className="mt-5">
  <TournamentOverview />
</div>

      {/* 2. Lead Sponsor */}
      <div className="mt-5">
        <LeadSponsor {...placeholderLeadSponsor} />
      </div>

      {/* 3. Powered By / Co-Powered By */}
      <div className="mt-5">
        <PoweredBy
          poweredBy={placeholderPoweredBy.poweredBy}
          coPoweredBy={placeholderPoweredBy.coPoweredBy}
        />
      </div>

      

      {/* 5. Sponsors grid */}
      <div className="mt-5">
        <SponsorsGrid sponsorsByTier={placeholderSponsorsByTier} />
      </div>

      {/* 6. Promotions carousel */}
      <div className="mt-5">
        <PromotionsCarousel promotions={placeholderPromotions} />
      </div>

      {/* 7. Live Teams */}
      <div className="mt-5">
        <LiveTeams />
      </div>

      {/* 8. Live Event Feed */}
      <div className="mt-5">
        <EventFeed />
      </div>

      {/* 4. Meet the Owners */}
      <div className="mt-5">
        <OwnersScroll owners={placeholderOwners} />
      </div>
    </MobileLayout>
  );
}