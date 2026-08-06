import { ExternalLink, Phone } from "lucide-react";

export interface PoweredBySponsorProps {
  name: string;
  logoUrl?: string;
  tagline?: string;
  description?: string;
  websiteUrl?: string;
  phone?: string;
  accentColor?: string;
}

export interface PoweredByProps {
  poweredBy: PoweredBySponsorProps;
  coPoweredBy: PoweredBySponsorProps[];
}

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function PoweredByPrimaryCard({
  name,
  logoUrl,
  tagline,
  description,
  websiteUrl,
  accentColor = "#b58335",
}: PoweredBySponsorProps) {
  const initials = initialsOf(name);

  return (
    <section
      className="relative overflow-hidden rounded-[34px] p-7"
      style={{
        background: "linear-gradient(180deg,#fffaf2,#f7eedf)",
        border: "1px solid rgba(173,133,73,.25)",
        boxShadow: "0 14px 34px rgba(70,48,20,.10)",
        backgroundImage: `
          radial-gradient(circle at top right, rgba(212,176,111,.12), transparent 38%),
          url("/patterns/bohra-pattern.png")
        `,
        backgroundBlendMode: "overlay",
      }}
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-40 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${accentColor}, transparent 70%)`,
        }}
      />

      <div className="relative">

        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
          style={{
            background: "#f8efdf",
            border: "1px solid rgba(188,145,78,.35)",
          }}
        >
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{
              color: "#9a6f3c",
            }}
          >
             Powered By
          </span>
        </div>

        <div className="mt-5 flex flex-col md:flex-row items-center md:items-start gap-5">

          {logoUrl ? (
            <div
              className="flex h-24 w-24 md:h-30 md:w-30 shrink-0 items-center justify-center rounded-3xl bg-white p-3"
              style={{
                boxShadow: "0 10px 22px rgba(70,48,20,.10)",
              }}
            >
              <img
  src={logoUrl}
  alt={name}
  className="h-full w-full object-contain"
/>
              
            </div>
          ) : (
            <div
              className="grid h-24 w-24 shrink-0 place-items-center rounded-3xl"
              style={{
                background:
                  "linear-gradient(180deg,#d8bc8a,#b48a52)",
                boxShadow:
                  "0 8px 18px rgba(60,40,18,.20)",
                color: "#4d3622",
                fontSize: "30px",
                fontWeight: 800,
              }}
            >
              {initials}
            </div>
          )}

          <div className="min-w-0 flex-1 text-center md:text-left">

            <h2
              className="font-display text-2xl md:text-3xl font-extrabold leading-tight"
              style={{
                color: "#4c3624",
                letterSpacing: "-0.02em",
              }}
            >
              {name}
            </h2>

            {tagline && (
              <p
                className="mt-2 text-sm md:text-base font-semibold"
                style={{
                  color: "#9a6f3c",
                }}
              >
                {tagline}
              </p>
            )}

            {description && (
              <p
                className="mt-4 text-sm md:text-[15px] leading-7 md:leading-8"
                style={{
                  color: "#65523e",
                }}
              >
                {description}
              </p>
            )}

            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full md:w-auto justify-center items-center gap-2 transition-all hover:translate-x-1"
                style={{
                  color: "#a16f34",
                  fontWeight: 700,
                }}
              >
                Visit Website
                <ExternalLink size={16} />
              </a>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}

function CoPoweredByCard({
  name,
  logoUrl,
  tagline,
  websiteUrl,
  phone,
  accentColor = "#b58335",
}: PoweredBySponsorProps) {
  const initials = initialsOf(name);

  return (
    <div
      className="flex h-full flex-col rounded-[28px] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        background: "linear-gradient(180deg,#fffaf2,#f8efe1)",
        border: "1px solid rgba(180,140,82,.22)",
        boxShadow: "0 8px 24px rgba(60,40,20,.08)",
      }}
    >
      <div className="flex justify-center">
        {logoUrl ? (
          <div
            className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white p-3"
            style={{
              boxShadow: "0 8px 18px rgba(70,48,20,.08)",
            }}
          >
            <img
              src={logoUrl}
              alt={name}
              className="h-full w-full object-contain"
            />
          </div>
        ) : (
          <div
            className="grid h-20 w-20 place-items-center rounded-3xl"
            style={{
              background: `linear-gradient(135deg,${accentColor},#7a5a31)`,
              color: "#fff",
              fontWeight: 800,
              fontSize: "22px",
            }}
          >
            {initials}
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <h3
          className="text-center font-display text-lg font-extrabold leading-tight"
          style={{ color: "#4c3624" }}
        >
          {name}
        </h3>

        {tagline && (
          <p
            className="mt-2 text-center text-xs leading-5"
            style={{ color: "#75614b" }}
          >
            {tagline}
          </p>
        )}

        <div className="mt-auto pt-5">
          <a
            href={phone ? `tel:${phone.replace(/\s+/g, "")}` : websiteUrl ?? "#"}
            target={phone ? undefined : "_blank"}
            rel={phone ? undefined : "noopener noreferrer"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3"
            style={{
              background: "#f8efdf",
              border: "1px solid rgba(188,145,78,.25)",
              color: "#a16f34",
              fontWeight: 700,
            }}
          >
            {phone ? (
              <>
                <Phone size={15} />
                Call Sponsor
              </>
            ) : (
              <>
                Visit Website
                <ExternalLink size={15} />
              </>
            )}
          </a>
        </div>
      </div>
    </div>
  );
}


export function PoweredBy({
  poweredBy,
  coPoweredBy,
}: PoweredByProps) {
  return (
    <section className="space-y-8">

      <PoweredByPrimaryCard {...poweredBy} />

      {coPoweredBy.length > 0 && (
        <div>

          <div
            className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em]"
            style={{
              color: "#9a6f3c",
            }}
          >
            Co-Powered By
          </div>

          <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
            {coPoweredBy.map((sponsor) => (
              <CoPoweredByCard
                key={sponsor.name}
                {...sponsor}
              />
            ))}
          </div>

        </div>
      )}

    </section>
  );
}