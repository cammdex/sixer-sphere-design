import { Link } from "@tanstack/react-router";
import { Bell, Menu, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type MobileHeaderProps = {
  title?: string;
};

export function MobileHeader({ title }: MobileHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNotificationClick = () => {
    toast("No new notifications");
  };

  const menuItems = [
  { label: "Home", to: "/" },
  { label: "Sponsors", to: "/sponsors" },
  { label: "Business Directory", to: "/sponsors" },

  { label: "Help & FAQs", to: "/help" },
  { label: "Support", to: "/support" },
  { label: "Report Issue", to: "/report-issue" },

  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms-and-conditions" },

  { label: "About UBC", to: "/about" },
];

  return (
    <>
      <header
        className="sticky top-0 z-30 px-4 pt-4 pb-3 backdrop-blur-xl"
        style={{
          background: "linear-gradient(180deg,#3a2c22,#2c2119)",
          borderBottom: "1px solid rgba(201,166,108,.28)",
          boxShadow: "0 8px 26px rgba(25,18,12,.28)",
        }}
      >
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div
              className="relative grid h-11 w-11 place-items-center rounded-2xl"
              style={{
                background:
                  "linear-gradient(180deg,#d8bc8a,#b48a52)",
                boxShadow:
                  "0 4px 12px rgba(70,50,20,.25), inset 0 1px rgba(255,255,255,.35)",
              }}
            >
              <img
                src="/logos/ubl-logo.png"
                alt="UBL"
                className="h-8 w-8 object-contain"
              />

              <span
                className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full"
                style={{
                  background: "#c24b3d",
                }}
              />
            </div>

            <div>
              <div
                className="font-display text-[16px] font-semibold"
                style={{
                  color: "#f8f1e4",
                }}
              >
                {title ?? "Udaipur Bohra League"}
              </div>

              <div
                className="text-[10px] uppercase tracking-[0.22em]"
                style={{
                  color: "#d9c4a3",
                }}
              >
                UBL • Season 2
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNotificationClick}
              className="rounded-xl p-2"
            >
              <Bell
                className="h-5 w-5"
                color="#f8f1e4"
              />
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              className="rounded-xl p-2"
            >
              <Menu
                className="h-6 w-6"
                color="#f8f1e4"
              />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />

          <aside
            className="fixed right-0 top-0 z-50 h-screen w-[300px] bg-[#f8f1e4] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b p-5">
              <h2
                className="text-xl font-bold"
                style={{ color: "#4c3624" }}
              >
                Menu
              </h2>

              <button
                onClick={() => setMenuOpen(false)}
              >
                <X
                  className="h-6 w-6"
                  color="#4c3624"
                />
              </button>
            </div>

            <nav className="flex flex-col">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="border-b px-5 py-4 font-medium hover:bg-[#efe2c8]"
                  style={{
                    color: "#4c3624",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="absolute bottom-0 w-full border-t p-5">
              <div
                className="text-sm"
                style={{
                  color: "#7a5b3d",
                }}
              >
                Version 2.0
              </div>

              <div
                className="mt-1 text-xs"
                style={{
                  color: "#9b8060",
                }}
              >
                Made by UBC-Team
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}