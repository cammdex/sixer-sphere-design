import { useState } from "react";
import {
  ChevronDown,
  Handshake,
  Trophy,
  Star,
} from "lucide-react";
import { tournamentPartners } from "@/lib/home-dummy-data";

interface CorePartnerCardProps {
  title: string;
  name: string;
  logoUrl: string;
}

interface AwardPartnerRowProps {
  award: string;
  sponsor: string;
}

interface GoldenSponsor {
  id: string;
  name: string;
  logoUrl: string;
}

export function SponsorsGrid() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      className="rounded-[34px] overflow-hidden"
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
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between p-8 text-left"
      >
        <div>

          <div
            className="text-[11px] font-bold uppercase tracking-[0.24em]"
            style={{
              color: "#9a6f3c",
            }}
          >
            Tournament Partners
          </div>

          <h2
            className="mt-2 font-display text-3xl font-black tracking-tight"
            style={{
              color: "#4c3624",
            }}
          >
            Sponsors & Awards
          </h2>

        </div>

        <ChevronDown
          size={28}
          className={`transition-transform duration-500 ${
            expanded ? "rotate-180" : ""
          }`}
          style={{
            color: "#9a6f3c",
          }}
        />
      </button>

      <div className="mx-8 h-px bg-gradient-to-r from-transparent via-yellow-700/40 to-transparent" />

      <div
        className={`overflow-hidden transition-all duration-500 ${
          expanded
            ? "max-h-[3000px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-10 p-8">

          {/* Core Partners */}

          <section>

            <div className="mb-5 flex items-center gap-2">

              <Handshake
                size={18}
                style={{
                  color: "#b58335",
                }}
              />

              <h3
                className="text-lg font-bold"
                style={{
                  color: "#4c3624",
                }}
              >
                Tournament Partners
              </h3>

            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

              {tournamentPartners.corePartners.map((partner) => (

                <CorePartnerCard
                  key={partner.id}
                  title={partner.title}
                  name={partner.name}
                  logoUrl={partner.logoUrl}
                />

              ))}

            </div>

          </section>

          {/* Award Partners */}

          <section>

            <div className="mb-5 flex items-center gap-2">

              <Trophy
                size={18}
                style={{
                  color: "#b58335",
                }}
              />

              <h3
                className="text-lg font-bold"
                style={{
                  color: "#4c3624",
                }}
              >
                Award Partners
              </h3>

            </div>

            <div
              className="rounded-3xl p-5"
              style={{
                background: "rgba(255,255,255,.65)",
                border:
                  "1px solid rgba(188,145,78,.18)",
              }}
            >
              <div className="grid gap-3 md:grid-cols-2">

                {tournamentPartners.awardPartners.map((award) => (

                  <AwardPartnerRow
                    key={award.award}
                    award={award.award}
                    sponsor={award.sponsor}
                  />

                ))}

              </div>
            </div>

          </section>

          {/* Golden Sponsors */}

          <section>

            <div className="mb-5 flex items-center gap-2">

              <Star
                size={18}
                style={{
                  color: "#b58335",
                }}
              />

              <h3
                className="text-lg font-bold"
                style={{
                  color: "#4c3624",
                }}
              >
                Golden Sponsors
              </h3>

            </div>
             {tournamentPartners.goldenSponsors.length === 0 ? (

              <div
                className="rounded-3xl border border-dashed p-8 text-center"
                style={{
                  borderColor: "rgba(181,131,53,.28)",
                  background: "rgba(255,255,255,.55)",
                }}
              >
                <p
                  className="text-sm"
                  style={{
                    color: "#75614b",
                  }}
                >
                  Coming Soon
                </p>
              </div>

            ) : (

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">

                {tournamentPartners.goldenSponsors.map((sponsor) => (

                  <GoldenSponsorCard
                    key={sponsor.id}
                    sponsor={sponsor}
                  />

                ))}

              </div>

            )}

          </section>

        </div>

      </div>

    </section>
  );
}

function CorePartnerCard({
  title,
  name,
  logoUrl,
}: CorePartnerCardProps) {
  return (
    <div
      className="rounded-3xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        background: "#fffdf8",
        border: "1px solid rgba(188,145,78,.18)",
        boxShadow: "0 10px 22px rgba(70,48,20,.08)",
      }}
    >
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={name}
          className="mx-auto h-16 w-16 object-contain"
        />
      ) : (
        <div
          className="mx-auto grid h-16 w-16 place-items-center rounded-2xl"
          style={{
            background:
              "linear-gradient(180deg,#d8bc8a,#b48a52)",
            color: "#4d3622",
            fontWeight: 800,
          }}
        >
          🤝
        </div>
      )}

      <div
        className="mt-5 text-xs font-bold uppercase tracking-[0.18em]"
        style={{
          color: "#9a6f3c",
        }}
      >
        {title}
      </div>

      <h4
        className="mt-2 text-lg font-bold"
        style={{
          color: "#4c3624",
        }}
      >
        {name}
      </h4>
    </div>
  );
}

function AwardPartnerRow({
  award,
  sponsor,
}: AwardPartnerRowProps) {
  return (
    <div
      className="flex items-center justify-between border-b py-3 last:border-0"
      style={{
        borderColor: "rgba(188,145,78,.14)",
      }}
    >
      <span
        className="font-medium"
        style={{
          color: "#4c3624",
        }}
      >
        {award}
      </span>

      <span
        className="font-semibold"
        style={{
          color: "#9a6f3c",
        }}
      >
        {sponsor}
      </span>
    </div>
  );
}

function GoldenSponsorCard({
  sponsor,
}: {
  sponsor: GoldenSponsor;
}) {
  return (
    <div
      className="rounded-3xl p-5 text-center"
      style={{
        background: "#fffdf8",
        border: "1px solid rgba(188,145,78,.18)",
      }}
    >
      {sponsor.logoUrl ? (
        <img
          src={sponsor.logoUrl}
          alt={sponsor.name}
          className="mx-auto h-16 w-16 object-contain"
        />
      ) : (
        <div
          className="mx-auto grid h-16 w-16 place-items-center rounded-2xl"
          style={{
            background:
              "linear-gradient(180deg,#d8bc8a,#b48a52)",
            color: "#4d3622",
            fontWeight: 800,
          }}
        >
          LOGO
        </div>
      )}

      <div
        className="mt-4 font-semibold"
        style={{
          color: "#4c3624",
        }}
      >
        {sponsor.name}
      </div>
    </div>
  );
}