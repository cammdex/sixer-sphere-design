import { TeamCrest } from "@/components/mobile-layout";
import { useState } from "react";
import  TeamDetails  from "@/components/team-details";
import { formatINR } from "@/lib/gpl-data";
import { useLiveTeams, useLivePlayers } from "@/lib/auction-store";

export function LiveTeams() {
  const { teams } = useLiveTeams();
  const { players } = useLivePlayers();
const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

const selectedTeam =
  teams.find((t) => t.id === selectedTeamId) ?? null;

  return (
  <>
    <section className="mt-5">
      <div className="mb-5">
  <div
    className="text-[11px] font-bold uppercase tracking-[0.24em]"
    style={{ color: "#9a6f3c" }}
  >
    Auction Dashboard
  </div>

  <h2
  className="mt-2 font-display text-2xl md:text-5xl font-black tracking-tight"
    style={{ color: "#4c3624" }}
  >
    Live Team Purse
  </h2>

  <div className="mt-3 flex items-center gap-3">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-700/40 to-transparent" />
    <span className="">✦</span>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-700/40 to-transparent" />
  </div>
</div>

      <div className="space-y-5">
        {teams.map((team) => {
          const pursePercent =
            ((team.purse ?? 0) / (team.initialPurse ?? 1)) * 100;

          return (
            <div
              key={team.id}
              onClick={() => setSelectedTeamId(team.id)}
              className="auction-card relative cursor-pointer overflow-hidden rounded-[28px] md:rounded-[34px] p-5 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <TeamCrest
                  short={team.short}
                  color={team.color}
                  color2={team.color2}
                  size={48}
                />

                <div className="flex-1">
                  <h3
  className="font-display text-xl md:text-3xl font-black tracking-tight"
  style={{
    color:"#4c3624"
  }}
>
                    {team.name}
                  </h3>

                  <div
  className="mt-1"
  style={{
    color:"#a16f34"
  }}
>
  <div className="my-4 flex items-center gap-2">
    <div className="h-px flex-1 bg-yellow-700/20" />
    <span className="text-[9px] text-yellow-700">✦</span>
    <div className="h-px flex-1 bg-yellow-700/20" />
  </div>

  <p className="text-2xl md:text-4xl font-black tracking-tight">
    {formatINR(team.purse ?? 0)}
  </p>
</div>

                </div>
              </div>

              {/* Purse Bar */}

              <div className="mt-4 h-4 overflow-hidden rounded-2xl bg-card">
                <div
                  className="h-full rounded-2xl bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
                  style={{
  width: `${Math.max(0, Math.min(100, pursePercent))}%`,
  background:
    pursePercent > 65
      ? "linear-gradient(90deg,#8a5b2c,#c79a56,#e5c983,#c79a56,#8a5b2c)"
      : pursePercent > 35
      ? "linear-gradient(90deg,#8b5e3c,#c67c39,#d69b58,#c67c39,#8b5e3c)"
      : "linear-gradient(90deg,#7a3326,#b4513b,#d77d59,#b4513b,#7a3326)",
  boxShadow:
    "0 0 10px rgba(180,120,60,.25), inset 0 1px rgba(255,255,255,.3)",
}}
                />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                 <p
  className="text-[10px] uppercase tracking-widest"
  style={{
    color: "#8d6b47",
  }}
>
                    Squad
                  </p>

                  <p className="font-display text-xl md:text-2xl font-extrabold">
                    {team.playersBought}/{team.squadLimit}
                  </p>
                </div>

                <div className="text-right">
                 <p
  className="text-[10px] uppercase tracking-widest"
  style={{
    color: "#8d6b47",
  }}
>
                    Maximum Available Bid
                  </p>

                  <p className="font-display text-xl md:text-2xl font-extrabold text-gold">
                    {formatINR(Number(team.maxBid ?? 0))}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
        </section>

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