import { createFileRoute } from "@tanstack/react-router";
import { MobileLayout } from "@/components/mobile-layout";

import { HeroSection } from "@/components/home/HeroSection";
import { TournamentOverview } from "@/components/home/TournamentOverview";
import { SponsorsGrid } from "@/components/home/SponsorsGrid";
import { LeadSponsor } from "@/components/home/LeadSponsor";
import { PoweredBy } from "@/components/home/PoweredBy";
import { APP_PHASE } from "@/lib/app-phase";


import {
  leadSponsor,
  poweredBySponsors,
} from "@/lib/home-dummy-data";
import { EventFeed } from "@/components/home/EventFeed";
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
const isAuction = APP_PHASE === "auction";
const isPostAuction = APP_PHASE === "postAuction";
const isTournament = APP_PHASE === "tournament";
const poweredBy = poweredBySponsors.find(
  (s) => s.role === "Powered By"
)!;

const coPoweredBy = poweredBySponsors.filter(
  (s) => s.role === "Co-Powered By"
);
  return (
    <MobileLayout>
      {/* 1. Dynamic Hero — unchanged, still reads live Firebase auction state */}
      <HeroSection />


{isAuction && (
  <>
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
  </>
)}

{isPostAuction && (
  <div className="mt-5">
    <TournamentOverview />
  </div>
)}

      {/* 2. Lead Sponsor */}
      <div className="mt-5">
        <LeadSponsor
  name={leadSponsor.name}
  logo={leadSponsor.logoUrl}
  tagline={leadSponsor.tagline}
  description={leadSponsor.tagline}
  website={leadSponsor.websiteUrl}
/>
      </div>

      {/* 3. Powered By / Co-Powered By */}
      <div className="mt-5">
        <PoweredBy
  poweredBy={{
    name: poweredBy.name,
    logoUrl: poweredBy.logoUrl,
    tagline: poweredBy.tagline,
    description: poweredBy.description,
    websiteUrl: poweredBy.websiteUrl,
  }}
  coPoweredBy={coPoweredBy.map((s) => ({
    name: s.name,
    logoUrl: s.logoUrl,
    tagline: s.tagline,
    description: s.description,
    websiteUrl: s.websiteUrl,
  }))}
/>
      </div>

      

      {/* 5. Sponsors grid */}
      <div className="mt-5">
        <SponsorsGrid />
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
      {/* Owners section coming next */}
    </MobileLayout>
  );
}