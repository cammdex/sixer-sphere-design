import { useEffect, useState } from "react";
import { Download, Share, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
  }>;
}

const STORAGE_KEY = "ubl-install-dismissed";

export default function InstallPrompt() {
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-ignore
      window.navigator.standalone;

    if (standalone) return;

    const lastDismiss = localStorage.getItem(STORAGE_KEY);

    if (lastDismiss) {
      const days =
        (Date.now() - Number(lastDismiss)) /
        (1000 * 60 * 60 * 24);

      if (days < 7) return;
    }

    const ios = /iphone|ipad|ipod/i.test(
      window.navigator.userAgent
    );

    setIsIOS(ios);

    const handler = (e: Event) => {
      e.preventDefault();

      setDeferredPrompt(
        e as BeforeInstallPromptEvent
      );

      setShow(true);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handler
    );

    if (ios) {
      setShow(true);
    }

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handler
      );
  }, []);

  async function install() {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    setDeferredPrompt(null);
    setShow(false);
  }

  function dismiss() {
    localStorage.setItem(
      STORAGE_KEY,
      Date.now().toString()
    );

    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/40 backdrop-blur-sm">

      <div
        className="relative w-full max-w-md rounded-t-[36px] p-7"
        style={{
          background:
            "linear-gradient(180deg,#fffaf2,#f7eedf)",
          borderTop:
            "1px solid rgba(188,145,78,.25)",
          boxShadow:
            "0 -10px 30px rgba(0,0,0,.18)",
        }}
      >
        <button
          onClick={dismiss}
          className="absolute right-5 top-5 rounded-full p-1 hover:bg-black/5"
        >
          <X size={20} />
        </button>

        <img
          src="/icons/icon-192.png"
          alt="UBL"
          className="mx-auto h-20 w-20 rounded-3xl shadow-lg"
        />

        <h2 className="mt-5 text-center text-3xl font-black text-[#4c3624]">
          Install UBL
        </h2>

        <p className="mt-3 text-center leading-7 text-[#755b3c]">
          Install UBL on your home screen for instant access during the auction,
          fixtures and live updates.
        </p>

        {isIOS ? (
          <div className="mt-6 rounded-2xl bg-[#f8efdf] p-5 text-center">
            <Share
              size={18}
              className="mx-auto mb-2 text-[#a16f34]"
            />

            <div className="font-semibold text-[#4c3624]">
              Tap the Share button
            </div>

            <div className="mt-1 text-sm text-[#755b3c]">
              then choose
            </div>

            <div className="mt-2 font-bold text-[#a16f34]">
              Add to Home Screen
            </div>
          </div>
        ) : (
          <button
            onClick={install}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-white transition hover:brightness-105"
            style={{
              background:
                "linear-gradient(180deg,#c59a5d,#a97b40)",
            }}
          >
            <Download size={18} />
            Install App
          </button>
        )}

        <button
          onClick={dismiss}
          className="mt-4 w-full text-center text-sm text-neutral-500"
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
}