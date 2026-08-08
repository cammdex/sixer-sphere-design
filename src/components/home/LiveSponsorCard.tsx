import { Instagram, Phone } from "lucide-react";

interface LiveSponsorCardProps {
  name: string;
  logo: string;
  tagline?: string;
  phone?: string;
  instagram?: string;
}

export function LiveSponsorCard({
  name,
  logo,
  tagline,
  phone,
  instagram,
}: LiveSponsorCardProps) {
  return (
    <section
      className="relative overflow-hidden rounded-[24px] p-4 md:p-5"
      style={{
        background:
          "linear-gradient(180deg,#fffaf2,#f7eedf)",
        border: "1px solid rgba(173,133,73,.22)",
        boxShadow:
          "0 10px 24px rgba(70,48,20,.08)",
        backgroundImage:
          'radial-gradient(circle at top right, rgba(212,176,111,.12), transparent 40%), url("/patterns/bohra-pattern.png")',
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="relative flex items-center gap-4">
        {/* Logo */}
        <div
          className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white p-2"
          style={{
            boxShadow:
              "0 6px 14px rgba(70,48,20,.10)",
          }}
        >
          <img
            src={logo}
            alt={name}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1">
          <div
            className="mb-1 inline-flex rounded-full px-2.5 py-1"
            style={{
              background: "#f8efdf",
              border:
                "1px solid rgba(188,145,78,.28)",
            }}
          >
            <span
              className="text-[9px] font-bold uppercase tracking-[0.2em]"
              style={{ color: "#9a6f3c" }}
            >
              Live Sponsor
            </span>
          </div>

          <h3
            className="font-display text-lg md:text-xl font-extrabold leading-tight"
            style={{ color: "#4c3624" }}
          >
            {name}
          </h3>

          {tagline && (
            <p
              className="mt-1 text-xs leading-5"
              style={{ color: "#75614b" }}
            >
              {tagline}
            </p>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            {phone && (
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold"
                style={{
                  background: "#f8efdf",
                  border:
                    "1px solid rgba(188,145,78,.25)",
                  color: "#a16f34",
                }}
              >
                <Phone size={13} />
                Call
              </a>
            )}

            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold"
                style={{
                  background: "#f8efdf",
                  border:
                    "1px solid rgba(188,145,78,.25)",
                  color: "#a16f34",
                }}
              >
                <Instagram size={13} />
                Instagram
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}