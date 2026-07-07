import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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
    id:"warriors",
    name:"Ahmedabad Warriors",
    short:"AW",
    captain:"TBD",
    owner:"James",
  },
  {
    id:"Titans",
    name:"Surt Titans",
    short:"ST",
    captain:"TBD",
    owner:"Test Owner"
  },
];

const players = [
  {
    id: "p1",
    name: "Virat Test",
    age: 35,
    role: "Batsman",
    basePrice: 200000,
    batting: "Right-hand bat",
    bowling: "—",
    stats: { matches: 250, runs: 12000, wickets: 4, avg: 54.2, sr: 138.5 },
    initials: "VT",
    imageUrl: "",
    teamId: null,
    soldPrice: null,
    status: "unsold",
  },
    {
    id: "p2",
    name: "Rohit Test",
    age: 37,
    role: "Batsman",
    basePrice: 250000,
    batting: "Right-hand bat",
    bowling: "—",
    stats: { matches: 260, runs: 11000, wickets: 8, avg: 48.5, sr: 132.4 },
    initials: "RT",
    imageUrl: "",
    teamId: null,
    soldPrice: null,
    status: "unsold",
  },  {
    id: "p3",
    name: "Bumrah Test",
    age: 31,
    role: "Batsman",
    basePrice: 300000,
    batting: "Right-hand bat",
    bowling: "—",
    stats: { matches: 220, runs: 5200, wickets: 260, avg: 34.5, sr: 128.2 },
    initials: "BT",
    imageUrl: "",
    teamId: null,
    soldPrice: null,
    status: "unsold",
  },  {
    id: "p4",
    name: "Jadeja Test",
    age: 36,
    role: "All-rounder",
    basePrice: 275000,
    batting: "Right-hand bat",
    bowling: "—",
    stats: { matches: 220, runs: 5000, wickets: 12, avg: 59.4, sr: 130.0 },
    initials: "PN",
    imageUrl: "",
    teamId: null,
    soldPrice: null,
    status: "unsold",
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