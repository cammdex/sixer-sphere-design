// Mock data for Galaxy Premier League (GPL) tournament

import { ListChevronsDownUp } from "lucide-react";

export const tournament = {
  name: "SANCHI Udaipur Bohra League",
  shortName: "UBL",
  season: "Season 2 · 2026",
  tagline: "Where local legends rise",
  auctionDate: "2026-07-12T18:30:00",
  auctionVenue: "Crown Banquet Hall, Sector 17",
  auctionEntry: "Owners & Press only · Live streamed",
  stats: { teams: 8, players: 142, owners: 16 },
};

export const announcements = [
  { id: 1, tag: "AUCTION", title: "Player auction goes live July 12", body: "Final bid catalog drops 48h before — owners review now.", tone: "gold" },
  { id: 2, tag: "FIXTURE", title: "Opening match: Strikers vs Royals", body: "Floodlights on at Galaxy Ground from 7:30 PM.", tone: "blue" },
  { id: 3, tag: "TRIALS", title: "U-23 trial slots reopen", body: "20 fresh entries cleared — 4 spots remain.", tone: "gold" },
];

export const updates = [
  { id: 1, time: "2h ago", title: "Royals retain captain Aarav Mehta for ₹18L" },
  { id: 2, time: "5h ago", title: "Auction purse raised to ₹1.2 Cr per team" },
  { id: 3, time: "1d ago", title: "Galaxy Ground re-turfed ahead of opener" },
  { id: 4, time: "2d ago", title: "Sponsorship tier ‘Diamond’ sold out" },
];

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
    logo: "/logos/teams/lt.png",
    color: "#2563eb",
    color2: "#1e3a8a",
    initialPurse: 15000000,
    purse: 13500000,
    squadLimit: 13,
    playersBought: 3,
    remainingSlots: 10,
    maxBid: 11700000,
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
    retainedPlayer: "Mustafa Dalal ",
    logo: "/logos/teams/rr.png",
    color: "#dc2626",
    color2: "#7f1d1d",
    initialPurse: 15000000,
    purse: 13500000,
    squadLimit: 13,
    playersBought: 3,
    remainingSlots: 10,
    maxBid: 11700000,
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
    captain: "Qutub kankroli ",
    viceCaptain: "Shabbir Dungri",
    retainedPlayer: "",
    logo: "/logos/teams/gm.png",
    color: "#9333ea",
    color2: "#581c87",
    initialPurse: 15000000,
    purse: 14000000,
    squadLimit: 13,
    playersBought: 2,
    remainingSlots: 11,
    maxBid: 12000000,
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
    captain: "Hussaini Mhow ",
    viceCaptain: "Mohammed kurawar",
    retainedPlayer: "Amir Sohail Bandookwala",
    logo: "/logos/teams/be.png",
    color: "#16a34a",
    color2: "#14532d",
    initialPurse: 15000000,
    purse: 13500000,
    squadLimit: 13,
    playersBought: 3,
    remainingSlots: 10,
    maxBid: 11700000,
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
    viceCaptain: "Idris Khilona ",
    retainedPlayer: "Aziz German",
    logo: "/logos/teams/bt.png",
    color: "#f97316",
    color2: "#9a3412",
    initialPurse: 15000000,
    purse: 13500000,
    squadLimit: 13,
    playersBought: 3,
    remainingSlots: 10,
    maxBid: 11700000,
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
    owners: ["Hussain Bohra", "Arif Amar"],
    captain: "Mustafa Lohawala",
    viceCaptain: "Ali Hussain Lacchawala",
    retainedPlayer: "Arif Amar",
    logo: "/logos/teams/gc.png",
    color: "#0891b2",
    color2: "#164e63",
    initialPurse: 15000000,
    purse: 13500000,
    squadLimit: 13,
    playersBought: 3,
    remainingSlots: 10,
    maxBid: 11700000,
    wins: 0,
    losses: 0,
    nrr: 0,
    points: 0,
  },

  {
    id: "bb",
    name: "Babji Blasters",
    displayName:"Blasters",
    short: "BB",
    owners: ["Kutubuddin Bharkhundi", "Mohammed Bohra"],
    captain: "Abbas M Mustafa",
    viceCaptain: "Hussain Khozema",
    retainedPlayer: "Taha Parel",
    logo: "/logos/teams/bb.png",
    color: "#ca8a04",
    color2: "#854d0e",
    initialPurse: 15000000,
    purse: 13500000,
    squadLimit: 13,
    playersBought: 3,
    remainingSlots: 10,
    maxBid: 11700000,
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
    viceCaptain: "Ali Asgar Lohawala ",
    retainedPlayer: "Hussain Ghee",
    logo: "/logos/teams/brf.png",
    color: "#475569",
    color2: "#1e293b",
    initialPurse: 15000000,
    purse: 13500000,
    squadLimit: 13,
    playersBought: 3,
    remainingSlots: 10,
    maxBid: 11700000,
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

  status?: "available" | "live" | "sold" | "unsold";
};

