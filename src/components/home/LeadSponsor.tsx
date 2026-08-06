import { Star, ExternalLink } from "lucide-react";

export interface LeadSponsorProps {
  name: string;
  logo?: string;
  tagline: string;
  description?: string;
  website?: string;
  accentColor?: string; // hex color used for the glow/accent — defaults to gold
}

export function LeadSponsor({
  name,
  logo,
  tagline,
  description,
  website,
  accentColor = "#eab308",
}: LeadSponsorProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <section
  className="relative overflow-hidden rounded-[34px] p-7"
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

    backgroundBlendMode:"overlay"
  }}
>
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-40 blur-3xl"
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

<Star
className="h-3 w-3"
style={{
color:"#b58335",
fill:"#b58335"
}}
/>

<span
className="text-[11px] font-semibold uppercase tracking-[0.22em]"
style={{
color:"#9a6f3c"
}}
>
Title Sponsor
</span>

</div>
        

        <div className="mt-4 flex items-center gap-4">
          {logo ? (
            <img
              src={logo}
              alt={name}
              className="h-30 w-30 shrink-0 rounded-3xl object-contain bg-white p-2 shadow-xl"
            />
          ) : (
          <div
  className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl"
  style={{
    background: "linear-gradient(180deg,#d8bc8a,#b48a52)",
    boxShadow: "0 8px 18px rgba(60,40,18,.20)",
    color: "#4d3622",
    fontSize: "30px",
    fontWeight: 800,
  }}
>
              {initials}
            </div>
          )}
          <div className="min-w-0">
            <h3
  className="font-display text-3xl md:text-4xl font-black leading-tight"
  style={{
    color: "#4c3624",
    letterSpacing: "-0.02em",
  }}
>
  {name}
</h3>
              
           <p
  className="mt-2 text-sm"
  style={{
    color: "#8d6b47",
    letterSpacing: ".04em",
  }}
>
  {tagline}
</p>
          </div>
        </div>

        {description && (
    <p
  className="mt-6 text-[15px] leading-8"
  style={{
    color: "#65523e",
  }}
>{description}</p>
        )}

        {website && (
          <a
  href={website}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-6 inline-flex items-center gap-2 rounded-2xl px-5 py-3 transition-all duration-300 hover:-translate-y-0.5"
  style={{
  background: "linear-gradient(180deg,#c59a5d,#a97b40)",
  color: "#fff",
  boxShadow: "0 8px 20px rgba(120,82,30,.22)",
  fontWeight: 700,
}}
>
  Visit Website

  <ExternalLink size={16} />
</a>
        )}
      </div>
    </section>
  );
}

// ---------- Placeholder usage (dummy data, for preview/testing only) ----------
// Remove or replace once real sponsor data is wired in.

export const placeholderLeadSponsor: LeadSponsorProps = {
  name: "Sanchi",
  logo: "",
  tagline: "Smart appliances for modern homes.",
  description: "Sanchi Group is the official Lead Sponsor of Sanchi Udaipur Bohra League Season 2, powering the tournament's digital scoreboards and stadium lighting.",
  website: "#",
  accentColor: "#3b82f6",
};