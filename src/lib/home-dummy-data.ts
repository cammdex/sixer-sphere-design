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
  name: "TBA",
  tagline: "",
  logoUrl: "",
  websiteUrl: "#",
};

// ---------- Section 3: Powered By / Co-Powered By ----------

export const poweredBySponsors: PoweredBySponsor[] = [
  {
    id: "pb-1",
    role: "Powered By",
    name: "TBA",
    logoUrl: "",
  },
  {
    id: "pb-2",
    role: "Co-Powered By",
    name: "TBA",
    logoUrl: "",
  },
];

// ---------- Section 4: Meet the Owners ----------

export const homeOwners: HomeOwner[] = [];

// ---------- Section 5: Sponsors grid ----------

export const gridSponsors: GridSponsor[] = [];

// ---------- Section 6: Promotions carousel ----------

export const promotions: Promotion[] = [];

// ---------- Section 7: Event Feed ----------

export const eventFeed: EventFeedItem[] = [];