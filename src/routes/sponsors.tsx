import { createFileRoute } from "@tanstack/react-router";
import { BusinessCard } from "@/components/business/BusinessCard";
import { useState } from "react";
import { MobileLayout } from "@/components/mobile-layout";
import { LeadSponsor } from "@/components/home/LeadSponsor";
import { PoweredBy } from "@/components/home/PoweredBy";
import {
  leadSponsor,
  poweredBySponsors,
} from "@/lib/home-dummy-data";

const sponsorCategories = [
  "All",
  "Tournament",
  "Awards",
  "Golden Sponsors",
  "Owner Businesses",
  "Directory",
] as const;

const businessCategories = [
  "Aluminum & Glasswork",
  "Automobiles & Spare Parts",
  "Clothing",
  "Construction",
  "Electricals",
  "Electronics",
  "Events & Planners",
  "Foods & Beverages",
  "Hardware",
  "Home Furnishing",
  "Household Material",
  "Interior Designers",
  "Iron & Steel",
  "Jewellery",
  "Marble",
  "Paints",
  "Plastic",
  "Plywood",
  "Professionals",
  "Real Estate",
  "Sanitary",
  "Textile",
  "Tours & Travels",
  "Others",
] as const;

export const Route = createFileRoute("/sponsors")({
  component: SponsorsPage,
});

const tournamentPartners = [
  {
    title: "Toss Partner",
    sponsor: "Wander Hub",
    logo: "/sponsors/Wander.png",
    phone: "",
  },
  {
    title: "Beverage Partner",
    sponsor: "Hola Cafe",
    logo: "/sponsors/Hola.png",
    phone: "",
  },
];


const awardPartners = [
  {
    title: "Man of the Match",
    sponsor: "Universal Trending",
    logo: "/sponsors/universal.png",
    phone: "",
  },
  {
    title: "Game Changer Award",
    sponsor: "AT Plywood & Realtors",
    logo: "/sponsors/at.png",
    phone: "",
  },
  {
    title: "Dot Dictator Award",
    sponsor: "",
    logo: "/sponsors/dotdictator.png",
    phone: "",
  },
  {
    title: "Catch of the Match",
    sponsor: "Bhalamwala Bricks",
    logo: "/sponsors/bhalamwala.png",
    phone: "",
  },
  {
    title: "Speed Breaker Award",
    sponsor: "",
    logo: "/sponsors/speedbreaker.png",
    phone: "",
  },
  {
    title: "Maximum Boundaries Award",
    sponsor: "Taste Buds",
    logo: "/sponsors/tastebuds.png",
    phone: "",
  },
  {
    title: "Orange Cap",
    sponsor: "Sky Homes",
    logo: "/sponsors/skyhomes.png",
    phone: "",
  },
  {
    title: "Yellow Cap",
    sponsor: "Unique Printers",
    logo: "/sponsors/unique.png",
    phone: "",
  },
  {
    title: "Emerging Player Award",
    sponsor: "FYT Fitness Buddy",
    logo: "/sponsors/fyt.png",
    phone: "",
  },
  {
    title: "Best Striker Award",
    sponsor: "",
    logo: "/sponsors/beststriker.png",
    phone: "",
  },
  {
    title: "Fighter of the Match",
    sponsor: "",
    logo: "/sponsors/fighter.png",
    phone: "",
  },
  {
    title: "Golden Arm Award",
    sponsor: "",
    logo: "/sponsors/goldenarm.png",
    phone: "",
  },
  {
    title: "Man of the Series",
    sponsor: "",
    logo: "/sponsors/mos.png",
    phone: "",
  },
];

const goldenSponsors = [
  {
    title: "Golden Sponsor",
    sponsor: "D+ Mark Product",
    logo: "/sponsors/dmark.png",
    phone: "",
  },
  {
    title: "Golden Sponsor",
    sponsor: "Mariya's Fragrance",
    logo: "/sponsors/mariya.png",
    phone: "",
  },
  {
    title: "Golden Sponsor",
    sponsor: "AT Plywood",
    logo: "/sponsors/at.png",
    phone: "",
  },
];