const firstNames = ["Aarav","Rohan","Yash","Siddharth","Karan","Ishaan","Manav","Kabir","Vivaan","Arjun","Dev","Aryan","Krish","Reyansh","Vihaan","Sai","Pranav","Aniket","Harsh","Ritvik","Tanish","Om","Atharv","Veer","Rudra","Shaurya","Ayaan","Naman","Parth","Raghav"];
const lastNames = ["Mehta","Iyer","Khanna","Rao","Bhatt","Patel","Reddy","Singh","Sharma","Kapoor","Joshi","Verma","Nair","Aggarwal","Malhotra","Desai","Shah","Pillai","Gupta","Chopra"];
const roles: Player["role"][] = ["Batsman","Bowler","All-Rounder","Wicket Keeper"];
const battingStyles = ["Right-hand bat","Left-hand bat"];
const bowlingStyles = ["Right-arm fast","Right-arm medium","Left-arm spin","Right-arm offspin","Left-arm fast","—"];

function seeded(i: number) { return ((i * 9301 + 49297) % 233280) / 233280; }

export const players: Player[] = Array.from({ length: 36 }, (_, i) => {
  const fn = firstNames[i % firstNames.length];
  const ln = lastNames[(i * 3) % lastNames.length];
  const role = roles[i % roles.length];
  const sold = i % 4 !== 0;
  const team = sold ? teams[i % teams.length].id : undefined;
  const base = [200000, 300000, 500000, 750000, 1000000][i % 5];
  return {
    id: "p" + (i + 1),
    name: `${fn} ${ln}`,
    age: 19 + Math.floor(seeded(i + 1) * 16),
    role,
    basePrice: base,
    soldPrice: sold ? Math.floor(base * (1 + seeded(i + 7) * 3.5)) : undefined,
    teamId: team,
    batting: battingStyles[i % 2],
    bowling: role === "Batsman" || role === "Wicket Keeper" ? "—" : bowlingStyles[i % bowlingStyles.length],
    stats: {
      matches: 12 + Math.floor(seeded(i + 11) * 60),
      runs: role === "Bowler" ? Math.floor(seeded(i + 2) * 400) : Math.floor(300 + seeded(i + 4) * 1800),
      wickets: role === "Batsman" || role === "Wicket Keeper" ? 0 : Math.floor(5 + seeded(i + 5) * 70),
      avg: +(18 + seeded(i + 6) * 30).toFixed(1),
      sr: +(110 + seeded(i + 8) * 70).toFixed(1),
    },
    initials: fn[0] + ln[0],
  };
});

export const fixtures = [
  { id: 1, date: "Jul 18", time: "7:30 PM", a: "rr", b: "ts", venue: "Galaxy Ground", status: "Upcoming" },
  { id: 2, date: "Jul 19", time: "3:30 PM", a: "kp", b: "tw", venue: "Galaxy Ground", status: "Upcoming" },
  { id: 3, date: "Jul 19", time: "7:30 PM", a: "sk", b: "cb", venue: "Crown Oval", status: "Upcoming" },
  { id: 4, date: "Jul 20", time: "3:30 PM", a: "dc", b: "is", venue: "Crown Oval", status: "Upcoming" },
  { id: 5, date: "Jul 22", time: "7:30 PM", a: "rr", b: "kp", venue: "Galaxy Ground", status: "Upcoming" },
];

