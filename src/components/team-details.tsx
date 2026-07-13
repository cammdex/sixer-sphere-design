import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { TeamCrest, Avatar } from "@/components/mobile-layout";
import type { LivePlayer, LiveTeam } from "@/lib/auction-store";

type Props = {
  open: boolean;
  onClose: () => void;
  team: LiveTeam | null;
  players: LivePlayer[];
  onPlayerClick: (player: LivePlayer) => void;
};

export default function TeamDetails({
  open,
  onClose,
  team,
  players,
  onPlayerClick,
}: Props) {
  if (!team) return null;

  const squad = players.filter((p) => p.teamId === team.id);
  const captain = players.find((p) => p.name === team.captain);
  const viceCaptain = players.find((p) => p.name === team.viceCaptain);
  const retainedPlayer = players.find((p) => p.name === team.retainedPlayer);
  const remaining = team.remainingSlots ?? 13 - squad.length;

  return (
    <Dialog
      open={open}
      
    >
      <DialogContent className="w-[95vw] max-w-6xl h-[92vh] border-none bg-transparent p-0 shadow-none">

        <div className="glass relative h-full overflow-y-auto rounded-3xl p-8">

          <DialogTitle className="sr-only">
            {team.name}
          </DialogTitle>

          <button
            onClick={onClose}
            className="absolute right-5 top-5 rounded-full glass p-2"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}

          <div className="flex items-center gap-5">

            <TeamCrest
              short={team.short}
              color={team.color}
              color2={team.color2}
              size={78}
            />

            <div>

              <h2 className="font-display text-3xl font-bold">
                {team.name}
              </h2>

              <div className="mt-1 text-sm text-muted-foreground">
                {team.short}
              </div>

            </div>

          </div>

          {/* Team Status */}

          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">

            <Stat
              label="PURSE"
              value={`₹${((team.purse ?? 0) / 10000000).toFixed(2)} Cr`}
            />

            <Stat
              label="MAX BID"
              value={`₹${((team.maxBid ?? 0) / 10000000).toFixed(2)} Cr`}
            />

            <Stat
              label="PLAYERS"
             value={`${team.playersBought ?? squad.length}/13`}
            />

            <Stat
              label="REMAINING"
              value={remaining.toString()}
            />

          </div>

          {/* Main Layout */}

          <div className="mt-10 grid gap-8 lg:grid-cols-[340px_1fr]">

            {/* LEFT COLUMN */}

            <div>

              <h3 className="text-lg font-bold">
                Owners
              </h3>

              <div className="mt-4 space-y-3">

                {team.owners.map((owner) => (
                                      <div
                    key={owner}
                    className="glass flex items-center gap-3 rounded-2xl p-4"
                  >
                    <Avatar
                      initials={owner
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                      color={team.color}
                      color2={team.color2}
                      size={52}
                    />

                    <div className="flex-1">

                      <div className="font-semibold">
                        {owner}
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Team Owner
                      </div>

                    </div>

                  </div>

                ))}

              </div>

              {/* Leadership */}

<h3 className="mt-8 text-lg font-bold">
  Leadership
</h3>

<div className="mt-4 space-y-3">

  {/* Captain */}

  <button
    onClick={() => captain && onPlayerClick(captain)}
    className="glass w-full rounded-2xl p-4 text-left transition hover:scale-[1.02]"
  >
    <div className="text-xs uppercase tracking-widest text-muted-foreground">
      Captain
    </div>

    <div className="mt-3 flex items-center gap-3">
      <Avatar
        initials={team.captain
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)}
        color={team.color}
        color2={team.color2}
        size={48}
      />

      <div className="font-semibold">
        {team.captain}
      </div>
    </div>
  </button>

  {/* Vice Captain */}

  <button
    onClick={() => viceCaptain && onPlayerClick(viceCaptain)}
    className="glass w-full rounded-2xl p-4 text-left transition hover:scale-[1.02]"
  >
    <div className="text-xs uppercase tracking-widest text-muted-foreground">
      Vice Captain
    </div>

    <div className="mt-3 flex items-center gap-3">
      <Avatar
        initials={(team.viceCaptain ?? "")
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)}
        color={team.color}
        color2={team.color2}
        size={48}
      />

      <div className="font-semibold">
        {team.viceCaptain ?? "-"}
      </div>
    </div>
  </button>

  {/* Retained Player */}

  <button
    onClick={() => retainedPlayer && onPlayerClick(retainedPlayer)}
    className="glass w-full rounded-2xl p-4 text-left transition hover:scale-[1.02]"
  >
    <div className="text-xs uppercase tracking-widest text-muted-foreground">
      Retained Player
    </div>

    <div className="mt-3 flex items-center gap-3">
      <Avatar
        initials={(team.retainedPlayer ?? "")
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)}
        color={team.color}
        color2={team.color2}
        size={48}
      />

      <div className="font-semibold">
        {team.retainedPlayer ?? "-"}
      </div>
    </div>
  </button>

</div>
</div>

            {/* RIGHT COLUMN */}

            <div>

              <h3 className="text-lg font-bold">
  Live Squad
</h3>

<div className="mt-4 grid gap-3 md:grid-cols-2">
  {squad.length === 0 ? (

    <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
      No auction players yet.
    </div>

  ) : (

    squad.map((player) => (
                  <button
                    key={player.id}
                    onClick={() => onPlayerClick(player)}
                    className="glass flex items-center gap-4 rounded-2xl p-4 text-left transition hover:scale-[1.02]"
                  >

                    <Avatar
                      initials={player.initials}
                      color={team.color}
                      color2={team.color2}
                      size={54}
                    />

                    <div className="min-w-0 flex-1">

                      <div className="truncate font-semibold">
                        {player.name}
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {player.playerNumber} • {player.role}
                      </div>

                    </div>

                    <div className="text-right">

                      <div className="text-xs text-muted-foreground">
                        Sold
                      </div>

                      <div className="font-bold text-gold">
                        {player.soldPrice
                          ? `₹${player.soldPrice.toLocaleString("en-IN")}`
                          : "—"}
                      </div>

                    </div>

                  </button>

                ))

              )}

              </div>

            </div>

          </div>

        </div>

      </DialogContent>

    </Dialog>

  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="glass rounded-2xl p-4">

      <div className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </div>

      <div className="mt-2 text-2xl font-bold text-gold">
        {value}
      </div>

    </div>
  );
}