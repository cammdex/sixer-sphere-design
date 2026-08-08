import { createFileRoute } from "@tanstack/react-router";
import { BusinessCard } from "@/components/business/BusinessCard";
import { useState } from "react";
import { MobileLayout } from "@/components/mobile-layout";
import { LeadSponsor } from "@/components/home/LeadSponsor";
import { PoweredBy } from "@/components/home/PoweredBy";
import { LiveSponsorCard } from "@/components/home/LiveSponsorCard";
import {
  leadSponsor,
  poweredBySponsors,
} from "@/lib/home-dummy-data";

const sponsorCategories = [
  "All",
  "Directory",
] as const;

const businessCategories = [
  "Aluminium & Glasswork",
  "Automobile",
  "Clothing",
  "Construction",
  "Cosmetics",
  "Digital Marketing",
  "Electricals",
  "Electronics",
  "Event Planners",
  "Food & Beverages",
  "Gifting Solutions",
  "Grocery",
  "Hardware",
  "Home Furnishing",
  "Household Material",
  "Interior Designers",
  "Iron & Steel",
  "IT & Software",
  "Jewellery",
  "Marble",
  "Paints",
  "Plastic",
  "Plywood",
  "Printing",
  "Professionals",
  "Real Estate",
  "Sanitary",
  "Textile",
  "Tours & Travel",
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
    phone: "+91 7073233665",
  },
  {
    title: "Beverage Partner",
    sponsor: "Hola Coffee",
    logo: "/sponsors/Hola.png",
    phone: "+91 8949528176",
  },
];


const awardPartners = [
  {
    title: "Man of the Match",
    sponsor: "Universal Trading",
    logo: "/sponsors/universal.png",
    phone: "+91 6350014766",
  },
  {
    title: "Game Changer Award",
    sponsor: "AT Plywood & Realtors",
    logo: "/sponsors/at.png",
    phone: "+91 9636815251",
  },
  {
    title: "Dot Dictator Award",
    sponsor: "Dr. Yash Jain",
    logo: "/sponsors/dotdictator.png",
    phone: "+91 9828983099",
  },
  {
    title: "Catch of the Match",
    sponsor: "Bhalamwala Bricks",
    logo: "/sponsors/bhalamwala.png",
    phone: "+91 9680406779",
  },
  {
    title: "Speed Breaker Award",
    sponsor: "",
    logo: "/sponsors/white.png",
    phone: "",
  },
  {
    title: "Maximum Boundaries Award",
    sponsor: "Taste Buds",
    logo: "/sponsors/tastebuds.png",
    phone: "+91 9549462525",
  },
  {
    title: "Orange Cap",
    sponsor: "Sky Homes",
    logo: "/sponsors/skyhomes.png",
    phone: "+91 7976363842",
  },
  {
    title: "Yellow Cap",
    sponsor: "Unique Printers",
    logo: "/sponsors/unique.png",
    phone: "+91 9649209966",
  },
  {
    title: "Emerging Player Award",
    sponsor: "FYT Fitness Buddy",
    logo: "/sponsors/fyt.png",
    phone: "+91 9829240420",
  },
  {
    title: "Best Striker Award",
    sponsor: "",
    logo: "/sponsors/white.png",
    phone: "",
  },
  {
    title: "Fighter of the Match",
    sponsor: "",
    logo: "/sponsors/white.png",
    phone: "",
  },
  {
    title: "Golden Arm Award",
    sponsor: "",
    logo: "/sponsors/white.png",
    phone: "",
  },
  {
    title: "Man of the Series",
    sponsor: "",
    logo: "/sponsors/white.png",
    phone: "",
  },
];

const goldenSponsors = [
  {
    title: "Golden Sponsor",
    sponsor: "D+ Mark Product",
    logo: "/sponsors/dmark.png",
    phone: "+91 7597213159",
  },
  {
    title: "Golden Sponsor",
    sponsor: "Mariya's Fragrance",
    logo: "/sponsors/mariya.png",
    phone: "+91 9672022887",
  },
  {
    title: "Golden Sponsor",
    sponsor: "AT Plywood",
    logo: "/sponsors/at.png",
    phone: "+91 9636815251",
  },
];