export const results = [
  { id: 1, date: "Jul 14", a: "ts", b: "cb", scoreA: "182/4", scoreB: "168/9", winner: "ts", margin: "14 runs" },
  { id: 2, date: "Jul 13", a: "rr", b: "is", scoreA: "201/6", scoreB: "144/10", winner: "rr", margin: "57 runs" },
  { id: 3, date: "Jul 12", a: "kp", b: "dc", scoreA: "156/7", scoreB: "160/4", winner: "dc", margin: "6 wickets" },
];

export const topScorers = [
  { player: "Aarav Mehta", teamId: "rr", runs: 412, sr: 168.2 },
  { player: "Rohan Iyer", teamId: "ts", runs: 388, sr: 154.0 },
  { player: "Yash Khanna", teamId: "kp", runs: 351, sr: 149.7 },
  { player: "Siddharth Rao", teamId: "tw", runs: 320, sr: 142.1 },
  { player: "Karan Bhatt", teamId: "sk", runs: 298, sr: 138.6 },
];

export const topWicketTakers = [
  { player: "Ishaan Patel", teamId: "cb", wickets: 18, econ: 6.4 },
  { player: "Manav Reddy", teamId: "dc", wickets: 15, econ: 6.8 },
  { player: "Kabir Singh", teamId: "is", wickets: 14, econ: 7.1 },
  { player: "Yash Khanna", teamId: "kp", wickets: 12, econ: 7.4 },
  { player: "Rohan Iyer", teamId: "ts", wickets: 10, econ: 7.6 },
];

export const venues = [
  { name: "Galaxy Ground", city: "Sector 17", capacity: "8,500" },
  { name: "Crown Oval", city: "Sector 22", capacity: "5,200" },
];

export const umpires = ["R. Krishnan", "M. Pereira", "S. Bhattacharya", "A. Khurana", "N. Joseph"];

export const sponsorCategories = ["All", "Food", "Sports", "Clothing", "Electronics", "Auto"] as const;

export type Sponsor = {
  id: string; name: string; category: typeof sponsorCategories[number];
  tagline: string; phone: string; web: string; featured?: boolean;
  color: string; color2: string; initials: string;
};

export const sponsors: Sponsor[] = [
  { id: "s1", name: "Volta Electronics", category: "Electronics", tagline: "Smart appliances for modern homes.", phone: "+91 98100 11220", web: "volta.in", featured: true, color: "#3b82f6", color2: "#1e40af", initials: "VE" },
  { id: "s2", name: "Spice Route Cafe", category: "Food", tagline: "Stone-oven pizzas & local biryani.", phone: "+91 98100 22330", web: "spiceroute.cafe", color: "#f59e0b", color2: "#7c2d12", initials: "SR" },
  { id: "s3", name: "Stride Sportswear", category: "Sports", tagline: "Gear for game-day legends.", phone: "+91 98100 33440", web: "stride.in", color: "#10b981", color2: "#064e3b", initials: "ST" },
  { id: "s4", name: "Threadline Co.", category: "Clothing", tagline: "Premium tailored fits.", phone: "+91 98100 44550", web: "threadline.in", color: "#a855f7", color2: "#3b0764", initials: "TC" },
  { id: "s5", name: "Apex Motors", category: "Auto", tagline: "Service & detailing experts.", phone: "+91 98100 55660", web: "apexmotors.in", color: "#ef4444", color2: "#7f1d1d", initials: "AM" },
  { id: "s6", name: "Bytewave Computers", category: "Electronics", tagline: "Custom rigs & repairs.", phone: "+91 98100 66770", web: "bytewave.in", color: "#0ea5e9", color2: "#0c4a6e", initials: "BC" },
  { id: "s7", name: "Tandoor Nights", category: "Food", tagline: "Charcoal-grill kebabs since 1998.", phone: "+91 98100 77880", web: "tandoornights.in", color: "#eab308", color2: "#713f12", initials: "TN" },
  { id: "s8", name: "Boundary Sports", category: "Sports", tagline: "Bats, balls, pads — pro picks.", phone: "+91 98100 88990", web: "boundary.shop", color: "#22c55e", color2: "#14532d", initials: "BS" },
];

export const galleryPrompts = [
  "Stadium under floodlights",
  "Trophy lift moment",
  "Owner & captain handshake",
  "Crowd celebration",
  "Six over the ropes",
  "Spinner mid-delivery",
];

export function formatINR(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)} L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n}`;
}

export function teamById(id?: string) {
  return teams.find((t) => t.id === id);
}
