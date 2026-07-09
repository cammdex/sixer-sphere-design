import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Users, Trophy, Handshake, Megaphone, Bell } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const tabs: { to: string; label: string; icon: typeof Home; exact?: boolean }[] = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/players", label: "Players", icon: Users },
  { to: "/tournament", label: "Tournament", icon: Trophy },
  { to: "/sponsors", label: "Sponsors", icon: Handshake },
];

export function MobileLayout({
  children,
  title,
  showFab = true,
}: {
  children: ReactNode;
  title?: string;
  showFab?: boolean;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [bellPulse, setBellPulse] = useState(true);

  return (
    <div className="relative mx-auto flex min-h-screen max-w-md flex-col pb-28">
      {/* Top bar */}
      <header className="sticky top-0 z-30 px-4 pt-4 pb-3 backdrop-blur-xl"
        style={{ background: "linear-gradient(180deg, oklch(0.16 0.03 260 / 0.85), oklch(0.16 0.03 260 / 0.4))" }}>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="relative grid h-10 w-10 place-items-center rounded-xl gradient-royal shadow-glow">
              <span className="font-display text-base font-extrabold tracking-tight text-white">G</span>
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-gold ring-2 ring-background" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-[15px] font-bold">{title ?? "Sanchi Udaipur Bohra League"}</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Season 2 · 2026</div>
            </div>
          </Link>
          <button
            aria-label="Notifications"
            onClick={() => { setBellPulse(false); toast("3 new updates", { description: "Auction catalog · Fixtures · Trials" }); }}
            className="relative grid h-10 w-10 place-items-center rounded-xl glass"
          >
            <Bell className="h-4 w-4 text-foreground" />
            {bellPulse && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-gold pulse-ring" />}
          </button>
        </div>
      </header>

      <main className="flex-1 px-4">{children}</main>

      {/* FAB */}
      {showFab && (
        <button
          onClick={() => toast.success("Announcement composer", { description: "Broadcast to all 16 owners & fans." })}
          className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2 translate-x-[6.5rem] rounded-full gradient-gold p-4 shadow-glow-gold transition-transform active:scale-95"
          aria-label="New announcement"
          style={{ left: "min(calc(50% + 6.5rem), calc(100vw - 4rem))" }}
        >
          <Megaphone className="h-5 w-5 text-gold-foreground" strokeWidth={2.4} />
        </button>
      )}

      {/* Bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md px-4 pb-4 pt-2">
        <div className="glass flex items-center justify-around rounded-2xl px-2 py-2">
          {tabs.map(({ to, label, icon: Icon, exact }) => {
            const active = exact ? pathname === to : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className="group relative flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-1.5 transition-colors"
              >
                <div className={`grid h-9 w-9 place-items-center rounded-xl transition-all duration-300 ${active ? "gradient-royal shadow-glow" : "bg-transparent"}`}>
                  <Icon className={`h-[18px] w-[18px] transition-colors ${active ? "text-white" : "text-muted-foreground group-hover:text-foreground"}`} strokeWidth={active ? 2.4 : 2} />
                </div>
                <span className={`text-[10px] font-medium tracking-wide transition-colors ${active ? "text-gold" : "text-muted-foreground"}`}>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <Toaster position="top-center" theme="dark" />
    </div>
  );
}

export function TeamCrest({ short, color, color2, size = 40 }: { short: string; color: string; color2: string; size?: number }) {
  return (
    <div
      className="relative grid place-items-center rounded-xl font-display font-bold text-white shadow-md"
      style={{
        width: size, height: size,
        background: `linear-gradient(135deg, ${color}, ${color2})`,
        boxShadow: `0 6px 18px -6px ${color}80, inset 0 1px 0 rgba(255,255,255,0.18)`,
        fontSize: size * 0.36,
      }}
    >
      {short}
    </div>
  );
}

export function Avatar({ initials, color, color2, size = 48 }: { initials: string; color: string; color2: string; size?: number }) {
  return (
    <div
      className="grid place-items-center rounded-full font-display font-semibold text-white"
      style={{
        width: size, height: size,
        background: `linear-gradient(135deg, ${color}, ${color2})`,
        boxShadow: `0 4px 14px -4px ${color}60, inset 0 1px 0 rgba(255,255,255,0.18)`,
        fontSize: size * 0.38,
      }}
    >
      {initials}
    </div>
  );
}
