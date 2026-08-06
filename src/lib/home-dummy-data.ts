// Placeholder content for the Home page redesign.
// Everything here is DUMMY data — replace with real sponsor/owner/promotion content
// whenever it's ready. Shapes match the interfaces in `src/types/home.ts`, so swapping
// in real data later is a drop-in replacement, no component changes needed.
//
// logoUrl / imageUrl / photoUrl are left as empty strings on purpose — components should
// render a graceful fallback (initials, icon, or solid color block) when these are empty,
// the same way the rest of the app already falls back to <Avatar /> when imageUrl is unset.

import type {
  LeadSponsor,
  PoweredBySponsor,
  HomeOwner,
  GridSponsor,
  Promotion,
  EventFeedItem,
} from "@/types/home";

// ---------- Section 2: Lead Sponsor ----------

export const leadSponsor: LeadSponsor = {
  id: "lead-1",
  name: "Sanchi Group",

  tagline: "Sapno se Samriddhi Tak",

  description:
    "Sanchi Group is a trusted name in Udaipur's real estate sector, delivering quality homes for over 47 years. From affordable apartments to premium villas, we build thoughtfully designed spaces that combine comfort, sustainability, and modern living.",

  logoUrl: "/sponsors/lead/sanchi-group.png",

  websiteUrl: "https://www.sanchigroup.in/",
};

// ---------- Section 3: Powered By / Co-Powered By ----------

export const poweredBySponsors: PoweredBySponsor[] = [
  {
    id: "pb-1",
    role: "Powered By",
    name: "Aeroflex Enterprises",
    tagline: "Engineering Precision. Visionary Enterprise.",
    description:
      "Aeroflex Group (formerly SAT Group) stands at the intersection of engineering precision and visionary enterprise—a future-forward industrial and investment platform powered by people and driven by innovation. With expertise spanning advanced manufacturing, fluid engineering, sustainable packaging, smart utility services, and venture-backed innovation, the group builds and scales businesses that shape tomorrow's industries.",
    logoUrl: "/sponsors/powered-by/aeroflex-group.png",
    websiteUrl: "https://aeroflexgroup.in/",
  },

  {
    id: "cpb-1",
    role: "Co-Powered By",
    name: "TOC Tours Pvt. Ltd.",
    tagline: "Creating Memorable Journeys Across the Globe.",
    description:
      "TOC Tours Pvt. Ltd. is a travel company headquartered in Udaipur, Rajasthan, specializing in domestic and international holiday packages, family group tours, adventure trips, bike expeditions, and women-focused travel experiences through its Travl On Cards brand.",
    logoUrl: "/sponsors/co-powered-by/toc-tours.png",
    websiteUrl: "https://www.travloncards.com/",
  },

  {
    id: "cpb-2",
    role: "Co-Powered By",
    name: "Brixton Decor",
    tagline: "Where Furniture Meets Art & Style.",
    description:
      "Brixton Decor brings together sophistication and modern elegance through premium designer furniture and décor. The brand specializes in designer wall glass, luxury center tables, and statement tables crafted to elevate contemporary living spaces.",
    logoUrl: "/sponsors/co-powered-by/brixton-decor.png",
    websiteUrl: "https://www.instagram.com/brixton_decor",
  },

  {
    id: "cpb-3",
    role: "Co-Powered By",
    name: "Abbas Ali Motagam",
    tagline: "Building Trust Through Quality & Perseverance.",
    description:
      "Entrepreneur Abbas Ali Motagam is a trusted name in residential and commercial real estate development. Known for his perseverance, integrity, and commitment to quality construction, he has built a strong reputation through successful building projects and customer-focused development.",
    logoUrl: "/sponsors/co-powered-by/motagam.png",
    websiteUrl: "",
    phone: "+91 9352500904",
  },
];

// ---------- Section 4: Meet the Owners ----------

export const homeOwners: HomeOwner[] = [];

// ---------- Section 5: Tournament Partners ----------
interface GoldenSponsor {
  id: string;
  name: string;
  logoUrl: string;
}
export const tournamentPartners = {
  corePartners: [
    {
      id: "core-1",
      title: "Toss Partner",
      name: "MARCO BENZ",
      logoUrl: "",
    },
    {
      id: "core-2",
      title: "Auction Venue Partner",
      name: "MICHAEL",
      logoUrl: "",
    },
    {
      id: "core-3",
      title: "Beverage Partner",
      name: "MARK",
      logoUrl: "",
    },
  ],

  awardPartners: [
  { award: "Man of the Match", sponsor: "Jordan" },
  { award: "Game Changer Award", sponsor: "Michael" },
  { award: "Dot Dictator Award", sponsor: "James" },
  { award: "Catch of the Match", sponsor: "Clark" },
  { award: "Speed Breaker Award", sponsor: "Jose" },
  { award: "Maximum Boundaries Award", sponsor: "Justin" },
  { award: "Orange Cap", sponsor: "Mark" },
  { award: "Purple Cap", sponsor: "Chico" },
  { award: "Yellow Cap", sponsor: "Fiddy" },
  { award: "Emerging Player Award", sponsor: "Billy" },
  { award: "Best Striker Award", sponsor: "Popley" },
  { award: "Fighter of the Match Award", sponsor: "Huston" },
  { award: "Golden Arm Award", sponsor: "Kazie" },
  { award: "Man of the Series", sponsor: "Dillan" },
],

  goldenSponsors: [] as GoldenSponsor[],
};
// ---------- Section 5: Sponsors grid ----------

export const gridSponsors: GridSponsor[] = [];

// ---------- Section 6: Promotions carousel ----------

export const promotions: Promotion[] = [];

// ---------- Section 7: Event Feed ----------

export const eventFeed: EventFeedItem[] = [];