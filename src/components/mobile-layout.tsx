import { Megaphone } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { MobileHeader } from "@/components/mobile-header";
import InstallPrompt from "@/components/InstallPrompt";


export function MobileLayout({
  children,
  title,
  showFab = false // Temporary until announcements are implemented,
}: {
  children: ReactNode;
  title?: string;
  showFab?: boolean;
}) {

const handleFabClick = () => {
  toast.success("Coming Soon");
};
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md md:max-w-3xl xl:max-w-6xl flex-col pb-28">
      {/* Top bar */}
      <MobileHeader title={title} />

      <main className="flex-1 px-4">{children}</main>

      {/* FAB */}
      {showFab && (
        <button
onClick={handleFabClick}
          className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2 translate-x-[6.5rem] rounded-full gradient-gold p-4 shadow-glow-gold transition-transform active:scale-95"
          aria-label="Coming Soon"
          style={{ left: "min(calc(50% + 6.5rem), calc(100vw - 4rem))" }}
        >
          <Megaphone className="h-5 w-5 text-gold-foreground" strokeWidth={2.4} />
        </button>
      )}

     {/* Bottom nav */}
<MobileBottomNav />

{/* Install Prompt */}
<InstallPrompt />

<Toaster position="top-center" theme="dark" />
    </div>
  );
}

export function TeamCrest({
  short,
  color,
  color2,
  size = 40,
}: {
  short: string;
  color: string;
  color2: string;
  size?: number;
}) {
  const logoPath = `/logos/teams/${short.toLowerCase()}.png`;
  const [imageError, setImageError] = useState(false);

  return (
  <div
    style={{
      width: size,
      height: size,
    }}
  >
    {imageError ? (
      <div
        className="flex h-full w-full items-center justify-center rounded-xl font-bold text-white"
        style={{
          background: `linear-gradient(135deg, ${color}, ${color2})`,
          fontSize: size * 0.36,
        }}
      >
        {short}
      </div>
    ) : (
      <img
        src={logoPath}
        alt={short}
        className="h-full w-full object-contain"
        onError={() => setImageError(true)}
      />
    )}
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