const categoryIcons: Record<string, string> = {
  "Aluminium & Glasswork": "/category-icons/Aluminium.png",
  "Automobile": "/category-icons/Automobile.png",
  "Clothing": "/category-icons/Clothing.png",
  "Construction": "/category-icons/Construction.png",
  "Cosmetics": "/category-icons/Cosmetics.png",
  "Digital Marketing": "/category-icons/Digmarketing.png",
  "Electricals": "/category-icons/Electricals.png",
  "Electronics": "/category-icons/Electronics.png",
  "Event Planners": "/category-icons/Planner.png",
  "Food & Beverages": "/category-icons/Foodbev.png",
  "Gifting Solutions": "/category-icons/Gifting.png",
  "Grocery": "/category-icons/Grocery.png",
  "Hardware": "/category-icons/Hardware.png",
  "Home Furnishing": "/category-icons/Furnishing.png",
  "Household Material": "/category-icons/Household.png",
  "Interior Designers": "/category-icons/Designers.png",
  "Iron & Steel": "/category-icons/Ironsteel.png",
  "IT & Software": "/category-icons/Software.png",
  "Jewellery": "/category-icons/Jewellery.png",
  "Marble": "/category-icons/Marble.png",
  "Paints": "/category-icons/Paints.png",
  "Plastic": "/category-icons/Plastic.png",
  "Plywood": "/category-icons/Plywood.png",
  "Printing": "/category-icons/Printing.png",
  "Professionals": "/category-icons/Professionals.png",
  "Real Estate": "/category-icons/Estate.png",
  "Sanitary": "/category-icons/Sanitary.png",
  "Textile": "/category-icons/Textile.png",
  "Tours & Travel": "/category-icons/Travels.png",
  "Others": "/category-icons/Others.png",
};

