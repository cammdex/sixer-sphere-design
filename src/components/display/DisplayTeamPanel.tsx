interface DisplayTeamPanelProps {
  teamName: string;
  ownerName: string;
  purse: number;
  logo?: string;
}

export function DisplayTeamPanel({
  teamName,
  ownerName,
  purse,
  logo,
}: DisplayTeamPanelProps) {
  return (
    <section className="rounded-[34px] border border-primary/20 bg-card p-8 shadow-xl">
      <p className="text-center text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
        Team Leading
      </p>

      {logo ? (
        <img
          src={logo}
          alt={teamName}
          className="mx-auto mt-6 h-28 w-28 object-contain"
        />
      ) : (
        <div className="mx-auto mt-6 flex h-28 w-28 items-center justify-center rounded-full border border-dashed">
          Logo
        </div>
      )}

      <h2 className="mt-6 text-center text-3xl font-bold">
        {teamName}
      </h2>

      <p className="mt-2 text-center text-muted-foreground">
        {ownerName}
      </p>

      <div className="mt-8 rounded-2xl bg-muted/40 p-5 text-center">
        <p className="text-sm uppercase tracking-wider text-muted-foreground">
          Remaining Purse
        </p>

        <p className="mt-2 text-4xl font-black">
          ₹{new Intl.NumberFormat("en-IN").format(purse)}
        </p>
      </div>
    </section>
  );
}