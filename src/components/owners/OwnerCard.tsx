import { Phone } from "lucide-react";

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
      className="rounded-3xl px-6 py-6"
      style={{
        background: "#fffdf8",
        border: "1px solid rgba(188,145,78,.18)",
        boxShadow: "0 10px 22px rgba(70,48,20,.08)",
      }}
    >
      <div className="flex flex-col items-center text-center">

        {/* Business Logo */}

        <img
          src={businessLogo}
          alt={businessName}
          className="h-20 w-20 object-contain"
        />

        {/* Owners */}

        <div className="mt-5 space-y-1">
          {owners.map((owner) => (
            <div
              key={owner}
              className="text-lg font-bold"
              style={{
                color: "#4c3624",
              }}
            >
              {owner}
            </div>
          ))}
        </div>

        {/* Divider */}

        <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-yellow-700/30 to-transparent" />

        {/* Business */}

        <h3
          className="text-xl font-black"
          style={{
            color: "#4c3624",
          }}
        >
          {businessName}
        </h3>

        <div
          className="mt-1 text-sm font-semibold"
          style={{
            color: "#9a6f3c",
          }}
        >
          {businessCategory}
        </div>

        {/* Divider */}

        <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-yellow-700/30 to-transparent" />

        {/* Team */}

        <div className="flex items-center gap-3">

          <img
            src={teamLogo}
            alt={teamName}
            className="h-10 w-10 object-contain"
          />

          <div
            className="font-bold"
            style={{
              color: "#4c3624",
            }}
          >
            {teamName}
          </div>

        </div>

        {/* Call */}

        <button
          disabled={!phone}
          className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition ${
            phone
              ? "bg-[#c89243] text-white"
              : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
          }`}
        >
          <Phone size={16} />

          {phone ? "Call Business" : "Coming Soon"}
        </button>

      </div>
    </article>
  );
}