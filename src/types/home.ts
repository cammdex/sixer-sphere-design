// Shared types for the Home page.
// Dummy data (home-dummy-data.ts) and any future Firebase-backed data both use these
// same shapes, so swapping dummy → real data later doesn't require touching component code.

// Re-exported so Home components can import everything from one place.
// These are the REAL, Firebase-connected types already used by the live auction —
// not duplicated here, just re-exposed for convenience.
export type { LivePlayer, LiveTeam, AuctionState } from "@/lib/auction-store";

// ---------- Section 2: Lead Sponsor ----------

export interface LeadSponsor {
  id: string;
  name: string;
  tagline: string;
  logoUrl: string;
  websiteUrl?: string;
}

// ---------- Section 3: Powered By / Co-Powered By ----------

export interface PoweredBySponsor {
  id: string;
  role: "Powered By" | "Co-Powered By";
  name: string;
  logoUrl: string;
}

// ---------- Section 4: Meet the Owners ----------

export interface HomeOwner {
  id: string;
  name: string;
  teamName: string;
  teamShort: string;
  photoUrl?: string;
  initials: string;
  color: string;
  color2: string;
  quote?: string;
}

// ---------- Section 5: Sponsors grid ----------

export interface GridSponsor {
  id: string;
  name: string;
  logoUrl: string;
  category: string;
}

// ---------- Section 6: Promotions carousel ----------

export interface Promotion {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

// ---------- Section 7: Event Feed ----------

export interface EventFeedItem {
  id: string;
  timestamp: string; // e.g. "2h ago", or an ISO string — component formats either
  title: string;
  description?: string;
  tag?: string; // e.g. "Auction", "Fixture", "Sponsor"
}