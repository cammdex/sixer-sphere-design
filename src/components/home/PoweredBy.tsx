import { ExternalLink } from "lucide-react";

export interface PoweredBySponsorProps {
  name: string;
  logo?: string;
  tagline?: string;
  website?: string;
  accentColor?: string;
}

function initialsOf(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

function PoweredByPrimaryCard({ name, logo, tagline, website, accentColor = "#3b82f6" }: PoweredBySponsorProps) {
  const initials = initialsOf(name);

  const card = (
    <div
  className="relative overflow-hidden rounded-[34px] p-6"
  style={{
    background:
      "linear-gradient(180deg,#fffaf2,#f7eedf)",
    border:
      "1px solid rgba(173,133,73,.25)",
    boxShadow:
      "0 14px 34px rgba(70,48,20,.10)",
    backgroundImage: `
      radial-gradient(circle at top right, rgba(212,176,111,.12), transparent 38%),
      url("/patterns/bohra-pattern.png")
    `,
    backgroundBlendMode: "overlay",
  }}
>
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-40 blur-2xl"
        style={{ background: `radial-gradient(circle, ${accentColor}, transparent 70%)` }}
      />
      <div className="relative">
        <div
  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
  style={{
    background:"#f8efdf",
    border:"1px solid rgba(188,145,78,.35)"
  }}
>
<span
className="text-[11px] font-semibold uppercase tracking-[0.22em]"
style={{
color:"#9a6f3c"
}}
>
Powered By
</span>
</div>
        <div className="mt-2.5 flex items-center gap-3">
          {logo ? (
            <img
src={logo}
alt={name}
className="h-20 w-20 shrink-0 rounded-3xl object-cover shadow-xl"
/>
          ) : (
            <div
className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl"
style={{
background:"linear-gradient(180deg,#d8bc8a,#b48a52)",
boxShadow:"0 8px 18px rgba(60,40,18,.20)",
color:"#4d3622",
fontSize:"30px",
fontWeight:800,
}}
>
              {initials}
            </div>
          )}
          <div className="min-w-0">
            <h3
className="font-display text-3xl font-extrabold leading-tight"
style={{
color:"#4c3624",
letterSpacing:"-.02em"
}}
>
{name}
</h3>
            {tagline && <p
className="mt-2 text-sm"
style={{
color:"#8d6b47",
letterSpacing:".04em"
}}
>
{tagline}
</p>}
          </div>
        </div>
        {website && (
          <div
className="mt-5 inline-flex items-center gap-2 transition-all hover:translate-x-1"
style={{
color:"#a16f34",
fontWeight:700,
}}
>
Visit Website
<ExternalLink size={16}/>
</div>
        )}
      </div>
    </div>
  );

  return website ? (
    <a href={website} target="_blank" rel="noopener noreferrer" className="block">
      {card}
    </a>
  ) : (
    card
  );
}

function CoPoweredByGridItem({ name, logo, accentColor = "#64748b", website }: PoweredBySponsorProps) {
  const initials = initialsOf(name);

  const item = (
    <div
className="flex h-full flex-col items-center rounded-[26px] p-5 text-center transition-all hover:-translate-y-1"
style={{
background:"linear-gradient(180deg,#fffaf2,#f8efe1)",
border:"1px solid rgba(180,140,82,.22)",
boxShadow:"0 8px 24px rgba(60,40,20,.08)"
}}
>
      {logo ? (
        <img
src={logo}
alt={name}
className="h-14 w-14 rounded-2xl object-cover shadow-lg"
/>
      ) : (
        <div
className="grid h-14 w-14 place-items-center rounded-2xl"
style={{
background:`linear-gradient(135deg,${accentColor},#22304d)`,
color:"#fff",
fontWeight:800,
fontSize:"15px",
boxShadow:"0 6px 18px rgba(0,0,0,.15)"
}}
>
          {initials}
        </div>
      )}
      <h4
className="mt-3 text-sm font-bold leading-tight"
style={{
color:"#4c3624"
}}
>
{name}
</h4>
    </div>
  );

  return website ? (
    <a href={website} target="_blank" rel="noopener noreferrer" className="block h-full">
      {item}
    </a>
  ) : (
    item
  );
}

export interface PoweredByProps {
  poweredBy: PoweredBySponsorProps;
  coPoweredBy: PoweredBySponsorProps[];
}

export function PoweredBy({ poweredBy, coPoweredBy }: PoweredByProps) {
  return (
    <section className="space-y-6">
      <PoweredByPrimaryCard {...poweredBy} />

      {coPoweredBy.length > 0 && (
        <div>
          <div
className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em]"
style={{
color:"#9a6f3c"
}}
>
Co-Powered By
</div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {coPoweredBy.map((sponsor) => (
              <CoPoweredByGridItem key={sponsor.name} {...sponsor} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export const placeholderPoweredBy: PoweredByProps = {
  poweredBy: {
    name: "Apex Sportswear",
    logo: "",
    tagline: "Official kit partner",
    website: "#",
    accentColor: "#f59e0b",
  },
  coPoweredBy: [
    { name: "Spice Route Cafe", logo: "", website: "#", accentColor: "#ef4444" },
    { name: "Turbo Motors", logo: "", website: "#", accentColor: "#0ea5e9" },
    { name: "GreenLeaf Organics", logo: "", website: "#", accentColor: "#10b981" },
  ],
};