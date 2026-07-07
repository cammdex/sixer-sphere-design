import { Avatar, TeamCrest } from "@/components/mobile-layout";

export interface OwnerCardData {
  id: string;
  photoUrl?: string;
  name: string;
  companyName: string;
  teamName: string;
  teamShort: string;
  teamLogoUrl?: string;
  teamColor: string;
  teamColor2: string;
  tagline?: string;
}

function initialsOf(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

function OwnerCard({ photoUrl, name, companyName, teamName, teamShort, teamLogoUrl, teamColor, teamColor2, tagline }: OwnerCardData) {
  return (
    <article className="relative snap-center shrink-0 w-[68%] overflow-hidden rounded-2xl glass p-4">
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-30 blur-2xl"
        style={{ background: `radial-gradient(circle, ${teamColor}, transparent 70%)` }}
      />
      <div className="relative">
        <div className="flex items-center gap-3">
          {photoUrl ? (
            <img src={photoUrl} alt={name} className="h-14 w-14 shrink-0 rounded-2xl object-cover shadow-glow" />
          ) : (
            <Avatar initials={initialsOf(name)} color={teamColor} color2={teamColor2} size={56} />
          )}
          <div className="min-w-0">
            <h3 className="truncate font-display text-sm font-bold leading-tight">{name}</h3>
            <p className="truncate text-[11px] text-muted-foreground">{companyName}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
          {teamLogoUrl ? (
            <img src={teamLogoUrl} alt={teamName} className="h-7 w-7 rounded-lg object-cover" />
          ) : (
            <TeamCrest short={teamShort} color={teamColor} color2={teamColor2} size={28} />
          )}
          <span className="truncate text-xs font-semibold">{teamName}</span>
        </div>

        {tagline && (
          <p className="mt-2.5 text-[11px] italic leading-snug text-muted-foreground">"{tagline}"</p>
        )}
      </div>
    </article>
  );
}

export interface OwnersScrollProps {
  owners: OwnerCardData[];
}

export function OwnersScroll({ owners }: OwnersScrollProps) {
  return (
    <section>
      <h2 className="font-display text-base font-bold">Meet the Team Owners</h2>
      <div className="-mx-4 mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 no-scrollbar">
        {owners.map((o) => (
          <OwnerCard key={o.id} {...o} />
        ))}
      </div>
    </section>
  );
}

export const placeholderOwners: OwnerCardData[] = [
  { id: "o-rr", name: "Vikrant Shah", companyName: "Shah Realty Group", teamName: "Royal Rangers", teamShort: "RR", teamColor: "#3b82f6", teamColor2: "#1e3a8a", tagline: "This season, we play fearless cricket." },
  { id: "o-ts", name: "Anika Kapoor", companyName: "Kapoor Textiles", teamName: "Thunder Strikers", teamShort: "TS", teamColor: "#f59e0b", teamColor2: "#7c2d12", tagline: "Building a squad that peaks in the playoffs." },
  { id: "o-kp", name: "Devraj Singh", companyName: "Singh Motors", teamName: "Knight Phantoms", teamShort: "KP", teamColor: "#a855f7", teamColor2: "#581c87", tagline: "Defense wins titles — that's our bet." },
  { id: "o-tw", name: "Meera Joshi", companyName: "Joshi & Co. Pharma", teamName: "Titan Warriors", teamShort: "TW", teamColor: "#10b981", teamColor2: "#065f46", tagline: "Young legs, old-school discipline." },
  { id: "o-sk", name: "Rahul Verma", companyName: "Verma Constructions", teamName: "Sapphire Kings", teamShort: "SK", teamColor: "#0ea5e9", teamColor2: "#0c4a6e", tagline: "We're here to defend the crown." },
  { id: "o-cb", name: "Nisha Aggarwal", companyName: "Aggarwal Foods", teamName: "Crimson Blasters", teamShort: "CB", teamColor: "#ef4444", teamColor2: "#7f1d1d", tagline: "Attack from ball one, every game." },
  { id: "o-dc", name: "Suresh Nair", companyName: "Nair Logistics", teamName: "Desert Cobras", teamShort: "DC", teamColor: "#eab308", teamColor2: "#713f12", tagline: "Slow and steady won us the league before." },
  { id: "o-is", name: "Pooja Malhotra", companyName: "Malhotra Jewellers", teamName: "Iron Sentinels", teamShort: "IS", teamColor: "#64748b", teamColor2: "#1e293b", tagline: "Every run matters, every over counts." },
];