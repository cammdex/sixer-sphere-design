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
  name: "Volta Electronics",
  tagline: "Smart appliances for modern homes.",
  logoUrl: "",
  websiteUrl: "#",
};

// ---------- Section 3: Powered By / Co-Powered By ----------

export const poweredBySponsors: PoweredBySponsor[] = [
  { id: "pb-1", role: "Powered By", name: "Apex Sportswear", logoUrl: "" },
  { id: "pb-2", role: "Co-Powered By", name: "Spice Route Cafe", logoUrl: "" },
];

// ---------- Section 4: Meet the Owners ----------

export const homeOwners: HomeOwner[] = [
  { id: "o-rr", name: "Vikrant Shah", teamName: "Royal Rangers", teamShort: "RR", initials: "VS", color: "#3b82f6", color2: "#1e3a8a", quote: "This season, we play fearless cricket." },
  { id: "o-ts", name: "Anika Kapoor", teamName: "Thunder Strikers", teamShort: "TS", initials: "AK", color: "#f59e0b", color2: "#7c2d12", quote: "Building a squad that peaks in the playoffs." },
  { id: "o-kp", name: "Devraj Singh", teamName: "Knight Phantoms", teamShort: "KP", initials: "DS", color: "#a855f7", color2: "#581c87", quote: "Defense wins titles — that's our bet." },
  { id: "o-tw", name: "Meera Joshi", teamName: "Titan Warriors", teamShort: "TW", initials: "MJ", color: "#10b981", color2: "#065f46", quote: "Young legs, old-school discipline." },
  { id: "o-sk", name: "Rahul Verma", teamName: "Sapphire Kings", teamShort: "SK", initials: "RV", color: "#0ea5e9", color2: "#0c4a6e", quote: "We're here to defend the crown." },
  { id: "o-cb", name: "Nisha Aggarwal", teamName: "Crimson Blasters", teamShort: "CB", initials: "NA", color: "#ef4444", color2: "#7f1d1d", quote: "Attack from ball one, every game." },
  { id: "o-dc", name: "Suresh Nair", teamName: "Desert Cobras", teamShort: "DC", initials: "SN", color: "#eab308", color2: "#713f12", quote: "Slow and steady won us the league before." },
  { id: "o-is", name: "Pooja Malhotra", teamName: "Iron Sentinels", teamShort: "IS", initials: "PM", color: "#64748b", color2: "#1e293b", quote: "Every run matters, every over counts." },
];

// ---------- Section 5: Sponsors grid ----------

export const gridSponsors: GridSponsor[] = [
  { id: "gs-1", name: "Volta Electronics", logoUrl: "", category: "Electronics" },
  { id: "gs-2", name: "Apex Sportswear", logoUrl: "", category: "Clothing" },
  { id: "gs-3", name: "Spice Route Cafe", logoUrl: "", category: "Food" },
  { id: "gs-4", name: "Turbo Motors", logoUrl: "", category: "Auto" },
  { id: "gs-5", name: "GreenLeaf Organics", logoUrl: "", category: "Food" },
  { id: "gs-6", name: "Prime Fitness", logoUrl: "", category: "Sports" },
  { id: "gs-7", name: "Skyline Realty", logoUrl: "", category: "Real Estate" },
  { id: "gs-8", name: "Pixel Studios", logoUrl: "", category: "Media" },
];

// ---------- Section 6: Promotions carousel ----------

export const promotions: Promotion[] = [
  { id: "promo-1", title: "Season tickets now open", subtitle: "Lock in your seat for every home match", imageUrl: "", ctaLabel: "Get tickets", ctaUrl: "#" },
  { id: "promo-2", title: "Fan jersey pre-orders", subtitle: "Official Season 4 kit, all 8 teams", imageUrl: "", ctaLabel: "Pre-order", ctaUrl: "#" },
  { id: "promo-3", title: "Become a sponsor", subtitle: "Get your brand in front of thousands", imageUrl: "", ctaLabel: "Enquire", ctaUrl: "#" },
];

// ---------- Section 7: Event Feed ----------

export const eventFeed: EventFeedItem[] = [
  { id: "ef-1", timestamp: "2h ago", title: "Galaxy Ground re-turfed ahead of opener", tag: "Ground" },
  { id: "ef-2", timestamp: "1d ago", title: "Final bid catalog released to all 8 owners", tag: "Auction" },
  { id: "ef-3", timestamp: "2d ago", title: "Volta Electronics confirmed as lead sponsor", tag: "Sponsor" },
  { id: "ef-4", timestamp: "4d ago", title: "Opening fixture set: Royal Rangers vs Thunder Strikers", tag: "Fixture" },
  { id: "ef-5", timestamp: "6d ago", title: "Umpires panel announced for Season 4", tag: "Officials" },
];