"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { WifiOff } from "lucide-react";

function beobachten(melden: () => void) {
  window.addEventListener("online", melden);
  window.addEventListener("offline", melden);
  return () => {
    window.removeEventListener("online", melden);
    window.removeEventListener("offline", melden);
  };
}

/** Ungespeicherte Eingaben haben Vorrang — dann wird nichts nachgeladen. */
function darfNachladen() {
  return navigator.onLine && !document.querySelector("[data-ungespeichert]");
}

/**
 * Hält die App auf dem Stand, ohne dass jemand „neu laden“ muss.
 *
 * Wer die App vom Startbildschirm wieder öffnet, aus einem anderen Fenster
 * zurückkommt oder wieder Netz hat, sieht neue Anfragen sofort — die Daten
 * kommen still nach. Ohne Verbindung steht oben ein kleiner Hinweis, damit
 * niemand rätselt, warum sich nichts tut.
 */
export function Verbindung() {
  const router = useRouter();
  const online = useSyncExternalStore(beobachten, () => navigator.onLine, () => true);

  useEffect(() => {
    let zuletzt = Date.now();
    const zurueck = () => {
      if (document.visibilityState !== "visible" || Date.now() - zuletzt < 20_000 || !darfNachladen()) return;
      zuletzt = Date.now();
      router.refresh();
    };
    const wiederOnline = () => {
      if (!darfNachladen()) return;
      zuletzt = Date.now();
      router.refresh();
    };
    document.addEventListener("visibilitychange", zurueck);
    window.addEventListener("online", wiederOnline);
    return () => {
      document.removeEventListener("visibilitychange", zurueck);
      window.removeEventListener("online", wiederOnline);
    };
  }, [router]);

  if (online) return null;

  return (
    <div
      role="status"
      className="pointer-events-none fixed inset-x-0 top-[calc(env(safe-area-inset-top)+4.25rem)] z-[60] flex justify-center px-4 lg:left-[16.5rem] lg:top-5"
    >
      <span className="toast-rein flex items-center gap-2 rounded-full bg-ink-deep py-2 pl-3.5 pr-4 text-[0.875rem] font-medium text-white shadow-[0_12px_32px_-8px_rgba(11,37,69,0.45)]">
        <WifiOff className="h-4 w-4 text-[#F2B37A]" strokeWidth={2} aria-hidden="true" />
        Keine Internetverbindung
      </span>
    </div>
  );
}
