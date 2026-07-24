import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Users,
  Trophy,
  Handshake,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

const tabs: {
  to: string;
  label: string;
  icon: typeof Home;
  exact?: boolean;
}[] = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/players", label: "Players", icon: Users },
  { to: "/tournament", label: "Tournament", icon: Trophy },
  { to: "/sponsors", label: "Sponsors", icon: Handshake },
];

export function MobileBottomNav() {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(sessionStorage.getItem("auctionAdmin") === "true");
  }, []);

  const navigationTabs = isAdmin
    ? [
        ...tabs,
        {
          to: "/admin/auction",
          label: "Auction",
          icon: ShieldCheck,
        },
      ]
    : tabs;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-md md:max-w-3xl xl:max-w-6xl px-4 pb-4 pt-2">
      <div className="glass flex items-center justify-around rounded-2xl px-2 py-2">
        {navigationTabs.map(({ to, label, icon: Icon, exact }) => {
          const active = exact
            ? pathname === to
            : pathname.startsWith(to);

          return (
            <Link
              key={to}
              to={to}
              className="group relative flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-1.5 transition-colors"
            >
              <div
                className={`grid h-9 w-9 place-items-center rounded-xl transition-all duration-300 ${
                  active
                    ? "gradient-royal shadow-glow"
                    : "bg-transparent"
                }`}
              >
                <Icon
                  className={`h-[18px] w-[18px] transition-colors ${
                    active
                      ? "text-white"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                  strokeWidth={active ? 2.4 : 2}
                />
              </div>

              <span
                className={`text-[10px] font-medium tracking-wide transition-colors ${
                  active ? "text-gold" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}