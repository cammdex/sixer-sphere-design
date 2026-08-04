import { teams } from "@/lib/gpl-data";

interface TeamSlideProps {
  teamId: string;
}

export function TeamSlide({
  teamId,
}: TeamSlideProps) {
  const team = teams.find(
    (t) => t.id === teamId
  );

  if (!team) return null;

  return (
    <div
      className="
        relative
        flex
        h-[520px]
        w-full
        items-center
        justify-center
        overflow-hidden
        rounded-[28px]
      "
      style={{
        background: `linear-gradient(135deg, ${team.color2}, ${team.color})`,
      }}
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          h-[520px]
          w-[520px]
          rounded-full
          opacity-20
          blur-[100px]
        "
        style={{
          background: "#ffffff",
        }}
      />

      <div className="relative text-center">

        <img
          src={team.logo}
          alt={team.name}
          className="
            mx-auto
            h-48
            w-48
            object-contain
          "
        />

        <p
          className="
            mt-8
            text-sm
            uppercase
            tracking-[0.45em]
            text-white/80
          "
        >
          Franchise Showcase
        </p>

        <h1
          className="
            mt-3
            text-6xl
            font-black
            text-white
          "
        >
          {team.name}
        </h1>

        <p
          className="
            mt-6
            text-lg
            text-white/85
          "
        >
          Owners
        </p>

        <p
          className="
            mt-2
            text-2xl
            font-semibold
            text-white
          "
        >
          {team.owners.join(" • ")}
        </p>

      </div>

    </div>
  );
}