const businessDirectory = [
  {
    name: "TOC Tours",
    category: "Tours & Travel",
    phone: "+91 7976675352",
  },
  {
    name: "Foreign Exchange",
    category: "Tours & Travel",
    phone: "+91 7014720568",
  },

  {
    name: "The Wander Hub",
    category: "Clothing",
    phone: "+91 7073222665",
  },
  {
    name: "AV Designs",
    category: "Clothing",
    phone: "+91 9057204179",
  },
  {
    name: "Leather & Stitches",
    category: "Clothing",
    phone: "+91 7073525253",
  },
  {
    name: "Ruqins Bags",
    category: "Clothing",
    phone: "+91 7073025872",
  },

  {
    name: "Bhalamwala Bricks",
    category: "Construction",
    phone: "+91 9680406779",
  },

  {
    name: "Taste Buds Kitchen",
    category: "Food & Beverages",
    phone: "+91 9549462525",
  },
  {
    name: "MacMoods Kitchen",
    category: "Food & Beverages",
    phone: "+91 8003452351",
  },

  {
    name: "A to Z Households",
    category: "Household Material",
    phone: "+91 9680983068",
  },

  {
    name: "Regen Jewels",
    category: "Jewellery",
    phone: "+91 9636507887",
  },

  {
    name: "India Traders",
    category: "Hardware",
    phone: "+91 9413558403",
  },
  {
    name: "Welder's Choice",
    category: "Hardware",
    phone: "+91 8003429901",
  },

  {
    name: "Alloy Steel Traders",
    category: "Iron & Steel",
    phone: "+91 6350179171",
  },
  {
    name: "S.M.B Steels",
    category: "Iron & Steel",
    phone: "+91 8890728785",
  },

  {
    name: "Sky Homes",
    category: "Interior Designers",
    phone: "+91 8890728785",
  },

  {
    name: "Regen Motors",
    category: "Automobile",
    phone: "+91 8003863230",
  },

  {
    name: "Badri Perfumes",
    category: "Cosmetics",
    phone: "+91 8852823497",
  },

  {
    name: "Mustafa Sanwari",
    category: "IT & Software",
    phone: "+91 9680876750",
  },
  {
    name: "Mufaddal Sadri",
    category: "IT & Software",
    phone: "+91 8233979772",

    
  },
{
  name: "Ibrahim Vagpura",
  category: "IT & Software",
  phone: "+91 8302267652",
},
  {
    name: "TOC Mark",
    category: "Digital Marketing",
    phone: "+91 8949469857",
  },
  {
    name: "Moiz Ora",
    category: "Digital Marketing",
    phone: "+91 9057017342",
  },
  {
    name: "Hussain Ajmer",
    category: "Digital Marketing",
    phone: "+91 9929455853",
  },

  {
    name: "Colorway",
    category: "Gifting Solutions",
    phone: "+91 9950645276",
  },

  {
    name: "Dr. Yusuf Bhalamwala",
    category: "Professionals",
    phone: "+91 9766567352",
  },

  {
    name: "Collab Coworking Office",
    category: "Others",
    phone: "+91 9079829929",
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
  description={leadSponsor.description}
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
<div className="mt-5">
  <LiveSponsorCard
    name="Personal Slimming Center"
    logo="/sponsors/live.png"
    tagline="Science & Serenity converge for Body Renewal!"
    phone="07300047372"
    instagram="https://www.instagram.com/personalslimmingcenter"
  />
</div>

      </div>
      <div className="mt-10">
  <div className="h-px bg-gradient-to-r from-transparent via-yellow-700/40 to-transparent" />

  <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

    <div>
      <div
        className="text-[11px] font-bold uppercase tracking-[0.24em]"
        style={{ color: "#9a6f3c" }}
      >
        Partner Directory
      </div>

      <h2
        className="mt-2 font-display text-3xl font-black"
        style={{ color: "#4c3624" }}
      >
        Business Partners
      </h2>
    </div>

    <a
      href="https://forms.gle/61iy6yCq6DcEwdKx6"
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-flex
        items-center
        justify-center
        rounded-2xl
        px-6
        py-3
        text-sm
        font-bold
        transition-all
        duration-300
        hover:-translate-y-1
      "
      style={{
        background: "linear-gradient(180deg,#c79a56,#a97838)",
        color: "#fff",
        boxShadow: "0 10px 24px rgba(169,120,56,.28)",
      }}
    >
      Register Your Business
    </a>

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

    <div
  className="
    flex
    flex-col
    gap-2
    max-h-56
    overflow-y-auto
    pr-2
    custom-scrollbar
  "
>
      {businessCategories.map((category) => (
        <button
  key={category}
  onClick={() => setBusinessCategory(category)}
  className={`w-full rounded-full px-4 py-3 text-sm font-semibold text-left transition-all ${
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
  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">

    {businessDirectory
      .filter(
        (business) => business.category === businessCategory
      )
      .map((business) => (
        <BusinessCard
          key={business.name}
          title={business.category}
          sponsor={business.name}
          logo="/sponsors/white.png"
          phone={business.phone}
        />
      ))}

  </div>
)}


     {cat === "All" && (

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

{cat === "All"&& (
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

{cat === "All"&& (
  <div className="mt-10">
    <div
      className="text-[11px] font-bold uppercase tracking-[0.24em]"
      style={{ color: "#9a6f3c" }}
    >
      Premium Partners
    </div>

    <h2
      className="mt-2 font-display text-2xl font-black"
      style={{ color: "#4c3624" }}
    >
      Golden Sponsor
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

{cat === "All" && (
  <div className="mt-10">

    <div
      className="text-[11px] font-bold uppercase tracking-[0.24em]"
      style={{ color: "#9a6f3c" }}
    >
      Business Directory
    </div>

    <h2
      className="mt-2 font-display text-2xl font-black"
      style={{ color: "#4c3624" }}
    >
      Registered Businesses
    </h2>

    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

      {businessDirectory.map((business) => (
        <BusinessCard
          key={business.name}
          title={business.category}
          sponsor={business.name}
          logo={categoryIcons[business.category]}
          phone={business.phone}
        />
      ))}

    </div>

  </div>
)}

    </MobileLayout>
  );
}