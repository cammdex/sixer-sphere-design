import { Link } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";


type MobileHeaderProps = {
  title?: string;
};

export function MobileHeader({ title }: MobileHeaderProps) {
  const [bellPulse, setBellPulse] = useState(true);

  
const handleNotificationClick = () => {
  setBellPulse(false);
  toast("No new notifications");
};

  return (
    
    <header
  className="sticky top-0 z-30 px-4 pt-4 pb-3 backdrop-blur-xl"
  style={{
    background:
      "linear-gradient(180deg,#3a2c22,#2c2119)",

    borderBottom:
      "1px solid rgba(201,166,108,.28)",

    boxShadow:
      "0 8px 26px rgba(25,18,12,.28)"
  }}
>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div
  className="relative grid h-11 w-11 place-items-center rounded-2xl"
  style={{
    background:
      "linear-gradient(180deg,#d8bc8a,#b48a52)",

    boxShadow:
      "0 4px 12px rgba(70,50,20,.25), inset 0 1px rgba(255,255,255,.35)"
  }}
>
             <img
  src="/logos/ubl-logo.png"
  alt="UBL"
  className="h-8 w-8 object-contain"
/>
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-background" 
               style={{
    background:"#c24b3d"
  }}
  />
            </div>
            <div className="leading-tight">
              <div
  className="font-display text-[16px] font-semibold"
  style={{
    color:"#f8f1e4",
    letterSpacing:".02em"
  }}
>{title ?? "Udaipur Bohra League"}</div>
              <div
  className="text-[10px] uppercase"
  style={{
    color: "#d9c4a3",
    letterSpacing: ".22em",
  }}
>
  UBL • Season 2
</div>
            </div>
          </Link>
          <button
            aria-label="Notifications"
            onClick={handleNotificationClick}
            className="relative grid h-10 w-10 place-items-center rounded-2xl"
style={{
background:"rgba(255,255,255,.06)",
border:"1px solid rgba(208,173,110,.18)"
}}
          >
            <Bell className="h-4 w-4 text-foreground" />
            {bellPulse && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-gold pulse-ring" />}
          </button>
        </div>
      </header>
    
  );
}