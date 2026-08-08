import { createFileRoute } from "@tanstack/react-router";
import { MobileLayout } from "@/components/mobile-layout";
import { Youtube } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { TournamentOverview } from "@/components/home/TournamentOverview";
import { LeadSponsor } from "@/components/home/LeadSponsor";
import { PoweredBy } from "@/components/home/PoweredBy";
import { LiveTeams } from "@/components/home/LiveTeams";
import { AuctionProgress } from "@/components/home/AuctionProgress";
import { RecentSales } from "@/components/auction/RecentSales";
import { LiveSponsorCard } from "@/components/home/LiveSponsorCard";
import { APP_PHASE } from "@/lib/app-phase";
import { useLivePlayers } from "@/lib/auction-store";

import {
  leadSponsor,
  poweredBySponsors,
} from "@/lib/home-dummy-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Udaipur Bohra League — Home" },
      {
        name: "description",
        content:
          "Live countdown to the player auction, fixtures, stats and announcements.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { players } = useLivePlayers();

  const soldPlayers = players.filter(
    (player) => player.status === "sold",
  ).length;

  const totalPlayers = players.length;

  const isAuction = APP_PHASE === "auction";
  const isPostAuction = APP_PHASE === "postAuction";
  const isTournament = APP_PHASE === "tournament";

  const poweredBy = poweredBySponsors.find(
    (s) => s.role === "Powered By",
  )!;

  const coPoweredBy = poweredBySponsors.filter(
    (s) => s.role === "Co-Powered By",
  );

  return (
    <MobileLayout>
      {/* Dynamic Hero */}
      <HeroSection />

      <div className="mt-4">
  <a
    href="https://youtube.com/live/hI3bTEL49uI"
    target="_blank"
    rel="noopener noreferrer"
    className="flex w-full items-center justify-center gap-3 rounded-2xl px-5 py-4 font-display text-sm font-black uppercase tracking-[0.18em] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
    style={{
      background: "linear-gradient(180deg,#c59a5d,#a97b40)",
      border: "1px solid rgba(126,86,50,.5)",
      color: "#fffaf2",
      boxShadow: "0 8px 20px rgba(90,55,25,.18)",
    }}
  >
    <Youtube size={19} />
    View Auction Live
  </a>
</div>

      {/* AUCTION */}
      {isAuction && (
  <>
    {/* Auction Progress */}
    <div className="mt-5">
      <AuctionProgress
        sold={soldPlayers}
        total={totalPlayers}
      />
    </div>

    {/* 8 parchment team tabs */}
    <div className="mt-5">
      <LiveTeams />
    </div>

    {/* Recent Sales */}
    <div className="mt-5">
      <RecentSales />
    </div>

    {/* Lead Sponsor */}
    <div className="mt-5">
      <LeadSponsor
        name={leadSponsor.name}
        logo={leadSponsor.logoUrl}
        tagline={leadSponsor.tagline}
        description={leadSponsor.description}
        website={leadSponsor.websiteUrl}
      />
    </div>

    {/* Powered By / Co-Powered By */}
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
          phone: s.phone,
        }))}

        
      />
    </div>

<div className="mt-5">
  <LiveSponsorCard
    name="Personal Slimming Center"
    logo="/sponsors/live.png"
    tagline="Science & Serenity converge for Body Renewal!"
    phone="07300047372"
    instagram="https://www.instagram.com/personalslimmingcenter"
  />
</div>

  </>
)}

      {/* POST AUCTION */}
      {isPostAuction && (
        <>
          {/* Tournament Overview */}
          <div className="mt-5">
            <TournamentOverview />
          </div>

          {/* Lead Sponsor */}
          <div className="mt-5">
            <LeadSponsor
              name={leadSponsor.name}
              logo={leadSponsor.logoUrl}
              tagline={leadSponsor.tagline}
              description={leadSponsor.description}
              website={leadSponsor.websiteUrl}
            />
          </div>

          {/* Powered By / Co-Powered By */}
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
                phone: s.phone,
              }))}
            />
          </div>

          {/* Live Teams */}
          <div className="mt-5">
            <LiveTeams />
          </div>
        </>
      )}

      {/* TOURNAMENT */}
      {isTournament && (
        <>
          <div className="mt-5">
            <TournamentOverview />
          </div>

          <div className="mt-5">
            <LiveTeams />
          </div>
        </>
      )}
    </MobileLayout>
  );
}