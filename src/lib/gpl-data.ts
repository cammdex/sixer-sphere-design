

export const tournament = {
  name: "Udaipur Bohra League",
  shortName: "UBL",

  season: "Season 2 · 2026",

  tagline: " ",

  auctionDate: "2026-08-09",

  auctionVenue: "Delhi Darbar",

  auctionEntry: " ",

  auctionStatus: "Auction Coming Soon",

  auctionPurse: "TBA",

  about: "",

  logo: "/logos/ubl-logo.png",

  stats: {
    teams: 8,
    players: 151,
    owners: 13,
  },
};

export const announcements = [];

export const updates = [];

export type Team = {
  id: string;

  name: string;
  displayName: string;
  short: string;

  owners: string[];

  captain: string;
  viceCaptain?: string;
  retainedPlayer?: string;

  logo?: string;

  color: string;
  color2: string;

  initialPurse?: number;
  purse?: number;
  maxBid?: number;

  squadLimit?: number;
  playersBought?: number;
  remainingSlots?: number;

  wins: number;
  losses: number;
  nrr: number;
  points: number;
};

export const teams: Team[] = [
  {
    id: "lt",
    name: "LT Lions",
    displayName: "Lions",
    short: "LTL",
    owners: ["Abdul Hussain Lachhawala", "Abbas Lachhawala"],
    captain: "Mufaddal Zawar Mines",
    viceCaptain: "Huzefa Rundera",
    retainedPlayer: "Hussain lacchawala",
    logo: "/logos/teams/ltl.png",
    color: "#2563eb",
    color2: "#1e3a8a",
    initialPurse: 15000000,
    purse: 2400000,
    maxBid: 2400000,
    squadLimit: 13,
    playersBought: 13,
    remainingSlots: 0,
    wins: 0,
    losses: 0,
    nrr: 0,
    points: 0,
  },

  {
    id: "rr",
    name: "Regen Royals",
    displayName: "Regen",
    short: "RR",
    owners: ["Mohammedi Dalal", "Mufaddal Dalal"],
    captain: "Abdul Qadir",
    viceCaptain: "Ali Hussain Vichavera",
    retainedPlayer: "Mustafa Dalal",
    logo: "/logos/teams/rr.png",
    color: "#dc2626",
    color2: "#7f1d1d",
    initialPurse: 15000000,
    purse: 2500000,
    maxBid: 2500000,
    squadLimit: 13,
    playersBought: 13,
    remainingSlots: 0,
    wins: 0,
    losses: 0,
    nrr: 0,
    points: 0,
  },

  {
    id: "gm",
    name: "GM Gladiators",
    displayName: "Gladiators",
    short: "GM",
    owners: ["Nuzhat Kagzi"],
    captain: "Qutub kankroli",
    viceCaptain: "Shabbir Dungri",
    retainedPlayer: "Sajid Attari",
    logo: "/logos/teams/gm.png",
    color: "#9333ea",
    color2: "#581c87",
    initialPurse: 15000000,
    purse: 100000,
    maxBid: 100000,
    squadLimit: 13,
    playersBought: 13,
    remainingSlots: 0,
    wins: 0,
    losses: 0,
    nrr: 0,
    points: 0,
  },

  {
    id: "be",
    name: "Best Eleven",
    displayName: "Eleven",
    short: "BE",
    owners: ["Amir Sohail Bandookwala", "Ali Asgar Bandookwala"],
    captain: "Hussaini Mhow",
    viceCaptain: "Mohammed kurawar",
    retainedPlayer: "Amir Sohail Bandookwala",
    logo: "/logos/teams/be.png",
    color: "#16a34a",
    color2: "#14532d",
    initialPurse: 15000000,
    purse: 3500000,
    maxBid: 3500000,
    squadLimit: 13,
    playersBought: 13,
    remainingSlots: 0,
    wins: 0,
    losses: 0,
    nrr: 0,
    points: 0,
  },

  {
    id: "bt",
    name: "Bandookwala Titans",
    displayName: "Titans",
    short: "BT",
    owners: ["Shabbir Bandookwala", "Faisal Bandookwala"],
    captain: "Murtaza Sanwari",
    viceCaptain: "Idris Khilona",
    retainedPlayer: "Aziz German",
    logo: "/logos/teams/bt.png",
    color: "#f97316",
    color2: "#9a3412",
    initialPurse: 15000000,
    purse: 600000,
    maxBid: 600000,
    squadLimit: 13,
    playersBought: 13,
    remainingSlots: 0,
    wins: 0,
    losses: 0,
    nrr: 0,
    points: 0,
  },

  {
    id: "gc",
    name: "Global Challengers",
    displayName: "Challengers",
    short: "GC",
    owners: ["Arif Amar"],
    captain: "Murtaza Nathdwara",
    viceCaptain: "Ali Hussain Lacchawala",
    retainedPlayer: "Arif Amar",
    logo: "/logos/teams/gc.png",
    color: "#0891b2",
    color2: "#164e63",
    initialPurse: 15000000,
    purse: 0,
    maxBid: 0,
    squadLimit: 13,
    playersBought: 13,
    remainingSlots: 0,
    wins: 0,
    losses: 0,
    nrr: 0,
    points: 0,
  },

  {
    id: "bb",
    name: "Babji Blasters",
    displayName: "Blasters",
    short: "BB",
    owners: ["Kutubuddin Bharkhundi", "Mohammed Bohra"],
    captain: "Abbas M Mustafa",
    viceCaptain: "Hussain Khozema",
    retainedPlayer: "Taha Parel",
    logo: "/logos/teams/bb.png",
    color: "#ca8a04",
    color2: "#854d0e",
    initialPurse: 15000000,
    purse: 0,
    maxBid: 0,
    squadLimit: 13,
    playersBought: 13,
    remainingSlots: 0,
    wins: 0,
    losses: 0,
    nrr: 0,
    points: 0,
  },

  {
    id: "brf",
    name: "BRF Legal Legends",
    displayName: "Legends",
    short: "BRF",
    owners: ["Ali Hussain Ameen"],
    captain: "Ali Asgar Hindustani",
    viceCaptain: "Ali Asgar Lohawala",
    retainedPlayer: "Hussain Ghee",
    logo: "/logos/teams/brf.png",
    color: "#475569",
    color2: "#1e293b",
    initialPurse: 15000000,
    purse: 2600000,
    maxBid: 2600000,
    squadLimit: 13,
    playersBought: 13,
    remainingSlots: 0,
    wins: 0,
    losses: 0,
    nrr: 0,
    points: 0,
  },
];
/*
export const owners = teams.map((t) => ({
  id: t.id,
  name: t.owner,
  team: t.name,
  teamId: t.id,
  initials: t.owner.split(" ").map((n) => n[0]).join(""),
  contact: "+91 98XXX 4" + (1000 + Math.floor(Math.random() * 8999)),
  color: t.color,
  color2: t.color2,
  bio: "Backing local cricket since 2019. Building a generation of fearless players.",
}));
*/

