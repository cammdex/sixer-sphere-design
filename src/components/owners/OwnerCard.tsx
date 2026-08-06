import { Phone, UserRound } from "lucide-react";

interface OwnerCardProps {
  owners: string[];
  teamName: string;
  teamLogo: string;

  businessName: string;
  businessCategory: string;
  businessLogo: string;

  phone?: string;
}

export function OwnerCard({
  owners,
  teamName,
  teamLogo,
  businessName,
  businessCategory,
  businessLogo,
  phone,
}: OwnerCardProps) {
 return (
  <article
    className="relative rounded-[32px] px-8 py-8 overflow-hidden"
    style={{
  background:
    "linear-gradient(135deg, #5c4605 0%, #edebe6 0%, #f3f0e7 0%)",
  border: "1px solid rgba(188,145,78,.22)",
  boxShadow:
    "0 12px 28px rgba(70,48,20,.10), inset 0 1px rgba(255,255,255,.85)",
}}
  >
    <div className="flex items-center gap-7">

      {/* Large Business Logo */}

      <div className="shrink-0">
        <img
          src={businessLogo}
          alt={businessName}
          className="h-28 w-28 object-contain"
        />
      </div>

<div
  className="absolute left-0 top-0 h-full w-2 rounded-l-[32px]"
  style={{
    background:
      "linear-gradient(to bottom,#8a5b2c,#d2a45e,#8a5b2c)",
  }}
/>

      {/* Content */}

      <div className="min-w-0 flex-1">

        {/* Business */}

        <h3
          className="font-display text-3xl font-black leading-none"
          style={{ color: "#4c3624" }}
        >
          {businessName}
        </h3>

        <div
          className="mt-2 text-xs font-bold uppercase tracking-[0.25em]"
          style={{ color: "#9a6f3c" }}
        >
          {businessCategory}
        </div>

        {/* Owners */}

        <div className="mt-6 space-y-2">

          {owners.map((owner) => (
            <div
              key={owner}
              className="flex items-center gap-2 text-lg font-semibold"
              style={{ color: "#4c3624" }}
            >
              <UserRound
  size={18}
  strokeWidth={2}
  style={{ color: "#9a6f3c" }}
/>
              <span>{owner}</span>
            </div>
          ))}

        </div>

        {/* Team */}

        <div className="mt-6 flex items-center gap-3">

          <img
            src={teamLogo}
            alt={teamName}
            className="h-11 w-11 object-contain"
          />

          <span
            className="font-bold"
            style={{ color: "#4c3624" }}
          >
            {teamName}
          </span>

        </div>

      </div>

    </div>

    {/* Button */}

    {phone ? (
  <a
    href={`tel:${phone.replace(/\s+/g, "")}`}
    className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#c89243] py-3 text-sm font-semibold text-white transition hover:bg-[#b88436]"
  >
    <Phone size={17} />
    Call Business
  </a>
) : (
  <button
    disabled
    className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-neutral-200 py-3 text-sm font-semibold text-neutral-500"
  >
    <Phone size={17} />
    Coming Soon
  </button>
)}

  </article>
);
}