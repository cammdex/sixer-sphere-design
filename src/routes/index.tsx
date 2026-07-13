import { createFileRoute } from "@tanstack/react-router";
import { MobileLayout } from "@/components/mobile-layout";

import { HeroSection } from "@/components/home/HeroSection";
import { LeadSponsor, placeholderLeadSponsor } from "@/components/home/LeadSponsor";
import { PoweredBy, placeholderPoweredBy } from "@/components/home/PoweredBy";
import { OwnersScroll, placeholderOwners } from "@/components/home/OwnersScroll";
import { SponsorsGrid, placeholderSponsorsByTier } from "@/components/home/SponsorsGrid";
import { PromotionsCarousel, placeholderPromotions } from "@/components/home/PromotionsCarousel";
import { EventFeed, placeholderEventFeed } from "@/components/home/EventFeed";
import {LiveTeams} from "@/components/home/LiveTeams";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Galaxy Premier League — Home" },
      { name: "description", content: "Live countdown to the player auction, fixtures, stats and announcements." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <MobileLayout>
      {/* 1. Dynamic Hero — unchanged, still reads live Firebase auction state */}
      <HeroSection />

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

      {/* 4. Meet the Owners */}
      <div className="mt-5">
        <OwnersScroll owners={placeholderOwners} />
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
        <EventFeed items={placeholderEventFeed} />
      </div>
    </MobileLayout>
  );
}