export type Player = {
  id: string;
  playerNumber?: string;

  name: string;
  age: number;

  role: "Batsman" | "Bowler" | "All-Rounder" | "Wicket Keeper";

  basePrice: number;
  soldPrice?: number;
  teamId?: string;

  batting: string;
  bowling: string;

  stats: {
    matches: number;
    runs: number;
    wickets: number;
    avg: number;
    sr: number;
  };

  initials: string;

  photo?: string;

  status?: "available" | "live" | "sold" | "unsold" | "extras";
};

export { players } from "./data/players";

export const fixtures = [];

export const results = [];

export const topScorers = [];

export const topWicketTakers = [];

export const venues = [];

export const umpires = ["R. Krishnan", "M. Pereira", "S. Bhattacharya", "A. Khurana", "N. Joseph"];

export const sponsorCategories = ["All", "Food", "Sports", "Clothing", "Electronics", "Auto"] as const;

export type Sponsor = {
  id: string; name: string; category: typeof sponsorCategories[number];
  tagline: string; phone: string; web: string; featured?: boolean;
  color: string; color2: string; initials: string;
};

export const sponsors: Sponsor[] = [];

export const galleryPrompts = [];

export function formatINR(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)} L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n}`;
}

export function teamById(id?: string) {
  return teams.find((t) => t.id === id);
}
