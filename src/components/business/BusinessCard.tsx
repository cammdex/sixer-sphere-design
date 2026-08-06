import { Phone } from "lucide-react";

interface BusinessCardProps {
  title: string;
  sponsor: string;
  logo: string;
  phone?: string;
}

export function BusinessCard({
  title,
  sponsor,
  logo,
  phone,
}: BusinessCardProps) {
  const hasSponsor = sponsor.trim().length > 0;

  return (
    <article
     className="rounded-3xl px-5 py-5 transition-all duration-300"
      style={{
        background: "#fffdf8",
        border: "1px solid rgba(188,145,78,.18)",
        boxShadow: "0 10px 22px rgba(70,48,20,.08)",
      }}
    >
      <div className="flex flex-col items-center text-center">

        <img
          src={logo}
          alt={title}
          className="h-20 w-20 object-contain"
        />

        <div
          className="mt-3 text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{
            color: "#9a6f3c",
          }}
        >
          {title}
        </div>

        <h3
          className="mt-1.5 text-lg font-bold"
          style={{
            color: "#4c3624",
          }}
        >
          {hasSponsor ? sponsor : "Available for Sponsorship"}
        </h3>

        <button
          disabled={!phone}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition ${
            phone
              ? "bg-[#c89243] text-white"
              : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
          }`}
        >
          <Phone size={16} />
          {phone ? "Call Sponsor" : "Coming Soon"}
        </button>

      </div>
    </article>
  );
}