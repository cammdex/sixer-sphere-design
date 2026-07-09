import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import players from "../data/players.auction.ready.json" assert { type: "json" };

const firebaseConfig = {
  apiKey: "AIzaSyBiZuKpXAz7i2vKayttV2HESREtyYG5hu0",
  authDomain: "ubc-league.firebaseapp.com",
  projectId: "ubc-league",
  storageBucket: "ubc-league.firebasestorage.app",
  messagingSenderId: "1019193729401",
  appId: "1:1019193729401:web:4a9e4b39ab2927afd2cfa8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const teams = [
  {
    id: "lt",
    name: "LT Lions",
    short: "LTL",
    owners: ["Abdul Hussain Lachhawala", "Abbas Lachhawala"],
    captain: "Mufaddal ZM",
    viceCaptain: "Huzefa Rundera",
    retainedPlayer: "Hussain Lacchawala",
    logo: "/logos/teams/lt.png",
    color: "#2563eb",
    color2: "#1e3a8a",
    initialPurse: 15000000,
    purse: 13500000,
    squadLimit: 10,
    playersBought: 3,
    remainingSlots: 10,
    wins: 0,
    losses: 0,
    nrr: 0,
    points: 0,
  },

  {
    id: "rr",
    name: "Regen Royals",
    short: "RR",
    owners: ["Mohammedi Dalal", "Mufaddal Dalal"],
    captain: "Abdul Qadir",
    viceCaptain: "Ali Hussain Vichavera",
    retainedPlayer: "Mustafa Dalal",
    logo: "/logos/teams/rr.png",
    color: "#dc2626",
    color2: "#7f1d1d",
    initialPurse: 15000000,
    purse: 13500000,
    squadLimit: 10,
    playersBought: 3,
    remainingSlots: 10,
    wins: 0,
    losses: 0,
    nrr: 0,
    points: 0,
  },

  {
    id: "gm",
    name: "GM Gladiators",
    short: "GM",
    owners: ["Nuzhat Kagzi"],
    captain: "Qutub Kankroli",
    viceCaptain: "Shabbir Dungri",
    retainedPlayer: null,
    logo: "/logos/teams/gm.png",
    color: "#9333ea",
    color2: "#581c87",
    initialPurse: 15000000,
    purse: 14000000,
    squadLimit: 11,
    playersBought: 2,
    remainingSlots: 11,
    wins: 0,
    losses: 0,
    nrr: 0,
    points: 0,
  },

  {
    id: "be",
    name: "Best Eleven",
    short: "BE",
    owners: ["Amir Sohail", "Ali Asgar Bandookwala"],
    captain: "Hussaini Mhow",
    viceCaptain: "Mohammed Kurawar",
    retainedPlayer: "Sohail Bandookwala",
    logo: "/logos/teams/be.png",
    color: "#16a34a",
    color2: "#14532d",
    initialPurse: 15000000,
    purse: 13500000,
    squadLimit: 10,
    playersBought: 3,
    remainingSlots: 10,
    wins: 0,
    losses: 0,
    nrr: 0,
    points: 0,
  },

  {
    id: "bt",
    name: "Bandookwala Titans",
    short: "BT",
    owners: ["Shabbir Bandookwala", "Faisal Bandookwala"],
    captain: "Murtaza Sanwari",
    viceCaptain: "Idris Khilona",
    retainedPlayer: "Aziz German",
    logo: "/logos/teams/bt.png",
    color: "#f97316",
    color2: "#9a3412",
    initialPurse: 15000000,
    purse: 13500000,
    squadLimit: 10,
    playersBought: 3,
    remainingSlots: 10,
    wins: 0,
    losses: 0,
    nrr: 0,
    points: 0,
  },

  {
    id: "gc",
    name: "Global Challengers",
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
    squadLimit: 10,
    playersBought: 3,
    remainingSlots: 10,
    wins: 0,
    losses: 0,
    nrr: 0,
    points: 0,
  },

  {
    id: "bb",
    name: "Babji Blasters",
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
    squadLimit: 10,
    playersBought: 3,
    remainingSlots: 10,
    wins: 0,
    losses: 0,
    nrr: 0,
    points: 0,
  },

  {
    id: "brf",
    name: "BRF Legal Legends",
    short: "BRF",
    owners: ["Ali Hussain Ameen"],
    captain: "Ali Asgar Hindustani",
    viceCaptain: "Ali Asgar Lohawala",
    retainedPlayer: "Hussain Lacchawala",
    logo: "/logos/teams/brf.png",
    color: "#475569",
    color2: "#1e293b",
    initialPurse: 15000000,
    purse: 13500000,
    squadLimit: 10,
    playersBought: 3,
    remainingSlots: 10,
    wins: 0,
    losses: 0,
    nrr: 0,
    points: 0,
  },
];

async function seed() {
  console.log(`Seeding ${teams.length} teams...`);
  for (const t of teams) {
    await setDoc(doc(db, "teams", t.id), t);
  }
  console.log(`Seeding ${players.length} players...`);
  for (const p of players) {
    await setDoc(doc(db, "players", p.id), p);
  }
  await setDoc(doc(db, "meta", "auctionState"), {
    playerId: null,
    currentBid: null,
    biddingTeamId: null,
    status: "idle",
  });
  console.log("Done!");
}

seed().catch(console.error);