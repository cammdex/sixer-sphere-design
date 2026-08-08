import { useState } from "react";
import { TeamCrest } from "@/components/mobile-layout";
import TeamDetails from "@/components/team-details";
import { useLiveTeams, useLivePlayers } from "@/lib/auction-store";

export function LiveTeams() {
  const { teams } = useLiveTeams();
  const { players } = useLivePlayers();

  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  const selectedTeam =
    teams.find((team) => team.id === selectedTeamId) ?? null;

  return (
    <>
      {/* Team tabs */}
      <div className="relative">
        <div className="flex gap-2.5 overflow-x-auto pb-2 px-0.5 snap-x snap-mandatory no-scrollbar">
          {teams.map((team) => (
            <button
              key={team.id}
              type="button"
              onClick={() => setSelectedTeamId(team.id)}
              className="group relative flex h-[132px] min-w-[168px] snap-start flex-col items-center justify-center overflow-hidden rounded-[18px] text-center transition-all duration-300 active:scale-[0.97]"
              style={{
                backgroundColor: "#f7efdd",
                backgroundImage:
                  "url('/images/live-player-card/background.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "1px solid rgba(138,97,57,.45)",
                boxShadow:
                  "0 7px 16px rgba(80,55,30,.10), inset 0 0 0 1px rgba(255,255,255,.28)",
              }}
            >
              {/* Subtle parchment overlay */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,250,235,.18), rgba(215,181,124,.08))",
                }}
              />

              {/* Team crest */}
              <div className="relative z-10 flex h-12 w-12 items-center justify-center">
                <TeamCrest
                  short={team.short}
                  color={team.color}
                  color2={team.color2}
                  size={46}
                />
              </div>

              {/* Team name */}
              <div
                className="relative z-10 mt-2 px-2 font-display text-[14px] font-black leading-tight"
                style={{
                  color: "#4b3120",
                  textShadow: "0 1px rgba(255,255,255,.35)",
                }}
              >
                {team.name}
              </div>

              {/* Small decorative line */}
              <div
                className="relative z-10 mt-2 h-px w-12"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #b8863b, transparent)",
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Selected team's players/details */}
      <TeamDetails
        open={!!selectedTeam}
        team={selectedTeam}
        players={players}
        onClose={() => setSelectedTeamId(null)}
        onPlayerClick={() => {}}
      />
    </>
  );
}