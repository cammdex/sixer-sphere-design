interface DisplayHeaderProps {
  tournamentName: string;
  season: string;
}

export function DisplayHeader({
  tournamentName,
  season,
}: DisplayHeaderProps) {
  return (
    <header className="flex h-24 items-center justify-between rounded-xl border border-primary/10 bg-card/90 px-6 shadow-sm">

      {/* Tournament Logo */}
      <div className="flex items-center gap-4">

        <img
          src="/logos/ubl-logo.png"
          alt="UBL"
          className="h-14 w-14 object-contain"
        />

      </div>

      {/* Center */}

      <div className="flex h-full flex-col items-center justify-center">

  <h1 className="text-[38px] font-extrabold leading-none tracking-tight text-foreground">
    {tournamentName}
  </h1>

  <p className="mt-1 text-base text-muted-foreground">
    {season}
  </p>

</div>

      {/* Sponsor */}

      <div className="flex items-center">

        <img
          src="/logos/sanchi-logo.png"
          alt="Sanchi Group"
          className="h-12 w-auto object-contain"
        />

      </div>

    </header>
  );
}