function SponsorsPage() {
  const [cat, setCat] = useState<(typeof sponsorCategories)[number]>("All");
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const [businessCategory, setBusinessCategory] = useState<
  (typeof businessCategories)[number] | null
>(null);

  const poweredBy = poweredBySponsors.find((s) => s.role === "Powered By")!;
  const coPoweredBy = poweredBySponsors.filter((s) => s.role === "Co-Powered By");

  return (
    <MobileLayout title="Business">
      <div className="mt-3">
        <LeadSponsor
          name={leadSponsor.name}
          logo={leadSponsor.logoUrl}
          tagline={leadSponsor.tagline}
          description={leadSponsor.tagline}
          website={leadSponsor.websiteUrl}
        />
      </div>

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
      <div className="mt-10">
  <div className="h-px bg-gradient-to-r from-transparent via-yellow-700/40 to-transparent" />

  <div className="mt-5 text-center">
    <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#9a6f3c]">
      Partner Directory
    </div>

    <h2 className="mt-2 font-display text-3xl font-black text-[#4c3624]">
      Business Partners
    </h2>
  </div>
</div>

<div className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 no-scrollbar">
  {sponsorCategories.map((c) => (
    <button
      key={c}
      onClick={() => {
  setCat(c);

  if (c === "Directory") {
  setDirectoryOpen((prev) => !prev);
} else {
  setDirectoryOpen(false);
  setBusinessCategory(null);
}
}}
      className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all ${
        cat === c
          ? "gradient-gold text-gold-foreground shadow-glow-gold"
          : "glass text-muted-foreground"
      }`}
    >
      <>
  {c}

  {c === "Directory" && (
    <span className="ml-2">
      {directoryOpen ? "▲" : "▼"}
    </span>
  )}
</>
    </button>
  ))}
</div>

{cat === "Directory" && directoryOpen && (
  <div
    className="mt-5 rounded-3xl p-5"
    style={{
      background: "#fffdf8",
      border: "1px solid rgba(188,145,78,.18)",
      boxShadow: "0 10px 22px rgba(70,48,20,.08)",
    }}
  >
    <div
      className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em]"
      style={{ color: "#9a6f3c" }}
    >
      Business Category
    </div>

    <div className="flex flex-wrap gap-2">
      {businessCategories.map((category) => (
        <button
  key={category}
  onClick={() => setBusinessCategory(category)}
  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
    businessCategory === category
      ? "gradient-gold text-gold-foreground shadow-glow-gold"
      : ""
  }`}
  style={
    businessCategory === category
      ? {}
      : {
          border: "1px solid rgba(188,145,78,.25)",
          background: "linear-gradient(180deg,#fffefb,#fbf4e8)",
          color: "#4c3624",
        }
  }
>
  {category}
</button>
      ))}
    </div>
  </div>
)}

{cat === "Directory" && businessCategory && (
  <div
    className="mt-6 rounded-3xl p-6 text-center"
    style={{
      background: "#fffdf8",
      border: "1px solid rgba(188,145,78,.18)",
    }}
  >
    <div
      className="text-[11px] font-bold uppercase tracking-[0.24em]"
      style={{ color: "#9a6f3c" }}
    >
      Selected Category
    </div>

    <h2
      className="mt-2 font-display text-2xl font-black"
      style={{ color: "#4c3624" }}
    >
      {businessCategory}
    </h2>

    <p className="mt-3 text-sm text-neutral-600">
      Businesses in this category will appear here.
    </p>
  </div>
)}


     {(cat === "All" || cat === "Tournament") && (

<div className="mt-8">
  <div
    className="text-[11px] font-bold uppercase tracking-[0.24em]"
    style={{ color: "#9a6f3c" }}
  >
    Tournament Partners
  </div>

  <h2
    className="mt-2 font-display text-2xl font-black"
    style={{ color: "#4c3624" }}
  >
    Official Partners
  </h2>

  <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
    {tournamentPartners.map((partner) => (
      <BusinessCard
        key={partner.title}
        title={partner.title}
        sponsor={partner.sponsor}
        logo={partner.logo}
        phone={partner.phone}
      />
    ))}
  </div>
</div>

)}

{(cat === "All" || cat === "Awards") && (
  <div className="mt-10">
    <div
      className="text-[11px] font-bold uppercase tracking-[0.24em]"
      style={{ color: "#9a6f3c" }}
    >
      Award Partners
    </div>

    <h2
      className="mt-2 font-display text-2xl font-black"
      style={{ color: "#4c3624" }}
    >
      Official Awards
    </h2>

    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
      {awardPartners.map((partner) => (
        <BusinessCard
          key={partner.title}
          title={partner.title}
          sponsor={partner.sponsor}
          logo={partner.logo}
          phone={partner.phone}
        />
      ))}
    </div>
  </div>
)}

{(cat === "All" || cat === "Golden Sponsors") && (
  <div className="mt-10">
    <div
      className="text-[11px] font-bold uppercase tracking-[0.24em]"
      style={{ color: "#9a6f3c" }}
    >
      Golden Sponsors
    </div>

    <h2
      className="mt-2 font-display text-2xl font-black"
      style={{ color: "#4c3624" }}
    >
      Premium Partners
    </h2>

    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
      {goldenSponsors.map((partner) => (
        <BusinessCard
          key={partner.sponsor}
          title={partner.title}
          sponsor={partner.sponsor}
          logo={partner.logo}
          phone={partner.phone}
        />
      ))}
    </div>
  </div>
)}
      <button className="mt-6 w-full rounded-2xl gradient-royal py-3 text-sm font-semibold text-white shadow-glow">
        Register Your Business
      </button>
    </MobileLayout>
  );
}